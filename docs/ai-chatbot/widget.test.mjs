import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';

const bundle = readFileSync(new URL('.build/widget.js', import.meta.url), 'utf8');
const storageKey = 'chulapa-docs-chat:v1';
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

function widget({ mobile = true, saved, fetch, blockedStorage = false, visualViewport, fab = '' } = {}) {
  const dom = new JSDOM(`<body>${fab}</body>`, {
    url: 'https://dieghernan.github.io/chulapa/docs/05-faq',
    runScripts: 'dangerously', pretendToBeVisual: true
  });
  const { window } = dom;
  window.matchMedia = () => ({ matches: mobile });
  if (visualViewport) Object.defineProperty(window, 'visualViewport', { value: visualViewport });
  window.fetch = fetch || (async () => ({ ok: true, json: async () => ({ answer: 'A documented answer.' }) }));
  if (saved) window.sessionStorage.setItem(storageKey, JSON.stringify(saved));
  if (blockedStorage) Object.defineProperty(window, 'sessionStorage', {
    get() { throw new Error('Storage blocked'); }
  });
  const script = window.document.createElement('script');
  script.dataset.endpoint = 'https://demo.workers.dev/api/chat';
  if (fab) script.dataset.menuToggle = 'menu';
  script.textContent = bundle;
  window.document.body.append(script);
  const root = window.document.querySelector('div').shadowRoot;
  return { dom, window, root, get: id => root.getElementById(id) };
}

test('aligns with button and legacy label FABs and tracks navigation state', async () => {
  for (const fab of [
    '<button id="menu" aria-expanded="false" style="right:24px;bottom:50px;width:56px;height:56px"></button>',
    '<input id="menu" type="checkbox"><label for="menu" style="right:24px;bottom:50px;width:56px;height:56px"></label>'
  ]) {
    const ui = widget({ fab });
    const host = ui.root.host;
    assert.equal(host.style.getPropertyValue('--chat-right'), '24px');
    assert.equal(host.style.getPropertyValue('--chat-stacked-bottom'), 'calc(50px + 56px + 1rem)');
    const menu = ui.window.document.getElementById('menu');
    menu.setAttribute('aria-expanded', 'true');
    await tick();
    assert.equal(host.hidden, true);
    menu.setAttribute('aria-expanded', 'false');
    await tick();
    assert.equal(host.hidden, false);
    ui.dom.window.close();
  }
});

test('mobile opening avoids the keyboard; desktop opening focuses the question', () => {
  for (const mobile of [true, false]) {
    const ui = widget({ mobile });
    ui.get('launch').click();
    assert.equal(ui.root.activeElement.id, mobile ? 'close' : 'question');
    ui.get('close').click();
    assert.equal(ui.root.activeElement.id, 'launch');
    ui.dom.window.close();
  }
});

test('failed questions can be retried without duplicating bubbles or sending history', async () => {
  const requests = [];
  const ui = widget({ fetch: async (_, options) => {
    requests.push(JSON.parse(options.body));
    return requests.length === 1
      ? { ok: false, json: async () => ({ error: 'Please wait a minute or use site search.' }) }
      : { ok: true, json: async () => ({ answer: 'Use the video snippet.' }) };
  } });
  ui.get('launch').click();
  ui.get('question').value = 'How do I add video?';
  ui.root.querySelector('form').dispatchEvent(new ui.window.Event('submit', { cancelable: true }));
  await tick();
  assert.equal(ui.get('recovery').hidden, false);
  assert.equal(ui.get('retry').disabled, false);
  ui.get('retry').click();
  await tick();
  assert.deepEqual(requests, [{ message: 'How do I add video?' }, { message: 'How do I add video?' }]);
  assert.equal(ui.root.querySelectorAll('.message.user').length, 1);
  assert.equal(ui.get('recovery').hidden, true);
  assert.equal(JSON.parse(ui.window.sessionStorage.getItem(storageKey)).failedQuestion, '');
  ui.dom.window.close();
});

test('restores sanitized history and draft, copies code and clears the session', async () => {
  const ui = widget({ saved: {
    open: true, draft: 'Another question',
    history: [{ label: 'Chulapa', text: '```yaml\nskin: navi\n```\n<script>alert(1)</script>' }]
  } });
  assert.equal(ui.get('chat').hidden, false);
  assert.equal(ui.get('question').value, 'Another question');
  assert.equal(ui.get('log').querySelector('script'), null);
  let copied;
  Object.defineProperty(ui.window.navigator, 'clipboard', { value: { writeText: async text => { copied = text; } } });
  ui.root.querySelector('.copy-code').click();
  await tick();
  assert.equal(copied.trim(), 'skin: navi');
  assert.equal(ui.root.querySelector('.copy-code').textContent, 'Copied');
  ui.get('clear').click();
  const saved = JSON.parse(ui.window.sessionStorage.getItem(storageKey));
  assert.equal(saved.history.length, 0);
  assert.equal(saved.draft, '');
  ui.dom.window.close();
});

test('chat remains usable when session storage is unavailable', async () => {
  const ui = widget({ blockedStorage: true });
  ui.get('launch').click();
  ui.get('question').value = 'How do I install Chulapa?';
  ui.root.querySelector('form').dispatchEvent(new ui.window.Event('submit', { cancelable: true }));
  await tick();
  assert.match(ui.get('log').textContent, /A documented answer/);
  assert.equal(ui.get('send').disabled, false);
  ui.get('clear').click();
  assert.equal(ui.root.querySelectorAll('.message.user').length, 0);
  ui.dom.window.close();
});

test('short keyboard viewport uses compact mode and restores the full chat on resize', () => {
  const viewport = new EventTarget();
  Object.assign(viewport, { height: 120, offsetTop: 90, scale: 1 });
  const ui = widget({ visualViewport: viewport });
  const host = ui.window.document.querySelector('div');
  assert.equal(host.hasAttribute('data-compact'), true);
  assert.equal(host.style.getPropertyValue('--chat-visible-top'), '90px');
  viewport.height = 650;
  viewport.dispatchEvent(new Event('resize'));
  assert.equal(host.hasAttribute('data-compact'), false);
  viewport.scale = 2;
  viewport.dispatchEvent(new Event('resize'));
  assert.equal(host.style.getPropertyValue('--chat-visible-top'), '');
  ui.dom.window.close();
});
