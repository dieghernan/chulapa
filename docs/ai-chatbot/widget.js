import { createAnswerRenderer } from './render-answer.mjs';
import sparkles from './sparkles.svg';

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
    .fa-solid{font-family:"Font Awesome 7 Free","Font Awesome 6 Free","Font Awesome 5 Free";font-style:normal;font-weight:900;line-height:1}.fa-paper-plane::before{content:"\\f1d8"}
    .sparkles{display:inline-block;width:1em;height:1em;vertical-align:-.1em}#launch .sparkles{width:1.65rem;height:1.65rem}
    :host([data-position="left"]) #launch{left:1rem;right:auto}
    :host([data-position="center"]) #launch{left:50%;right:auto;transform:translateX(-50%)}
    section{position:fixed;bottom:1rem;right:var(--chat-right,1rem);z-index:21000;width:min(25rem,calc(100vw - 2 * var(--chat-right,1rem)));height:30rem;max-height:calc(100dvh - 2rem);background:var(--surface);border:1px solid var(--line);border-radius:1rem;box-shadow:0 12px 40px #0003;display:flex;flex-direction:column;overflow:hidden}
    header{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1rem 1.1rem;border-bottom:1px solid var(--line);flex-shrink:0}
    h2{font-size:1rem;margin:0 0 .25rem;font-weight:650}.subtitle{margin:0;color:var(--muted);font-size:.8rem}
    .chulapa{font-family:chulapa,sans-serif;font-weight:400;font-feature-settings:"liga","dlig";text-rendering:optimizeLegibility}
    #close{background:transparent;color:var(--muted);border-radius:.5rem;font-size:1.5rem;line-height:1;width:2.75rem;height:2.75rem;flex-shrink:0}#close:hover{background:var(--bubble)}
    #clear,.copy-code{background:transparent;color:var(--primary,#285d70);border:1px solid var(--line);border-radius:.4rem;padding:.4rem .6rem;font-size:.8rem;min-height:2.75rem}#clear{margin-top:.25rem}.copy-code{display:block;margin:.5rem 0}
    #log{padding:1rem;overflow:auto;min-height:0;flex:1 1 0;overscroll-behavior:contain;contain:paint;display:flex;flex-direction:column;gap:.75rem}
    .message{white-space:pre-wrap;overflow-wrap:anywhere;margin:0;padding:.7rem .85rem;border-radius:.85rem;background:var(--bubble);max-width:92%;align-self:flex-start;flex-shrink:0}
    .message.user{background:var(--primary,#285d70);color:#fff;align-self:flex-end;border-bottom-right-radius:.25rem}.message.assistant{border-bottom-left-radius:.25rem}
    .message.assistant{white-space:normal}.message p{margin:0 0 .65rem}.message p:last-child{margin-bottom:0}.message ul,.message ol{padding-left:1.3rem;margin:.5rem 0}.message li+li{margin-top:.25rem}
    .message code{font: .85em/1.5 ui-monospace,Consolas,monospace;background:#0000000b;padding:.1em .25em;border-radius:.2rem}.message pre{max-width:100%;overflow:auto;padding:.75rem;background:#0000000b;border-radius:.5rem;white-space:pre;margin:.65rem 0}.message pre code{padding:0;background:none}
    .message blockquote{border-left:3px solid var(--muted);padding-left:.75rem;margin:.65rem 0;color:var(--muted)}.message h1,.message h2,.message h3,.message h4,.message h5,.message h6{font-size:1em;margin:.75rem 0 .4rem}.message table{display:block;max-width:100%;overflow:auto;border-collapse:collapse}.message th,.message td{border:1px solid var(--muted);padding:.3rem .5rem}
    .speaker,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    a{color:var(--primary,#285d70)}.user a{color:inherit;text-decoration:underline}
    footer{flex-shrink:0;border-top:1px solid var(--line)}small{display:block;color:var(--muted);font-size:.8rem;padding:0 1rem .75rem;line-height:1.45}
    #hint{margin:0;padding:.65rem 1rem;font-size:.8rem;color:var(--muted)}#recovery{padding:0 1rem .65rem;font-size:.85rem}#retry{padding:.5rem .75rem;border-radius:.4rem;min-height:2.75rem;margin-right:.5rem}
    form{display:flex;align-items:center;gap:.5rem;padding:.75rem 1rem}input{min-width:0;flex:1;padding:.7rem .8rem;border:1px solid #aab2b9;border-radius:.65rem;background:var(--surface);color:inherit}input::placeholder{color:var(--muted)}
    #send{width:2.75rem;height:2.75rem;flex-shrink:0;border-radius:.65rem;font-size:1.3rem}#status{padding:0 1rem;color:var(--muted);font-size:.8rem}#status:not(:empty){padding-bottom:.65rem}button:disabled{opacity:.6;cursor:wait}
    @media(max-width:991.98px){#launch{left:var(--chat-right,1rem);right:auto;bottom:var(--chat-fab-bottom,1rem);transform:none}}
    .mobile-notice{display:none}
    @media(max-width:991.98px){section{bottom:calc(1rem + var(--chat-keyboard-inset,0px));max-height:calc(var(--chat-visible-height,100dvh) - 2rem)}input,.message{font-size:16px}.desktop-notice{display:none}.mobile-notice{display:inline}}
    @media(max-width:575px){section{height:auto}#log{flex-basis:auto;max-height:calc(var(--chat-visible-height,100dvh) * .4)}header{padding:.65rem 1rem}.subtitle{display:none}}
    @media(max-height:500px){header{padding:.4rem 1rem}header>div{display:flex;align-items:center;gap:.75rem}h2{margin:0}.subtitle{display:none}#clear{margin:0}#hint{padding:.25rem 1rem}form{padding:.4rem 1rem}}
    :host([data-compact]) section{top:calc(var(--chat-visible-top,0px) + 8px);bottom:auto;height:auto;max-height:calc(var(--chat-visible-height,100dvh) - 16px)}
    :host([data-compact]) header,:host([data-compact]) footer{display:contents}
    :host([data-compact]) header>div,:host([data-compact]) #log,:host([data-compact]) #hint,:host([data-compact]) small{display:none}
    :host([data-compact]) #close{position:absolute;right:.5rem;top:.5rem}
    :host([data-compact]) form{order:-1;padding:.5rem 3.5rem .5rem .5rem}
    @media(prefers-color-scheme:dark){:host{color:#eef3f5;--surface:#1d2b33;--muted:#bac7cf;--line:#36454e;--bubble:#2a3b45}a{color:#a8dae8}}
  </style>
  <button id="launch" aria-label="Ask AI" title="Ask Chulapa AI" aria-expanded="false" aria-controls="chat">${sparkles}</button>
  <section id="chat" hidden role="region" aria-labelledby="title">
    <header><div><h2 id="title">Ask <span class="chulapa">Chulapa</span> ${sparkles}</h2><p class="subtitle">Help with your site, straight from the docs.</p><button id="clear" type="button">Clear chat</button></div><button id="close" aria-label="Close chat">&#215;</button></header>
    <div id="log" role="log" aria-live="polite" aria-relevant="additions"><p class="message assistant">Hi! Ask me about <span class="chulapa">Chulapa</span>'s setup, layouts or features.</p></div>
    <div id="status" role="status"></div>
    <div id="recovery" hidden><button id="retry" type="button">Retry question</button><a id="error-search">Search the docs</a></div>
    <footer>
      <p id="hint">Each question is independent. Include all the details.</p>
      <form><label class="sr-only" for="question">Your question</label><input id="question" aria-describedby="hint" placeholder="Ask a complete question..." maxlength="1000" required autocomplete="off"><button id="send" aria-label="Send question"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i></button></form>
      <small><span class="desktop-notice">Cloudflare AI. Answers may be wrong. Recent history stays in this tab for this session. </span><span class="mobile-notice">Cloudflare AI · May be wrong · </span><a id="search" aria-label="Search the docs"><span class="desktop-notice">Search the docs</span><span class="mobile-notice">Docs</span></a></small>
    </footer>
  </section>`;
  document.body.append(host);
  const get = id => root.getElementById(id);
  const storageKey = 'chulapa-docs-chat:v1';
  const greeting = get('log').innerHTML;
  let history = [];
  let failedQuestion = '';
  let busy = false;
  let restoredScroll = 0;
  let restoredOpen = false;
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (saved) {
      history = Array.isArray(saved.history) ? saved.history.filter(item =>
        item && ['You', 'Chulapa'].includes(item.label) && typeof item.text === 'string'
        && item.text.length <= 6000).slice(-20) : [];
      get('question').value = typeof saved.draft === 'string' ? saved.draft.slice(0, 1000) : '';
      failedQuestion = typeof saved.failedQuestion === 'string' ? saved.failedQuestion.slice(0, 1000) : '';
      restoredScroll = Number.isFinite(saved.scroll) ? Math.max(0, saved.scroll) : 0;
      restoredOpen = saved.open === true;
    }
  } catch { /* Storage may be unavailable; the chat still works. */ }
  const save = () => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ history, draft: get('question').value,
        failedQuestion, scroll: get('log').scrollTop, open: !get('chat').hidden }));
    } catch { /* Continue without persistence if storage is blocked or full. */ }
  };
  get('question').addEventListener('input', save);
  get('log').addEventListener('scroll', save);
  const visibleViewport = window.visualViewport;
  if (visibleViewport) {
    const fitViewport = () => {
      // Account for the keyboard, while allowing visitors to zoom normally.
      if (Math.abs(visibleViewport.scale - 1) > .01) {
        host.style.removeProperty('--chat-visible-height');
        host.style.removeProperty('--chat-keyboard-inset');
        host.style.removeProperty('--chat-visible-top');
        host.removeAttribute('data-compact');
        return;
      }
      host.style.setProperty('--chat-visible-height', `${visibleViewport.height}px`);
      host.style.setProperty('--chat-visible-top', `${visibleViewport.offsetTop}px`);
      host.toggleAttribute('data-compact', visibleViewport.height < 260);
      const inset = Math.max(0, window.innerHeight - visibleViewport.height - visibleViewport.offsetTop);
      host.style.setProperty('--chat-keyboard-inset', `${inset}px`);
    };
    visibleViewport.addEventListener('resize', fitViewport);
    visibleViewport.addEventListener('scroll', fitViewport);
    window.addEventListener('resize', fitViewport);
    fitViewport();
  }
  get('search').href = search;
  get('error-search').href = search;
  const close = () => {
    get('chat').hidden = true; get('launch').hidden = false;
    get('launch').setAttribute('aria-expanded', 'false'); get('launch').focus();
    save();
  };
  get('launch').onclick = () => {
    get('chat').hidden = false; get('launch').hidden = true;
    get('launch').setAttribute('aria-expanded', 'true');
    if (window.matchMedia('(max-width:991.98px)').matches) get('close').focus({ preventScroll: true });
    else get('question').focus({ preventScroll: true });
    save();
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
  get('clear').onclick = () => {
    if (busy) return;
    history = []; failedQuestion = '';
    get('question').value = ''; get('log').innerHTML = greeting;
    get('recovery').hidden = true; get('status').textContent = 'History cleared.';
    save();
  };
  function add(label, text, { restoring = false, reveal = false } = {}) {
    const log = get('log');
    const oldScroll = log.scrollTop;
    const atEnd = log.scrollHeight - log.clientHeight - oldScroll < 48;
    const p = document.createElement('div');
    const strong = document.createElement('strong');
    p.className = 'message ' + (label === 'You' ? 'user' : 'assistant');
    strong.className = 'speaker';
    strong.textContent = label + ': '; p.append(strong);
    if (label !== 'You') {
      p.append(renderAnswer(text));
      for (const pre of p.querySelectorAll('pre')) {
        const code = pre.querySelector('code')?.textContent || pre.textContent;
        const copy = document.createElement('button');
        copy.type = 'button'; copy.className = 'copy-code'; copy.textContent = 'Copy code';
        copy.onclick = async () => {
          try {
            await navigator.clipboard.writeText(code);
            copy.textContent = 'Copied'; get('status').textContent = 'Code copied.';
          } catch {
            copy.textContent = 'Copy unavailable';
            get('status').textContent = 'Could not copy. Select the code and copy it manually.';
          }
        };
        pre.before(copy);
      }
    } else {
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
    }
    log.append(p);
    if (!restoring) {
      history.push({ label, text }); history = history.slice(-20);
      if (reveal || atEnd) log.scrollTop = Math.max(0,
        oldScroll + p.getBoundingClientRect().top - log.getBoundingClientRect().top - 16);
      else log.scrollTop = oldScroll;
      save();
    }
  }
  for (const item of history) add(item.label, item.text, { restoring: true });
  if (restoredOpen && !host.hidden) {
    get('chat').hidden = false; get('launch').hidden = true;
    get('launch').setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => { get('log').scrollTop = restoredScroll; });
  }
  if (failedQuestion) {
    get('recovery').hidden = false;
    get('status').textContent = 'Your last question has no completed answer. You can retry it.';
  }
  async function submit(message, retry = false) {
    if (!message || busy) return;
    busy = true;
    if (!retry) { add('You', message, { reveal: true }); get('question').value = ''; }
    failedQuestion = message; save();
    get('clear').disabled = true; get('retry').disabled = true; get('recovery').hidden = true;
    get('send').disabled = true; get('status').textContent = 'Thinking…';
    const submittedScroll = get('log').scrollTop;
    const waiting = setTimeout(() => { get('status').textContent = 'Still working on your answer…'; }, 10000);
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
      clearTimeout(waiting);
      const reveal = Math.abs(get('log').scrollTop - submittedScroll) < 2;
      add('Chulapa', data.answer, { reveal });
      failedQuestion = '';
      get('status').textContent = reveal ? '' : 'New answer below. Scroll down to read it.';
    } catch (error) {
      get('status').textContent = error.name === 'AbortError'
        ? 'The request timed out. Retry your question or search the docs.'
        : error instanceof TypeError ? 'Could not connect. Retry your question or search the docs.' : error.message;
      get('recovery').hidden = false;
    } finally {
      clearTimeout(timeout); clearTimeout(waiting); busy = false;
      get('send').disabled = false; get('retry').disabled = false; get('clear').disabled = false;
      if (host.hasAttribute('data-compact') && root.activeElement === get('question')) get('question').blur();
      save();
    }
  }
  root.querySelector('form').onsubmit = e => {
    e.preventDefault(); submit(get('question').value.trim());
  };
  get('retry').onclick = () => submit(failedQuestion, true);
})();
