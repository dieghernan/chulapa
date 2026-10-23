// Reproduce the three-case tuning check without changing instance settings.
import { readFileSync, writeFileSync, appendFileSync } from 'node:fs';
import { callAiSearch, redactSecrets, selectCases, summarizeRetrieval, summarizeGeneration, validateRunName } from './ai-search-evaluation.mjs';

const directory = new URL('./', import.meta.url);
const groups = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json']
  .map(name => JSON.parse(readFileSync(new URL(name, directory), 'utf8')));
const selected = selectCases(groups, 'configuration-4,skin-font-failure-1,theme-selector-demo-1');
const run = validateRunName(process.argv[2] || 'ai-search-tuned-20261023');
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!accountId || !apiToken) throw new Error('Set Cloudflare credentials in the repository-root .env.');
const settings = JSON.parse(readFileSync(new URL('evaluations/ai-search-tuning-20261023.json', directory), 'utf8'));
const requestOptions = {
  model: '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  ai_search_options: { cache: { enabled: false } }
};
const output = new URL(`evaluations/${run}.jsonl`, directory);
writeFileSync(output, '', { flag: 'wx' });
for (const item of selected) {
  const phases = {};
  for (const phase of ['search', 'chat/completions']) {
    const call = await callAiSearch({
      accountId, apiToken, instance: settings.instance, namespace: settings.namespace,
      phase, question: item.question,
      fetchImpl: (url, init) => fetch(url, {
        ...init,
        body: JSON.stringify({
          ...JSON.parse(init.body),
          ai_search_options: requestOptions.ai_search_options,
          ...(phase === 'chat/completions' ? { model: requestOptions.model } : {})
        })
      })
    });
    phases[phase === 'search' ? 'retrieval' : 'generation'] = phase === 'search'
      ? summarizeRetrieval(call) : summarizeGeneration(call);
  }
  appendFileSync(output, JSON.stringify(redactSecrets({
    ...item, time: new Date().toISOString(), instance: settings.instance,
    namespace: settings.namespace, configuration: settings.changes, requestOptions, ...phases
  }, apiToken)) + '\n');
  console.log(`${item.id}: search ${phases.retrieval.httpStatus}, chat ${phases.generation.httpStatus}`);
  if ([0, 429, 503].some(status => [phases.retrieval.httpStatus, phases.generation.httpStatus].includes(status))) {
    console.log('Stopping smoke after an unavailable phase; partial evidence retained.');
    break;
  }
}
