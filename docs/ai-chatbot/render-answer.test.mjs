import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { createAnswerRenderer } from './render-answer.mjs';

function render(text) {
  const dom = new JSDOM('');
  const fragment = createAnswerRenderer(dom.window)(text);
  dom.window.document.body.append(fragment);
  return dom.window.document.body;
}

test('styles brand mentions in prose without changing code, links or identifiers', () => {
  const body = render('Chulapa supports **Chulapa** layouts and chulapa features. '
    + "Chulapa's documentation covers chulapa-skin and MyChulapa.\n\n"
    + '`Chulapa`\n\n```html\n<span>Chulapa</span>\n```\n\n'
    + '[Chulapa](https://dieghernan.github.io/chulapa/docs/)');
  assert.equal(body.querySelectorAll('span.chulapa').length, 4);
  assert.equal(body.querySelector('strong span.chulapa').textContent, 'Chulapa');
  assert.equal(body.querySelector('code span,a span'), null);
  assert.equal(body.querySelector('pre code').textContent.trim(), '<span>Chulapa</span>');
  assert.equal(body.querySelector('a').textContent, 'Chulapa');
  assert.match(body.textContent, /chulapa-skin and MyChulapa/);
});

test('renders Markdown lists, emphasis, code and source links', () => {
  const body = render('**Video**\n\n1. Choose a provider.\n2. Add `video.html`.\n\n'
    + '```html\n<video controls src="/movie.mp4"></video>\n```\n\n'
    + '[Video guide](https://dieghernan.github.io/chulapa/docs/04-layouts#video-support)');
  assert.equal(body.querySelector('strong').textContent, 'Video');
  assert.equal(body.querySelectorAll('ol li').length, 2);
  assert.equal(body.querySelector('pre code').textContent.trim(), '<video controls src="/movie.mp4"></video>');
  assert.equal(body.querySelector('video'), null);
  assert.equal(body.querySelector('a').getAttribute('href'), 'https://dieghernan.github.io/chulapa/docs/04-layouts#video-support');
});

test('removes executable and interactive HTML', () => {
  const body = render('<script>alert(1)</script><img src=x onerror="alert(1)">'
    + '<svg onload="alert(1)"></svg><iframe src="https://example.com"></iframe>'
    + '<form><input autofocus><button>Bad</button></form>'
    + '<p id="question" style="position:fixed" onclick="alert(1)">Safe text</p>');
  assert.equal(body.querySelector('script,img,svg,iframe,form,input,button'), null);
  assert.equal(body.querySelector('[onclick],[onerror],[onload],[id],[style]'), null);
  assert.match(body.textContent, /Safe text/);
});

test('keeps only allowed documentation links and preserves their text', () => {
  const body = render('[Unsafe](javascript:alert%281%29) [Outside](https://example.com/) '
    + '[Impersonation](https://dieghernan.github.io.evil.test/chulapa/docs/) '
    + '[Other site](https://dieghernan.github.io/other/) '
    + '[Relative](/chulapa/docs/) [Valid](https://dieghernan.github.io/chulapa/docs/)');
  assert.equal(body.querySelectorAll('a[href]').length, 1);
  assert.equal(body.querySelector('a[href]').textContent, 'Valid');
  assert.match(body.textContent, /Unsafe/);
  assert.match(body.textContent, /Outside/);
});

test('rejects credential, protocol and normalized path tricks in source links', () => {
  const body = render('[Credentials](https://visitor@dieghernan.github.io/chulapa/docs/) '
    + '[HTTP](http://dieghernan.github.io/chulapa/docs/) '
    + '[Traversal](https://dieghernan.github.io/chulapa/%2e%2e/other/) '
    + '[Prefix](https://dieghernan.github.io/chulapa-copy/docs/) '
    + '[Valid](https://dieghernan.github.io/chulapa/docs/04-layouts#layout-structure-and-components)');
  assert.deepEqual([...body.querySelectorAll('a[href]')].map(link => link.textContent), ['Valid']);
  for (const label of ['Credentials', 'HTTP', 'Traversal', 'Prefix']) {
    assert.ok(body.textContent.includes(label), `Rejected link lost its text: ${label}`);
  }
});

test('preserves GFM table structure and literal Liquid examples after sanitizing', () => {
  const body = render('| Option | Value |\n| --- | --- |\n| `show_random` | true |\n\n'
    + '```liquid\n{% include_cached components/indexcards.html cacheddocs=site.posts %}\n```\n\n'
    + '<p data-private="secret" aria-label="override">Chulapa docs</p>');
  assert.deepEqual([...body.querySelectorAll('thead th')].map(cell => cell.textContent), ['Option', 'Value']);
  assert.deepEqual([...body.querySelectorAll('tbody td')].map(cell => cell.textContent), ['show_random', 'true']);
  assert.equal(body.querySelector('pre code').textContent.trim(), '{% include_cached components/indexcards.html cacheddocs=site.posts %}');
  assert.equal(body.querySelector('[data-private],[aria-label]'), null);
  assert.equal(body.querySelector('span.chulapa').textContent, 'Chulapa');
});
