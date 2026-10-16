import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildSync } from 'esbuild';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('.', import.meta.url));
const read = name => readFileSync(directory + name, 'utf8');
const context = read('ai-context.md');
// Review additions instead of silently growing every inference request.
// Reviewed: retain the second tutorial source and complete page example; not a navigation increase.
const maxContextBytes = 47000;
const contextBytes = Buffer.byteLength(context, 'utf8');
if (contextBytes > maxContextBytes) {
  throw new Error(`Reviewed context is ${contextBytes} bytes; limit is ${maxContextBytes}. Consolidate facts or explicitly review the budget.`);
}
mkdirSync(directory + '.build', { recursive: true });
buildSync({ entryPoints: [directory + 'widget.js'], bundle: true, format: 'iife',
  platform: 'browser', target: 'es2020', minify: true,
  outfile: directory + '.build/widget.js', legalComments: 'inline', loader: { '.svg': 'text' } });
const content = `export const CONTEXT = ${JSON.stringify(context)};\nexport const WIDGET = ${JSON.stringify(read('.build/widget.js'))};\n`;
writeFileSync(directory + 'generated-content.mjs', content);
writeFileSync(directory + 'dashboard-worker.mjs', content + read('worker.mjs').replace(/^import .*;\r?\n/m, ''));
console.log(`Built dashboard-worker.mjs with ${contextBytes}/${maxContextBytes} context bytes.`);
