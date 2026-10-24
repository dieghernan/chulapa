import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MAX_SELECTED_BYTES, selectContext, splitSections, unsupportedCitations } from './context-selector.mjs';

const context = readFileSync(new URL('./ai-context.md', import.meta.url), 'utf8');

test('focused SEO questions retain explicitly requested analytics and galleries', () => {
  const publisher = selectContext(context, 'How do I configure my publisher as a Person and enable GA4?');
  assert.ok(publisher.titles.includes('Publisher, analytics and icon configuration'));
  assert.ok(publisher.titles.includes('Google Analytics 4'));
  const gallery = selectContext(context, 'How do I configure og_image and a PhotoSwipe gallery?');
  assert.ok(gallery.titles.includes('Page metadata and article images'));
  assert.ok(gallery.titles.includes('PhotoSwipe galleries (v2.2.0)'));
  assert.ok(gallery.titles.includes('Image galleries and carousels'));
});

test('migration questions about custom fields retain the procedure and requested installation method', () => {
  for (const question of [
    'How do I migrate an existing site and keep my custom front matter fields?',
    '¿Cómo migrar un sitio existente conservando mis campos personalizados?'
  ]) {
    const selected = selectContext(context, question);
    assert.ok(selected.titles.includes('Migrating an existing Jekyll site'));
    assert.ok(selected.titles.includes('Remote-theme installation'));
    assert.ok(selected.titles.includes('Migration field mappings'));
  }
  const gem = selectContext(context, 'How do I migrate my existing site using the theme gem instead of a remote theme?');
  assert.ok(gem.titles.includes('Migrating an existing Jekyll site'));
  assert.ok(gem.titles.includes('Gem-theme installation'));
  assert.ok(!gem.titles.includes('Remote-theme installation'));
  assert.ok(Buffer.byteLength(gem.text, 'utf8') <= MAX_SELECTED_BYTES);
});

test('mixed feed and migration questions retain explicitly requested navigation and search', () => {
  for (const question of [
    'How do I add my RSS feed to the navbar?',
    '¿Cómo añado mi feed RSS al menú?'
  ]) {
    const selected = selectContext(context, question);
    assert.ok(selected.titles.includes('Subscription feeds'));
    assert.ok(selected.titles.includes('Navbar and footer'));
    assert.ok(Buffer.byteLength(selected.text, 'utf8') <= MAX_SELECTED_BYTES);
  }
  const migration = selectContext(context, 'How do I migrate to Chulapa and configure Lunr search?');
  assert.ok(migration.titles.includes('Migrating an existing Jekyll site'));
  assert.ok(migration.titles.includes('Configuring site search'));
  assert.match(migration.text, /search\.provider/);
  assert.ok(Buffer.byteLength(migration.text, 'utf8') <= MAX_SELECTED_BYTES);
});

test('feed selection and plugin coexistence retain both recipes when requested together', () => {
  for (const question of [
    'How do I enable all posts in the built-in feed while keeping jekyll-feed?',
    'How do I exclude one post from the built-in feed while keeping jekyll-feed?',
    '¿Cómo incluir todos los artículos en el feed manteniendo jekyll-feed?'
  ]) {
    const selected = selectContext(context, question);
    assert.ok(selected.titles.includes('Subscription feeds'));
    assert.ok(selected.titles.includes('Feed coexistence'));
    assert.match(selected.text, /type: posts/);
    assert.match(selected.text, /include_on_feed: true/);
    assert.match(selected.text, /include_on_feed: false/);
    assert.match(selected.text, /explicitly date collections/);
    assert.ok(Buffer.byteLength(selected.text, 'utf8') <= MAX_SELECTED_BYTES);
  }
  const coexistence = selectContext(context, 'Can I make jekyll-feed overwrite atom.xml, and will include_on_feed control the plugin?');
  assert.ok(coexistence.titles.includes('Feed coexistence'));
  assert.ok(!coexistence.titles.includes('Subscription feeds'));
});

test('header navigation selects complete page-level breadcrumbs/buttons without navbar recipes', () => {
  const selected = selectContext(context, 'How do I add breadcrumb links and a GitHub button in my page header?');
  assert.match(selected.text, /show_breadcrumb: true\nbreadcrumb_list:/);
  assert.match(selected.text, /project_links:\n  - \{url: "https:\/\/github.com\/a\/b", icon: fab fa-github, label: GitHub\}/);
  assert.match(selected.text, /project_links: page, not _config.yml root/);
  assert.ok(!selected.titles.includes('Navbar and footer'));
  const reading = selectContext(context, 'How do I configure reading speed and the numbered blog pagination window?');
  assert.match(reading.text, /words_per_minute default 200/);
  assert.match(reading.text, /paginator_maxnum default 3/);
  assert.match(reading.text, /does NOT enable pagination/);
  assert.ok(!reading.titles.includes('First-site tutorial'));
});

