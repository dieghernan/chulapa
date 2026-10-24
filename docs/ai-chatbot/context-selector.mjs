import { marked } from 'marked';
import { parseFragment } from 'parse5';

// Select whole source sections: never cut code fences or fetch visitor URLs.
const encoder = new TextEncoder();
export const MAX_SELECTED_BYTES = 18000;

export function splitSections(context) {
  const sections = [];
  let current = { title: '', text: '' };
  let fence = null;
  for (const line of context.split(/\r?\n/)) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length &&
        /^\s*(`+|~+)\s*$/.test(line)) fence = null;
    }
    if (!fence && /^## /.test(line)) {
      sections.push(current);
      current = { title: line.slice(3), text: '' };
    }
    current.text += line + '\n';
  }
  sections.push(current);
  return sections;
}

const routes = [
  [/baseurl|\burl\b|author|autor|site.*title|site.*name|nombre.*sitio/i, ['Global settings', 'Basic editing and publishing']],
  [/first|new.*site|start.*site|primer|empez|comenz|github pages|(?:set\s*up|get(?:ting)?\s+started).*chulapa/i, ['First-site tutorial']],
  [/photo walk|second.*tutorial|segundo.*tutorial/i, ['Second browser tutorial']],
  [/remote.theme|migrat|migrar/i, ['Remote-theme installation', 'Migrating an existing Jekyll site', 'Check theme version']],
  [/gem.based|theme gem|gema|gemfile|installed.*version|theme.*version|version.*theme|unreleased|unpinned|versi[oó]n/i, ['Check theme version', 'Gem-theme installation']],
  [/giscus/i, ['Giscus comments', 'Comments']],
  [/disqus/i, ['Disqus comments', 'Comments']],
  [/cactus|matrix/i, ['Cactus comments', 'Comments']],
  [/welcomments/i, ['Welcomments comments', 'Comments']],
  [/cusdis/i, ['Cusdis comments', 'Comments']],
  [/algolia/i, ['Algolia search', 'Configuring site search']],
  [/lunr|fuse|simplesearch|google.*search|busca|search/i, ['Configuring site search']],
  [/publisher|publicador/i, ['Publisher, analytics and icon configuration']],
  [/google analytics|analytics_id|gtag|ga4/i, ['Google Analytics 4']],
  [/goatcounter/i, ['GoatCounter analytics (v2.2.0)']],
  [/font awesome|fa_kit|fa5_|icono|icons?/i, ['Font Awesome', 'Publisher, analytics and icon configuration']],
  [/chulapa.*font|logo.*font|bundled.*font|ligatur|fuente.*chulapa/i, ['Bundled font']],
  [/dark mode|light.*dark|theme selector|dark.*skin/i, ['Light/dark/auto selector']],
  [/cerulean|litera|pulse|bootswatch/i, ['Available skins', 'Changing skins and colors']],
  [/googlefonts|rubik|fuentes|fonts?|typograph/i, ['Bundled font', 'Changing fonts and highlighting', 'Appearance reference']],
  [/skin|autothemer|codeply|palette|color|rounded|sass/i, ['Palette precedence and custom skins', 'Variables dictionary', 'Changing skins and colors']],
  [/skins.*available|available.*skins|what skins|qu[eé].*skins/i, ['Available skins']],
  [/highlight|dracula|rouge|syntax/i, ['Syntax highlighting styles', 'Changing fonts and highlighting']],
  [/mp4|video|youtube|vimeo|thumbnail_url|fileurl|duration|nolazy/i, ['Adding videos']],
  [/photoswipe/i, ['PhotoSwipe galleries (v2.2.0)', 'Image galleries and carousels']],
  [/gallery|masonry|carousel|slideshow|galer[ií]a|carrusel/i, ['Image galleries and carousels']],
  [/math|equation|formula|toc|table of contents|sidebar|[ií]ndice.*contenido/i, ['Mathematical notation and tables of contents']],
  [/(?:markdown|article|content|art[ií]culo).*(?:toc|table of contents)|(?:toc|table of contents).*(?:markdown|article|content|art[ií]culo)|kramdown|gfm/i, ['Markdown formatting']],
  [/related|random|eligible|singleton/i, ['Related and random article cards']],
  [/layout|minimal|archive|cloudtag|categor|related|random|indexcards|indexcategory|h.feed|microformat/i, ['More layouts and content navigation', 'Layout structure and include caching']],
  [/layout|minimal|archive|cloudtag|related|random|indexcards|indexcategory|rounded|enable.rounded|skin|font|feed|mathjax|label/i, ['Correct file and option scopes']],
  [/include.cached|include cache|inherit|herencia/i, ['Layout structure and include caching']],
  [/compress_html|indent|head.*readable|footer.*readable/i, ['Generated HTML formatting (v2.2.0)']],
  [/h.feed|microformat|inherit.*archive|hered.*archive/i, ['Inherited list microformats (v2.2.0)']],
  [/navbar|footer|menu|men[uú]|copyright|email/i, ['Navbar and footer']],
  [/canonical|robots|sitemap|seo|metadata|schema_image|og_|twitter|sharing.?image|article illustration|search.*(?:exclud|exclusion|visibility)|(?:exclud|exclusion).*search|excluding pages from results/i, ['SEO controls', 'Page metadata and article images']],
  [/feed|rss|atom|suscri/i, ['Subscription feeds', 'Public RSS feed']],
  [/jekyll.feed|feed\.xml|coexist|collis/i, ['Feed coexistence']],
  [/alert|information\s+box|info\s+box|caja\s+(?:de\s+)?informaci[oó]n|recuadro\s+informativo|caption|footnote|pie de foto|nota al pie/i, ['Alerts, captions and footnotes']],
  [/favicon|manifest/i, ['Favicons']],
  [/custom.head|custom.css|custom.scss|hook|before.*css|end.*body|meta.?tag|application.?name/i, ['Custom hooks']],
  [/markdown|kramdown|gfm|table|tabla/i, ['Markdown formatting']],
  [/locale|translate|date|fecha|idioma/i, ['Localized dates', 'Global settings']],
  [/mermaid|diagram/i, ['Mermaid and clipboard (v2.2.0)']],
  [/accessib|keyboard|focus|motion|pwa|offline|performance|teclado/i, ['Accessibility and resource loading in v2.2.0']],
  [/starter|portfolio|technical blog/i, ['Starter examples']],
  [/session|history|chatbot|conversaci[oó]n/i, ['Documentation assistant session state']],
  [/yaml.*(?:error|checker|setting)|(?:error|checker|setting).*yaml|setting.*does nothing|does nothing.*setting/i, ['Diagnosing YAML']],
  [/post|article|page|image|imagen|p[aá]gina/i, ['Basic editing and publishing']]
];

export function selectContext(context, question) {
  const sections = splitSections(context);
  // Focused SEO tasks should not inherit unrelated analytics/media recipes.
  // Combine scopes when the visitor asks about more than one SEO operation.
  const seoScope = new Set();
  if (/canonical|republish|republic|can[oó]nic/i.test(question)) seoScope.add('Page metadata and article images');
  if (/publisher|publicador/i.test(question)) seoScope.add('Publisher, analytics and icon configuration');
  if (/sharing.?image|social.*image|article illustration|imagen.*(?:social|compart)|og_image|schema_image/i.test(question)) seoScope.add('Page metadata and article images');
  if (/noindex|(?:hide|exclud|ocult|exclu).*(?:crawler|sitemap|local search|buscador)|(?:crawler|sitemap).*(?:hide|exclud|ocult|exclu)/i.test(question)) {
    seoScope.add('SEO controls');
    if (/search|busc|algolia/i.test(question)) seoScope.add('Configuring site search');
    if (/algolia/i.test(question)) seoScope.add('Algolia search');
  }
  const focusedSeo = seoScope.size > 0 && !/analytics|goatcounter|gtag|fa_kit|font awesome|rss|feeds?|shopping|carrito|browse|guides|documentation|gu[ií]as/i.test(question);
  const workflowScope = new Set();
  const migration = /migrat|migrar|migraci[oó]n/i.test(question);
  const mappingLookup = migration && /lookup|look up|equivalent|equivalen|mappings?|consultar|consulta.*tabla/i.test(question);
  const gemMigration = migration && /gem.based|theme gem|gema|gemfile/i.test(question);
  const subscription = /\bfeeds?\b|\batom\b|\brss\b|include_on_feed/i.test(question) && !/h-feed|microformat/i.test(question);
  if (mappingLookup) workflowScope.add('Migration field mappings');
  else if (migration) {
    workflowScope.add('Migrating an existing Jekyll site');
    workflowScope.add(gemMigration ? 'Gem-theme installation' : 'Remote-theme installation');
    workflowScope.add('Migration field mappings');
  }
  if (subscription) {
    const coexistence = /jekyll.feed|feed\.xml|overwrite|coexist|collis|sobrescrib/i.test(question);
    const feedSelection = /all\s+posts|todos\s+los\s+(?:posts|art[ií]culos)|(?:include|exclude|enable|select|incluir|excluir|activar|seleccionar).*(?:posts?|articles?|documents?|collection|art[ií]culos|documentos|colecci[oó]n)|(?:enable|configure|activar|configurar).*built.?in.*feed|(?:set|configure|configurar).*include_on_feed/i.test(question);
    workflowScope.add(coexistence ? 'Feed coexistence' : 'Subscription feeds');
    if (coexistence && (migration || feedSelection)) workflowScope.add('Subscription feeds');
    if (/your|this site|chulapa|latest|actual|[uú]ltim/i.test(question)) workflowScope.add('Public RSS feed');
  }
  const focusedWorkflow = workflowScope.size > 0 && !/analytics|goatcounter|font|skin|mermaid|photoswipe|microformat|h-feed|giscus|disqus|cactus|welcomments|cusdis|browse|documentation|guides|gu[ií]as/i.test(question);
  if (focusedWorkflow) for (const title of workflowScope) seoScope.add(title);
  const sidebarOnly = /sidebar|sidetoc|lateral/i.test(question) && !/markdown|kramdown|gfm|content.?toc/i.test(question);
  const navigationScope = new Set();
  if (/breadcrumb|project_links|header.*(?:github|button)|(?:github|button).*header|migas.*pan/i.test(question)) navigationScope.add('More layouts and content navigation');
  if (/words_per_minute|paginator_maxnum|reading speed|pagination window|velocidad.*lectura/i.test(question)) navigationScope.add('Additional navigation and community questions');
  if (!migration && /toc|table of contents|[ií]ndice.*contenido/i.test(question)) {
    navigationScope.add('Mathematical notation and tables of contents');
    if (!sidebarOnly) navigationScope.add('Markdown formatting');
    if (/keyboard|focus|escape|\btab\b|teclado|foco/i.test(question)) navigationScope.add('Accessibility and resource loading in v2.2.0');
  }
  const focusedNavigation = navigationScope.size > 0 && !/mermaid|photoswipe|carousel|galer|mathjax|fonts?|skins?|analytics|browse|documentation|guides|gu[ií]as/i.test(question);
  if (focusedNavigation) for (const title of navigationScope) seoScope.add(title);
  const focusedContext = focusedSeo || focusedWorkflow || focusedNavigation;
  seoScope.add('Global settings');
  // Broad routes also match incidental words such as "post", "feed" or an
  // old layout name. Preserve other explicitly routed topics in focused tasks.
  const workflowReferences = new Set([
    'Global settings', 'Basic editing and publishing', 'Correct file and option scopes',
    'More layouts and content navigation', 'Layout structure and include caching',
    'Remote-theme installation', 'Migrating an existing Jekyll site', 'Check theme version',
    'Subscription feeds', 'Public RSS feed', 'Feed coexistence',
    'SEO controls', 'Page metadata and article images'
  ]);
  const lookupReferences = new Set([
    'Configuring site search', 'Algolia search',
    'Mathematical notation and tables of contents', 'Markdown formatting'
  ]);
  const requestsSetup = /(?:set\s*up|configure|enable|add|insert|configur|activ|a[nñ]ad|insert)/i.test(question);
  const scores = new Map();
  for (const [pattern, titles] of routes) {
    if (!pattern.test(question)) continue;
    for (const title of titles) {
      scores.set(title, (scores.get(title) || 0) + 10);
      if (focusedContext && !workflowReferences.has(title) &&
          (!mappingLookup || !lookupReferences.has(title) || requestsSetup)) {
        seoScope.add(title);
      }
    }
  }
  if (/\bfonts?\b|\bfuentes?\b/i.test(question)) scores.set('Bundled font', (scores.get('Bundled font') || 0) + 20);
  if (/\bicons?\b|\biconos?\b/i.test(question)) scores.set('Font Awesome', (scores.get('Font Awesome') || 0) + 20);
  // Parameter names and specific heading words help queries not covered by aliases.
  const words = [...new Set(question.toLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) || [])]
    .filter(word => !['with', 'that', 'this', 'does', 'have', 'from', 'what', 'where', 'which', 'page', 'site', 'chulapa'].includes(word));
  const sectionWords = sections.map(section => new Set(section.text.toLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) || []));
  const frequency = new Map(words.map(word => [word, sectionWords.filter(tokens => tokens.has(word)).length]));
  const providers = ['giscus', 'disqus', 'cactus', 'welcomments', 'cusdis'];
  const namedProviders = providers.filter(name => question.toLowerCase().includes(name));
  // Generic comment choice/availability questions do not need a provider noun.
  const inventoriesProviders = namedProviders.length === 0 &&
    /comments?|commenting|comentarios?/i.test(question) &&
    /what|which|list|supported|available|choices|options|can.*use|qu[eé]|cu[aá]les|lista|disponib|soport|opciones/i.test(question);
  const comparesProviders = inventoriesProviders || namedProviders.length > 1 ||
    (/alternativ|compar|versus|\bvs\b|differ|diferenc|instead|en lugar/i.test(question) &&
      (namedProviders.length > 0 || /comments?|comentarios?|providers?|proveedores?/i.test(question)));
  if (comparesProviders) {
    scores.set('Comments', (scores.get('Comments') || 0) + 30);
    for (const provider of providers) {
      const title = sections.find(section => section.title.toLowerCase() === `${provider} comments`)?.title;
      if (title) scores.set(title, (scores.get(title) || 0) + 30);
    }
  }
  if (focusedContext) {
    for (const title of seoScope) scores.set(title, (scores.get(title) || 0) + 20);
  }
  const routedTitles = new Set(scores.keys());
  const ranked = sections.map((section, index) => ({ ...section, index,
    score: (scores.get(section.title) || 0) + words.reduce((score, word) => score +
      (section.title.toLowerCase().includes(word) ? 3 : 0) +
      (sectionWords[index].has(word) && frequency.get(word) <= Math.max(2, Math.floor(sections.length / 8)) ? 6 : 0), 0)
  })).filter(section => section.score > 0 && (!focusedContext || seoScope.has(section.title)) && (!sidebarOnly || section.title !== 'Markdown formatting') && (comparesProviders || !namedProviders.length ||
    !providers.some(name => section.title.toLowerCase().startsWith(name)) ||
    namedProviders.some(name => section.title.toLowerCase().startsWith(name))))
    .sort((a, b) => Number(routedTitles.has(b.title)) - Number(routedTitles.has(a.title)) ||
      b.score - a.score || a.index - b.index);
  const chosen = sections.filter(section => !section.title || ['Overview', 'Browse documentation topics'].includes(section.title));
  let bytes = encoder.encode(chosen.map(section => section.text).join('\n')).length;
  for (const section of ranked) {
    if (chosen.some(item => item.title === section.title)) continue;
    const size = encoder.encode('\n' + section.text).length;
    if (chosen.length >= 11 || bytes + size > MAX_SELECTED_BYTES) continue;
    chosen.push(section);
    bytes += size;
  }
  return { text: chosen.map(section => section.text).join('\n'), titles: chosen.map(section => section.title).filter(Boolean) };
}

function proseUrls(text) {
  return (text.match(/https?:\/\/[^\s<>"'`\]]+/gi) || []).map(url => {
    url = url.replace(/[.,;:!?]+$/, '');
    while (url.endsWith(')') && (url.match(/\)/g) || []).length > (url.match(/\(/g) || []).length) url = url.slice(0, -1);
    return url;
  });
}

