// Compatibility entry point: use the maintained clipboard implementation.
(function () {
  var source = document.currentScript;
  function setup() {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { ch_clipboard_setup(document); }, {once: true});
    else ch_clipboard_setup(document);
  }
  if (typeof ch_clipboard_setup === "function") { setup(); return; }
  var url = new URL("../chulapa_script.js", source.src).href;
  var script = Array.from(document.scripts).find(function (item) { return item.src === url; });
  if (!script) {
    script = document.createElement("script");
    script.src = url;
    script.setAttribute("data-clipboard-only", "true");
    script.addEventListener("load", setup);
    (document.body || document.head).append(script);
  } else script.addEventListener("load", setup, {once: true});
})();
