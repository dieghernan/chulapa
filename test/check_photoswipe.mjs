import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
const source = readFileSync(new URL('../assets/js/chulapa_photoswipe.js', import.meta.url), 'utf8');
const {initializePhotoSwipe} = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));

function fixture(count = 2) {
  const frames = [], viewers = [], navigations = [], controls = [];
  const galleries = Array.from({length: count}, (_, group) => {
    const links = Array.from({length: 3}, (_, i) => {
      const image = {src: `https://example.com/${group}-${i}.jpg`, alt: `Photo ${group}-${i}`, naturalWidth: 1600, naturalHeight: 900};
      return {href: image.src, image, querySelector: () => image, focus(options) { this.focused = options; }};
    });
    return {links, dataset: {photoswipeGallery: group ? 'carousel' : 'masonry'}, querySelectorAll: () => links, addEventListener(type, handler) {this.click = handler;}};
  });
  const root = {querySelectorAll: () => galleries, defaultView: {
    location: {assign: url => navigations.push(url)},
    matchMedia: () => ({matches: true}), requestAnimationFrame: fn => frames.push(fn),
    jQuery: () => ({on: (...args) => controls.push(['on', ...args]), off: (...args) => controls.push(['off', ...args])})
  }};
  class Viewer {
    constructor(options) {this.options = options; this.events = {}; this.attrs = {}; this.element = {setAttribute: (k,v) => this.attrs[k] = v}; viewers.push(this);}
    on(type, handler) {this.events[type] = handler;}
    init() {this.initialized = true;}
    refreshSlideContent(index) {this.refreshed = index;}
  }
  const click = (gallery, index = 0, extra = {}) => {
    const event = {target: {closest: () => gallery.links[index]}, button: 0, preventDefault() {this.prevented = true;}, ...extra};
    return {event, done: gallery.click(event)};
  };
  return {root, galleries, frames, viewers, Viewer, click, navigations, controls, flush() {while(frames.length) frames.shift()();}};
}

test('no galleries or clicks means no library request', () => {
  const f = fixture(0); initializePhotoSwipe(f.root, () => assert.fail('unexpected request'));
  const g = fixture(); initializePhotoSwipe(g.root, () => assert.fail('unexpected request'));
});

test('keyboard-compatible clicks open isolated galleries with alt text and reduced motion', async () => {
  const f = fixture(); let loads = 0;
  initializePhotoSwipe(f.root, async () => {loads++; return f.Viewer;});
  const {event, done} = f.click(f.galleries[1], 1);
  await done;
  assert.equal(event.prevented, true); assert.equal(loads, 1);
  const viewer = f.viewers[0];
  assert.equal(viewer.options.index, 1);
  assert.equal(viewer.options.dataSource.length, 3);
  assert.equal(viewer.options.dataSource[1].alt, 'Photo 1-1');
  assert.equal(viewer.options.showHideAnimationType, 'none');
  assert.equal(viewer.options.zoomAnimationDuration, 0);
  assert.equal(viewer.attrs['aria-modal'], 'true');
  assert.equal(viewer.attrs['aria-label'], 'Image gallery');
  assert.equal(f.controls[0][0], 'on');
  viewer.events.destroy(); f.flush();
  assert.deepEqual(f.galleries[1].links[1].focused, {preventScroll: true});
  assert.equal(f.controls[1][0], 'off');
});

test('modified and middle clicks retain normal image navigation', async () => {
  const f = fixture(); initializePhotoSwipe(f.root, () => assert.fail('unexpected request'));
  for (const extra of [{button:1}, {ctrlKey:true}, {metaKey:true}, {altKey:true}, {shiftKey:true}]) {
    const {event, done} = f.click(f.galleries[0], 0, extra); await done; assert.equal(event.prevented, undefined);
  }
});

test('failed loading opens the original image and releases the pending state', async t => {
  t.mock.method(console, 'warn', () => {});
  const f = fixture(); let loads = 0;
  initializePhotoSwipe(f.root, async () => {loads++; throw new Error('CDN failure');});
  await f.click(f.galleries[0], 1).done;
  await f.click(f.galleries[0], 2).done;
  assert.deepEqual(f.navigations, ['https://example.com/0-1.jpg','https://example.com/0-2.jpg']);
  assert.equal(loads, 2);
});

test('double clicks while loading do not open competing dialogs', async () => {
  const f = fixture(); let resolve;
  initializePhotoSwipe(f.root, () => new Promise(r => resolve = r));
  const first = f.click(f.galleries[0]); await f.click(f.galleries[1]).done;
  resolve(f.Viewer); await first.done;
  assert.equal(f.viewers.length, 1);
});

test('offscreen dimensions update after image load and never refresh a destroyed viewer', async () => {
  const f = fixture(); f.galleries[0].links[2].image.naturalWidth = 0;
  initializePhotoSwipe(f.root, async () => f.Viewer);
  await f.click(f.galleries[0]).done;
  const viewer = f.viewers[0];
  viewer.events.loadComplete({content:{index:2,element:{naturalWidth:800,naturalHeight:1200}}});
  assert.equal(viewer.options.dataSource[2].width, 800);
  assert.equal(viewer.options.dataSource[2].height, 1200);
  assert.equal(viewer.refreshed, undefined);
  f.flush(); assert.equal(viewer.refreshed, 2);
  viewer.options.dataSource[2].pendingDimensions = true;
  viewer.events.loadComplete({content:{index:2,element:{naturalWidth:800,naturalHeight:1200}}});
  viewer.isDestroying = true; viewer.refreshed = undefined;
  f.flush(); assert.equal(viewer.refreshed, undefined);
});

test('opening waits for an in-flight carousel transition and restores the clicked slide', async () => {
  const f = fixture(); const callbacks = []; const selected = [];
  f.galleries[1].querySelector = () => ({});
  f.galleries[1].links[0].closest = () => ({classList:{contains:()=>false}});
  f.root.defaultView.jQuery = () => ({on(){},off(){},one(type, fn){assert.equal(type,'slid.bs.carousel');callbacks.push(fn);},carousel(index){selected.push(index);}});
  initializePhotoSwipe(f.root, async () => f.Viewer);
  const opening = f.click(f.galleries[1]).done;
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(f.viewers.length,0);
  callbacks.shift()(); await opening;
  f.viewers[0].events.destroy(); assert.deepEqual(selected,[0]);
  callbacks.shift()(); f.flush();
  assert.deepEqual(f.galleries[1].links[0].focused,{preventScroll:true});
});

test('first image dimensions are discovered on demand and failures retain its original link', async t => {
  t.mock.method(console,'warn',()=>{});
  for(const fails of [false,true]) {
    const f = fixture(); const img=f.galleries[0].links[0].image; img.naturalWidth=0;img.naturalHeight=0;
    f.root.defaultView.Image = class {
      constructor(){this.naturalWidth=2048;this.naturalHeight=1024;}
      set src(value){queueMicrotask(()=>fails?this.onerror():this.onload());}
    };
    initializePhotoSwipe(f.root,async()=>f.Viewer);
    await f.click(f.galleries[0]).done;
    if(fails) assert.deepEqual(f.navigations,[img.src]);
    else assert.equal(f.viewers[0].options.dataSource[0].width,2048);
  }
});
