import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as pause } from 'node:timers/promises';
import { callAiSearch, redactSecrets, selectCases, summarizeGeneration, summarizeRetrieval, validateRunName } from './ai-search-evaluation.mjs';

const directory = fileURLToPath(new URL('.', import.meta.url));
const caseGroups = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json']
  .map(name => JSON.parse(readFileSync(join(directory, name), 'utf8')));
const selected = selectCases(caseGroups, process.argv[3]);
const run = validateRunName(process.argv[2] || 'baseline');
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!accountId || !apiToken) {
  throw new Error('Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in the repository-root .env file.');
}

const instance = 'chulapa-ai-search';
const namespace = 'default';
const outputDirectory = join(directory, 'evaluations');
mkdirSync(outputDirectory, { recursive: true });
const output = join(outputDirectory, `${run}.jsonl`);
writeFileSync(output, '', { flag: 'wx' });

let batchStarted = 0;
for (let index = 0; index < selected.length; index++) {
  if (index % 4 === 0) {
    const wait = Math.max(0, 75000 - (Date.now() - batchStarted));
    if (wait) {
      console.log(`Cooling down ${Math.ceil(wait / 1000)}s`);
      await pause(wait);
    }
    batchStarted = Date.now();
    console.log(`Batch ${Math.floor(index / 4) + 1}: ${selected[index].section}`);
  }

  const item = selected[index];
  const retrieval = await callAiSearch({
    accountId, apiToken, instance, namespace, phase: 'search', question: item.question
  });
  const generation = await callAiSearch({
    accountId, apiToken, instance, namespace, phase: 'chat/completions', question: item.question
  });
  const record = redactSecrets({
    ...item,
    time: new Date().toISOString(),
    instance,
    namespace,
    retrieval: summarizeRetrieval(retrieval),
    generation: summarizeGeneration(generation)
  }, apiToken);
  appendFileSync(output, JSON.stringify(record) + '\n');
  console.log(
    `${index + 1}/${selected.length} ${item.id}: search ${retrieval.httpStatus}, ` +
    `chat ${generation.httpStatus} (${retrieval.durationMs + generation.durationMs}ms)`
  );

  if ([0, 429, 503].includes(retrieval.httpStatus) || [0, 429, 503].includes(generation.httpStatus)) {
    console.log('Backing off 75s after unavailable request');
    await pause(75000);
  }
}

console.log(`Results saved to ${output}`);
