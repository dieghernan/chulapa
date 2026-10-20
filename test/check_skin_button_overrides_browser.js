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
 for(const skin of ['navi','chulapa','lux','pear']){
  const a=compile(source(skin,'$body-bg: #101010;',false));
  const b=compile(source(skin,'$body-bg: #101010; $skin-button-outlines: ();',false));
  assert.ok(a===b,`${skin}: skip stock outline contrast corrections on a different page background`);
  compiledChecks++;
 }
 // Site-defined skins can also declare colors before importing a stock skin.
 for(const skin of ['navi','pear','butterfly-dark']){
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
