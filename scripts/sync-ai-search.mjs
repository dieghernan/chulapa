import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import sanitizeHtml from 'sanitize-html';

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(path));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

export function createClient({ accountId, apiToken, instance = 'chulapa-ai-search', namespace = 'default', fetchImpl = fetch }) {
  if (!accountId || !apiToken) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required.');
  }
  const base = `https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai-search/namespaces/${encodeURIComponent(namespace)}/instances/${encodeURIComponent(instance)}`;
  return async (path, options = {}) => {
    let response;
    let body;
    try {
      response = await fetchImpl(base + path, {
        ...options,
        headers: { Authorization: `Bearer ${apiToken}`, ...options.headers },
        signal: AbortSignal.timeout(120000)
      });
      body = await response.json();
    } catch {
      throw new Error('Cloudflare request timed out, failed or returned invalid JSON.');
    }
    if (!response.ok || body?.success === false || !body || typeof body !== 'object') {
      const conflict = response.status === 409 ? ' No automatic deletion or retry was attempted.' : '';
      throw new Error(`Cloudflare request failed (${response.status}).${conflict}`);
    }
    return body;
  };
}

function resultOf(body) {
  return body?.result ?? body;
}

export async function listItems(cf) {
  const items = [];
  const ids = new Set();
  let expectedCount;
  let page = 1;

  while (true) {
    const body = await cf(`/items?source=builtin&page=${page}&per_page=50`);
    const result = resultOf(body);
    const batch = Array.isArray(result) ? result : result?.items;
    const info = body?.result_info || result?.result_info;
    if (!Array.isArray(batch) || !Number.isSafeInteger(info?.total_count) || info.total_count < 0) {
      throw new Error('Invalid item listing or missing pagination information; refusing to sync.');
    }
    expectedCount ??= info.total_count;
    if (info.total_count !== expectedCount) throw new Error('Item count changed during pagination; refusing to sync.');
    for (const item of batch) {
      if (!item || typeof item.id !== 'string' || !item.id || typeof item.key !== 'string' || !item.key || ids.has(item.id)) {
        throw new Error('Invalid or repeated item in listing; refusing to sync.');
      }
      ids.add(item.id);
      items.push(item);
    }
    if (items.length > expectedCount) throw new Error('Inconsistent item count; refusing to sync.');
    if (items.length === expectedCount) break;
    if (!batch.length) throw new Error('Incomplete item listing; refusing to sync.');

    page++;
  }

  return items;
}
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function metaContent(html, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`<meta\\b[^>]*\\bname=["']${escaped}["'][^>]*\\bcontent=["']([^"']*)["'][^>]*>`, 'i'),
    new RegExp(`<meta\\b[^>]*\\bcontent=["']([^"']*)["'][^>]*\\bname=["']${escaped}["'][^>]*>`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return '';
}

function canonicalUrl(html) {
  const patterns = [
    /<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']*)["'][^>]*>/i,
    /<link\b[^>]*\bhref=["']([^"']*)["'][^>]*\brel=["']canonical["'][^>]*>/i,
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return '';
}

function pageTitle(html) {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].trim() : '';
}

