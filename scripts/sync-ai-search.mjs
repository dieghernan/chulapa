import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

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
    const body = await cf(`/items?source=builtin&page=${page}&per_page=100`);
    const result = resultOf(body);
    const batch = Array.isArray(result) ? result : (result?.items || []);
    items.push(...batch);
    const info = body?.result_info || result?.result_info;
    if (!info || page >= (info.total_pages || 1)) break;
    page++;
  }
  return items;
}

async function upload(file, key) {
  const html = await readFile(file);
  const form = new FormData();
  form.append('file', new Blob([html], { type: 'text/html' }), key);
  await cf('/items', { method: 'POST', body: form });
}

async function remove(id) {
  await cf(`/items/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

const files = await htmlFiles(ROOT);
if (!files.length) throw new Error(`No HTML files found under ${ROOT}.`);

const wanted = new Map(files.map(file => [relative(ROOT, file).split(sep).join('/'), file]));
const existing = await listItems();
const builtin = new Map(existing
  .filter(item => !item.source || item.source === 'builtin')
  .map(item => [item.key || item.name, item]));

let uploaded = 0;
let deleted = 0;

// Uploading an existing key updates/replaces that built-in-storage document.
for (const [key, file] of wanted) {
  await upload(file, key);
  uploaded++;
  console.log(`uploaded ${key}`);
}

// Keep the instance aligned with the generated docs tree.
for (const [key, item] of builtin) {
  if (key && !wanted.has(key) && item.id) {
    await remove(item.id);
    deleted++;
    console.log(`deleted ${key}`);
  }
}

console.log(`AI Search sync complete: ${uploaded} uploaded, ${deleted} stale deleted.`);
