import test from 'node:test';
import assert from 'node:assert/strict';
import {
  callAiSearch,
  redactSecrets,
  selectCases,
  summarizeChunks,
  summarizeGeneration,
  summarizeRetrieval,
  validateRunName
} from './ai-search-evaluation.mjs';

test('selection uses unique catalog IDs and reports unknown requested IDs', () => {
  const groups = [[{ id: 'one' }, { id: 'two' }], [{ id: 'three' }]];
  assert.deepEqual(selectCases(groups).map(item => item.id), ['one', 'two', 'three']);
  assert.deepEqual(selectCases(groups, 'three,one,three').map(item => item.id), ['one', 'three']);
  assert.throws(() => selectCases(groups, 'missing'), /Unknown case ID/);
  assert.throws(() => selectCases([[{ id: 'one' }], [{ id: 'one' }]]), /Duplicate case ID/);
  assert.throws(() => selectCases(groups, ' , '), /at least one case ID/);
});

test('run names are safe evidence filenames', () => {
  assert.equal(validateRunName('ai-search-smoke-01'), 'ai-search-smoke-01');
  for (const run of ['AI-search', '../run', 'run.jsonl', '']) {
    assert.throws(() => validateRunName(run), /lowercase run name/);
  }
});

test('secret redaction covers strings nested anywhere in serialized evidence', () => {
  const token = 'never-persist-this';
  const record = redactSecrets({ answer: `quoted ${token}`, details: [token, { metadata: token }] }, token);
  assert.deepEqual(record, {
    answer: 'quoted [redacted]',
    details: ['[redacted]', { metadata: '[redacted]' }]
  });
});

test('chunk summaries retain source keys, scores and bounded content', () => {
  const chunks = Array.from({ length: 10 }, (_, index) => ({
    id: `chunk-${index}`,
    type: 'text',
    score: 0.9,
    text: 'x'.repeat(1900),
    item: { key: `docs/page-${index}.html`, timestamp: 123, metadata: { title: 'Page', ignored: { large: true } } },
    scoring_details: { vector_score: 0.8, vector_rank: 1 }
  }));
  const result = summarizeChunks(chunks);
  assert.equal(result.length, 8);
  assert.equal(result[0].text.length, 1800);
  assert.equal(result[0].textTruncated, true);
  assert.equal(result[0].item.key, 'docs/page-0.html');
  assert.deepEqual(result[0].item.metadata, { title: 'Page' });
  assert.deepEqual(result[0].scoring_details, { vector_score: 0.8, vector_rank: 1 });
});

test('retrieval and generation summaries use documented response fields only', () => {
  const chunks = [{ id: 'chunk', score: 0.7, text: 'Relevant', item: { key: 'docs/setup.html' } }];
  assert.deepEqual(summarizeRetrieval({
    httpStatus: 200, durationMs: 12,
    payload: { success: true, result: { query_kind: 'text', search_query: 'setup', chunks } }
  }), {
    httpStatus: 200, durationMs: 12, queryKind: 'text', searchQuery: 'setup', returnedChunkCount: 1,
    chunks: [{ id: 'chunk', score: 0.7, text: 'Relevant', item: { key: 'docs/setup.html' } }]
  });
  const result = summarizeGeneration({
    httpStatus: 200, durationMs: 20,
    payload: { model: 'model-id', choices: [{ message: { content: [{ type: 'text', text: 'Answer' }] } }], chunks }
  });
  assert.deepEqual(result, {
    httpStatus: 200, durationMs: 20, answer: 'Answer', model: 'model-id', returnedChunkCount: 1,
    contextChunks: [{ id: 'chunk', score: 0.7, text: 'Relevant', item: { key: 'docs/setup.html' } }]
  });
  assert.equal(Object.hasOwn(result, 'usage'), false);
  assert.deepEqual(summarizeGeneration({
    httpStatus: 200, durationMs: 1, payload: { usage: { total_tokens: 9 } }
  }).usage, { total_tokens: 9 });
  assert.deepEqual(summarizeGeneration({
    httpStatus: 200, durationMs: 1, payload: { usage: { total_tokens: 9, detail: 'large unneeded value' } }
  }).usage, { total_tokens: 9 });
});

test('generation retains truncation signals and full chunk counts before clipping', () => {
  const result = summarizeGeneration({
    httpStatus: 200, durationMs: 1,
    payload: {
      choices: [{ finish_reason: 'length', message: { content: 'Incomplete answer' } }],
      chunks: Array.from({ length: 10 }, (_, index) => ({ id: String(index) }))
    }
  });
  assert.equal(result.finishReason, 'length');
  assert.equal(result.returnedChunkCount, 10);
  assert.equal(result.contextChunks.length, 8);
});

test('API requests use current namespace-scoped REST routes and never return credentials', async () => {
  const token = 'test-token-never-returned';
  let request;
  const call = await callAiSearch({
    accountId: 'account-id', apiToken: token, instance: 'chulapa-ai-search',
    namespace: 'default', phase: 'search', question: 'Question',
    fetchImpl: async (url, options) => {
      request = { url, options };
      return new Response(JSON.stringify({ query_kind: 'text', chunks: [] }), { status: 200 });
    }
  });
  assert.equal(request.url, 'https://api.cloudflare.com/client/v4/accounts/account-id/ai-search/namespaces/default/instances/chulapa-ai-search/search');
  assert.equal(request.options.headers.Authorization, `Bearer ${token}`);
  assert.deepEqual(JSON.parse(request.options.body), { messages: [{ role: 'user', content: 'Question' }] });
  assert.equal(JSON.stringify(call).includes(token), false);
  assert.equal(call.httpStatus, 200);
});

test('API failures preserve status and bounded structured errors without raw payloads', async () => {
  const token = 'secret-token';
  const call = await callAiSearch({
    accountId: 'account-id', apiToken: token, instance: 'chulapa-ai-search',
    namespace: 'default', phase: 'chat/completions', question: 'Question',
    fetchImpl: async () => new Response(JSON.stringify({
      errors: [{ code: 10000, message: `Invalid API token ${token}` }],
      diagnostics: 'do not store this large response'
    }), { status: 401 })
  });
  assert.equal(call.httpStatus, 401);
  assert.deepEqual(call.error, [{ code: 10000, message: 'Invalid API token [redacted]' }]);
  assert.equal(Object.hasOwn(call, 'payload'), false);
  assert.equal(JSON.stringify(call).includes(token), false);
});

test('network and invalid-JSON failures are explicit', async () => {
  const options = {
    accountId: 'account-id', apiToken: 'secret', instance: 'chulapa-ai-search',
    namespace: 'default', phase: 'search', question: 'Question'
  };
  const network = await callAiSearch({ ...options, fetchImpl: async () => { throw new Error('connection failed'); } });
  assert.equal(network.httpStatus, 0);
  assert.deepEqual(network.error, [{ message: 'connection failed' }]);

  const invalidJson = await callAiSearch({
    ...options,
    fetchImpl: async () => new Response('not json', { status: 200 })
  });
  assert.equal(invalidJson.httpStatus, 200);
  assert.deepEqual(invalidJson.error, [{ message: 'Response body was not valid JSON.' }]);
});
