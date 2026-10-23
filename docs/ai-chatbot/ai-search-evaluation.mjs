const API_ROOT = 'https://api.cloudflare.com/client/v4';
const MAX_CHUNKS = 8;
const MAX_CHUNK_TEXT = 1800;

export function validateRunName(run) {
  if (!/^[a-z0-9-]+$/.test(run)) throw new Error('Use a lowercase run name.');
  return run;
}

export function selectCases(caseGroups, idsArgument) {
  const cases = caseGroups.flat();
  const byId = new Map();
  for (const item of cases) {
    if (byId.has(item.id)) throw new Error(`Duplicate case ID: ${item.id}`);
    byId.set(item.id, item);
  }
  if (!idsArgument) return cases;

  const requested = [...new Set(idsArgument.split(',').map(id => id.trim()).filter(Boolean))];
  if (requested.length === 0) throw new Error('Provide at least one case ID.');
  const unknown = requested.filter(id => !byId.has(id));
  if (unknown.length) throw new Error(`Unknown case ID(s): ${unknown.join(', ')}`);
  const selected = new Set(requested);
  return cases.filter(item => selected.has(item.id));
}

function clippedText(value, maxLength) {
  if (typeof value !== 'string') return undefined;
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function safeMessage(value, apiToken, maxLength) {
  const message = typeof value === 'string' ? value : String(value);
  return clippedText(apiToken ? message.split(apiToken).join('[redacted]') : message, maxLength);
}

export function redactSecrets(value, secret) {
  if (typeof value === 'string') return secret ? value.split(secret).join('[redacted]') : value;
  if (Array.isArray(value)) return value.map(item => redactSecrets(item, secret));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      redactSecrets(key, secret),
      redactSecrets(item, secret)
    ]));
  }
  return value;
}

function summaryMetadata(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const entries = Object.entries(value)
    .filter(([key, item]) => typeof key === 'string' && ['string', 'number', 'boolean'].includes(typeof item))
    .slice(0, 12)
    .map(([key, item]) => [clippedText(key, 100), typeof item === 'string' ? clippedText(item, 200) : item]);
  return Object.fromEntries(entries);
}

export function summarizeChunks(chunks) {
  if (!Array.isArray(chunks)) return [];
  return chunks.slice(0, MAX_CHUNKS).map(chunk => {
    const summary = {};
    for (const key of ['id', 'type', 'score']) {
      if (chunk?.[key] !== undefined && ['string', 'number'].includes(typeof chunk[key])) {
        summary[key] = chunk[key];
      }
    }
    if (typeof chunk?.text === 'string') {
      summary.text = clippedText(chunk.text, MAX_CHUNK_TEXT);
      if (chunk.text.length > MAX_CHUNK_TEXT) summary.textTruncated = true;
    }
    if (chunk?.item && typeof chunk.item === 'object' && !Array.isArray(chunk.item)) {
      const item = {};
      if (typeof chunk.item.key === 'string') item.key = clippedText(chunk.item.key, 500);
      if (typeof chunk.item.timestamp === 'number') item.timestamp = chunk.item.timestamp;
      const metadata = summaryMetadata(chunk.item.metadata);
      if (metadata && Object.keys(metadata).length) item.metadata = metadata;
      if (Object.keys(item).length) summary.item = item;
    }
    if (chunk?.scoring_details && typeof chunk.scoring_details === 'object') {
      const details = {};
      for (const [key, value] of Object.entries(chunk.scoring_details)) {
        if (['string', 'number'].includes(typeof value)) details[key] = value;
      }
      if (Object.keys(details).length) summary.scoring_details = details;
    }
    return summary;
  });
}

function apiErrors(payload, apiToken) {
  const errors = Array.isArray(payload?.errors) ? payload.errors : [];
  const summaries = errors.slice(0, 5).map(error => ({
    ...(typeof error?.code === 'number' || typeof error?.code === 'string' ? { code: error.code } : {}),
    ...(typeof error?.message === 'string' ? { message: safeMessage(error.message, apiToken, 500) } : {})
  }));
  if (summaries.length) return summaries;
  return payload?.success === false
    ? [{ message: 'Cloudflare API returned success: false without error details.' }]
    : [];
}

