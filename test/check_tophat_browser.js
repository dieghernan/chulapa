const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const sass = require('./browser/node_modules/sass');
const {chromium} = require('./browser/node_modules/playwright');
const {adapt} = require('./generate_tophat');
const root = path.resolve(__dirname, '..');
const manifest = require('../_sass/vendor/tophat/source.json');
const digest = text=>crypto.createHash('sha256').update(text).digest('hex');
const compile = text=>sass.compileString(text, {loadPaths:[root+'/_sass'],logger:{warn(){}}}).css;
const navbar = /\.navbar-dark\.bg-primary\s*\{\s*background-color:\s*#111111\s*!important;\s*\}/g;
// Only the original navbar rule moves to after Bootstrap. Everything else must
// compile identically, including the retained accessibility corrections.
const canonical = css=>css.replace(/\/\*[\s\S]*?\*\//g, '').replace(navbar, '').replace(/\s+/g, ' ').trim();
const variants = ['primary','secondary','success','info','warning','danger','light','dark'];
const html = `<nav class="navbar navbar-dark bg-primary"><a class="navbar-brand" href="#">Original navbar</a></nav><nav class="navbar navbar-chulapa"><a class="navbar-brand" href="#">Chulapa navbar</a><a class="nav-link" href="#">Article</a></nav><section class="hero-chulapa"><h1>Deeply</h1><p>A place for your ideas</p></section><p>Body text <a href="#">and a link</a>.</p><blockquote>Quotation</blockquote><pre><code>const deeply = true;</code></pre>${variants.map(v=>`<div class="card bg-${v}"><div class="card-header">Header</div><div class="card-body"><p>Content</p><button class="btn btn-${v}">${v}</button><button class="btn btn-outline-${v}">Outline</button><button disabled class="btn btn-${v}">Disabled</button><span class="badge badge-${v}">Badge</span></div><div class="card-footer">Footer</div></div><div class="alert alert-${v}">Notice <a class="alert-link" href="#">Link</a></div><table class="table table-hover"><tbody><tr class="table-${v}"><td>Table content</td></tr></tbody></table>`).join('')}<input class="form-control" aria-label="Example"><ul class="pagination"><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#">2</a></li></ul>`;
const properties = ['color','backgroundColor','backgroundImage','borderTopColor','borderTopWidth','borderRadius','fontFamily','fontSize','fontWeight','lineHeight','boxShadow','textDecorationLine'];
(async()=>{
 assert.ok(fs.readFileSync(root+'/_sass/vendor/tophat/LICENSE','utf8').includes('MIT License'));
 const browser = await chromium.launch({executablePath:process.env.CHULAPA_CHROMIUM,args:['--no-sandbox']});
 try {
  const page = await browser.newPage();
  await page.route('**/*',r=>r.abort());
  const session = await page.context().newCDPSession(page);
  await session.send('DOM.enable'); await session.send('CSS.enable');
  let checks=0;
  for (const skin of Object.keys(manifest.skins)) {
   const directory = path.join(root, '_sass/vendor/tophat', skin);
   const original = fs.readFileSync(path.join(directory, 'theme.scss'), 'utf8');
   const legacy = fs.readFileSync(path.join(__dirname, 'fixtures/tophat-legacy', skin+'.scss'), 'utf8');
   assert.equal(digest(original), manifest.skins[skin].sha256, skin+': retain unmodified pinned source');
   for (const [file, expected] of Object.entries(adapt(original, skin))) assert.equal(fs.readFileSync(path.join(directory,file),'utf8'),expected,`${skin}/${file}: regenerate`);
   let skinChecks = 0;
  for (const autothemer of [false,true]) {
   const tail=(autothemer?'@import "chulapa/autothemer";':'')+'@import "bootstrap/bootstrap";@import "chulapa-master";';
   const before=compile(legacy+tail), after=compile(`@import "skins/${skin}";`+tail);
   assert.equal(digest(canonical(after)),digest(canonical(before)),skin+': preserve the entire CSS apart from original navbar rule placement');
   assert.equal((after.match(navbar)||[]).length,skin==='deeply'?1:0,'One upstream navbar rule only in Deeply');
   assert.equal((after.match(/\.row\s*\{/g)||[]).length,1,'One Bootstrap grid');
   for(const width of [390,1280]) {
    await page.setViewportSize({width,height:900});
    const snapshots=[];
    for(const css of [before,after]) {
     await page.setContent(`<style>${css.replace(/^@import[^\n]+$/gm,'')}*{transition:none!important}</style>${html}`);
     const {root:{nodeId}}=await session.send('DOM.getDocument');
     const {nodeIds}=await session.send('DOM.querySelectorAll',{nodeId,selector:'button,a,input,tr'});
     const states={};
     for(const state of ['normal','hover','focus','active']) {
      for(const id of nodeIds) await session.send('CSS.forcePseudoState',{nodeId:id,forcedPseudoClasses:state==='normal'?[]:state==='active'?['hover','active']:[state]});
      states[state]=await page.locator('body *').evaluateAll((elements,props)=>elements.map(el=>Object.fromEntries(props.map(p=>[p,getComputedStyle(el)[p]]))),properties);
     }
     snapshots.push(states);
    }
    assert.deepEqual(snapshots[1],snapshots[0],`${skin}/${width}/autothemer=${autothemer}: retain all rendered component states`);
    skinChecks+=Object.values(snapshots[0]).reduce((sum,els)=>sum+els.length,0);
   }
  }
  // The adapted palette remains usable with the theme's existing vars mechanism.
  const custom=compile(`$primary:#123456; $danger:#654321; @import "skins/${skin}";@import "bootstrap/bootstrap";@import "chulapa-master";`);
  await page.setContent(`<style>${custom.replace(/^@import[^\n]+$/gm,'')}</style><button class="btn btn-primary">Primary</button><button class="btn btn-danger">Danger</button>`);
  assert.deepEqual(await page.locator('button').evaluateAll(els=>els.map(el=>getComputedStyle(el).backgroundColor)),['rgb(18, 52, 86)','rgb(101, 67, 33)']);
   checks+=skinChecks;
   console.log(`${skin}: identical legacy CSS, ${skinChecks} rendered comparisons and palette overrides passed.`);
  }
  console.log(`TopHat: ${Object.keys(manifest.skins).length} skins, pinned sources/adapters, single grid and ${checks} component/state/viewport comparisons passed.`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
