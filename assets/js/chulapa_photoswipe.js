const version = "5.4.4";
const cdn = `https://cdn.jsdelivr.net/npm/photoswipe@${version}/dist/`;

function loadStyles(root) {
  return new Promise((resolve, reject) => {
    const link = root.createElement("link");
    link.rel = "stylesheet";
    link.href = cdn + "photoswipe.css";
    const timer = setTimeout(() => { link.remove(); reject(new Error("PhotoSwipe stylesheet timed out")); }, 15000);
    link.onload = () => { clearTimeout(timer); resolve(); };
    link.onerror = () => { clearTimeout(timer); link.remove(); reject(new Error("PhotoSwipe stylesheet unavailable")); };
    root.head.append(link);
  });
}

async function measure(image, view) {
  if (image.naturalWidth && image.naturalHeight) return {width: image.naturalWidth, height: image.naturalHeight};
  return new Promise((resolve, reject) => {
    const probe = new view.Image();
    const timer = setTimeout(() => reject(new Error("Image dimensions timed out")), 15000);
    probe.onload = () => {
      clearTimeout(timer);
      if (!probe.naturalWidth || !probe.naturalHeight) reject(new Error("Image has no dimensions"));
      else resolve({width: probe.naturalWidth, height: probe.naturalHeight});
    };
    probe.onerror = () => { clearTimeout(timer); reject(new Error("Image unavailable")); };
    probe.src = image.currentSrc || image.src;
  });
}

// A page may contain multiple galleries, each with its own image sequence.
export function initializePhotoSwipe(root = document, load, navigate) {
  const view = root.defaultView;
  navigate = navigate || (url => view.location.assign(url));
  let assets;
  let styles;
  let busy = false;
  const loadAssets = load || (() => {
    if (!assets) {
      styles = styles || loadStyles(root).catch(error => { styles = null; throw error; });
      assets = Promise.all([import(cdn + "photoswipe.esm.min.js"), styles])
        .then(([module]) => module.default).catch(error => { assets = null; throw error; });
    }
    return assets;
  });
  for (const gallery of root.querySelectorAll("[data-photoswipe-gallery]")) {
    const links = Array.from(gallery.querySelectorAll("a.chulapa-photoswipe-item"));
    if (!links.length) continue;
    gallery.addEventListener("click", async event => {
      const trigger = event.target.closest("a.chulapa-photoswipe-item");
      const index = links.indexOf(trigger);
      if (index < 0 || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      if (busy) return;
      busy = true;
      // Keep the triggering carousel slide visible while its modal is open.
      const carousel = gallery.dataset.photoswipeGallery === "carousel" && view.jQuery ? view.jQuery(gallery) : null;
      const stopSlide = event => event.preventDefault();
      if (carousel) carousel.on("slide.bs.carousel", stopSlide);
      const release = () => { busy = false; if (carousel) carousel.off("slide.bs.carousel", stopSlide); };
      try {
        const image = trigger.querySelector("img");
        const [PhotoSwipe, dimensions] = await Promise.all([loadAssets(), measure(image, view)]);
        // An already-running Bootstrap transition cannot be cancelled by slide events.
        if (carousel && typeof carousel.carousel === "function" && gallery.querySelector?.(".carousel-item-next, .carousel-item-prev")) {
          await new Promise(resolve => carousel.one("slid.bs.carousel", resolve));
        }
        const dataSource = links.map(link => {
          const img = link.querySelector("img");
          return {src: link.href, msrc: img.currentSrc || img.src, alt: img.alt, element: link,
            width: img.naturalWidth || dimensions.width, height: img.naturalHeight || dimensions.height,
            pendingDimensions: !img.naturalWidth || !img.naturalHeight};
        });
        Object.assign(dataSource[index], dimensions, {pendingDimensions: false});
        const reduced = view.matchMedia && view.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const viewer = new PhotoSwipe({dataSource, index, returnFocus: false,
          showHideAnimationType: reduced ? "none" : "zoom", zoomAnimationDuration: reduced ? 0 : 333});
        // Offscreen lazy images are measured as PhotoSwipe loads them, not all at once.
        viewer.on("loadComplete", ({content}) => {
          const item = dataSource[content.index];
          if (!item?.pendingDimensions || !content.element?.naturalWidth) return;
          Object.assign(item, {width: content.element.naturalWidth, height: content.element.naturalHeight, pendingDimensions: false});
          view.requestAnimationFrame(() => { if (!viewer.isDestroying) viewer.refreshSlideContent(content.index); });
        });
        viewer.on("destroy", () => {
          release();
          const restore = () => view.requestAnimationFrame(() => trigger.focus({preventScroll: true}));
          const slide = trigger.closest?.(".carousel-item");
          if (carousel && typeof carousel.carousel === "function" && slide && !slide.classList.contains("active")) {
            carousel.one("slid.bs.carousel", restore);
            carousel.carousel(index);
          } else restore();
        });
        viewer.init();
        viewer.element.setAttribute("aria-modal", "true");
        viewer.element.setAttribute("aria-label", "Image gallery");
      } catch (error) {
        release();
        console.warn("Unable to open PhotoSwipe; opening the original image", error);
        navigate(trigger.href);
      }
    });
  }
}

if (typeof document !== "undefined") initializePhotoSwipe();
