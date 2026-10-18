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
  [/first|new.*site|start.*site|primer|empez|comenz|github pages/i, ['First-site tutorial']],
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
  [/goatcounter/i, ['GoatCounter analytics (development after v2.1.0)']],
  [/font awesome|fa_kit|fa5_|icono|icons?/i, ['Font Awesome', 'Publisher, analytics and icon configuration']],
  [/chulapa.*font|logo.*font|bundled.*font|ligatur|fuente.*chulapa/i, ['Bundled font']],
  [/googlefonts|rubik|fuentes|fonts?|typograph/i, ['Bundled font', 'Changing fonts and highlighting', 'Appearance reference']],
  [/skin|autothemer|codeply|palette|color|rounded|sass/i, ['Palette precedence and custom skins', 'Variables dictionary', 'Changing skins and colors']],
  [/skins.*available|available.*skins|what skins|qu[eé].*skins/i, ['Available skins']],
  [/highlight|dracula|rouge|syntax/i, ['Syntax highlighting styles', 'Changing fonts and highlighting']],
  [/mp4|video|youtube|vimeo|thumbnail_url|fileurl|duration|nolazy/i, ['Adding videos']],
  [/photoswipe/i, ['PhotoSwipe galleries (development after v2.1.0)', 'Image galleries and carousels']],
  [/gallery|masonry|carousel|slideshow|galer[ií]a|carrusel/i, ['Image galleries and carousels']],
  [/math|equation|formula|toc|table of contents|sidebar|[ií]ndice.*contenido/i, ['Mathematical notation and tables of contents']],
  [/(?:markdown|article|content|art[ií]culo).*(?:toc|table of contents)|(?:toc|table of contents).*(?:markdown|article|content|art[ií]culo)|kramdown|gfm/i, ['Markdown formatting']],
  [/related|random|eligible|singleton/i, ['Related and random article cards']],
  [/layout|minimal|archive|cloudtag|categor|related|random|indexcards|indexcategory|h.feed|microformat/i, ['More layouts and content navigation', 'Layout structure and include caching']],
  [/layout|minimal|archive|cloudtag|related|random|indexcards|indexcategory|rounded|enable.rounded|skin|font|feed|mathjax|label/i, ['Correct file and option scopes']],
  [/include.cached|include cache|inherit|herencia/i, ['Layout structure and include caching']],
  [/compress_html|indent|head.*readable|footer.*readable/i, ['Generated HTML formatting (development only)']],
  [/h.feed|microformat|inherit.*archive|hered.*archive/i, ['Inherited list microformats (development only)']],
  [/navbar|footer|menu|men[uú]|copyright|email/i, ['Navbar and footer']],
  [/canonical|robots|sitemap|seo|metadata|schema_image|og_|twitter|sharing.?image|article illustration|search.*(?:exclud|exclusion|visibility)|(?:exclud|exclusion).*search|excluding pages from results/i, ['SEO controls', 'Page metadata and article images']],
  [/feed|rss|atom|suscri/i, ['Subscription feeds', 'Public RSS feed']],
  [/alert|information\s+box|info\s+box|caja\s+(?:de\s+)?informaci[oó]n|recuadro\s+informativo|caption|footnote|pie de foto|nota al pie/i, ['Alerts, captions and footnotes']],
  [/favicon|manifest/i, ['Favicons']],
  [/custom.head|custom.css|custom.scss|hook|before.*css|end.*body|meta.?tag|application.?name/i, ['Custom hooks']],
  [/markdown|kramdown|gfm|table|tabla/i, ['Markdown formatting']],
  [/locale|translate|date|fecha|idioma/i, ['Localized dates', 'Global settings']],
  [/mermaid|diagram/i, ['Mermaid and clipboard (development version after v2.1.0)']],
  [/accessib|keyboard|focus|motion|pwa|offline|performance|teclado/i, ['Accessibility and resource loading in development']],
  [/starter|portfolio|technical blog/i, ['Starter examples']],
  [/session|history|chatbot|conversaci[oó]n/i, ['Documentation assistant session state']],
  [/yaml.*(?:error|checker|setting)|(?:error|checker|setting).*yaml|setting.*does nothing|does nothing.*setting/i, ['Diagnosing YAML']],
  [/post|article|page|image|imagen|p[aá]gina/i, ['Basic editing and publishing']]
];

export function selectContext(context, question) {
  const sections = splitSections(context);
  const sidebarOnly = /sidebar|sidetoc|lateral/i.test(question) && !/markdown|kramdown|gfm|content.?toc/i.test(question);
  const scores = new Map();
  for (const [pattern, titles] of routes) {
    if (pattern.test(question)) for (const title of titles) scores.set(title, (scores.get(title) || 0) + 10);
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
  const inventoriesProviders = namedProviders.length === 0 &&
    /comments?|commenting|comentarios?/i.test(question) &&
    /providers?|services?|systems?|platforms?|options?|proveedor(?:es)?|servicios?|sistemas?|plataformas?|opci[oó]n(?:es)?/i.test(question) &&
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
  const routedTitles = new Set(scores.keys());
  const ranked = sections.map((section, index) => ({ ...section, index,
    score: (scores.get(section.title) || 0) + words.reduce((score, word) => score +
      (section.title.toLowerCase().includes(word) ? 3 : 0) +
      (sectionWords[index].has(word) && frequency.get(word) <= Math.max(2, Math.floor(sections.length / 8)) ? 6 : 0), 0)
  })).filter(section => section.score > 0 && (!sidebarOnly || section.title !== 'Markdown formatting') && (comparesProviders || !namedProviders.length ||
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

export function answerSourceUrls(answer) {
  // Inspect the same decoded HTML attributes a browser sees, including entities.
  const document = parseFragment(marked.parse(answer, { async: false }));
  const urls = [];
  function visit(node, codeText = false) {
    if (['script', 'style'].includes(node.tagName)) return;
    const literalText = codeText || ['code', 'pre'].includes(node.tagName);
    for (const attribute of node.attrs || []) {
      if (!['href', 'src'].includes(attribute.name)) continue;
      try {
        const url = new URL(attribute.value);
        if (['http:', 'https:'].includes(url.protocol)) urls.push(url.href);
      } catch { /* Relative/invalid attributes cannot pass the renderer's URL hook. */ }
    }
    if (node.nodeName === '#text' && !literalText) urls.push(...proseUrls(node.value));
    for (const child of node.childNodes || []) visit(child, literalText);
  }
  visit(document);
  return [...new Set(urls)];
}

export function unsupportedCitations(answer, context) {
  const known = new Set(proseUrls(context));
  return answerSourceUrls(answer).filter(url => !known.has(url));
}
