import { marked } from 'marked';
import { answerSourceUrls } from './context-selector.mjs';

// These checks cover specific observed failures, not general semantic accuracy.
// Analysis of invalid syntax and blockquoted examples must remain faithful.
export function answerViolations(answer, question) {
  const issues = new Set();
  const tocTask = /toc|table of contents|[ií]ndice/i.test(question) &&
    /article|content|markdown|heading|art[ií]culo|encabezad/i.test(question);
  const suppliedSyntax = /\{\s*(?::\s*)?\.no_toc\s*\}|\{:\s*toc\s*\}|\bkramdown\s*:|\btoc_levels\s*:/.test(question);
  const analysisIntent = /why|invalid|incorrect|wrong|debug|error|fix|correct|is .*valid|por qu[eé]|corrig|es .*v[aá]lid|explain (?:this|the) (?:syntax|code|snippet|example)|explica (?:este|el) (?:c[oó]digo|ejemplo|error)/i.test(question);
  const discussesSyntax = suppliedSyntax && analysisIntent;
  if (tocTask && !discussesSyntax) {
    function visit(token) {
      if (token.type === 'blockquote') return;
      const language = (token.lang || '').toLowerCase().split(/\s/)[0];
      if (token.type === 'codespan' || (token.type === 'code' && ['', 'markdown', 'md'].includes(language))) {
        if (/\{\s*\.no_toc\s*\}/.test(token.text)) issues.add('invalid_heading_exclusion');
      }
      if (token.type === 'code' && ['yaml', 'yml'].includes(language) &&
          /^[ \t]*kramdown:[ \t]+toc_levels:/m.test(token.text)) issues.add('invalid_toc_mapping');
      for (const child of [...(token.tokens || []), ...(token.items || [])]) visit(child);
    }
    for (const token of marked.lexer(answer)) visit(token);
  }
  const guideDiscovery = /guides?|documentation|docs|gu[ií]as/i.test(question) &&
    /search|b[uú]squeda/i.test(question) && /cards?|tarjetas?/i.test(question);
  if (guideDiscovery) {
    const sources = new Set(answerSourceUrls(answer));
    const required = ['https://dieghernan.github.io/chulapa/docs/tags'];
    if (/exclud|exclusion|exclu/i.test(question)) required.push('https://dieghernan.github.io/chulapa/docs/65-search-visibility');
    if (required.some(url => !sources.has(url))) issues.add('missing_discovery_sources');
  }
  return [...issues];
}
