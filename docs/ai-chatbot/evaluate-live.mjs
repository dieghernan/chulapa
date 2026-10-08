import { readFileSync, appendFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { setTimeout as pause } from 'node:timers/promises';

const directory = fileURLToPath(new URL('.', import.meta.url));
const cases = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json'].flatMap(name =>
  JSON.parse(readFileSync(directory + name, 'utf8')));
const selected = process.argv[3] ? cases.filter(item => process.argv[3].split(',').includes(item.id)) : cases;
const run = process.argv[2] || 'baseline';
if (!/^[a-z0-9-]+$/.test(run)) throw new Error('Use a lowercase run name.');
mkdirSync(directory + 'evaluations', { recursive: true });
const output = directory + `evaluations/${run}.jsonl`;
let batchStarted = 0;
for (let index = 0; index < selected.length; index++) {
  if (index % 4 === 0) {
    const wait = Math.max(0, 75000 - (Date.now() - batchStarted));
    if (wait) { console.log(`Cooling down ${Math.ceil(wait / 1000)}s`); await pause(wait); }
    batchStarted = Date.now();
    console.log(`Batch ${Math.floor(index / 4) + 1}: ${selected[index].section}`);
  }
  const item = selected[index];
  const started = Date.now();
  let record;
  try {
    const response = await fetch('https://chulapa-ai-prototype.dieghernan.workers.dev/api/chat', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': 'ChulapaDocsValidation/1.0' },
      body: JSON.stringify({ message: item.question }), signal: AbortSignal.timeout(55000)
    });
    record = { ...item, time: new Date().toISOString(), status: response.status,
      cfRay: response.headers.get('cf-ray'), result: await response.json(), durationMs: Date.now() - started };
  } catch (error) {
    record = { ...item, time: new Date().toISOString(), status: 0, error: error.message, durationMs: Date.now() - started };
  }
  appendFileSync(output, JSON.stringify(record) + '\n');
  console.log(`${index + 1}/${selected.length} ${item.id}: ${record.status} (${Math.round(record.durationMs / 1000)}s)`);
  if ([429, 503, 0].includes(record.status)) { console.log('Backing off 75s after unavailable request'); await pause(75000); }
}
console.log(`Results saved to ${output}`);
