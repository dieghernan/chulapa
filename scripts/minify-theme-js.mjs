import { readFile, writeFile } from 'node:fs/promises';
import { minify } from 'terser';

const files = ['chulapa_navigation', 'chulapa_script'];
const assets = new URL('../assets/js/', import.meta.url);
const check = process.argv.includes('--check');
const stale = [];

for (const name of files) {
  const source = await readFile(new URL(`${name}.js`, assets), 'utf8');
  const output = new URL(`${name}.min.js`, assets);
  // Classic scripts expose functions that other scripts and site overrides use.
  const { code } = await minify(source, { toplevel: false });
  const generated = `${code}\n`;
  if (check) {
    const existing = await readFile(output, 'utf8').catch(error => {
      if (error.code === 'ENOENT') return '';
      throw error;
    });
    if (existing.replaceAll('\r\n', '\n') !== generated) stale.push(`${name}.min.js`);
  } else {
    await writeFile(output, generated);
  }
}

if (stale.length) {
  console.error(`Run npm run build:theme-js to regenerate ${stale.join(', ')}.`);
  process.exitCode = 1;
}
