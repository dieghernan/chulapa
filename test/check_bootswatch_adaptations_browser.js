const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const sass = require('./browser/node_modules/sass');
const {chromium} = require('./browser/node_modules/playwright');
const {integration} = require('./generate_bootswatch');
const root = path.resolve(__dirname, '..');
const manifest = require('../_sass/vendor/bootswatch/source.json');
const digest = text=>crypto.createHash('sha256').update(text).digest('hex');
const compile = text=>sass.compileString(text, {loadPaths:[root+'/_sass'],logger:{warn(){}}}).css;
// Ignore comments and whitespace only. All adapted CSS must match the old skin
// with its redundant Bootstrap output removed; rendered states compare against
// the unmodified old skin as a separate check.
const canonical = css=>css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
const variants = ['primary','secondary','success','info','warning','danger','light','dark'];
const html = `<nav class="navbar navbar-dark bg-primary"><a class="navbar-brand" href="#">Original navbar</a></nav><nav class="navbar navbar-chulapa"><a class="navbar-brand" href="#">Chulapa navbar</a><a class="nav-link" href="#">Article</a></nav><section class="hero-chulapa"><h1>Bootswatch</h1><p>A place for your ideas</p></section><p>Body text <a href="#">and a link</a>.</p><blockquote>Quotation</blockquote><pre><code>const theme = true;</code></pre>${variants.map(v=>`<div class="card bg-${v}"><div class="card-header">Header</div><div class="card-body"><p>Content</p><button class="btn btn-${v}">${v}</button><button class="btn btn-outline-${v}">Outline</button><button disabled class="btn btn-${v}">Disabled</button><span class="badge badge-${v}">Badge</span></div><div class="card-footer">Footer</div></div><div class="alert alert-${v}">Notice <a class="alert-link" href="#">Link</a></div><table class="table table-hover"><tbody><tr class="table-${v}"><td>Table content</td></tr></tbody></table>`).join('')}<input class="form-control" aria-label="Example"><ul class="pagination"><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#">2</a></li></ul>`;
const properties = ['color','backgroundColor','backgroundImage','borderTopColor','borderTopWidth','borderRadius','fontFamily','fontSize','fontWeight','lineHeight','boxShadow','textDecorationLine'];
(async()=>{
 assert.ok(fs.readFileSync(root+'/_sass/vendor/bootswatch/LICENSE','utf8').includes('MIT License'));
 const browser = await chromium.launch({executablePath:process.env.CHULAPA_CHROMIUM,args:['--no-sandbox']});
 try {
  const page = await browser.newPage();
  await page.route('**/*',r=>r.abort());
  const session = await page.context().newCDPSession(page);
  await session.send('DOM.enable'); await session.send('CSS.enable');
  let checks=0;
  for (const skin of manifest.adaptations) {
   const legacy = fs.readFileSync(path.join(__dirname, 'fixtures/bootswatch-legacy', skin+'.scss'), 'utf8');
   assert.equal(fs.readFileSync(root+'/_sass/chulapa/skins/bootswatch/_'+skin+'.scss','utf8'), integration(skin));
   let skinChecks = 0;
  for (const autothemer of [false,true]) {
   const tail=(autothemer?'@import "chulapa/autothemer";':'')+'@import "bootstrap/bootstrap";@import "chulapa-master";';
   const before=compile(legacy+tail), after=compile(`@import "skins/${skin}";`+tail);
   const deduplicated = legacy.replace('@import "bootstrap/bootstrap";', '@import "bootstrap/functions";@import "bootstrap/variables";@import "bootstrap/mixins";');
   assert.equal(digest(canonical(after)),digest(canonical(compile(deduplicated+tail))),skin+': preserve all CSS apart from redundant Bootstrap output');
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
  // Preserve existing customization semantics, including skins that resolve
  // theme-colors early or assign palette variables unconditionally.
  for (const placement of ['before','after']) {
   const overrides = '$primary:#123456; $danger:#654321;';
   const colors = [];
   for (const skinSource of [legacy, `@import "skins/${skin}";`]) {
    const source = placement==='before' ? overrides+skinSource : skinSource+overrides;
    const custom = compile(source+'@import "bootstrap/bootstrap";@import "chulapa-master";');
    await page.setContent(`<style>${custom.replace(/^@import[^\n]+$/gm,'')}</style><button class="btn btn-primary">Primary</button><button class="btn btn-danger">Danger</button>`);
    colors.push(await page.locator('button').evaluateAll(els=>els.map(el=>getComputedStyle(el).backgroundColor)));
   }
   assert.deepEqual(colors[1],colors[0],`${skin}: retain palette customization ${placement} the import`);
  }
   checks+=skinChecks;
   console.log(`${skin}: preserved legacy cascade, ${skinChecks} rendered comparisons and palette overrides passed.`);
  }
  console.log(`Bootswatch adaptations: ${manifest.adaptations.length} skins, pinned sources/adapters, single grid and ${checks} component/state/viewport comparisons passed.`);
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