function responseError(payload, status, apiToken) {
  const errors = apiErrors(payload, apiToken);
  if (errors.length) return errors;
  if (typeof payload?.error === 'string') return [{ message: safeMessage(payload.error, apiToken, 500) }];
  return [{ message: `HTTP ${status} returned no structured error details.` }];
}

export async function callAiSearch({
  accountId,
  apiToken,
  instance,
  namespace,
  phase,
  question,
  fetchImpl = fetch
}) {
  if (!['search', 'chat/completions'].includes(phase)) throw new Error(`Unsupported AI Search phase: ${phase}`);
  const url = [
    API_ROOT,
    'accounts', encodeURIComponent(accountId),
    'ai-search', 'namespaces', encodeURIComponent(namespace),
    'instances', encodeURIComponent(instance),
    ...phase.split('/')
  ].join('/');
  const started = Date.now();
  try {
    const response = await fetchImpl(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
      signal: AbortSignal.timeout(55000)
    });
    let payload;
    try {
      payload = await response.json();
    } catch {
      return {
        httpStatus: response.status,
        durationMs: Date.now() - started,
        error: [{ message: 'Response body was not valid JSON.' }]
      };
    }
    const errors = apiErrors(payload, apiToken);
    return {
      httpStatus: response.status,
      durationMs: Date.now() - started,
      ...(response.ok ? { payload } : {}),
      ...(!response.ok ? { error: responseError(payload, response.status, apiToken) } : {}),
      ...(response.ok && errors.length ? { error: errors } : {})
    };
  } catch (error) {
    return {
      httpStatus: 0,
      durationMs: Date.now() - started,
      error: [{ message: safeMessage(error instanceof Error ? error.message : String(error), apiToken, 500) }]
    };
  }
}

function responseResult(payload) {
  return payload?.success === true && payload.result && typeof payload.result === 'object'
    ? payload.result
    : payload;
}

export function summarizeRetrieval(call) {
  const payload = responseResult(call.payload);
  return {
    httpStatus: call.httpStatus,
    durationMs: call.durationMs,
    ...(payload?.query_kind !== undefined ? { queryKind: payload.query_kind } : {}),
    ...(typeof payload?.search_query === 'string' ? { searchQuery: payload.search_query } : {}),
    ...(Array.isArray(payload?.chunks) ? { returnedChunkCount: payload.chunks.length } : {}),
    chunks: summarizeChunks(payload?.chunks),
    ...(call.error ? { error: call.error } : {})
  };
}

function answerText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    const text = content.filter(part => typeof part?.text === 'string').map(part => part.text);
    return text.length ? text.join('\n') : undefined;
  }
  return undefined;
}

export function summarizeGeneration(call) {
  const payload = responseResult(call.payload);
  const message = payload?.choices?.[0]?.message;
  const answer = answerText(message?.content);
  const usage = payload?.usage;
  const usageSummary = usage && typeof usage === 'object' && !Array.isArray(usage)
    ? Object.fromEntries(Object.entries(usage).slice(0, 12).map(([key, value]) => [
        key,
        value && typeof value === 'object' && !Array.isArray(value)
          ? Object.fromEntries(Object.entries(value).filter(([, detail]) =>
              typeof detail === 'number' && Number.isFinite(detail)).slice(0, 12))
          : typeof value === 'number' && Number.isFinite(value) ? value : undefined
      ]).filter(([, value]) => value !== undefined))
    : undefined;
  return {
    httpStatus: call.httpStatus,
    durationMs: call.durationMs,
    ...(typeof answer === 'string' ? { answer } : {}),
    ...(typeof payload?.model === 'string' ? { model: payload.model } : {}),
    ...(typeof payload?.choices?.[0]?.finish_reason === 'string'
      ? { finishReason: payload.choices[0].finish_reason } : {}),
    ...(Array.isArray(payload?.chunks) ? { returnedChunkCount: payload.chunks.length } : {}),
    ...(Object.hasOwn(payload ?? {}, 'usage') && usageSummary ? { usage: usageSummary } : {}),
    contextChunks: summarizeChunks(payload?.chunks),
    ...(call.error ? { error: call.error } : {})
  };
}
