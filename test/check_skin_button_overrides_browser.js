const fs = require('fs');
const path = require('path');
const assert = require('node:assert/strict');
const sass = require('./browser/node_modules/sass');
const { chromium } = require('./browser/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const sassRoot = process.env.CHULAPA_SASS_ROOT || root + '/_sass';
const colors = ['primary','secondary','success','info','warning','danger','light','dark'];
const fillImport = fs.existsSync(sassRoot+'/chulapa/_autothemer.scss') ? 'chulapa/autothemer' : 'skins/auto';
const compile = s => sass.compileString(s,{loadPaths:[sassRoot],logger:{warn(){}}}).css;
const disabledCorrections = '$skin-button-palette: (); $skin-button-backgrounds: (); $skin-button-labels: (); $skin-button-outlines: (); $skin-button-lighter-states: ();';
const source = (skin, vars, fill, disabled=false) => `@import "skins/${skin}"; ${vars} ${fill ? `@import "${fillImport}";` : ''} ${disabled ? disabledCorrections : ''} @import "bootstrap/bootstrap"; @import "chulapa-master";`;
(async()=>{
 let compiledChecks=0;
 const skins = fs.readdirSync(sassRoot+'/skins').filter(f=>f.endsWith('.scss')&&f!=='dark-bg.scss').map(f=>f.slice(0,-5));
 // Authored corrections must leave third-party skins' rendered CSS intact.
 for(const skin of skins.filter(name=>!require('./skin-contrast-identity.json').authoredButtonSkins.includes(name))){
  const prefix=`@import "skins/${skin}";`;
  const end='@import "bootstrap/bootstrap"; @import "chulapa-master";';
  assert.equal(compile(prefix+end),compile(prefix+'@mixin chulapa-skin-contrast {} @mixin chulapa-skin-defaults {}'+end),
   `${skin}: Authored corrections must not change this skin`);
  compiledChecks++;
 }
 // Every semantic color is overridden together to ensure no stock exception is
 // appropriate. Compare complete CSS, including hover/focus/active selectors.
 for(const skin of skins)for(const value of ['#fefdfc','#010203']){
  const vars=colors.map(c=>`$${c}: ${value};`).join(' ');
  assert.ok(compile(source(skin,vars,false))===compile(source(skin,vars,false,true)),`${skin}/${value}: corrections must not overwrite configured colors`);
  compiledChecks++;
 }
 for(const skin of ['navi','none','auto','monotone','chulapa','listen']){
  const vars=colors.map(c=>`$${c}: #fefdfc;`).join(' ');
  assert.ok(compile(source(skin,vars,true))===compile(source(skin,vars,true,true)),`${skin}/autothemer: honor configured colors`);
  compiledChecks++;
 }
 for(const skin of ['navi','chulapa','lux','pear','butterfly','butterfly-dim']){
  const a=compile(source(skin,'$body-bg: #101010;',false));
  const b=compile(source(skin,'$body-bg: #101010; $skin-button-outlines: ();',false));
  assert.ok(a===b,`${skin}: skip stock outline contrast corrections on a different page background`);
  compiledChecks++;
 }
 // Site-defined skins can also declare colors before importing a stock skin.
 for(const skin of ['navi','pear','butterfly-dark','butterfly','butterfly-dim']){
  const prefix=`$primary:#fefdfc; @import "skins/${skin}";`;
  const end='@import "bootstrap/bootstrap"; @import "chulapa-master";';
  const reference='$skin-button-palette: map-remove($skin-button-palette, primary);';
  assert.ok(compile(prefix+end)===compile(prefix+reference+end),`${skin}: respect predeclared custom Primary`);
  compiledChecks++;
 }
 for(const skin of ['navi','chulapa','lux','pear']){
  const prefix=`$body-bg:#101010; @import "skins/${skin}";`;
  const end='@import "bootstrap/bootstrap"; @import "chulapa-master";';
  assert.ok(compile(prefix+end)===compile(prefix+'$skin-button-outlines: ();'+end),`${skin}: respect predeclared page background`);
  compiledChecks++;
 }
 // A changed variant must not disable improvements on untouched variants.
 const navi=compile(source('navi','$primary:#fefdfc;',false));
 const browser=await chromium.launch({executablePath:process.env.CHULAPA_CHROMIUM,args:['--no-sandbox']});
 const page=await browser.newPage();
 await page.route('**/*',r=>r.abort());
 const session=await page.context().newCDPSession(page);
 await session.send('DOM.enable'); await session.send('CSS.enable');
 let renderedChecks=0;
 try {
  // Regression from PR #190: changing only the navbar background must keep
  // adaptive text. Explicit text colors remain authoritative.
  for(const background of ['#ffffff','#222222','#777777','#edc7b7']){
   const css=compile(source('butterfly',`$navbar-chulapa-bg-color:${background};`,false));
   await page.setContent(`<style>${css} *{transition:none!important}</style><nav class="navbar navbar-chulapa"><div class="navbar-nav"><a class="nav-link" href="#target">Menu</a></div></nav>`);
   const ratio=await page.locator('a').evaluate(el=>{
    const rgb=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
    const lum=c=>c.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
    const a=lum(rgb(getComputedStyle(el).color)),b=lum(rgb(getComputedStyle(el.closest('nav')).backgroundColor));
    return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   });
   assert.ok(ratio>=4.5,`Butterfly/${background}: adaptive navbar text ${ratio}`);
   renderedChecks++;
  }
  await page.setContent(`<style>${compile(source('butterfly','$navbar-chulapa-bg-color:#222222; $navbar-chulapa-text-color:#ffd700;',false))}</style><nav class="navbar navbar-chulapa"><div class="navbar-nav"><a class="nav-link" href="#target">Menu</a></div></nav>`);
  assert.equal(await page.locator('a').evaluate(el=>getComputedStyle(el).color),'rgb(255, 215, 0)','Keep explicit navbar text color');
  renderedChecks++;
  for(const width of [390,1280]){
   await page.setViewportSize({width,height:700});
   await page.setContent(`<style>${navi} *{transition:none!important}</style><button id="primary" class="btn btn-primary">Primary</button><button id="success" class="btn btn-success">Success</button><button id="outline" class="btn btn-outline-primary">Primary</button>`);
   const {root:{nodeId}}=await session.send('DOM.getDocument');
   const {nodeIds}=await session.send('DOM.querySelectorAll',{nodeId,selector:'button'});
   for(const state of ['normal','hover','focus','active']){
    for(const id of nodeIds)await session.send('CSS.forcePseudoState',{nodeId:id,forcedPseudoClasses:state==='normal'?[]:state==='active'?['hover','active']:[state]});
    assert.equal(await page.locator('#primary').evaluate(el=>getComputedStyle(el).color),'rgb(33, 37, 41)',`Navi/${state}: light custom Primary uses dark text`);
    assert.equal(await page.locator('#success').evaluate(el=>getComputedStyle(el).color),'rgb(255, 255, 255)',`Navi/${state}: retain stock Success correction`);
    renderedChecks+=2;
   }
   // Autothemer with a named monochrome skin must not install blue Auto fixes.
   await page.setContent(`<style>${compile(source('monotone','',true))}</style><button class="btn btn-outline-primary">Primary</button>`);
   assert.equal(await page.locator('button').evaluate(el=>getComputedStyle(el).color),'rgb(34, 34, 34)','Monotone keeps its monochrome Primary outline with autothemer');
   renderedChecks++;
   // The same contract applies to a site-defined skin with no correction maps.
   const custom=compile(`$primary:#abcdef; @import "${fillImport}"; @import "bootstrap/bootstrap"; @import "chulapa-master";`);
   await page.setContent(`<style>${custom}</style><button class="btn btn-outline-primary">Primary</button>`);
   assert.equal(await page.locator('button').evaluate(el=>getComputedStyle(el).color),'rgb(171, 205, 239)','Site-defined skins do not inherit Auto outline colors');
   renderedChecks++;
  }
  console.log(`${compiledChecks} configured-palette/background CSS checks and ${renderedChecks} browser checks passed; stock-only corrections respect vars and autothemer scope.`);
 } finally {await browser.close();}
})().catch(e=>{console.error(e.message);process.exitCode=1});
