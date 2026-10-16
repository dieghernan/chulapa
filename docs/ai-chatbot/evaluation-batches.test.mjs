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
});
