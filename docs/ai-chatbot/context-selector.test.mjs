import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MAX_SELECTED_BYTES, selectContext, splitSections, unsupportedCitations } from './context-selector.mjs';

const context = readFileSync(new URL('./ai-context.md', import.meta.url), 'utf8');

test('section extraction preserves headings inside fenced tutorial examples', () => {
  const sections = splitSections('intro\n## Tutorial\n```markdown\n## Inner heading\n```\n## Reference\nfields');
  assert.deepEqual(sections.map(section => section.title), ['', 'Tutorial', 'Reference']);
  assert.match(sections[1].text, /## Inner heading/);
});

test('giscus questions receive its complete setup without other providers credentials', () => {
  const selected = selectContext(context, 'How do I enable giscus comments on my posts?');
  assert.ok(selected.titles.includes('Giscus comments'));
  assert.match(selected.text, /paste its actual script/);
  assert.match(selected.text, /NEVER inside comments/);
  assert.ok(!selected.titles.includes('Welcomments comments'));
  assert.doesNotMatch(selected.text, /YOUR_WELCOMMENTS|comments\.website_id belongs ONLY/);
});

test('Spanish queries and scoped parameters retrieve the matching recipe', () => {
  assert.ok(selectContext(context, 'Mi sitio es https://ana.github.io/blog. ¿Qué pongo en url y baseurl?').text.includes('baseurl'));
  const algolia = selectContext(context, 'Where should I put my Algolia indexing key and search key?');
  assert.ok(algolia.titles.includes('Algolia search'));
  assert.match(algolia.text, /sibling of search/);
  assert.ok(selectContext(context, 'How do I disable rounded buttons?').titles.includes('Correct file and option scopes'));
});

test('all catalog questions stay within the input cap without cutting source sections', () => {
  const cases = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json']
    .flatMap(file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8')));
  const sections = splitSections(context);
  for (const item of cases) {
    const selected = selectContext(context, item.question);
    assert.ok(Buffer.byteLength(selected.text) <= MAX_SELECTED_BYTES, item.id);
    for (const title of selected.titles) assert.ok(selected.text.includes(sections.find(section => section.title === title).text), `${item.id}: ${title}`);
  }
});

test('citation checking rejects invented paths/fragments but leaves code examples alone', () => {
  const source = 'Source: https://dieghernan.github.io/chulapa/docs/55-check-theme-version';
  assert.deepEqual(unsupportedCitations('[Version](https://dieghernan.github.io/chulapa/docs/55-check-theme-version)', source), []);
  assert.deepEqual(unsupportedCitations('[Version](https://dieghernan.github.io/chulapa/docs/55-check-theme-version#invented)', source), ['https://dieghernan.github.io/chulapa/docs/55-check-theme-version#invented']);
  assert.deepEqual(unsupportedCitations('```markdown\n[Example](https://example.org/)\n```', source), []);
});

test('layout regressions retain their own release constraints and caller inputs', () => {
  const inherited = selectContext(context, 'My custom2 inherits custom1 which inherits archive. Will it still be h-feed?');
  assert.ok(inherited.titles.includes('Inherited list microformats (development only)'));
  assert.match(inherited.text, /Keep the existing custom layout chain/);
  const formatting = selectContext(context, 'Can I keep head and footer readable with indentation?');
  assert.ok(formatting.titles.includes('Generated HTML formatting (development only)'));
  const section = splitSections(formatting.text).find(s => s.title === 'Generated HTML formatting (development only)');
  assert.match(section.text, /After v2.1.0, unreleased/);
  const caching = selectContext(context, 'Can I replace every include with include_cached?');
  assert.match(caching.text, /Pass all page-dependent inputs/);
  const random = selectContext(context, 'My random article panel has only one eligible document.');
  assert.match(random.text, /singleton pool renders exactly one card/);
});

test('catalog questions select task sections when only a documented body value names the topic', () => {
  const cases = ['evaluation-cases.json', 'evaluation-extra-cases.json', 'evaluation-community-cases.json']
    .flatMap(file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8')));
  const requirements = {
    'appearance-skin-task-1': ['Changing skins and colors', 'Available skins'],
    'search-comments-3': ['Algolia search'],
    'comments-giscus-setup-1': ['Giscus comments', 'Comments'],
    'reference-edge-cases-3': ['Correct file and option scopes', 'Changing fonts and highlighting']
  };
  for (const [id, required] of Object.entries(requirements)) {
    const selected = selectContext(context, cases.find(item => item.id === id).question);
    for (const title of required) assert.ok(selected.titles.includes(title), `${id}: ${title}`);
  }
  assert.match(selectContext(context, cases.find(item => item.id === 'appearance-skin-task-1').question).text, /Preserve other entries/);
});

test('citation validation covers prose URL forms and ignores literal code examples', () => {
  const known = 'https://dieghernan.github.io/chulapa/docs/04-layouts';
  const bad = known + '#invented';
  const forms = url => [url + '.', `<${url}>`, `[Source](${url})`, `[Source][ref]\n\n[ref]: ${url}`, `<a href="${url}">Source</a>`, `**[Source](${url})**`];
  for (const answer of forms(bad)) assert.deepEqual(unsupportedCitations(answer, known), [bad], answer);
  for (const answer of forms(known)) assert.deepEqual(unsupportedCitations(answer, known), [], answer);
  assert.deepEqual(unsupportedCitations('````markdown\n```\n' + bad + '\n```\n````\n`' + bad + '`', known), []);
  const parentheses = 'https://example.org/a_(b)';
  assert.deepEqual(unsupportedCitations(`[Source](${parentheses})`, parentheses), []);
});
