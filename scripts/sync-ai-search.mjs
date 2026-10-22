import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import sanitizeHtml from 'sanitize-html';

const ROOT = process.argv[2] || 'docs/_site/docs';
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const INSTANCE = process.env.CLOUDFLARE_AI_SEARCH_INSTANCE || 'chulapa-ai-search';
const NAMESPACE = process.env.CLOUDFLARE_AI_SEARCH_NAMESPACE || 'default';

if (!ACCOUNT_ID || !API_TOKEN) {
  throw new Error('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required.');
}

const base = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai-search/namespaces/${NAMESPACE}/instances/${INSTANCE}`;
const auth = { Authorization: `Bearer ${API_TOKEN}` };

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

async function cf(path, options = {}) {
  const response = await fetch(base + path, {
    ...options,
    headers: { ...auth, ...options.headers },
  });
  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok || (body && body.success === false)) {
    throw new Error(`Cloudflare ${response.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

function resultOf(body) {
  return body?.result ?? body;
}

async function listItems() {
  const items = [];
  let page = 1;

  while (true) {
    const body = await cf(`/items?source=builtin&page=${page}`);
    const result = resultOf(body);
    const batch = Array.isArray(result) ? result : (result?.items || []);

    items.push(...batch);

    const info = body?.result_info || result?.result_info;
    if (!info) break;

    const totalCount = info.total_count ?? items.length;
    const perPage = info.per_page ?? batch.length;

    if (items.length >= totalCount || batch.length < perPage) break;

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
    /<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*\bnoindex\b/i.test(html);
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

function cleanForIndex(html, key) {
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

async function upload(file, key) {
  const html = await readFile(file, 'utf8');
  const cleaned = cleanForIndex(html, key);
  const form = new FormData();
  form.append('file', new Blob([cleaned], { type: 'text/html; charset=utf-8' }), key);
  await cf('/items', { method: 'POST', body: form });
}

async function remove(id) {
  await cf(`/items/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

const files = (await htmlFiles(ROOT))
  .filter(file => relative(ROOT, file).split(sep).join('/') !== 'tags.html');
if (!files.length) throw new Error(`No HTML files found under ${ROOT}.`);

const wanted = new Map();
let skipped = 0;
for (const file of files) {
  const key = relative(ROOT, file).split(sep).join('/');
  const html = await readFile(file, 'utf8');
  if (isRedirect(html)) {
    skipped++;
    console.log(`skipped redirect ${key}`);
    continue;
  }
  wanted.set(key, file);
}

const existing = await listItems();
const builtin = new Map(existing
  .filter(item => item.source_id === 'builtin' || item.source_id == null)
  .map(item => [item.key, item]));

let uploaded = 0;
let deleted = 0;

// Uploading an existing key updates/replaces that built-in-storage document.
for (const [key, file] of wanted) {
  await upload(file, key);
  uploaded++;
  console.log(`uploaded ${key}`);
}

// Keep the instance aligned with the generated docs tree. Redirects are intentionally
// absent from wanted, so previously indexed redirect pages are removed as stale.
for (const [key, item] of builtin) {
  if (key && !wanted.has(key) && item.id) {
    await remove(item.id);
    deleted++;
    console.log(`deleted ${key}`);
  }
}

console.log(`AI Search sync complete: ${uploaded} uploaded, ${skipped} redirects skipped, ${deleted} stale deleted.`);
