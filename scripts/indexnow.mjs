import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export function pathToUrl(path, site) {
  path = path.replaceAll('\\', '/');
  if (!path.endsWith('.html')) return null;
  if (path.startsWith('/') || path.split('/').some(part => part === '..' || part === '.')) {
    throw new Error(`Invalid published path: ${path}`);
  }
  if (path === 'index.html') path = '';
  else if (path.endsWith('/index.html')) path = path.slice(0, -10);
  return `${site.replace(/\/+$/, '')}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

export async function submitPages(paths, {
  site, key, dryRun = false, fetchImpl = fetch, log = console.log,
} = {}) {
  if (!site) throw new Error('INDEXNOW_SITE is required.');
  if (!key) throw new Error('INDEXNOW_KEY is required.');
  const siteUrl = new URL(site);
  if (siteUrl.protocol !== 'https:' || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
    throw new Error('INDEXNOW_SITE must be an HTTPS site URL without credentials, query or fragment.');
  }
  const urls = [...new Set(paths.map(path => pathToUrl(path, site)).filter(Boolean))];
  log(`IndexNow: ${dryRun ? 'dry run; would submit' : 'selected'} ${urls.length} URL(s).`);
  for (const url of urls) log(`  ${url}`);
  if (dryRun || urls.length === 0) return urls;

  for (let i = 0; i < urls.length; i += 10000) {
    const urlList = urls.slice(i, i + 10000);
    const response = await fetchImpl('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      signal: AbortSignal.timeout(60000),
      body: JSON.stringify({ host: siteUrl.hostname, key, keyLocation: `${site.replace(/\/+$/, '')}/${key}.txt`, urlList }),
    });
    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow request failed (${response.status}): ${await response.text()}`);
    }
    log(`IndexNow: ${response.status} -- submitted ${urlList.length} URL(s).`);
  }
  return urls;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const dryRun = process.env.INDEXNOW_DRY_RUN === 'true' || args.includes('--dry-run');
  const planAt = args.indexOf('--plan');
  const paths = planAt === -1 ? args.filter(arg => arg !== '--dry-run') : JSON.parse(readFileSync(args[planAt + 1], 'utf8')).paths;
  await submitPages(paths, { site: process.env.INDEXNOW_SITE, key: process.env.INDEXNOW_KEY, dryRun });
}
