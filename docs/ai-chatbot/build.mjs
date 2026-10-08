import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildSync } from 'esbuild';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('.', import.meta.url));
const read = name => readFileSync(directory + name, 'utf8');
mkdirSync(directory + '.build', { recursive: true });
buildSync({ entryPoints: [directory + 'widget.js'], bundle: true, format: 'iife',
  platform: 'browser', target: 'es2020', minify: true,
  outfile: directory + '.build/widget.js', legalComments: 'inline' });
const content = `export const CONTEXT = ${JSON.stringify(read('ai-context.md'))};\nexport const WIDGET = ${JSON.stringify(read('.build/widget.js'))};\n`;
writeFileSync(directory + 'generated-content.mjs', content);
writeFileSync(directory + 'dashboard-worker.mjs', content + read('worker.mjs').replace(/^import .*;\r?\n/m, ''));
console.log('Built dashboard-worker.mjs from reviewed context and UI assets.');
