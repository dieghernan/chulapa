import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluationPlan } from './evaluation-batches.mjs';

test('coverage separates unavailable, unreviewed, unexecuted and untested candidate cases', () => {
  const cases = ['one', 'two', 'three', 'four', 'five'].map(id => ({ id, doc: id + '.md' }));
  const records = [{ id: 'one', status: 200, result: { answer: 'Answer' } }, { id: 'two', status: 503 }];
  const plan = evaluationPlan(cases, records, [{ id: 'one', result: 'fail' }]);
  assert.deepEqual(plan.entries.map(item => item.baseline), ['answer_received', 'unavailable', 'no_completed_record', 'no_completed_record', 'no_completed_record']);
  assert.deepEqual(plan.baseline_pending_review, ['two']);
  assert.deepEqual(plan.baseline_unfinished_batches.flatMap(batch => batch.ids), ['three', 'four', 'five']);
  assert.deepEqual(plan.candidate_complete_batches.flatMap(batch => batch.ids), cases.map(item => item.id));
  assert.ok(plan.entries.every(item => item.candidate_live === 'not_run'));
});

test('invalid and repeated IDs cannot masquerade as coverage', () => {
  const cases = [{ id: 'one' }];
  assert.throws(() => evaluationPlan([...cases, ...cases], [], []), /Duplicate catalog/);
  assert.throws(() => evaluationPlan(cases, [{ id: 'unknown' }], []), /Unknown/);
  assert.throws(() => evaluationPlan(cases, [{ id: 'one' }, { id: 'one' }], []), /duplicate/);
  assert.throws(() => evaluationPlan(cases, [], [{ id: 'one', result: 'pass' }]), /Review without/);
  for (const result of ['pas', 'unavailable', undefined]) {
    assert.throws(() => evaluationPlan(cases, [{ id: 'one' }], [{ id: 'one', result }]), /Unknown baseline review result/);
  }
});

test('duplicate reviews are rejected regardless of order or agreement', () => {
  const cases = [{ id: 'one' }], records = [{ id: 'one', status: 200, result: { answer: 'Answer' } }];
  for (const results of [['pass', 'fail'], ['fail', 'pass'], ['pass', 'pass']]) {
    assert.throws(() => evaluationPlan(cases, records, results.map(result => ({ id: 'one', result }))), /Duplicate review ID/);
  }
  const candidate = { source_commit: 'source', records, reviews: [{ id: 'one', status: 'pass' }, { id: 'one', status: 'fail' }] };
  assert.throws(() => evaluationPlan(cases, [], [], 4, candidate), /Duplicate review ID/);
});

test('candidate evidence preserves passes and excludes completed requests from commands', () => {
  const cases = ['one', 'two', 'three', 'four'].map(id => ({ id }));
  const candidate = { source_commit: 'source', worker_version: 'version', review_path: 'review.json',
    records: [{ id: 'one', status: 200, result: { answer: 'Answer' } }, { id: 'two', status: 503 }],
    reviews: [{ id: 'one', status: 'pass' }] };
  const plan = evaluationPlan(cases, [], [], 4, candidate);
  assert.equal(plan.candidate_source, 'source');
  assert.equal(plan.worker_version, 'version');
  assert.equal(plan.entries[0].candidate_live, 'reviewed_pass');
  assert.deepEqual(plan.candidate_pending_review, ['two']);
  assert.equal(plan.candidate_remaining_count, 2);
  assert.match(plan.candidate_complete_batches[0].command, / three,four$/);
  assert.doesNotMatch(plan.candidate_complete_batches[0].command, /one|two/);
  assert.throws(() => evaluationPlan(cases, [], [], 4, { ...candidate, reviews: [{ id: 'two', status: 'pass' }] }), /without a candidate answer/);
});

test('CLI regeneration is repeatable and keeps revision-specific evidence', async () => {
  const { mkdtempSync, mkdirSync, copyFileSync, writeFileSync, readFileSync, rmSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join, resolve, dirname, basename } = await import('node:path');
  const { execFileSync } = await import('node:child_process');
  const directory = mkdtempSync(join(tmpdir(), 'chulapa-evaluation-'));
  try {
    copyFileSync(new URL('./evaluation-batches.mjs', import.meta.url), join(directory, 'evaluation-batches.mjs'));
    mkdirSync(join(directory, 'evaluations'));
    const save = (path, value) => writeFileSync(join(directory, path), JSON.stringify(value));
    save('evaluation-cases.json', [{ id: 'one' }, { id: 'two' }]);
    save('evaluation-extra-cases.json', []); save('evaluation-community-cases.json', []);
    writeFileSync(join(directory, 'evaluations/full-catalog-2026-10-16.jsonl'), JSON.stringify({ id: 'one', status: 200, result: { answer: 'Baseline' } }));
    save('evaluations/full-catalog-review-notes-2026-10-16.json', { reviews: [{ id: 'one', result: 'fail' }] });
    save('evaluations/candidate-evidence.json', { source_commit: 'source', worker_version: 'version', review_path: 'review.json' });
    save('evaluations/review.json', { source_commit: 'source', worker_version: 'version', raw: ['run.jsonl'], reviews: [{ id: 'one', status: 'pass' }] });
    writeFileSync(join(directory, 'evaluations/run.jsonl'), JSON.stringify({ id: 'one', status: 200, result: { answer: 'Candidate' } }));
    const run = () => execFileSync(process.execPath, [join(directory, 'evaluation-batches.mjs')], { stdio: 'pipe' });
    run();
    const output = join(directory, 'evaluations/pending-batches-2026-10-16.json');
    const first = readFileSync(output, 'utf8'); run();
    assert.equal(readFileSync(output, 'utf8'), first);
    assert.equal(JSON.parse(first).entries[0].candidate_live, 'reviewed_pass');
    assert.equal(JSON.parse(first).candidate_remaining_count, 1);
    assert.match(readFileSync(join(directory, 'evaluations/pending-batches-2026-10-16.md'), 'utf8'), /source.*version/);
    save('evaluations/candidate-evidence.json', { source_commit: 'other-source', worker_version: 'version', review_path: 'review.json' });
    assert.throws(run, /revision mismatch/);
    assert.equal(readFileSync(output, 'utf8'), first);
  } finally {
    assert.equal(dirname(resolve(directory)), resolve(tmpdir()));
    assert.ok(basename(directory).startsWith('chulapa-evaluation-'));
    rmSync(directory, { recursive: true, force: true });
  }
});