test('focused TOC recipes preserve article syntax and sidebar keyboard/version rules', () => {
  const content = selectContext(context, 'How do I insert a TOC inside an existing article, skip one heading, and show only levels 2 to 6? Does that configure the theme TOC?');
  assert.match(content.text, /\* Placeholder\n\{:toc\}/);
  assert.match(content.text, /\{:\.no_toc\}/);
  assert.match(content.text, /kramdown:\n  toc_levels: 2\.\.6/);
  assert.ok(!content.titles.includes('Basic editing and publishing'));
  const sidebar = selectContext(context, 'Con el TOC lateral cerrado, ¿sus enlaces siguen entrando en Tab? ¿Escape funciona? ¿Atrapa el foco al abrirse?');
  assert.ok(sidebar.titles.includes('Accessibility and resource loading in v2.2.0'));
  assert.match(sidebar.text, /Existing open-panel Tab order preserved/);
  assert.match(sidebar.text, /closed inert\/aria-hidden/);
  assert.ok(!sidebar.titles.includes('Markdown formatting'));
});

test('essential follow-up retains HTML title inspection and build versus link verification', () => {
  const title = selectContext(context, 'Can I set different browser, social and visible titles?');
  assert.match(title.text, /inspect HTML <title>, not a seo_title tag/);
  const feed = selectContext(context, 'How do I include all posts in the feed and exclude one?');
  assert.match(feed.text, /Opening the URL only verifies publication/);
  const migration = selectContext(context, 'How do I migrate my existing site?');
  assert.match(migration.text, /Preserve url\/baseurl\/permalink\/domain/);
});

