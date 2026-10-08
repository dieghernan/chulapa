import { marked } from 'marked';
import createDOMPurify from 'dompurify';

export function createAnswerRenderer(window) {
  const purifier = createDOMPurify(window);
  purifier.addHook('uponSanitizeAttribute', (node, attribute) => {
    if (attribute.attrName !== 'href') return;
    try {
      const url = new URL(attribute.attrValue);
      attribute.keepAttr = url.origin === 'https://dieghernan.github.io'
        && url.pathname.startsWith('/chulapa/') && !url.username && !url.password;
    } catch {
      attribute.keepAttr = false;
    }
  });
  return text => {
    const fragment = purifier.sanitize(marked.parse(text, { gfm: true, async: false }), {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'del', 'ul', 'ol', 'li', 'pre', 'code',
      'blockquote', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'title', 'start'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    RETURN_DOM_FRAGMENT: true
    });
    // Add only trusted branding nodes after sanitization; never interpret new HTML.
    const walker = window.document.createTreeWalker(fragment, window.NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (node.parentElement?.closest('pre,code,a')) continue;
      const matches = [...node.textContent.matchAll(/(?<![\p{L}\p{N}_./-])Chulapa(?![\p{L}\p{N}_./-])/giu)];
      if (!matches.length) continue;
      const replacement = window.document.createDocumentFragment();
      let position = 0;
      for (const match of matches) {
        replacement.append(window.document.createTextNode(node.textContent.slice(position, match.index)));
        const brand = window.document.createElement('span');
        brand.className = 'chulapa';
        brand.textContent = 'Chulapa';
        replacement.append(brand);
        position = match.index + match[0].length;
      }
      replacement.append(window.document.createTextNode(node.textContent.slice(position)));
      node.replaceWith(replacement);
    }
    return fragment;
  };
}