function isRedirect(html) {
  return /<meta\b[^>]*\bhttp-equiv=["']refresh["']/i.test(html) ||
    /\bnoindex\b/i.test(metaContent(html, 'robots'));
}

function extractClassElement(html, className) {
  const opening = /<([a-z][\w:-]*)\b[^>]*\bclass=["']([^"']*)["'][^>]*>/gi;
  let match;
  while ((match = opening.exec(html))) {
    if (!match[2].split(/\s+/).includes(className)) continue;

    const tag = match[1];
    const start = match.index;
    const tags = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
    tags.lastIndex = start;
    let depth = 0;
    let token;

    while ((token = tags.exec(html))) {
      if (/^<\//.test(token[0])) depth--;
      else if (!/\/>$/.test(token[0])) depth++;
      if (depth === 0) return html.slice(start, tags.lastIndex);
    }
  }
  return '';
}

export function cleanForIndex(html, key) {
  const content = extractClassElement(html, 'e-content');
  if (!content) throw new Error(`Could not find .e-content in ${key}.`);

  const cleaned = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.filter(
      tag => !['script', 'style', 'noscript'].includes(tag)
    ),
    allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
    disallowedTagsMode: 'discard',
    enforceHtmlBoundary: true
  });

  const title = pageTitle(html);
  const description = metaContent(html, 'description');
  const canonical = canonicalUrl(html);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${title ? `<title>${title}</title>` : ''}
${description ? `<meta name="description" content="${escapeHtml(description)}">` : ''}
${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">` : ''}
</head>
<body>
${cleaned}
</body>
</html>\n`;
}

async function upload(cf, key, cleaned) {
  const form = new FormData();
  form.append('file', new Blob([cleaned], { type: 'text/html; charset=utf-8' }), key);
  await cf('/items', { method: 'POST', body: form });
}

async function remove(cf, id) {
  await cf(`/items/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

export async function prepareDocuments(root) {
  const files = await htmlFiles(root);
  const keys = new Set(files.map(file => relative(root, file).split(sep).join('/')));
  for (const key of ['00-start.html', '01-install.html', '04-layouts.html']) {
    if (!keys.has(key)) throw new Error(`Incomplete documentation tree: missing ${key}.`);
  }
  const starter = await readFile(join(root, '00-start.html'), 'utf8');
  const canonical = new URL(canonicalUrl(starter));
  const prefix = canonical.pathname.slice(0, canonical.pathname.lastIndexOf('/') + 1);
  const sitemap = await readFile(join(root, '..', 'sitemap.xml'), 'utf8');
  if (!/<urlset\b/.test(sitemap) || !/<\/urlset>/.test(sitemap)) throw new Error('Invalid sitemap; refusing to sync.');
  const locations = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(match => new URL(match[1].replaceAll('&amp;', '&')));
  let expectedPages = 0;
  for (const url of locations) {
    if (url.origin !== canonical.origin || !url.pathname.startsWith(prefix)) continue;
    const path = decodeURIComponent(url.pathname.slice(prefix.length));
    const candidates = [path, `${path}.html`, `${path.replace(/\/$/, '')}/index.html`];
    if (!candidates.some(key => keys.has(key))) throw new Error(`Incomplete documentation tree: sitemap page ${path} is missing.`);
    expectedPages++;
  }
  if (!expectedPages) throw new Error('Sitemap contains no documentation pages; refusing to sync.');

  const documents = new Map();
  let skipped = 0;
  for (const file of files.sort()) {
    const key = relative(root, file).split(sep).join('/');
    if (key === 'tags.html') continue;
    const html = await readFile(file, 'utf8');
    if (isRedirect(html)) { skipped++; continue; }
    documents.set(key, cleanForIndex(html, key));
  }
  if (!documents.size) throw new Error('No indexable documentation found; refusing to sync.');
  return { documents, skipped };
}

export async function syncDocuments(root, { cf, prune = false, dryRun = false, log = console.log } = {}) {
  const { documents, skipped } = await prepareDocuments(root);
  if (dryRun) {
    log(`Validated ${documents.size} documents, ${skipped} redirects/noindex skipped; no remote requests. Pruning ${prune ? 'requested but not executed' : 'disabled'}.`);
    return { uploaded: 0, deleted: 0, skipped, validated: documents.size };
  }
  const existing = await listItems(cf);
  let uploaded = 0;
  let deleted = 0;
  for (const [key, cleaned] of documents) {
    await upload(cf, key, cleaned);
    uploaded++;
    log(`uploaded ${key}`);
  }
  if (prune) {
    for (const item of existing) {
      // Unknown legacy ownership is not sufficient permission to delete.
      if (item.source_id === 'builtin' && !documents.has(item.key)) {
        await remove(cf, item.id);
        deleted++;
        log(`deleted ${item.key}`);
      }
    }
  }
  log(`AI Search sync complete: ${uploaded} uploaded, ${skipped} redirects/noindex skipped, ${deleted} stale deleted. Indexing continues asynchronously.`);
  return { uploaded, deleted, skipped };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2);
    const flags = args.filter(arg => arg.startsWith('--'));
    const paths = args.filter(arg => !arg.startsWith('--'));
    if (paths.length > 1 || flags.some(flag => !['--prune', '--dry-run'].includes(flag))) {
      throw new Error('Usage: node scripts/sync-ai-search.mjs [docs/_site/docs] [--dry-run] [--prune]');
    }
    const dryRun = flags.includes('--dry-run');
    const cf = dryRun ? undefined : createClient({
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID, apiToken: process.env.CLOUDFLARE_API_TOKEN,
      instance: process.env.CLOUDFLARE_AI_SEARCH_INSTANCE, namespace: process.env.CLOUDFLARE_AI_SEARCH_NAMESPACE
    });
    await syncDocuments(paths[0] || 'docs/_site/docs', { cf, dryRun, prune: flags.includes('--prune') });
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
