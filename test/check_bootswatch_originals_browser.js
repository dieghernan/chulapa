const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const assert = require('node:assert/strict');
const sass = require('./browser/node_modules/sass');
const { chromium } = require('./browser/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const vendor = path.join(root, '_sass/vendor/bootswatch');
const manifest = require('../_sass/vendor/bootswatch/source.json');
const variants = ['primary','secondary','success','info','warning','danger','light','dark'];
const compile = (source) => sass.compileString(source, {loadPaths:[root+'/_sass'], logger:{warn(){}}}).css.replace(/^@import[^\n]+$/gm, '');
const html = `<h1 data-key="heading" id="heading">Bootswatch originals</h1><p data-key="paragraph" id="paragraph">Readable articles and original typography.</p><nav class="navbar navbar-dark bg-primary"><a data-key="navbar-brand" class="navbar-brand" href="#">Brand</a></nav><div class="container">${variants.map(v=>`<button data-key="btn-${v}" class="btn btn-${v}">${v}</button><button data-key="outline-${v}" class="btn btn-outline-${v}">${v}</button><button disabled data-key="disabled-${v}" class="btn btn-${v}">${v}</button><span data-key="badge-${v}" class="badge badge-${v}">${v}</span><p data-key="alert-${v}" class="alert alert-${v}">Notice <a href="#">Link</a></p>`).join('')}<input data-key="input" class="form-control" aria-label="Example"><div data-key="progress" class="progress"><div class="progress-bar" style="width:60%"></div></div></div>`;
const properties = ['color','backgroundColor','backgroundImage','borderTopColor','borderTopWidth','borderRadius','fontFamily','fontSize','fontWeight','boxShadow','textShadow'];
(async()=>{
 const browser = await chromium.launch({executablePath:process.env.CHULAPA_CHROMIUM,args:['--no-sandbox']});
 const page = await browser.newPage();
 await page.route('**/*',r=>r.abort());
 const session = await page.context().newCDPSession(page);
 await session.send('DOM.enable'); await session.send('CSS.enable');
 let checks=0;
 try {
  for (const [skin, hashes] of Object.entries(manifest.skins)) {
   for (const [file, hash] of Object.entries(hashes))
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(vendor,skin,file))).digest('hex'),hash,`${skin}/${file}: unmodified upstream source`);
   const originalStyles = fs.readFileSync(path.join(vendor,skin,'_bootswatch.scss'),'utf8');
   let prefix='', styles=originalStyles;
   if(skin==='cerulean'){const split=styles.indexOf('// Navbar ');prefix=styles.slice(0,split);styles=styles.slice(split);}
   const expected=`// Bootswatch ${skin[0].toUpperCase()+skin.slice(1)} 4.6.2; original files retained under vendor/bootswatch.\n// Defer component styles until after the theme imports Bootstrap once.\n@import "../vendor/bootswatch/${skin}/variables";\n\n// Keep stock button choices when optional autothemer defaults are imported.\n$skin-button-labels: () !default;\n$skin-button-outlines: () !default;\n$skin-button-backgrounds: () !default;\n$yiq-contrasted-threshold: 150 !default; // Bootstrap's original fallback; Litera keeps 190.\n\n${prefix}@mixin chulapa-bootswatch {\n${styles}\n}\n`;
   assert.equal(fs.readFileSync(root+`/_sass/skins/${skin}.scss`,'utf8'),expected,`${skin}: preserve original rules in deferred wrapper`);
   const ref = compile(`@import "vendor/bootswatch/${skin}/variables"; @import "bootstrap/bootstrap"; @import "vendor/bootswatch/${skin}/bootswatch";`);
   const actual = compile(`@import "skins/${skin}"; @import "bootstrap/bootstrap"; @import "chulapa-master";`);
   assert.equal((actual.match(/\.row\s*\{/g)||[]).length,(ref.match(/\.row\s*\{/g)||[]).length,`${skin}: no second Bootstrap grid`);
   const auto = compile(`@import "skins/${skin}"; @import "skins/auto"; @import "bootstrap/bootstrap"; @import "chulapa-master";`);
   const previewPath=root+`/docs/assets/css/skins/${skin}.scss`;
   assert.ok(fs.readFileSync(previewPath,'utf8').includes(`@import "skins/${skin}";`),`${skin}: standalone catalog stylesheet`);
   assert.match(fs.readFileSync(root+`/docs/collections/_skins/${skin}.md`,'utf8'),new RegExp(`^skin: ${skin}$`,'m'));
   for(const ext of ['png','webp'])assert.ok(fs.statSync(root+`/docs/assets/img/skinspreview/${skin}.${ext}`).size>1000,`${skin}: catalog ${ext} image`);
   for (const width of [390,1280]) {
    await page.setViewportSize({width,height:900});
    const snapshots=[];
    for(const css of [ref,actual,auto]){
     await page.setContent(`<style>${css} *{transition:none!important}</style>${html}`);
     const {root:{nodeId}}=await session.send('DOM.getDocument');
     const {nodeIds}=await session.send('DOM.querySelectorAll',{nodeId,selector:'button,input'});
     const result={};
     for(const state of ['normal','hover','focus','active']){
      for(const id of nodeIds)await session.send('CSS.forcePseudoState',{nodeId:id,forcedPseudoClasses:state==='normal'?[]:state==='active'?['hover','active']:[state]});
      result[state]=await page.locator('[data-key]').evaluateAll((els,props)=>Object.fromEntries(els.map(el=>[el.dataset.key,Object.fromEntries(props.map(p=>[p,getComputedStyle(el)[p]]))])),properties);
     }
     snapshots.push(result);
    }
    for(const snapshot of snapshots.slice(1))for(const state of Object.keys(snapshots[0]))for(const key of Object.keys(snapshots[0][state])){
     assert.deepEqual(snapshot[state][key],snapshots[0][state][key],`${skin}/${width}/${state}/${key}: retain original component styling`);checks++;
    }
   }
   // Existing vars must still override originals, including on Cerulean gradients.
   const custom=compile(`@import "skins/${skin}"; $primary:#123456; @import "bootstrap/bootstrap"; @import "chulapa-master";`);
   await page.setContent(`<style>${custom}</style><button class="btn btn-primary">Primary</button>`);
   assert.equal(await page.locator('button').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(18, 52, 86)',`${skin}: preserve user vars`);
  }
  console.log(`${checks} original Bootswatch component/state/viewport comparisons passed; source hashes, single Bootstrap import and custom colors verified.`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
