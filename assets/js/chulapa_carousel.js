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
        toggle.textContent = paused ? 'Start slideshow' : 'Pause slideshow';
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
        if (event.target !== toggle) { paused = true; updateMotion(); }
      });
      carousel.addEventListener('pointerdown', event => {
        if (event.target !== toggle) { paused = true; updateMotion(); }
      });
      carousel.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { paused = true; updateMotion(); }
      }, true);
      carousel.addEventListener('mouseenter', () => { if (hoverEnabled) { hovered = true; updateMotion(); } });
      carousel.addEventListener('mouseleave', () => { if (hoverEnabled) { hovered = false; updateMotion(); } });
      reduced.addEventListener('change', event => {
        if (event.matches) { paused = true; updateMotion(); }
      });
      widget.on('slid.bs.carousel', updateSlides);
      updateSlides();
      updateMotion();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
