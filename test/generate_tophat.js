// Derive the integration files while retaining the upstream source verbatim.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const vendor = path.join(root, '_sass/vendor/tophat');
const manifest = require('../_sass/vendor/tophat/source.json');
function adapt(source, skin = "deeply") {
  const parts = source.split('@import "bootstrap";');
  assert.equal(parts.length, 2, 'Expected one upstream Bootstrap import');
  const stage = parts[0].indexOf('@import "functions";');
  const bootstrapVariables = skin === 'deeply' ? stage : parts[0].length;
  assert.ok(bootstrapVariables > 0, 'Expected the upstream Bootstrap variable stage');
  // Palette defaults permit Chulapa's retained colors and site overrides. Keep
  // later dark-variable assignments in their original order after Bootstrap vars.
  const palette = parts[0].slice(0, bootstrapVariables)
    .replace(/^@import url\([^\n]+\);\r?\n/gm, '')
    .replace(/^@import "(?:functions|variables)";\r?\n/gm, '')
    .replace(/^\$enable-grid-classes\s*:\s*false;\r?\n/gm, '')
    .replace(/^(\$[\w-]+\s*:[^\n;]+);$/gm, '$1 !default;');
  const variables = parts[0].slice(bootstrapVariables)
    .replace('@import "functions";', '@import "bootstrap/functions";')
    .replace('@import "variables";', '@import "bootstrap/variables";');
  const header = '// Generated from theme.scss by test/generate_tophat.js.\n// Fonts and the single Bootstrap grid are supplied by Chulapa.\n';
  return {'_variables.scss':header+palette+variables, '_styles.scss':header+'@mixin chulapa-tophat {\n'+(manifest.skins[skin].omitStyles ? '// '+manifest.skins[skin].omitStyles : parts[1].trim())+'\n}\n'};
}
if (require.main === module) {
  for (const skin of Object.keys(manifest.skins)) {
    const directory = path.join(vendor, skin);
    const files = adapt(fs.readFileSync(path.join(directory, 'theme.scss'), 'utf8'), skin);
    for (const [file, content] of Object.entries(files)) {
      if (process.argv.includes('--check')) assert.equal(fs.readFileSync(path.join(directory, file), 'utf8'), content, `${skin}/${file}: regenerate the adapter`);
      else fs.writeFileSync(path.join(directory, file), content);
    }
  }
  console.log('TopHat upstream adapters '+(process.argv.includes('--check')?'verified.':'generated.'));
}
module.exports = {adapt};
