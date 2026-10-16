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
  [/googlefonts|rubik|fuentes|fonts?|typograph/i, ['Changing fonts and highlighting', 'Appearance reference']],
  [/skin|autothemer|codeply|palette|color|rounded|sass/i, ['Palette precedence and custom skins', 'Variables dictionary', 'Changing skins and colors']],
  [/skins.*available|available.*skins|what skins|qu[eé].*skins/i, ['Available skins']],
  [/highlight|dracula|rouge|syntax/i, ['Syntax highlighting styles', 'Changing fonts and highlighting']],
  [/mp4|video|youtube|vimeo|thumbnail_url|fileurl|duration|nolazy/i, ['Adding videos']],
  [/photoswipe/i, ['PhotoSwipe galleries (development after v2.1.0)', 'Image galleries and carousels']],
  [/gallery|masonry|carousel|slideshow|galer[ií]a|carrusel/i, ['Image galleries and carousels']],
  [/math|equation|formula|toc|table of contents|sidebar|[ií]ndice.*contenido/i, ['Mathematical notation and tables of contents', 'Markdown formatting']],
  [/layout|minimal|archive|cloudtag|categor|related|random|indexcards|indexcategory|h.feed|microformat/i, ['More layouts and content navigation', 'Layout structure and include caching']],
  [/layout|minimal|archive|cloudtag|related|random|indexcards|indexcategory|rounded|enable.rounded|skin|font|feed|mathjax|label/i, ['Correct file and option scopes']],
  [/include.cached|include cache|inherit|herencia/i, ['Layout structure and include caching']],
  [/compress_html|indent|head.*readable|footer.*readable/i, ['Generated HTML formatting (development only)']],
  [/h.feed|microformat|inherit.*archive|hered.*archive/i, ['Inherited list microformats (development only)']],
  [/navbar|footer|menu|men[uú]|copyright|email/i, ['Navbar and footer']],
  [/canonical|robots|sitemap|seo|metadata|schema_image|og_|twitter/i, ['SEO controls', 'Page metadata and article images']],
  [/feed|rss|atom|suscri/i, ['Subscription feeds', 'Public RSS feed']],
  [/alert|caption|footnote|pie de foto|nota al pie/i, ['Alerts, captions and footnotes']],
  [/favicon|manifest/i, ['Favicons']],
  [/custom.head|custom.css|custom.scss|hook|before.*css|end.*body/i, ['Custom hooks']],
  [/markdown|kramdown|gfm|table|tabla/i, ['Markdown formatting']],
  [/locale|translate|date|fecha|idioma/i, ['Localized dates', 'Global settings']],
  [/mermaid|diagram/i, ['Mermaid and clipboard (development version after v2.1.0)']],
  [/accessib|keyboard|focus|motion|pwa|offline|performance|teclado/i, ['Accessibility and resource loading in development']],
  [/starter|portfolio|technical blog/i, ['Starter examples']],
  [/session|history|chatbot|conversaci[oó]n/i, ['Documentation assistant session state']],
  [/yaml.*error|error.*yaml/i, ['Diagnosing YAML']],
  [/post|article|page|image|imagen|p[aá]gina/i, ['Basic editing and publishing']]
];

export function selectContext(context, question) {
  const sections = splitSections(context);
  const scores = new Map();
  for (const [pattern, titles] of routes) {
    if (pattern.test(question)) for (const title of titles) scores.set(title, (scores.get(title) || 0) + 10);
  }
  // Parameter names and specific heading words help queries not covered by aliases.
  const words = [...new Set(question.toLowerCase().match(/[\p{L}\p{N}_-]{4,}/gu) || [])]
    .filter(word => !['with', 'that', 'this', 'does', 'have', 'from', 'what', 'where', 'which', 'page', 'site', 'chulapa'].includes(word));
  const providers = ['giscus', 'disqus', 'cactus', 'welcomments', 'cusdis'];
  const namedProviders = providers.filter(name => question.toLowerCase().includes(name));
  const ranked = sections.map((section, index) => ({ ...section, index,
    score: (scores.get(section.title) || 0) + words.reduce((score, word) => score +
      (section.title.toLowerCase().includes(word) ? 3 : 0) +
      (word.includes('_') && section.text.toLowerCase().includes(word) ? 2 : 0), 0)
  })).filter(section => section.score > 0 && (!namedProviders.length ||
    !providers.some(name => section.title.toLowerCase().startsWith(name)) ||
    namedProviders.some(name => section.title.toLowerCase().startsWith(name))))
    .sort((a, b) => b.score - a.score || a.index - b.index);
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

export function unsupportedCitations(answer, context) {
  const known = new Set((context.match(/https?:\/\/[^\s<>"'`]+/g) || []).map(url => url.replace(/[),.;]+$/, '')));
  const prose = answer.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  return [...prose.matchAll(/\[[^\]\n]*\]\((https?:\/\/[^\s)]+)\)/g)].map(match => match[1])
    .filter(url => !known.has(url));
}
