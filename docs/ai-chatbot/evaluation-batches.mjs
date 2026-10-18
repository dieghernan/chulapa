import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function evaluationPlan(cases, records, reviews, size = 4, candidate = null) {
  if (!Number.isInteger(size) || size < 1 || size > 4) throw new Error('Batch size must be 1–4.');
  const ids = cases.map(item => item.id);
  if (new Set(ids).size !== ids.length) throw new Error('Duplicate catalog IDs.');
  const completed = new Map();
  for (const record of records) {
    if (!ids.includes(record.id) || completed.has(record.id)) throw new Error('Unknown or duplicate recorded ID.');
    completed.set(record.id, record);
  }
  function reviewMap(items, responses) {
    const result = new Map();
    for (const item of items) {
      if (result.has(item.id)) throw new Error('Duplicate review ID.');
      if (!responses.has(item.id)) throw new Error('Review without a recorded response.');
      result.set(item.id, item);
    }
    return result;
  }
  const hasAnswer = record => record.status === 200 && typeof record.result?.answer === 'string' && record.result.answer.trim().length > 0;
  const needsRequest = entry => ['not_run', 'reviewed_unavailable'].includes(entry.candidate_live);
  if (candidate && (typeof candidate.source_commit !== 'string' || !/^[a-z0-9-]+$/.test(candidate.source_commit))) throw new Error('Invalid candidate source for run name.');
  const assessed = reviewMap(reviews, completed);
  for (const review of assessed.values()) {
    if (!['pass', 'partial', 'fail'].includes(review.result)) throw new Error('Unknown baseline review result.');
    if (!hasAnswer(completed.get(review.id))) throw new Error('Baseline factual review without an answer-bearing 200 response.');
  }
  const candidateRecords = new Map();
  for (const record of candidate?.records || []) {
    if (!ids.includes(record.id) || candidateRecords.has(record.id)) throw new Error('Unknown or duplicate candidate recorded ID.');
    candidateRecords.set(record.id, record);
  }
  const candidateReviews = reviewMap(candidate?.reviews || [], candidateRecords);
  for (const [id, review] of candidateReviews) {
    if (!['pass', 'partial', 'fail', 'unavailable'].includes(review.status)) throw new Error('Unknown candidate review status.');
    const record = candidateRecords.get(id);
    if (review.status !== 'unavailable' && !hasAnswer(record)) throw new Error('Factual review without a candidate answer.');
  }
  const entries = cases.map(item => ({
    id: item.id, doc: item.doc,
    baseline: !completed.has(item.id) ? 'no_completed_record' :
      hasAnswer(completed.get(item.id)) ? 'answer_received' : 'unavailable',
    baseline_review: assessed.get(item.id)?.result || 'not_reviewed',
    candidate_live: candidateReviews.has(item.id) ? `reviewed_${candidateReviews.get(item.id).status}` :
      candidateRecords.has(item.id) ? 'recorded_not_reviewed' : 'not_run',
    ...(candidateRecords.has(item.id) ? { candidate_source: candidate.source_commit } : {})
  }));
  function batches(selected, prefix) {
    const result = [];
    for (let index = 0; index < selected.length; index += size) {
      const group = selected.slice(index, index + size);
      const subset = group.map(item => item.id);
      const pending = group.filter(needsRequest).map(item => item.id);
      const status = prefix === 'baseline-unfinished' ? 'no_completed_record' :
        group.every(item => item.candidate_live === 'reviewed_pass') ? 'reviewed_pass' :
        group.every(item => item.candidate_live === 'not_run') ? 'not_run' : pending.length ? 'needs_request' : 'needs_review';
      const name = `${prefix}-${String(result.length + 1).padStart(2, '0')}`;
      let runName = candidate ? `${name}-${candidate.source_commit}` : null;
      let attempt = 1;
      while (runName && candidate.used_run_names?.includes(runName)) runName = `${name}-${candidate.source_commit}-retry-${attempt++}`;
      result.push({ name, ids: subset, status, run_name: runName,
        command: prefix === 'baseline-unfinished' || !pending.length || !runName ? null : `node evaluate-live.mjs ${runName} ${pending.join(',')}` });
    }
    return result;
  }
  return {
    candidate_state: candidate ? 'deployed_reviewed' : 'local_not_deployed',
    ...(candidate ? { candidate_source: candidate.source_commit, worker_version: candidate.worker_version,
      latest_candidate_review: candidate.review_path } : {}),
    candidate_remaining_count: entries.filter(needsRequest).length,
    candidate_unavailable_count: entries.filter(item => item.candidate_live === 'reviewed_unavailable').length,
    candidate_pending_review: entries.filter(item => item.candidate_live === 'recorded_not_reviewed').map(item => item.id),
    note: 'Commands are plans only, not authorization or executed checks. No completed record does not prove a request was never initiated before interruption. Do not resume by appending a whole catalog to an existing raw log.',
    catalog_count: entries.length,
    baseline_record_count: records.length,
    baseline_review_count: reviews.length,
    entries,
    candidate_regression_batches: batches(entries.filter(item => ['fail', 'partial'].includes(item.baseline_review)), 'candidate-regression'),
    baseline_pending_review: entries.filter(item => item.baseline !== 'no_completed_record' && item.baseline_review === 'not_reviewed').map(item => item.id),
    baseline_unfinished_batches: batches(entries.filter(item => item.baseline === 'no_completed_record'), 'baseline-unfinished'),
    candidate_complete_batches: batches(entries, 'candidate-complete')
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const directory = fileURLToPath(new URL('.', import.meta.url));
  const read = path => JSON.parse(readFileSync(directory + path, 'utf8').replace(/^\uFEFF/, ''));
  const cases = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json'].flatMap(read);
  const records = readFileSync(directory + 'evaluations/full-catalog-2026-10-16.jsonl', 'utf8').trim().split('\n').map(line => JSON.parse(line));
  const manifest = read('evaluations/candidate-evidence.json');
  const review = read('evaluations/' + manifest.review_path);
  if (review.source_commit !== manifest.source_commit || review.worker_version !== manifest.worker_version) throw new Error('Candidate evidence revision mismatch.');
  const candidateRecords = review.raw.flatMap(path => readFileSync(directory + 'evaluations/' + path, 'utf8').trim().split('\n').map(line => JSON.parse(line)));
  const plan = evaluationPlan(cases, records, read('evaluations/full-catalog-review-notes-2026-10-16.json').reviews, 4,
    { ...manifest, records: candidateRecords, reviews: review.reviews,
      used_run_names: readdirSync(directory + 'evaluations').filter(path => path.endsWith('.jsonl')).map(path => path.slice(0, -6)) });
  writeFileSync(directory + 'evaluations/pending-batches-2026-10-16.json', JSON.stringify(plan, null, 2) + '\n');
  let text = '# Pending evaluation batches: 16 October 2026\n\n';
  text += `${plan.catalog_count} catalog cases; ${plan.baseline_record_count} recorded baseline responses; ${plan.baseline_review_count} reviewed. Evaluated source: ${plan.candidate_source}; Worker: ${plan.worker_version}. ${plan.entries.filter(item => item.candidate_live === 'reviewed_pass').length} reviewed passes; **${plan.candidate_remaining_count} cases need an initial request or a reviewed-unavailable retry**. These results belong to that evaluated revision, not later local changes. Evidence: [review](${plan.latest_candidate_review}).\n\n`;
  text += 'Each planned batch contains at most four independent questions. Commands run from docs/ai-chatbot and consume quota; none were executed to generate this plan. Generated run names include the candidate revision and skip existing run files. Verify the deployed revision first and preserve raw outputs. Unavailable results are retryable plans, not automatic quota-consuming retries. Recheck account allowance before any batch.\n\n';
  text += 'Do not execute all three lists: they overlap. Start with a small candidate-regression batch; expand only after reviewing it. The unfinished baseline list records coverage gaps, not a requirement to spend quota on the old revision. Candidate-complete is the eventual full matrix.\n\n';
  for (const [title, key] of [['Candidate regressions', 'candidate_regression_batches'], ['No completed baseline response', 'baseline_unfinished_batches'], ['Full candidate matrix', 'candidate_complete_batches']]) {
    text += `## ${title}\n\n| Batch | Case IDs | State |\n| --- | --- | --- |\n`;
    for (const batch of plan[key]) text += `| ${batch.name} | ${batch.ids.map(id => '`' + id + '`').join(', ')} | ${batch.status} |\n`;
    text += '\n';
  }
  text += `## Candidate responses pending review\n\n${plan.candidate_pending_review.join(', ') || 'None.'}\n\n`;
  text += `## Recorded but not reviewed\n\n${plan.baseline_pending_review.join(', ') || 'None.'}\n\nMachine-readable entries, source paths and proposed commands: [JSON register](pending-batches-2026-10-16.json).\n`;
  writeFileSync(directory + 'evaluations/pending-batches-2026-10-16.md', text);
  console.log(`Planned batches only: ${plan.catalog_count - records.length} cases without a completed baseline record; no remote calls.`);
}
