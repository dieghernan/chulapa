// Experimental preview generator. Outputs are not registered as built-in skins.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const sass = require('./browser/node_modules/sass');
const {chromium} = require('./browser/node_modules/playwright');
const {inlineFonts} = require('./generate_skin_previews');
const config = require('./dark-skin-pilot.json');
const {publishArtifacts} = require('./dark_skin_pilot_artifacts');
const root = path.resolve(__dirname, '..');
const output = path.resolve(process.env.DARK_SKIN_PILOT_OUTPUT || '/tmp/chulapa-dark-skin-pilot');
const fixtureRoot = path.join(__dirname, 'fixtures/dark-skin-pilot');
const artifactRoot = path.join(root, 'planning/dark-skin-pilot-2026-10-21');
assert.ok(output!==artifactRoot && !output.startsWith(artifactRoot+path.sep),
  'Render output must be separate from committed review artifacts');
const check = process.argv.includes('--check');
const variants = ['primary','secondary','success','info','warning','danger','light','dark'];
const cssOptions = {loadPaths: [root+'/_sass',fixtureRoot],logger:{warn(){},debug(){}}};
const rgb = value => {
  if (value.startsWith('#')) { let h=value.slice(1); if(h.length===3)h=[...h].map(x=>x+x).join(''); return h.match(/../g).map(x=>parseInt(x,16)); }
  return value.match(/[\d.]+/g).slice(0,3).map(Number);
};
const hex = c => '#'+c.map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
const mix = (a,b,t) => a.map((v,i)=>v*t+b[i]*(1-t));
const luminance = c => c.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
const contrast = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
function readable(accent,bg) {
  for(let i=0;i<=100;i++) { const candidate=mix(accent,[255,255,255],1-i/100); if(contrast(candidate,bg)>=4.7)return hex(candidate); }
  throw Error('Cannot derive readable color');
}
function tokens(skin) {
  const source=`@import "skins/${skin}"; @import "bootstrap/functions"; @import "bootstrap/variables"; .pilot-tokens {${variants.map(v=>`--${v}: #{${'$'+v}};`).join('')} --body-bg: #{$body-bg};}`;
  const css=sass.compileString(source,cssOptions).css;
  const block=css.slice(css.lastIndexOf('.pilot-tokens'));
  return Object.fromEntries([...block.matchAll(/--([\w-]+): ([^;]+);/g)].map(m=>[m[1],m[2]]));
}
function generate(skin,t) {
  const bg=rgb(hex(mix(rgb(t.primary),[16,19,24],.08))), panel=hex(mix([255,255,255],bg,.055)), border=hex(mix([255,255,255],bg,.22));
  const variables={
    'body-bg':hex(bg),'body-color':'#e5e9ef','headings-color':'#e5e9ef','link-color':readable(rgb(t.primary),bg),'link-hover-color':readable(rgb(t.primary),bg),
    'text-muted':'#adb5bd','card-bg':panel,'card-cap-bg':panel,'card-border-color':border,
    'dropdown-bg':panel,'dropdown-link-color':'#e5e9ef','dropdown-link-hover-color':'#ffffff','dropdown-link-hover-bg':border,
    'list-group-bg':panel,'list-group-color':'#e5e9ef','list-group-action-color':'#e5e9ef','list-group-hover-bg':border,
    'input-bg':panel,'input-color':'#e5e9ef','input-border-color':border,'input-focus-bg':panel,'input-focus-color':'#ffffff',
    'input-placeholder-color':'#adb5bd','table-color':'#e5e9ef','table-border-color':border,
    'modal-content-bg':panel,'modal-content-border-color':border,'jumbotron-bg':panel,'breadcrumb-bg':panel,
    'pagination-bg':panel,'pagination-color':'#e5e9ef','pagination-hover-bg':border,'pagination-hover-color':'#ffffff',
    'pagination-disabled-bg':panel,'pagination-disabled-color':'#adb5bd','pagination-border-color':border,
    'navbar-chulapa-bg-color':panel,'navbar-chulapa-text-color':'#e5e9ef','navbar-chulapa-hover-color':'#ffffff',
    'navbar-chulapa-active-color':'#ffffff','navbar-chulapa-brand-color':'#ffffff',
    'footer-chulapa-bg-color':panel,'footer-chulapa-text-color':'#adb5bd','footer-chulapa-link-color':readable(rgb(t.primary),rgb(panel)),'footer-chulapa-hover-color':readable(rgb(t.primary),rgb(panel)),
    'thead-chulapa-text-color':contrast(rgb(t.primary),[255,255,255])>=4.5?'#ffffff':'#000000',
    'blockquote-chulapa-bg-color':panel,'blockquote-chulapa-text-color':'#e5e9ef','pre-chulapa-bg-color':panel,'code-color':'#ff9dcc',
    'alert-bg-level':'10','alert-border-level':'7','alert-color-level':'-7',
    'skin-button-labels':'()','skin-button-outlines':'()','skin-button-lighter-states':'()'
  };
  const declarations=Object.entries(variables).map(([k,v])=>`$${k}: ${v} !default;`).join('\n');
  // Derive outline labels independently; retain original fill colors and fonts.
  const outlines=variants.map(v=>`${v}: ${readable(rgb(t[v]),bg)}`).join(', ');
  return `// GENERATED experimental ${skin} dark study. Regenerate with test/generate_dark_skin_pilot.js.
// Standalone stylesheet, not a catalog skin. Import once, without Bootstrap again.
// Not an upstream dark theme; original source/credits remain in the imported skin.
${declarations}
@import "skins/${skin}";
// Legacy sources may assign these unconditionally; keep the dark treatment.
$navbar-chulapa-bg-color: ${panel};
$footer-chulapa-text-color: #adb5bd;
@import "bootstrap/bootstrap";
@import "chulapa-master";
// Experimental shared control treatment. Original palette fills remain unchanged.
// Some source integrations force labels with !important (for example Materia).
@each $name, $source-fill in $theme-colors {
  // Keep existing reviewed button fills (which can differ from palette tokens).
  $fill: if(map-has-key($skin-button-backgrounds, $name), map-get($skin-button-backgrounds, $name), $source-fill);
  .btn.btn-#{$name} {
    color: color-contrast($fill, #000, #fff, 4.5) !important;
    &:hover, &:focus {
      background-color: darken($fill, 7.5%);
      color: color-contrast(darken($fill, 7.5%), #000, #fff, 4.5) !important;
    }
    &:not(:disabled):not(.disabled):active {
      background-color: darken($fill, 10%);
      color: color-contrast(darken($fill, 10%), #000, #fff, 4.5) !important;
    }
  }
}
$pilot-outlines: (${outlines});
@each $name, $label in $pilot-outlines {
  .btn.btn-outline-#{$name}:not(:disabled):not(.disabled) {
    background-color: transparent;
    color: $label !important;
    border-color: $label !important;
    &:hover, &:not(:disabled):not(.disabled):active {
      background-color: theme-color($name);
      color: color-contrast(theme-color($name), #000, #fff, 4.5) !important;
    }
  }
}
.table tbody td { background-color: $body-bg; color: $body-color; }
${variants.map(v=>`.alert.alert-${v} { background: ${hex(mix([0,0,0],rgb(t[v]),.8))} !important; color: #e5e9ef !important; } .alert.alert-${v} .alert-link { color: ${readable(rgb(t[v]),mix([0,0,0],rgb(t[v]),.8))} !important; }`).join('\n')}
`;

}
const sample = `<main class="container py-4"><h1>Stories after sunset</h1><p class="lead">A dark companion, with the same character.</p><p>Read a <a href="#article">carefully chosen story</a> and explore what remains familiar.</p><p class="text-muted">A quieter caption without losing readability.</p><h2>Colors and controls</h2><div class="d-flex flex-wrap mb-3" style="gap:.5rem">${variants.map(v=>`<button type="button" class="btn btn-${v}">${v}</button>`).join('')}</div><div class="d-flex flex-wrap mb-3" style="gap:.5rem">${variants.map(v=>`<button type="button" class="btn btn-outline-${v}">${v}</button>`).join('')}</div><div class="row"><section class="col-md-6"><div class="alert alert-info">A useful notice with <a class="alert-link" href="#article">more details</a>.</div><label for="search">Search this journal</label><input id="search" class="form-control mb-3" placeholder="A word to remember"><table class="table"><thead><tr><th>Chapter</th><th>Status</th></tr></thead><tbody><tr><td>Palette</td><td>Experimental</td></tr></tbody></table></section><article id="article" class="col-md-6"><div class="card"><div class="card-header">Featured article</div><div class="card-body"><h2 class="h5 card-title">A fresh perspective</h2><p class="card-text">Typography, shape and accent are part of the skin's identity.</p><a href="#" class="btn btn-primary">Read more</a></div></div></article></div></main>`;
function html(skin,mode,css) {return `<!doctype html><html lang="en" style="color-scheme:${mode}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${skin} · ${mode} pilot</title><style>${css}</style></head><body><nav class="navbar navbar-chulapa"><a class="navbar-brand" href="#">${skin}</a><div class="navbar-nav"><a class="nav-link" href="#article">Explore</a></div></nav>${sample}<footer class="footer-chulapa text-center p-3">Experimental ${mode} adaptation · <a href="#">Original skin credits retained in source</a></footer></body></html>`;}
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 if(!check)fs.mkdirSync(fixtureRoot,{recursive:true});
 for(const pair of config.existingPairs) {
   assert.ok(!config.skins.includes(pair.light),`${pair.light}: already has a dark partner`);
   assert.ok(fs.existsSync(root+'/'+pair.evidence));
   for(const id of [pair.light,...pair.dark]) assert.ok(fs.existsSync(root+'/_sass/skins/'+id+'.scss'));
 }
 if(process.argv.includes('--sass-only')) {
  for(const skin of config.skins) {
   const content=generate(skin,tokens(skin)),file=fixtureRoot+'/'+skin+'-dark.scss';
   if(check)assert.equal(fs.readFileSync(file,'utf8'),content,skin+': generated Sass drift');else fs.writeFileSync(file,content);
  }
  console.log('Experimental Sass '+(check?'verified':'generated'));return;
 }
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHULAPA_CHROMIUM});
 const report={experimental:true,tools:{chromium:browser.version(),dartSass:require('./browser/node_modules/sass/package.json').version,platform:process.platform,architecture:process.arch},existingPairs:config.existingPairs,skins:[]};
 try {
  const page=await browser.newPage();
  await page.route('**/*',route=>route.request().url().startsWith('data:')?route.continue():route.abort());
  for(const skin of config.skins) {
   const t=tokens(skin);assert.ok(luminance(rgb(t['body-bg']))>.5,`${skin}: pilot source must be light`);
   assert.ok(!fs.existsSync(root+'/_sass/skins/'+skin+'-dark.scss'),`${skin}: named dark partner exists`);
   const generated=generate(skin,t), file=fixtureRoot+'/'+skin+'-dark.scss';
   if(check)assert.equal(fs.readFileSync(file,'utf8'),generated,`${skin}: generated Sass drift`);else fs.writeFileSync(file,generated);
   const record={skin,primary:t.primary,modes:{}};
   for(const mode of ['light','dark']) {
    const src=mode==='light'?`@import "skins/${skin}";`:`@import "${skin}-dark";`;
    const css=inlineFonts(sass.compileString(src+(mode==='light'?'@import "bootstrap/bootstrap";@import "chulapa-master";':''),cssOptions).css);
    const document=html(skin,mode,css);fs.writeFileSync(output+`/${skin}-${mode}.html`,document);
    await page.setViewportSize({width:1280,height:1000});await page.setContent(document);await page.evaluate(()=>document.fonts.ready);
    assert.deepEqual(await page.evaluate(()=>[...document.fonts].filter(f=>f.status==='error').map(f=>f.family)),[]);
    const styles=await page.evaluate(()=>{const style=s=>getComputedStyle(document.querySelector(s));return {body:style('body').backgroundColor,text:style('body').color,primary:style('.btn-primary').backgroundColor,font:style('p').fontFamily,heading:style('h1').fontFamily,radius:style('.card').borderRadius};});
    styles.paletteFills=await page.evaluate(variants=>Object.fromEntries(variants.map(v=>[v,getComputedStyle(document.querySelector('.btn-'+v)).backgroundColor])),variants);
    record.modes[mode]=styles;
    const measurements=[];
    for(const selector of ['body','h1','h2','.card-title','.card-header','p a','.text-muted','.lead','.navbar-brand','.nav-link','.card-text','.alert','.alert-link','.form-control','th','td','footer','footer a',...variants.flatMap(v=>['.btn-'+v,'.btn-outline-'+v])]) {
     const target=page.locator(selector).first();
     for(const state of (selector.startsWith('.btn')?['normal','hover','focus','active']:['normal'])) {
      await page.mouse.move(0,0);await target.evaluate(e=>e.blur());
      if(state==='hover'||state==='active')await target.hover();
      if(state==='focus')await target.focus();
      if(state==='active')await page.mouse.down();
      await target.evaluate(e=>{getComputedStyle(e).color;return Promise.all(e.getAnimations().map(a=>a.finished.catch(()=>{})));});
      const colors=await target.evaluate(e=>{let bg=[255,255,255];const ancestors=[];for(let a=e;a;a=a.parentElement)ancestors.unshift(a);for(const a of ancestors){const c=getComputedStyle(a).backgroundColor.match(/[\d.]+/g).map(Number),alpha=c[3]??1;bg=bg.map((x,i)=>c[i]*alpha+x*(1-alpha));}return {fg:getComputedStyle(e).color,bg};});
      const ratio=contrast(rgb(colors.fg),colors.bg);
      measurements.push({selector,state,ratio:Number(ratio.toFixed(2)),passesNormalText:ratio>=4.5});
      if(state==='active')await page.mouse.up();
     }
    }
    styles.contrast=measurements;
    styles.contrastFailures=measurements.filter(m=>!m.passesNormalText);
    if(mode==='dark')assert.equal(styles.contrastFailures.length,0,`${skin}: generated dark text contrast failures ${JSON.stringify(styles.contrastFailures)}`);
    if(mode==='dark')assert.equal(await page.locator('.alert').evaluate(e=>getComputedStyle(e).backgroundImage),'none',
      `${skin}: dark alert must not retain a source gradient over its measured background`);
    await page.mouse.move(0,0);await page.evaluate(()=>document.activeElement.blur());
    await page.evaluate(()=>{document.body.tabIndex=-1;document.body.focus();document.body.removeAttribute('tabindex');});
    styles.keyboardStops=await page.locator('a[href],button,input').count();
    for(let i=0;i<styles.keyboardStops;i++) {
     await page.keyboard.press('Tab');
     assert.ok(await page.evaluate(i=>document.activeElement===document.querySelectorAll('a[href],button,input')[i],i),`${skin}/${mode}: keyboard order at ${i}`);
    }
    await page.evaluate(()=>document.activeElement.blur());
    if(mode==='dark')assert.ok(luminance(rgb(styles.body))<.04,`${skin}: background not dark`);
    for(const width of [390,1280]) {
     await page.setViewportSize({width,height:1000});
     assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${skin}/${mode}/${width}: overflow`);
     await page.screenshot({path:output+`/${skin}-${mode}-${width}.png`,fullPage:true,animations:'disabled'});
    }
   }
   assert.equal(record.modes.dark.primary,record.modes.light.primary,skin+': primary changed');
   assert.deepEqual(record.modes.dark.paletteFills,record.modes.light.paletteFills,skin+': effective button fills changed');
   for(const key of ['font','heading','radius'])assert.equal(record.modes.dark[key],record.modes.light[key],`${skin}: ${key} changed`);
   report.skins.push(record);
   for(const width of [390,640]) {
    await page.setViewportSize({width:width*2+24,height:1000});
    await page.setContent('<style>body{margin:0;display:flex;gap:24px;background:#888}iframe{border:0;width:'+width+'px;height:1000px}</style><iframe title="Original light"></iframe><iframe title="Experimental dark"></iframe>');
    await page.locator('iframe').evaluateAll((frames,docs)=>frames.forEach((f,i)=>f.srcdoc=docs[i]),['light','dark'].map(mode=>fs.readFileSync(output+`/${skin}-${mode}.html`,'utf8')));
    for(const frame of page.frames().slice(1))await frame.waitForFunction(()=>document.fonts.status==='loaded'&&document.querySelector('h1'));
    const height=Math.max(...await Promise.all(page.frames().slice(1).map(f=>f.evaluate(()=>document.documentElement.scrollHeight))));
    await page.locator('iframe').evaluateAll((frames,height)=>frames.forEach(f=>f.style.height=height+'px'),height);
    await page.screenshot({path:output+`/${skin}-comparison-${width}.png`,fullPage:true,animations:'disabled'});
   }
   console.log('Generated pair:',skin,'dark contrast failures:',record.modes.dark.contrastFailures.length);
  }
 } finally {await browser.close();}
 fs.writeFileSync(output+'/report.json',JSON.stringify(report,null,2)+'\n');
 publishArtifacts(report,output,artifactRoot,check);
 fs.writeFileSync(output+'/index.html',`<!doctype html><html lang="en"><meta charset="utf-8"><title>Experimental dark skin pilot</title><h1>Dark skin pilot</h1><p>${config.skins.length} experimental companions. Existing light/dark pairs are excluded.</p>${config.skins.map(s=>`<h2>${s}</h2><a href="${s}-light.html">Light</a> · <a href="${s}-dark.html">Dark</a><div style="display:flex;gap:1rem"><iframe title="${s} light" src="${s}-light.html" style="width:50%;height:950px"></iframe><iframe title="${s} dark" src="${s}-dark.html" style="width:50%;height:950px"></iframe></div>`).join('')}</html>`);
 console.log(output);
})().catch(e=>{console.error(e);process.exitCode=1;});
