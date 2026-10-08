import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';

function request(message, options = {}) {
  return new Request('https://demo.workers.dev/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://dieghernan.github.io' },
    body: JSON.stringify({ message }), ...options
  });
}
function environment(run = async () => ({ choices: [{ message: { content: 'A documented answer.' } }] })) {
  return { AI: { run }, CHAT_RATE_LIMIT: { limit: async () => ({ success: true }) } };
}
test('rejects invalid questions before invoking AI', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  for (const message of [null, 1, '', '   ', 'x'.repeat(1001)]) {
    assert.equal((await worker.fetch(request(message), env)).status, 400);
  }
  assert.equal((await worker.fetch(request('', { body: '{broken' }), env)).status, 400);
  assert.equal((await worker.fetch(request('x'.repeat(9000)), env)).status, 413);
});
test('rejects foreign origins and allows documentation preflight', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  assert.equal((await worker.fetch(request('Hi', { headers: { Origin: 'https://evil.example' } }), env)).status, 403);
  const response = await worker.fetch(request('Hi', { method: 'OPTIONS', body: undefined }), env);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://dieghernan.github.io');
});
test('fails closed with missing bindings and rate limiting', async () => {
  assert.equal((await worker.fetch(request('Hi'), {})).status, 503);
  const env = environment(() => assert.fail('AI must not run'));
  env.CHAT_RATE_LIMIT.limit = async () => ({ success: false });
  assert.equal((await worker.fetch(request('Hi'), env)).status, 429);
});
test('passes reviewed context and bounded output to the selected model', async () => {
  const env = environment(async (model, options) => {
    assert.equal(model, '@cf/google/gemma-4-26b-a4b-it');
    assert.equal(options.max_completion_tokens, 450);
    assert.deepEqual(options.chat_template_kwargs, { enable_thinking: false });
    assert.match(options.messages[0].content, /WEBSITE CONTEXT/);
    assert.equal(options.messages[1].content, 'How do I install Chulapa?');
    return { choices: [{ message: { content: 'Use the template.\nhttps://dieghernan.github.io/chulapa/docs/01-install' } }] };
  });
  const response = await worker.fetch(request(' How do I install Chulapa? '), env);
  assert.equal(response.status, 200);
  assert.match((await response.json()).answer, /docs\/01-install/);
});
test('inference errors and exhausted allowance return a search fallback', async () => {
  const env = environment(async () => { throw new Error('Quota exhausted'); });
  const response = await worker.fetch(request('Hi'), env);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /site search/);
});
test('missing or empty model answers return the search fallback', async () => {
  for (const result of [{}, { choices: [{ message: { content: '' } }] }]) {
    const response = await worker.fetch(request('Hi'), environment(async () => result));
    assert.equal(response.status, 503);
  }
});
test('serves only the widget without invoking inference', async () => {
  const response = await worker.fetch(new Request('https://demo.workers.dev/widget.js'), {});
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Ask AI/);
  assert.equal((await worker.fetch(new Request('https://demo.workers.dev/'), {})).status, 404);
});

test('does not present token-truncated code as a completed answer', async () => {
  const env = environment(async () => ({ choices: [{ finish_reason: 'length',
    message: { content: '```yaml\nfooter-chulapa-text-color:' } }] }));
  const response = await worker.fetch(request('Give a full configuration'), env);
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.match(body.error, /more specific question/);
  assert.equal(body.answer, undefined);
});