test('feed tasks retain false overrides, date/collection boundaries and coexistence metadata', () => {
  const selected = selectContext(context, 'How do I include all posts in the built-in feed, exclude one, and include a standalone page?');
  assert.ok(selected.titles.includes('Subscription feeds'));
  assert.ok(!selected.titles.includes('Basic editing and publishing'));
  assert.match(selected.text, /include_on_feed: false in its front matter overrides true defaults/);
  assert.match(selected.text, /Standalone pages outside collections are NOT selected/);
  assert.match(selected.text, /explicitly date collections for Jekyll 3\/4 consistency/);
  assert.match(selected.text, /output: true inside that collection's existing _config.yml collections mapping/);
  const coexistence = selectContext(context, 'Can I make jekyll-feed overwrite atom.xml, and will include_on_feed control the plugin?');
  assert.match(coexistence.text, /Standard head still advertises built-in Atom\/RSS/);
  assert.match(coexistence.text, /include_on_feed controls theme feeds ONLY, never plugin selection/);
  assert.doesNotMatch(coexistence.text, /```yaml/);
});

test('migration lookup selects concrete field mappings without an unrelated SEO procedure', () => {
  const selected = selectContext(context, 'Where can I look up old toc/comments/search front matter equivalents without following the whole migration procedure? Does search: false exclude Algolia records?');
  assert.ok(selected.titles.includes('Migration field mappings'));
  assert.ok(!selected.titles.includes('SEO controls'));
  assert.ok(!selected.titles.includes('Migrating an existing Jekyll site'));
  assert.match(selected.text, /toc: true uses show_toc: true/);
  assert.match(selected.text, /comments: true uses show_comments: true/);
  assert.match(selected.text, /search: false uses include_on_search: false/);
  assert.match(selected.text, /algolia.files_to_exclude plus reupload/);
  assert.match(selected.text, /Explicit page front matter wins over defaults/);
});

test('feed and migration focus preserves Spanish, mixed canonical and microformat questions', () => {
  const spanish = selectContext(context, 'Mi feed Atom está vacío aunque hay artículos. ¿Qué compruebo?');
  assert.ok(spanish.titles.includes('Subscription feeds'));
  const mixed = selectContext(context, 'Does a canonical URL affect my feed links?');
  assert.ok(mixed.titles.includes('Subscription feeds'));
  assert.ok(mixed.titles.includes('Page metadata and article images'));
  const microformats = selectContext(context, 'How does inherited h-feed work?');
  assert.ok(microformats.titles.includes('Inherited list microformats (v2.2.0)'));
  const publicFeed = selectContext(context, 'What is your RSS feed URL?');
  assert.ok(publicFeed.titles.includes('Public RSS feed'));
});

test('full migration retains replacement layout and both feed selection and coexistence', () => {
  const selected = selectContext(context, 'I have layout: post and subscribers at /feed.xml. How do I migrate safely?');
  assert.ok(selected.titles.includes('Migrating an existing Jekyll site'));
  assert.ok(selected.titles.includes('Subscription feeds'));
  assert.ok(selected.titles.includes('Feed coexistence'));
  assert.match(selected.text, /Old layout: post is NOT a built-in layout/);
  assert.match(selected.text, /```yaml\nlayout: default\nheader_type: post\n```/);
  const collection = selectContext(context, 'My collection appears in atom.xml but its article returns 404.');
  assert.ok(collection.titles.includes('Subscription feeds'));
  assert.ok(!collection.titles.includes('Feed coexistence'));
  assert.match(collection.text, /Feed opt-in does not publish articles/);
});

test('SEO editing tasks retain independent controls and plain-path metadata recipes', () => {
  const visibility = selectContext(context, 'Can I hide my auxiliary page from crawlers, sitemap and local search just with noindex? What about Algolia?');
  assert.match(visibility.text, /robots: "noindex, follow"\nsitemap: false\ninclude_on_search: false/);
  assert.match(visibility.text, /reupload the index/);
  const sharing = selectContext(context, 'How do I set a post sharing image and article illustration without changing its visible heading?');
  assert.match(sharing.text, /og_image: \/assets\/img\/article.jpg\nog_image_alt: A street in Madrid at night\nschema_image: \/assets\/img\/article.jpg/);
  assert.match(sharing.text, /do not add header_img for metadata-only tasks/);
  const canonical = selectContext(context, 'How do I use a canonical URL for a republished article?');
  assert.match(canonical.text, /external originals supported/);
  for (const selected of [visibility, sharing, canonical]) {
    assert.ok(Buffer.byteLength(selected.text, 'utf8') <= MAX_SELECTED_BYTES);
  }
});

test('focused SEO selection excludes analytics contamination but preserves explicit combined scopes', () => {
  const canonical = selectContext(context, 'How do I use a canonical URL for a republished article? Does it change the sitemap?');
  assert.ok(canonical.titles.includes('Page metadata and article images'));
  assert.ok(!canonical.titles.includes('GoatCounter analytics (v2.2.0)'));
  assert.ok(!canonical.titles.includes('First-site tutorial'));
  const publisher = selectContext(context, 'How do I make my personal blog publisher a Person?');
  assert.ok(publisher.titles.includes('Publisher, analytics and icon configuration'));
  assert.ok(!publisher.titles.includes('Image galleries and carousels'));
  const combined = selectContext(context, 'How do canonical URLs affect GoatCounter analytics?');
  assert.ok(combined.titles.includes('GoatCounter analytics (v2.2.0)'));
  assert.ok(combined.titles.includes('Page metadata and article images'));
  const spanish = selectContext(context, '¿Cómo configuro una imagen para compartir en redes sociales sin cambiar la cabecera?');
  assert.ok(spanish.titles.includes('Page metadata and article images'));
});

test('light and dark selector questions receive activation, inheritance and version limits', () => {
  const selected = selectContext(context, 'How do I add the Light, Dark and Auto dropdown to my Chulapa site?');
  assert.ok(selected.titles.includes('Light/dark/auto selector'));
  assert.match(selected.text, /Omitted dark highlight inherits light, then default/);
  assert.match(selected.text, /Blank dark disables/);
  assert.match(selected.text, /2\.2\.0\+ only, not v2\.1\.0/);
});

const releaseRoutes = [
  ['¿Cómo agrego un diagrama?', 'Mermaid and clipboard (v2.2.0)', /Set mermaid: true/],
  ['How do I enable PhotoSwipe?', 'PhotoSwipe galleries (v2.2.0)', /photoswipe=true/],
  ['How do I enable GoatCounter?', 'GoatCounter analytics (v2.2.0)', /JEKYLL_ENV=production/],
  ['¿Cómo uso el teclado?', 'Accessibility and resource loading in v2.2.0', /Escape closes/],
  ['How does inherited h-feed work?', 'Inherited list microformats (v2.2.0)', /Keep the existing custom layout chain/],
  ['How do I configure compress_html?', 'Generated HTML formatting (v2.2.0)', /compress_html.blanklines: true/]
];

for (const [question, title, recipe] of releaseRoutes) {
  test(`release context retrieval: ${question}`, () => {
    const selected = selectContext(context, question);
    const section = splitSections(selected.text).find(item => item.title === title);
    assert.ok(section, `Missing context for ${question}: ${title}`);
    assert.match(section.text, recipe);
  });
}

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

test('high-risk configuration answers select explicit nesting, independence and defaults', () => {
  const autothemer = selectContext(context, 'How do I enable Autothemer using a purple primary color? Show YAML.');
  assert.match(autothemer.text, /chulapa-skin\.autothemer is a sibling of vars/);
  assert.match(autothemer.text, /primary belongs inside vars/);
  assert.match(autothemer.text, /Never nest autothemer inside vars/);
  assert.match(autothemer.text, /Preserve current skin unless asked/);
  const paletteExample = [...autothemer.text.matchAll(/```yaml\r?\n([\s\S]*?)```/g)]
    .map(match => match[1]).find(code => /autothemer: true/.test(code));
  assert.ok(paletteExample, 'Autothemer setup includes a complete YAML example');
  assert.match(paletteExample, /primary: "#800080"/);
  assert.doesNotMatch(paletteExample, /^\s*skin:/m, 'Enabling Autothemer must not replace the selected skin');
  assert.match(autothemer.text, /autothemer: true/);

  const analytics = selectContext(context, 'How do I enable Google Analytics 4? Should I set analytics_id too?');
  assert.match(analytics.text, /analytics_id is separate, retired Universal Analytics/);
  assert.match(analytics.text, /Both are independent and, when set, load both snippets; no conflict/);

  const publisher = selectContext(context, 'How do I make my personal blog publisher a Person?');
  assert.match(publisher.text, /default\/fallback is Organization/);
  assert.match(publisher.text, /Set type: Person explicitly in the existing mapping/);
});

test('skin answers retrieve valid nesting, release boundaries and original palette behavior', () => {
  const selector = selectContext(context, 'The component demo shows a theme selector, but I have not enabled dark mode. Does seeing that example activate it?');
  assert.ok(selector.titles.includes('Light/dark/auto selector'));
  assert.match(selector.text, /chulapa-skin-dark is a separate top-level mapping, never nested or scalar/);
  assert.match(selector.text, /chulapa-skin-dark:\n  skin: gitdev-dark/);
  assert.doesNotMatch(selector.text, /chulapa-skin:\s*Light/);

  const community = selectContext(context, 'How can I add the Light, Dark and Auto dropdown? Does it work in v2.1.0?');
  assert.match(community.text, /2\.2\.0\+ only, not v2\.1\.0/);
  assert.match(community.text, /chulapa-skin-dark is a separate top-level mapping/);

  const fonts = selectContext(context, 'Can I switch bundled skins if Google Fonts is blocked? Are CSS font imports removed?');
  assert.match(fonts.text, /Google Fonts failure falls back/);
  assert.match(fonts.text, /switching needs complete skin\/highlighter CSS/);
  assert.match(fonts.text, /completion marker/);

  const boot = selectContext(context, 'Can I use Cerulean, Litera or Pulse, and have their original Bootswatch colors been changed for AA?');
  assert.match(boot.text, /original Bootswatch 4\.6\.2 palettes\/typography\/components/);
  assert.match(boot.text, /Not included in AA adjustments/);

  const skin = selectContext(context, 'How do I change the current skin to journal and preserve my other settings?');
  assert.match(skin.text, /chulapa-skin:\n  skin: journal/);
  assert.doesNotMatch(skin.text, /```yaml\nskin: journal/);

  const auto = selectContext(context, 'How do I enable Autothemer using a purple primary color? Show YAML.');
  assert.match(auto.text, /chulapa-skin\.autothemer is a sibling of vars/);
  assert.match(auto.text, /autothemer: true/);
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
  assert.ok(inherited.titles.includes('Inherited list microformats (v2.2.0)'));
  assert.match(inherited.text, /Keep the existing custom layout chain/);
  assert.match(inherited.text, /and deprecated cloudtag2\/cloudcategory2 wrap h-entry items/);
  const formatting = selectContext(context, 'Can I keep head and footer readable with indentation?');
  assert.ok(formatting.titles.includes('Generated HTML formatting (v2.2.0)'));
  const section = splitSections(formatting.text).find(s => s.title === 'Generated HTML formatting (v2.2.0)');
  assert.match(section.text, /In v2.2.0:/);
  const caching = selectContext(context, 'Can I replace every include with include_cached?');
  assert.ok(caching.titles.includes('Layout structure and include caching'));
  assert.match(caching.text, /Pass every page-dependent input to include_cached/);
  assert.match(caching.text, /Dev caches fixed footer\/cloud entries/);
  const random = selectContext(context, 'My random article panel has only one eligible document.');
  assert.match(random.text, /singleton pool renders exactly one card/);
  const labels = selectContext(context, 'W3C says my Related posts h5 skips heading levels. Does Chulapa choose that heading?');
  assert.match(labels.text, /related_label\/random_label accept raw HTML rendered unchanged/);
  assert.match(labels.text, /Choose heading level by the section's place/);
});

test('content answers distinguish editing the starter sample from creating a new post', () => {
  const selected = selectContext(context, 'I have never used Jekyll. How do I add my first blog post using only GitHub in the browser?');
  assert.match(selected.text, /Code > Add file > Create new file/);
  assert.match(selected.text, /The first-site tutorial edits its sample; use this new-file workflow/);
  assert.match(selected.text, /15-create-post/);
});

test('cloud setup context separates post defaults from index-page collection scope', () => {
  const selected = selectContext(context, 'How do I connect post tag/category badges to grouped index pages on a project site?');
  assert.ok(selected.titles.includes('Tag/category cloud setup'));
  assert.match(selected.text, /type: posts/);
  assert.match(selected.text, /cloudtag_url: \/tags\//);
  assert.match(selected.text, /cloudcategory_url: \/categories\//);
  assert.match(selected.text, /include_collection: posts/);
  assert.match(selected.text, /#demo-topic/);
  assert.match(selected.text, /badges already linked to #demo while the cloud group was #dmo/);
  assert.match(selected.text, /no YAML change fixes fragments/);
  assert.match(selected.text, /v2.1.0 lacks this fix/);
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
  assert.match(selectContext(context, cases.find(item => item.id === 'appearance-skin-task-1').question).text, /preserve vars\/highlight/);
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
  for (const question of ['What commenting tools can I use?', 'Which commenting integrations are available?', '¿Qué herramientas de comentarios puedo usar?', '¿Qué integraciones de comentarios hay?', 'What can I use for commenting?', 'Which commenting platform can I use?', 'What commenting options are supported?', '¿Qué plataforma de comentarios puedo usar?', '¿Qué opciones de comentarios hay?', 'Which comment provider can I use?', 'What commenting service is supported?', '¿Qué proveedor de comentarios puedo usar?', 'What comment providers are supported?', 'Which commenting services can I use?', 'List the supported comment systems', '¿Qué proveedores de comentarios están disponibles?', '¿Cuáles son los servicios de comentarios que puedo usar?']) {
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


test('real links inside pre/code are checked while escaped code text is ignored', () => {
  const source = 'https://dieghernan.github.io/chulapa/docs/45-custom-hooks';
  const bad = 'https://dieghernan.github.io/chulapa/docs/invented';
  for (const tag of ['pre', 'code']) {
    assert.deepEqual(unsupportedCitations(`<${tag}><a href="${bad}">Source</a></${tag}>`, source), [bad]);
    assert.deepEqual(unsupportedCitations(`<${tag}><a href="${source}">Source</a></${tag}>`, source), []);
    assert.deepEqual(unsupportedCitations(`<${tag}>&lt;a href="${bad.replace("https:", "https&#58;")}"&gt;Example&lt;/a&gt;</${tag}>`, source), []);
  }
  assert.deepEqual(unsupportedCitations(`<pre>${bad}</pre>`, source), []);
  // GFM creates a real autolink inside inline raw code, so it must be checked.
  assert.deepEqual(unsupportedCitations(`<code>${bad}</code>`, source), [bad]);
});


test('common onboarding wording selects the first-site tutorial and template', () => {
  for (const question of ['How do I set up Chulapa?', 'How do I get started with Chulapa?', 'Getting started with Chulapa']) {
    const selected = selectContext(context, question);
    assert.ok(selected.titles.includes('First-site tutorial'), question);
    assert.match(selected.text, /https:\/\/github.com\/dieghernan\/chulapa-101\/generate/);
  }
});
