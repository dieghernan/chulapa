import { execFileSync } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

// Mask only string values in valid JSON-LD, preserving all other bytes.
function maskDates(json) {
  try { JSON.parse(json); } catch { return json; }
  const edits = [];
  for (const match of json.matchAll(/"(?:\\.|[^"\\])*"/g)) {
    const key = JSON.parse(match[0]);
    if (key !== 'datePublished' && key !== 'dateModified') continue;
    const end = match.index + match[0].length;
    const value = json.slice(end).match(/^(\s*:\s*)("(?:\\.|[^"\\])*")/);
    if (value) edits.push([end + value[1].length, end + value[0].length]);
  }
  for (const [start, end] of edits.reverse()) {
    json = json.slice(0, start) + '"[ignored-date]"' + json.slice(end);
  }
  return json;
}

export function normalizeHtml(html) {
  return html
    .replace(/(<!-- Page build )\d{4}-\d{2}-\d{2}( -->)/g, '$1[ignored-date]$2')
    .replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (script, attributes, body) => {
      if (!/(?:^|\s)type\s*=\s*(?:"application\/ld\+json"|'application\/ld\+json'|application\/ld\+json(?=\s|$))/i.test(attributes)) return script;
      return script.replace(body, () => maskDates(body));
    });
}

function htmlFiles(ref, cwd) {
  if (!ref) return new Map();
  return new Map(git(['ls-tree', '-r', '-z', ref], cwd).split('\0').filter(Boolean).flatMap(entry => {
    const tab = entry.indexOf('\t');
    const [mode, type, sha] = entry.slice(0, tab).split(' ');
    const path = entry.slice(tab + 1);
    return type === 'blob' && mode !== '120000' && path.endsWith('.html') ? [[path, sha]] : [];
  }));
}

export function changedPages(baseline, target, cwd) {
  const before = htmlFiles(baseline, cwd);
  const after = htmlFiles(target, cwd);
  const paths = [...new Set([...before.keys(), ...after.keys()])].sort();
  const changed = [];
  let ignored = 0;
  for (const path of paths) {
    if (before.get(path) === after.get(path)) continue;
    if (before.has(path) && after.has(path)) {
      const oldHtml = git(['cat-file', 'blob', before.get(path)], cwd);
      const newHtml = git(['cat-file', 'blob', after.get(path)], cwd);
      if (normalizeHtml(oldHtml) === normalizeHtml(newHtml)) {
        ignored++;
        continue;
      }
    }
    changed.push(path);
  }
  return { paths: changed, ignored };
}

function isAncestor(before, after, cwd) {
  try {
    git(['merge-base', '--is-ancestor', before, after], cwd);
    return true;
  } catch (error) {
    if (error.status === 1) return false;
    throw error;
  }
}

export function preparePlan({ sourceSha, repository, cwd = process.cwd() }) {
  if (!/^[a-f0-9]{40}$/i.test(sourceSha || '')) throw new Error('A full deployed source SHA is required.');
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository || '')) throw new Error('GITHUB_REPOSITORY is required.');
  const marker = `${repository}@${sourceSha}`;
  const candidates = git(['log', 'refs/remotes/origin/gh-pages', '--format=%H', '--fixed-strings', `--grep=${marker}`], cwd).trim().split('\n').filter(Boolean);
  const target = candidates.find(sha => git(['show', '-s', '--format=%B', sha], cwd).includes(marker));
  if (!target) throw new Error(`No gh-pages commit matches deployment ${sourceSha}; refusing a stale comparison.`);

  const stateRef = 'refs/remotes/origin/indexnow-state';
  const refs = git(['for-each-ref', '--format=%(refname)', stateRef], cwd).trim();
  const checkpoint = refs ? git(['rev-parse', stateRef], cwd).trim() : null;
  if (checkpoint && isAncestor(target, checkpoint, cwd)) {
    return { sourceSha, target, baseline: checkpoint, bootstrap: false, skip: true, paths: [], ignored: 0 };
  }
  if (checkpoint && !isAncestor(checkpoint, target, cwd)) {
    throw new Error('Checkpoint and deployment histories diverge; review indexnow-state before continuing.');
  }
  const parents = git(['rev-list', '--parents', '-n', '1', target], cwd).trim().split(' ');
  const baseline = checkpoint || parents[1] || null;
  return { sourceSha, target, baseline, bootstrap: !checkpoint, skip: false, ...changedPages(baseline, target, cwd) };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const plan = preparePlan({ sourceSha: process.env.INDEXNOW_SOURCE_SHA, repository: process.env.GITHUB_REPOSITORY });
  writeFileSync('indexnow-plan.json', JSON.stringify(plan, null, 2) + '\n');
  console.log(JSON.stringify(plan, null, 2));
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `target=${plan.target}\nskip=${plan.skip}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### IndexNow comparison\n\n- Deployment: \`${plan.target}\`\n- Baseline: \`${plan.baseline || 'empty site'}\`\n- First comparison: ${plan.bootstrap}\n- Already handled / older deployment: ${plan.skip}\n- Changed HTML URLs: ${plan.paths.length}\n- HTML files differing only in ignored dates: ${plan.ignored}\n- Dry run: ${process.env.INDEXNOW_DRY_RUN === 'true'}\n\nSee the plan artifact for paths.\n`);
  }
}
