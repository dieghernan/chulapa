import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { buildSync } from 'esbuild';
import { fileURLToPath } from 'node:url';
const directory = fileURLToPath(new URL('.', import.meta.url));
const read = name => readFileSync(directory + name, 'utf8');
const context = read('ai-context.md');
// Review additions instead of silently growing every inference request.
// Reviewed: provider isolation and explicit source recipes; per-request selection is capped at 18,000 bytes.
// Reviewed increase preserves complete navbar/gallery recipes and explicit upgrade checks.
// Per-request selected context remains capped at 18,000 UTF-8 bytes.
const maxContextBytes = 52500;
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
buildSync({ entryPoints: [directory + 'worker.mjs'], bundle: true, format: 'esm',
  platform: 'browser', target: 'es2022', outfile: directory + 'dashboard-worker.mjs' });
console.log(`Built dashboard-worker.mjs with ${contextBytes}/${maxContextBytes} context bytes.`);
