import { createAnswerRenderer } from './render-answer.mjs';

(() => {
  'use strict';
  const script = document.currentScript;
  const renderAnswer = createAnswerRenderer(window);
  const endpoint = script.dataset.endpoint || new URL('/api/chat', script.src).href;
  const search = script.dataset.search || 'https://dieghernan.github.io/chulapa/search';
  const host = document.createElement('div');
  const root = host.attachShadow({ mode: 'open' });
  if (['left', 'center'].includes(script.dataset.position)) host.setAttribute('data-position', script.dataset.position);
  // The fixed UI is HTML; answers pass through Markdown parsing and sanitization.
  root.innerHTML = `<style>
    :host{font:14px/1.5 system-ui;color:#26313a;--surface:#fff;--muted:#66717b;--line:#edf0f2;--bubble:#f1f3f5}
    *{box-sizing:border-box}[hidden]{display:none!important}button,input{font:inherit}
    button{cursor:pointer;border:0;background:var(--primary,#285d70);color:#fff}
    button:focus-visible,input:focus-visible,a:focus-visible{outline:3px solid #d89419;outline-offset:2px}
    #launch{position:fixed;bottom:1rem;right:var(--chat-right,1rem);z-index:21000;width:var(--chat-launch-size,3.5rem);height:var(--chat-launch-size,3.5rem);padding:.35rem;border-radius:50%;box-shadow:0 4px 18px #0002;display:grid;place-items:center}
    .ai-logo{position:relative;font-size:1.05rem;font-weight:700;letter-spacing:-.03em}.ai-logo::after{content:"✦";position:absolute;font-size:.65rem;top:-.45rem;right:-.55rem}
    :host([data-position="left"]) #launch{left:1rem;right:auto}
    :host([data-position="center"]) #launch{left:50%;right:auto;transform:translateX(-50%)}
    section{position:fixed;bottom:1rem;right:var(--chat-right,1rem);z-index:21000;width:min(25rem,calc(100vw - 2 * var(--chat-right,1rem)));height:30rem;max-height:calc(100dvh - 2rem);background:var(--surface);border:1px solid var(--line);border-radius:1rem;box-shadow:0 12px 40px #0003;display:flex;flex-direction:column;overflow:auto}
    header{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1rem 1.1rem;border-bottom:1px solid var(--line);flex-shrink:0}
    h2{font-size:1rem;margin:0 0 .25rem;font-weight:650}.subtitle{margin:0;color:var(--muted);font-size:.8rem}
    .chulapa{font-family:chulapa,sans-serif;font-weight:400;font-feature-settings:"liga","dlig";text-rendering:optimizeLegibility}
    #close{background:transparent;color:var(--muted);border-radius:.5rem;font-size:1.5rem;line-height:1;width:2rem;height:2rem;flex-shrink:0}#close:hover{background:var(--bubble)}
    #log{padding:1rem;overflow:auto;min-height:0;flex:1 1 auto;display:flex;flex-direction:column;gap:.75rem}
    .message{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;padding:.7rem .85rem;border-radius:.85rem;background:var(--bubble);max-width:92%;align-self:flex-start;flex-shrink:0}
    .message.user{background:var(--primary,#285d70);color:#fff;align-self:flex-end;border-bottom-right-radius:.25rem}.message.assistant{border-bottom-left-radius:.25rem}
    .message.assistant{white-space:normal}.message p{margin:0 0 .65rem}.message p:last-child{margin-bottom:0}.message ul,.message ol{padding-left:1.3rem;margin:.5rem 0}.message li+li{margin-top:.25rem}
    .message code{font: .85em/1.5 ui-monospace,Consolas,monospace;background:#0000000b;padding:.1em .25em;border-radius:.2rem}.message pre{max-width:100%;overflow:auto;padding:.75rem;background:#0000000b;border-radius:.5rem;white-space:pre;margin:.65rem 0}.message pre code{padding:0;background:none}
    .message blockquote{border-left:3px solid var(--muted);padding-left:.75rem;margin:.65rem 0;color:var(--muted)}.message h1,.message h2,.message h3,.message h4,.message h5,.message h6{font-size:1em;margin:.75rem 0 .4rem}.message table{display:block;max-width:100%;overflow:auto;border-collapse:collapse}.message th,.message td{border:1px solid var(--muted);padding:.3rem .5rem}
    .speaker,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    a{color:var(--primary,#285d70)}.user a{color:inherit;text-decoration:underline}
    footer{flex-shrink:0;border-top:1px solid var(--line)}small{display:block;color:var(--muted);font-size:.7rem;padding:0 1rem .75rem;line-height:1.45}
    form{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem}input{min-width:0;flex:1;padding:.7rem .8rem;border:1px solid #aab2b9;border-radius:.65rem;background:var(--surface);color:inherit}input::placeholder{color:var(--muted)}
    #send{width:2.75rem;height:2.75rem;flex-shrink:0;border-radius:.65rem;font-size:1.3rem}#status{padding:0 1rem;color:var(--muted);font-size:.8rem}#status:not(:empty){padding-bottom:.65rem}button:disabled{opacity:.6;cursor:wait}
    @media(max-width:991.98px){#launch{left:var(--chat-right,1rem);right:auto;bottom:var(--chat-fab-bottom,1rem);transform:none}}
    @media(max-width:575px){section{height:auto}#log{max-height:40dvh}header{padding:.85rem 1rem}}
    @media(prefers-color-scheme:dark){:host{color:#eef3f5;--surface:#1d2b33;--muted:#bac7cf;--line:#36454e;--bubble:#2a3b45}a{color:#a8dae8}}
  </style>
  <button id="launch" aria-label="Ask AI" title="Ask Chulapa AI" aria-expanded="false" aria-controls="chat"><span class="ai-logo" aria-hidden="true">AI</span></button>
  <section id="chat" hidden role="region" aria-labelledby="title">
    <header><div><h2 id="title">Ask <span class="chulapa">Chulapa</span> <span aria-hidden="true">&#10022;</span></h2><p class="subtitle">Help with your site, straight from the docs.</p></div><button id="close" aria-label="Close chat">&#215;</button></header>
    <div id="log" role="log" aria-live="polite" aria-relevant="additions"><p class="message assistant">Hi! Ask me about <span class="chulapa">Chulapa</span>'s setup, layouts or features.</p></div>
    <div id="status" role="status"></div>
    <footer>
      <form><label class="sr-only" for="question">Your question</label><input id="question" placeholder="Ask a question..." maxlength="1000" required autocomplete="off"><button id="send" aria-label="Send question">&#8593;</button></form>
      <small>Processed by Cloudflare AI. Answers may contain mistakes. Each question is independent. <a id="search">Search the docs</a></small>
    </footer>
  </section>`;
  document.body.append(host);
  const get = id => root.getElementById(id);
  get('search').href = search;
  const close = () => {
    get('chat').hidden = true; get('launch').hidden = false;
    get('launch').setAttribute('aria-expanded', 'false'); get('launch').focus();
  };
  get('launch').onclick = () => {
    get('chat').hidden = false; get('launch').hidden = true;
    get('launch').setAttribute('aria-expanded', 'true'); get('question').focus();
  };
  get('close').onclick = close;
  const menu = document.getElementById(script.dataset.menuToggle || '');
  const sidebar = document.getElementById(script.dataset.sidebarToggle || '');
  const fab = menu?.labels?.[0];
  if (fab) {
    const alignFab = () => {
      const style = getComputedStyle(fab);
      host.style.setProperty('--chat-right', style.right);
      host.style.setProperty('--chat-launch-size', style.width);
      host.style.setProperty('--chat-fab-bottom', style.bottom);
    };
    window.addEventListener('resize', alignFab);
    alignFab();
  }
  if (menu || sidebar) {
    const syncMenu = () => {
      const navigationOpen = Boolean(menu?.checked || sidebar?.getAttribute('aria-expanded') === 'true');
      host.hidden = navigationOpen;
      if (navigationOpen) {
        get('chat').hidden = true; get('launch').hidden = false;
        get('launch').setAttribute('aria-expanded', 'false');
      }
    };
    menu?.addEventListener('change', syncMenu);
    if (sidebar) new MutationObserver(syncMenu).observe(sidebar, {
      attributes: true, attributeFilter: ['aria-expanded']
    });
    syncMenu();
  }
  root.addEventListener('keydown' , e => { if (e.key === 'Escape') close(); });
  function add(label, text) {
    const p = document.createElement('div');
    const strong = document.createElement('strong');
    p.className = 'message ' + (label === 'You' ? 'user' : 'assistant');
    strong.className = 'speaker';
    strong.textContent = label + ': '; p.append(strong);
    if (label !== 'You') {
      p.append(renderAnswer(text));
      get('log').append(p); get('log').scrollTop = get('log').scrollHeight;
      return;
    }
    // Link only URLs on the documentation site; generated HTML stays inert.
    const pattern = /https:\/\/dieghernan\.github\.io\/chulapa\/[a-zA-Z0-9_/#.-]+/g;
    let position = 0;
    for (const match of text.matchAll(pattern)) {
      p.append(document.createTextNode(text.slice(position, match.index)));
      const a = document.createElement('a');
      a.href = match[0]; a.textContent = match[0]; p.append(a);
      position = match.index + match[0].length;
    }
    p.append(document.createTextNode(text.slice(position)));
    get('log').append(p); get('log').scrollTop = get('log').scrollHeight;
  }
  root.querySelector('form').onsubmit = async e => {
    e.preventDefault();
    const message = get('question').value.trim();
    if (!message || get('send').disabled) return;
    add('You', message); get('question').value = '';
    get('send').disabled = true; get('status').textContent = 'Thinking…';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }), signal: controller.signal
      });
      const data = await response.json();
      if (!response.ok || typeof data.answer !== 'string') {
        throw new Error(data.error || 'AI is unavailable. Please use site search.');
      }
      add('Chulapa', data.answer); get('status').textContent = '';
    } catch (error) {
      get('status').textContent = error.name === 'AbortError'
        ? 'The request timed out. Please use site search.' : error.message;
    } finally { clearTimeout(timeout); get('send').disabled = false; }
  };
})();
