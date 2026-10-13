// Bootstrap supplies slide transitions; this controller owns automatic motion.
(function () {
  function setup() {
    if (!window.jQuery || typeof window.jQuery.fn.carousel !== 'function') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverEnabled = window.matchMedia('(hover: hover)').matches;
    document.querySelectorAll('[data-chulapa-carousel="true"]').forEach(carousel => {
      if (carousel.dataset.chulapaCarouselReady) return;
      carousel.dataset.chulapaCarouselReady = 'true';
      const slides = Array.from(carousel.querySelectorAll('.carousel-item'));
      const indicators = Array.from(carousel.querySelectorAll('.carousel-indicators button'));
      const controls = Array.from(carousel.querySelectorAll('[data-slide], [data-slide-to]'));
      const toggle = carousel.querySelector('.chulapa-carousel-toggle');
      const inner = carousel.querySelector('.carousel-inner');
      const symbol = toggle.querySelector('.chulapa-carousel-symbol');
      const icon = symbol && symbol.querySelector('i');
      const fallback = symbol && symbol.querySelector('.chulapa-carousel-fallback');
      function checkIconFont() {
        if (!icon || !document.fonts) return;
        const style = getComputedStyle(icon, '::before');
        const available = /Awesome/i.test(style.fontFamily) && style.content !== 'none' && style.content !== 'normal' &&
          Array.from(document.fonts).some(font => font.status === 'loaded' && /Awesome/i.test(font.family) &&
            style.fontFamily.includes(font.family.replace(/["']/g, ''))) &&
          document.fonts.check(style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily);
        symbol.classList.toggle('has-icon-font', available);
      }
      if (document.fonts && icon) {
        document.fonts.ready.then(() => {
          const style = getComputedStyle(icon, '::before');
          if (/Awesome/i.test(style.fontFamily)) {
            document.fonts.load(style.fontWeight + ' ' + style.fontSize + ' ' + style.fontFamily, '\uf04b\uf04c')
              .then(checkIconFont, () => {});
          }
          checkIconFont();
        });
        document.fonts.addEventListener('loadingdone', checkIconFont);
      }
      const interval = Number(carousel.getAttribute('data-interval'));
      const automatic = slides.length > 1 && Number.isFinite(interval) && interval > 0;
      const widget = window.jQuery(carousel);
      let paused = reduced.matches;
      let hovered = hoverEnabled && carousel.matches(':hover');
      // Cached includes can repeat an ID; route each control to its own instance.
      const originalId = carousel.id;
      let suffix = 2;
      while (document.getElementById(carousel.id) !== carousel) carousel.id = originalId + '-' + suffix++;
      controls.forEach(control => control.setAttribute('data-target', '#' + carousel.id));
      widget.carousel({ interval: automatic ? interval : false, ride: false, pause: false });
      function updateSlides() {
        slides.forEach((slide, index) => {
          const active = slide.classList.contains('active');
          if (indicators[index]) {
            if (active) indicators[index].setAttribute('aria-current', 'true');
            else indicators[index].removeAttribute('aria-current');
          }
        });
      }
      function updateMotion() {
        const running = automatic && !paused && !hovered;
        widget.carousel(running ? 'cycle' : 'pause');
        inner.setAttribute('aria-live', running ? 'off' : 'polite');
        toggle.setAttribute('aria-label', paused ? 'Start slideshow' : 'Pause slideshow');
        if (symbol) {
          const visibleIcon = symbol.querySelector('i, svg');
          if (visibleIcon) {
            if (visibleIcon.tagName.toLowerCase() === 'svg' && visibleIcon.getAttribute('data-icon') !== (paused ? 'play' : 'pause')) {
              const replacement = document.createElement('i');
              replacement.className = 'fa fas ' + (paused ? 'fa-play' : 'fa-pause');
              visibleIcon.replaceWith(replacement);
            } else {
              visibleIcon.classList.toggle('fa-play', paused);
              visibleIcon.classList.toggle('fa-pause', !paused);
            }
          }
          fallback.textContent = paused ? '▶' : 'Ⅱ';
        } else {
          toggle.textContent = paused ? 'Start slideshow' : 'Pause slideshow';
        }
      }
      toggle.hidden = !automatic;
      toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
      controls.forEach(control => {
        control.addEventListener('click', event => {
          event.preventDefault();
          event.stopPropagation();
          const index = control.getAttribute('data-slide-to');
          widget.carousel(index === null ? control.getAttribute('data-slide') : Number(index));
          // Bootstrap's to(currentIndex) otherwise restarts a paused carousel.
          updateMotion();
        });
      });
      carousel.addEventListener('focusin', event => {
        if (!toggle.contains(event.target)) { paused = true; updateMotion(); }
      });
      carousel.addEventListener('pointerdown', event => {
        if (!toggle.contains(event.target)) { paused = true; updateMotion(); }
      });
      carousel.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { paused = true; updateMotion(); }
      }, true);
      carousel.addEventListener('mouseenter', () => { if (hoverEnabled) { hovered = true; updateMotion(); } });
      carousel.addEventListener('mouseleave', () => { if (hoverEnabled) { hovered = false; updateMotion(); } });
      function preferenceChanged(event) {
        if (event.matches) { paused = true; updateMotion(); }
      }
      if (typeof reduced.addEventListener === 'function') reduced.addEventListener('change', preferenceChanged);
      else if (typeof reduced.addListener === 'function') reduced.addListener(preferenceChanged);
      widget.on('slid.bs.carousel', updateSlides);
      updateSlides();
      updateMotion();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
