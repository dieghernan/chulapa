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
    'format-alert-task-1': ['Alerts, captions and footnotes'],
    'search-comments-3': ['Algolia search'],
    'comments-giscus-setup-1': ['Giscus comments', 'Comments'],
    'reference-edge-cases-3': ['Correct file and option scopes', 'Changing fonts and highlighting'],
    'sharing-task-1': ['Page metadata and article images'],
    'custom-head-task-1': ['Custom hooks'],
    'troubleshoot-yaml-task-1': ['Diagnosing YAML'],
    'documentation-identity-topics': ['Bundled font', 'Font Awesome'],
    'content-toc-task-1': ['Markdown formatting'],
    'documentation-search-topics': ['SEO controls', 'Configuring site search']
  };
  for (const [id, required] of Object.entries(requirements)) {
    const selected = selectContext(context, cases.find(item => item.id === id).question);
    for (const title of required) assert.ok(selected.titles.includes(title), `${id}: ${title}`);
  }
  assert.match(selectContext(context, cases.find(item => item.id === 'appearance-skin-task-1').question).text, /Keep vars, highlight and other settings/);
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

test('information-box synonyms retrieve the complete alert syntax and source', () => {
  for (const question of ['How do I add an information box?', 'Quiero añadir un recuadro informativo', 'Una caja de información para mi post']) {
    const selected = selectContext(context, question);
    assert.ok(selected.titles.includes('Alerts, captions and footnotes'), question);
    assert.match(selected.text, /\{: \.alert \.alert-info \.p-3 \.mx-2 \.mb-3\}/);
    assert.ok(selected.text.split(/\r?\n/).includes(
      'Source: https://dieghernan.github.io/chulapa/docs/49-add-alert'
    ));
  }
});

test('provider comparisons retain alternatives while single-provider setup stays isolated', () => {
  const providerTitles = ['Giscus comments', 'Disqus comments', 'Cactus comments', 'Welcomments comments', 'Cusdis comments'];
  for (const question of ['What alternatives to Giscus are supported?', '¿Qué alternativas a Giscus hay?', 'Compare Giscus versus Disqus', 'How do comment providers differ?']) {
    const selected = selectContext(context, question);
    for (const title of providerTitles) assert.ok(selected.titles.includes(title), `${question}: ${title}`);
    assert.ok(Buffer.byteLength(selected.text) <= MAX_SELECTED_BYTES);
    assert.match(selected.text, /Upstream archived/);
  }
  const setup = selectContext(context, 'How do I configure Giscus?');
  assert.ok(setup.titles.includes('Giscus comments'));
  for (const title of providerTitles.slice(1)) assert.ok(!setup.titles.includes(title));
});


test('plain provider inventories include all provider choices and availability restrictions', () => {
  for (const question of ['Which comment provider can I use?', 'What commenting service is supported?', '¿Qué proveedor de comentarios puedo usar?', 'What comment providers are supported?', 'Which commenting services can I use?', 'List the supported comment systems', '¿Qué proveedores de comentarios están disponibles?', '¿Cuáles son los servicios de comentarios que puedo usar?']) {
    const selected = selectContext(context, question);
    for (const title of ['Giscus comments', 'Disqus comments', 'Cactus comments', 'Welcomments comments', 'Cusdis comments']) assert.ok(selected.titles.includes(title), `${question}: ${title}`);
    assert.match(selected.text, /Upstream archived; original hosting unavailable/);
    assert.ok(Buffer.byteLength(selected.text) <= MAX_SELECTED_BYTES);
  }
  const setup = selectContext(context, 'Which provider settings do I need for Giscus?');
  assert.ok(setup.titles.includes('Giscus comments'));
  assert.ok(!setup.titles.includes('Disqus comments'));
});


test('sidebar ranges select page-level guidance without the content TOC recipe', () => {
  const selected = selectContext(context, 'How do I add a sidebar TOC that includes h2 through h5?');
  assert.ok(selected.titles.includes('Mathematical notation and tables of contents'));
  assert.ok(!selected.titles.includes('Markdown formatting'));
  assert.match(selected.text, /show_sidetoc: true, h_min: 2, h_max: 5 in page front matter/);
  assert.match(selected.text, /kramdown.toc_levels does not control theme TOCs/);
  const content = selectContext(context, 'How do I make a Markdown TOC with kramdown GFM?');
  assert.ok(content.titles.includes('Markdown formatting'));
  assert.match(content.text, /\{:toc\}/);
});

test('task recipes retain exact paths and required setup', () => {
  const migration = selectContext(context, 'How do I migrate my existing site?');
  assert.match(migration.text, /_layouts\/, _includes\/ and assets\//);
  const gallery = selectContext(context, 'How do I make an internal masonry gallery sorted by filename?');
  assert.match(gallery.text, /path: "assets\/img\/gallery"/);
  assert.match(gallery.text, /image_col: gallery/);
  const alerts = selectContext(context, 'How do I add an info alert?');
  assert.match(alerts.text, /No snippets\/alert.html exists/);
  const font = selectContext(context, 'How do I use the Chulapa font on headings?');
  assert.match(font.text, /headings-font-family: "chulapa, sans-serif"/);
  assert.match(font.text, /ligature CSS alone does NOT select the font/);
});


test('navigation retains its complete child-list recipe and upgrade advice requires merging', () => {
  const navbar = selectContext(context, 'Show a minimal dual navbar configuration with a submenu and expansion at lg.');
  assert.match(navbar.text, /child:\n        - title: Installation/);
  const override = selectContext(context, 'Will upgrading the remote theme overwrite my own _includes/head.html?');
  assert.match(override.text, /Manually merge upstream head changes/);
  const video = selectContext(context, 'How do I embed a local MP4 video?');
  assert.match(video.text, /verify playback/);
});


test('search exclusion and heading omission preserve exact syntax and scope', () => {
  const search = selectContext(context, 'Where are guides for site search and excluding pages?');
  assert.match(search.text, /DOCUMENT FRONT MATTER .*NEVER nested under search/);
  const toc = selectContext(context, 'How do I insert a TOC inside an article and skip a heading?');
  assert.match(toc.text, /## Omitted heading\n\{:\.no_toc\}/);
});


test('HTML citations decode entities and compare complete browser URL attributes', () => {
  const known = 'https://dieghernan.github.io/chulapa/docs/45-custom-hooks';
  const bad = 'https://dieghernan.github.io/chulapa/docs/invented';
  for (const href of ['https&#58;//dieghernan.github.io/chulapa/docs/invented', 'https&colon;//dieghernan.github.io/chulapa/docs/invented', 'https&#x3a;//dieghernan.github.io/chulapa/docs/invented']) {
    assert.deepEqual(unsupportedCitations(`<a href="${href}">Source</a>`, known), [bad]);
    assert.deepEqual(unsupportedCitations(`<a href=${href}>Source</a>`, known), [bad]);
  }
  assert.deepEqual(unsupportedCitations('<a href="https&colon;//dieghernan.github.io/chulapa/docs/45-custom-hooks">Source</a>', known), []);
  assert.deepEqual(unsupportedCitations(`<a href="${known}&#34;invented">Source</a>`, known), [known + '%22invented']);
  assert.deepEqual(unsupportedCitations('```html\n<a href="https&colon;//example.org/">Example</a>\n```', known), []);
});