export function answerSourceUrls(answer, { linksOnly = false } = {}) {
  // Inspect the same decoded HTML attributes a browser sees, including entities.
  const document = parseFragment(marked.parse(answer, { async: false }));
  const urls = [];
  function visit(node, codeText = false) {
    if (['script', 'style'].includes(node.tagName)) return;
    const literalText = codeText || ['code', 'pre'].includes(node.tagName);
    for (const attribute of node.attrs || []) {
      if (!['href', 'src'].includes(attribute.name)) continue;
      if (linksOnly && (node.tagName !== 'a' ||
          node.namespaceURI !== 'http://www.w3.org/1999/xhtml' || attribute.name !== 'href')) continue;
      try {
        const url = new URL(attribute.value);
        if (linksOnly && (url.origin !== 'https://dieghernan.github.io' ||
            !url.pathname.startsWith('/chulapa/') || url.username || url.password)) continue;
        if (['http:', 'https:'].includes(url.protocol)) urls.push(url.href);
      } catch { /* Relative/invalid attributes cannot pass the renderer's URL hook. */ }
    }
    if (node.nodeName === '#text' && !literalText && !linksOnly) urls.push(...proseUrls(node.value));
    for (const child of node.childNodes || []) visit(child, literalText);
  }
  visit(document);
  return [...new Set(urls)];
}

export function unsupportedCitations(answer, context) {
  const known = new Set(proseUrls(context));
  return answerSourceUrls(answer).filter(url => !known.has(url));
}
