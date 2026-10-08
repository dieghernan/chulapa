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
  return text => purifier.sanitize(marked.parse(text, { gfm: true, async: false }), {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'del', 'ul', 'ol', 'li', 'pre', 'code',
      'blockquote', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    ALLOWED_ATTR: ['href', 'title', 'start'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    RETURN_DOM_FRAGMENT: true
  });
}
