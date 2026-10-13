const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const directory = path.resolve(process.argv[2]);
const pswp = path.dirname(require.resolve('photoswipe'));
const cdn = 'https://cdn.jsdelivr.net/npm/photoswipe@5.4.4/dist/';
const dependencies = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js',require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js',require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js',require.resolve('bootstrap/dist/js/bootstrap.min.js')],
  [cdn+'photoswipe.esm.min.js',path.join(pswp,'photoswipe.esm.min.js')],
  [cdn+'photoswipe.css',path.join(pswp,'photoswipe.css')]
]);
async function main() {
 const browser = await chromium.launch({headless:true,...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath:process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
 const route = async (route, fail = false) => {
  const url = route.request().url();
  if (url.startsWith(cdn) && (fail === 'all' || (fail === 'css' && url.endsWith('.css')) || (fail === 'module' && url.endsWith('.js')))) return route.abort();
  if (dependencies.has(url)) return route.fulfill({path:dependencies.get(url),contentType:url.endsWith('.css')?'text/css':'text/javascript',headers:{'access-control-allow-origin':'*'}});
  const parsed = new URL(url);
  if(parsed.origin !== 'http://localhost:8768') return route.abort();
  const prefix = parsed.pathname.startsWith('/subdir/') ? 'subdir' : 'root';
  const filename = path.join(directory,prefix,parsed.pathname.replace(/^\/subdir\//,'/'));
  return fs.existsSync(filename) && fs.statSync(filename).isFile() ? route.fulfill({path:filename}) : route.fulfill({status:404,body:''});
 };
 try {
  for(const baseurl of ['', '/subdir']) for(const width of [390,1280]) {
   const context = await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
   const errors=[];const requests=[];
   await context.route('**/*', r=>route(r));
   const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.url().startsWith(cdn)) requests.push(r.url());});
   await page.goto(`http://localhost:8768${baseurl}/default.html`);
   await page.waitForFunction(()=>document.querySelector('#masonry-on img').naturalWidth>0);
   assert.deepEqual(requests,[],'PhotoSwipe must not load before interaction');
   assert.equal(await page.locator('#masonry-off a').count(),0);
   // Force one offscreen thumbnail to have unknown dimensions; its original URL stays available.
   await page.locator('#masonry-on img').nth(2).evaluate(img=>img.removeAttribute('src'));
   const trigger=page.locator('#masonry-on a').first();await trigger.focus();await page.keyboard.press('Enter');
   const dialog=page.getByRole('dialog',{name:'Image gallery'});await dialog.waitFor();
   assert.equal(await dialog.getAttribute('aria-modal'),'true');
   await page.waitForFunction(()=>document.querySelector('.pswp')?.contains(document.activeElement));
   const current=page.locator('.pswp__item[aria-hidden="false"] img.pswp__img:not(.pswp__img--placeholder)');
   await current.waitFor();
   const before=await current.boundingBox();
   await page.locator('.pswp__button--zoom').click();
   await page.waitForFunction(initial=>document.querySelector('.pswp__item[aria-hidden="false"]').querySelector('img.pswp__img:not(.pswp__img--placeholder)').getBoundingClientRect().width>initial,before.width);
   await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.pswp__counter')?.textContent.trim()==='2 / 3');
   await page.keyboard.press('ArrowRight');await page.waitForFunction(()=>document.querySelector('.pswp__counter')?.textContent.trim()==='3 / 3');
   await page.waitForFunction(()=>{
    const img=document.querySelector('.pswp__item[aria-hidden="false"]').querySelector('img.pswp__img:not(.pswp__img--placeholder)');
    return img?.naturalWidth===600 && Math.abs(parseFloat(img.style.width)/parseFloat(img.style.height)-3)<0.01;
   });
   await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.querySelector('.pswp').contains(document.activeElement)),true);
   const focus=await page.evaluate(()=>{const s=getComputedStyle(document.activeElement);return {color:s.outlineColor,width:s.outlineWidth,shadow:s.boxShadow};});
   assert.equal(focus.color,'rgb(255, 255, 255)');assert.equal(focus.width,'2px');assert.ok(focus.shadow.includes('rgb(0, 0, 0)'),'Keyboard focus must remain visible over any image');

   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});await page.waitForFunction(()=>document.activeElement===document.querySelector('#masonry-on a'));
   const carousel=page.locator('#carousel-on .carousel');
   await page.evaluate(()=>{const c=document.querySelector('#carousel-on .carousel');window.jQuery(c).carousel('pause');});
   await page.waitForFunction(()=>!document.querySelector('#carousel-on .carousel-item-next, #carousel-on .carousel-item-prev'));
   const carouselTrigger=await carousel.locator('.carousel-item.active a').elementHandle();
   const slideBefore=await carouselTrigger.getAttribute('href');await carouselTrigger.focus();
   // Start a real transition immediately before the keyboard activation.
   await page.evaluate(()=>window.jQuery(document.querySelector('#carousel-on .carousel')).carousel('next'));
   await page.keyboard.press('Enter');await dialog.waitFor();
   await page.evaluate(()=>window.jQuery(document.querySelector('#carousel-on .carousel')).carousel('cycle'));
   const frozenSlide = await carousel.locator('.carousel-item.active a').getAttribute('href');
   assert.match(await page.locator('.pswp__counter').innerText(),/\/ 3/,'Gallery sequences must remain isolated');
   await page.waitForTimeout(1200);
   assert.equal(await carousel.locator('.carousel-item.active a').getAttribute('href'),frozenSlide,'Carousel must not move behind the dialog');
   if(!baseurl) await page.screenshot({path:path.join(directory,`photoswipe-${width}.png`)});
   await page.keyboard.press('Escape');await dialog.waitFor({state:'detached'});
   await page.waitForFunction(href=>document.activeElement?.href===href,`http://localhost:8768${baseurl}/images/${slideBefore.split('/').pop()}`);
   assert.equal(requests.filter(url=>url.endsWith('.css')).length,1,'Styles should be reused across galleries');
   assert.deepEqual(errors,[],'Unexpected gallery JavaScript errors');
   await context.close();console.log(`PhotoSwipe passed ${baseurl||'root'} ${width}px: lazy loading, keyboard, zoom, dimensions, isolated galleries and carousel focus`);
  }
  const touch=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  await touch.route('**/*',r=>route(r));const touchPage=await touch.newPage();
  await touchPage.goto('http://localhost:8768/default.html');await touchPage.locator('#masonry-on a').first().tap();
  await touchPage.getByRole('dialog',{name:'Image gallery'}).waitFor();
  const session=await touch.newCDPSession(touchPage);
  await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:400}]});
  for(const x of [290,220,150,90,40]) await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:400}]});
  await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await touchPage.waitForFunction(()=>document.querySelector('.pswp__counter')?.textContent.trim()==='2 / 3');
  await touchPage.locator('.pswp__button--close').tap();await touch.close();console.log('Touch tap and swipe navigation passed');
  for(const mode of ['no-js','all','css','module']) {
   const noJS=mode==='no-js';
   const context=await browser.newContext({javaScriptEnabled:!noJS});await context.route('**/*',r=>route(r,noJS?false:mode));
   const page=await context.newPage();await page.goto('http://localhost:8768/default.html');
   await Promise.all([page.waitForURL('**/images/0.svg'),page.locator('#masonry-on a').first().click()]);
   assert.ok(page.url().endsWith('/images/0.svg'));await context.close();console.log(`Original image fallback passed: ${mode}`);
  }
 } finally {await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
