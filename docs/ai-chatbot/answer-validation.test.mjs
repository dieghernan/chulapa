import test from 'node:test';
import assert from 'node:assert/strict';
import { answerViolations } from './answer-validation.mjs';

const task = 'How do I insert a TOC inside an article and skip one heading?';
const markdown = text => '```markdown\n' + text + '\n```';

test('rejects malformed heading exclusions in task examples without rewriting them', () => {
  const answer = markdown('## Heading\n{.no_toc}');
  assert.deepEqual(answerViolations(answer, task), ['invalid_heading_exclusion']);
  assert.ok(answer.includes('{.no_toc}'));
  assert.deepEqual(answerViolations('Use `{.no_toc}`.', task), ['invalid_heading_exclusion']);
  assert.deepEqual(answerViolations(markdown('## Heading\n{:.no_toc}'), task), []);
  assert.deepEqual(answerViolations(markdown('## Heading\n{: .no_toc}'), task), []);
});

test('preserves quoted invalid examples and syntax-analysis questions', () => {
  const bad = markdown('## Heading\n{.no_toc}');
  assert.deepEqual(answerViolations(bad, 'Why is {.no_toc} invalid in my article TOC?'), []);
  assert.deepEqual(answerViolations(bad, 'Explain the syntax error in a Markdown TOC.'), []);
  assert.deepEqual(answerViolations('> ```markdown\n> {.no_toc}\n> ```', task), []);
  assert.deepEqual(answerViolations(bad, 'What does this quotation mean?'), []);
});

test('checks nested list examples and the observed invalid inline YAML mapping', () => {
  assert.deepEqual(answerViolations('- Example:\n\n  ```markdown\n  {.no_toc}\n  ```', task), ['invalid_heading_exclusion']);
  assert.deepEqual(answerViolations('```yaml\nkramdown: toc_levels: 2..6\n```', task), ['invalid_toc_mapping']);
  assert.deepEqual(answerViolations('```yaml\nkramdown:\n  toc_levels: 2..6\n```', task), []);
});

test('guide discovery requires real prose sources rather than URLs inside examples', () => {
  const question = 'Where are the search guides and cards for excluding pages?';
  const tags = 'https://dieghernan.github.io/chulapa/docs/tags';
  const visibility = 'https://dieghernan.github.io/chulapa/docs/65-search-visibility';
  assert.deepEqual(answerViolations(`[Topics](${tags})`, question), ['missing_discovery_sources']);
  assert.deepEqual(answerViolations(`[Topics](${tags}) [Visibility](${visibility})`, question), []);
  assert.deepEqual(answerViolations(markdown(tags + '\n' + visibility), question), ['missing_discovery_sources']);
  assert.deepEqual(answerViolations(`<a href="${tags.replace('https:', 'https&colon;')}">Topics</a> [Visibility](${visibility})`, question), []);
  assert.deepEqual(answerViolations('Use show_related.', 'How do I configure related article cards?'), []);
});
