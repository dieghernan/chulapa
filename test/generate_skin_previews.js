// Documentation-only screenshots. Does not change palettes or contrast baselines.
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const sass = require('./browser/node_modules/sass');
const {chromium} = require('./browser/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');
const cache = path.join(os.tmpdir(), 'chulapa-preview-fonts');
const artifacts = process.env.CHULAPA_PREVIEW_OUTPUT;
const revision = '47d54ca1ebb14fd864695f1d39dc734f39017c33';
const template = fs.readFileSync(path.join(__dirname, 'fixtures/skin-preview.html'), 'utf8');
const variants = ['primary','secondary','success','info','warning','danger','light','dark'];
fs.mkdirSync(cache, {recursive:true});
if (artifacts) fs.mkdirSync(artifacts, {recursive:true});
function download(url) {
  const file = path.join(cache, require('node:crypto').createHash('sha256').update(url).digest('hex'));
  if (!fs.existsSync(file)) {
    const data = execFileSync('curl', ['-fsSL', '--retry', '2', '--max-time', '30', url], {stdio:['ignore','pipe','ignore'],maxBuffer:32*1024*1024});
    fs.writeFileSync(file, data);
  }
  return fs.readFileSync(file);
}
const loadedFonts = new Map();
function fontCSS(family) {
  if (loadedFonts.has(family)) return loadedFonts.get(family);
  let css = '';
  // Muli was renamed upstream; retain its original font rather than substitute Mulish.
  if (family === 'Muli') {
    for (const weight of [400,700]) {
      const data = download(`https://cdn.jsdelivr.net/npm/@fontsource/muli@4.1.0/files/muli-latin-${weight}-normal.woff2`);
      css += `@font-face{font-family:'Muli';font-weight:${weight};src:url(data:font/woff2;base64,${data.toString('base64')})}`;
    }
  } else {
    const slug = family.toLowerCase().replace(/[^a-z0-9]/g, '');
    let base, metadata;
    for (const license of ['ofl','apache','ufl']) {
      base = `https://raw.githubusercontent.com/google/fonts/${revision}/${license}/${slug}/`;
      try {metadata = download(base+'METADATA.pb').toString(); break;} catch {}
    }
    assert.ok(metadata, `Cannot load original font ${family}; refusing a fallback screenshot`);
    const faces = [...metadata.matchAll(/fonts \{([\s\S]*?)\n\}/g)]
      .map(m=>({style:m[1].match(/style: "([^"]+)"/)[1], weight:Number(m[1].match(/weight: (\d+)/)[1]), file:m[1].match(/filename: "([^"]+)"/)[1]}))
      .filter(f=>f.style==='normal');
    assert.ok(faces.length, `No normal face for ${family}`);
    const chosen = new Map();
    for (const weight of [400,700]) {
      const face = faces.find(f=>f.file.includes('[')) || faces.reduce((a,b)=>Math.abs(b.weight-weight)<Math.abs(a.weight-weight)?b:a);
      chosen.set(face.file, face);
    }
    for (const face of chosen.values()) {
      const data = download(base+encodeURIComponent(face.file));
      const weight = face.file.includes('[') ? '100 1000' : face.weight;
      css += `@font-face{font-family:'${family}';font-weight:${weight};src:url(data:font/ttf;base64,${data.toString('base64')})}`;
    }
  }
  loadedFonts.set(family, css);
  return css;
}
function prepareCSS(skin) {
  let css = sass.compileString(`@import "skins/${skin}";@import "bootstrap/bootstrap";@import "chulapa-master";`, {loadPaths:[root+'/_sass'],logger:{warn(){}}}).css;
  const families = new Set();
  for (const match of css.matchAll(/https:\/\/fonts\.googleapis\.com\/[^\s"')]+/g)) {
    const url = new URL(match[0]);
    for (const value of url.searchParams.getAll('family'))
      for (const family of value.split('|')) families.add(family.split(':')[0]);
  }
  css = css.replace(/^@import[^\n]+$/gm, '');
  css += [...families].map(fontCSS).join('\n');
  const brand = fs.readFileSync(root+'/assets/fonts/Chulapa/Chulapa-Bold_vmod.otf');
  return css+`@font-face{font-family:chulapa;src:url(data:font/otf;base64,${brand.toString('base64')})}`;
}
(async()=>{
 const browser = await chromium.launch({executablePath:process.env.CHULAPA_CHROMIUM,args:['--no-sandbox']});
 let temporary;
 try {
  if (check) temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'chulapa-preview-check-'));
  const page = await browser.newPage({deviceScaleFactor:1});
  await page.route('**/*', r=>r.request().url().startsWith('data:')?r.continue():r.abort());
  let count = 0;
  for (const file of fs.readdirSync(root+'/docs/collections/_skins').filter(f=>f.endsWith('.md')).sort()) {
    const source = fs.readFileSync(root+'/docs/collections/_skins/'+file, 'utf8');
    const id = source.match(/^skin: (.+)$/m)?.[1];
    if (!id) continue; // Current-site demo is not a selectable skin.
    const skin = file.slice(0,-3);
    const rawTitle = source.match(/^title: (.+)$/m)[1].replace(/^['"]|['"]$/g, '');
    // Parse markup as an inert document, then escape its text for the template.
    const title = await page.evaluate(value=>new DOMParser().parseFromString(value, 'text/html').body.textContent, rawTitle);
    const escape = s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
    const button = outline=>variants.map(v=>`<button class="btn btn-sm btn-${outline?'outline-':''}${v}" type="button">${v[0].toUpperCase()+v.slice(1)}</button>`).join('');
    const values = {title:escape(title),css:prepareCSS(skin),buttons:button(false),outlines:button(true)};
    const html = template.replace(/\{\{(title|css|buttons|outlines)\}\}/g, (_,key)=>values[key]);
    await page.setViewportSize({width:960,height:540});
    await page.setContent(html);
    await page.evaluate(()=>document.fonts.ready);
    const errors = await page.evaluate(()=>[...document.fonts].filter(f=>f.status==='error').map(f=>f.family));
    assert.deepEqual(errors, [], `${skin}: all sample fonts load`);
    if (artifacts) await page.screenshot({path:path.join(artifacts,`${skin}-960.png`)});
    assert.ok(await page.locator('.card').evaluate(el=>el.getBoundingClientRect().bottom<=540), `${skin}: card fits social preview`);
    assert.ok(await page.locator('.preview-buttons').last().evaluate(el=>el.getBoundingClientRect().bottom<=540), `${skin}: buttons fit social preview`);
    const target = root+'/docs/assets/img/skinspreview/'+skin;
    const candidate = check ? path.join(temporary, skin) : target;
    await page.screenshot({path:candidate+'.png'});
    execFileSync('python', ['-c', 'from PIL import Image; import sys; Image.open(sys.argv[1]+".png").save(sys.argv[1]+".webp", quality=85)', candidate]);
    execFileSync('python', [path.join(__dirname, 'verify_skin_previews.py'), target, candidate]);
    for (const width of [390,1280]) {
      await page.setViewportSize({width,height:900});
      assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth), `${skin}: no overflow at ${width}px`);
      if (artifacts) await page.screenshot({path:path.join(artifacts,`${skin}-${width}.png`),fullPage:true});
    }
    if (artifacts) fs.writeFileSync(path.join(artifacts,skin+'.html'), html);
    console.log(`${check?'Checked':'Generated'} ${skin}`);
    count++;
  }
  console.log(`${count} skin previews${check?' match committed PNG/WebP assets':''}; fonts loaded, complete framing and responsive reflow verified.`);
 } finally {
  await browser.close();
  if (temporary) fs.rmSync(temporary, {recursive:true,force:true});
 }
})().catch(error=>{console.error(error);process.exitCode=1;});
