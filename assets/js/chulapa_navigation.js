(function () {
  if (typeof window !== "undefined") {
    const fallback = document.querySelector?.(".chulapa-classic-fallback");
    const bootstrap = window.jQuery?.fn;
    const ready = typeof bootstrap?.collapse === "function" && typeof bootstrap.dropdown === "function";
    // Once the loading deadline reveals the native menu, keep it for this page.
    if (ready && (!fallback || window.getComputedStyle(fallback).visibility === "hidden")) {
      if (fallback) fallback.hidden = true;
      document.querySelectorAll("[data-classic-nav-control]").forEach(control => {
        control.removeAttribute("aria-hidden");
        control.removeAttribute("inert");
      });
    } else if (!ready && fallback) {
      fallback.closest(".navbar-chulapa").setAttribute("data-classic-fallback-unavailable", "");
    }
  }

// Floating navigation uses a keyboard-operable button; the lateral TOC is independent.
var navigationButton = document.getElementById("navi-toggle");
var navigationMenu = document.getElementById("navi-menu");
if (navigationButton && navigationMenu) {
  var pendingFocus;
  function cancelInitialFocus() {
    if (pendingFocus) navigationMenu.removeEventListener("transitionend", pendingFocus);
    pendingFocus = null;
  }
  function setFloatingNavigation(open, returnFocus) {
    cancelInitialFocus();
    navigationButton.setAttribute("aria-expanded", String(open));
    navigationMenu.setAttribute("aria-hidden", String(!open));
    navigationMenu.inert = !open;
    if (open) {
      var firstLink = navigationMenu.querySelector("a, button");
      if (firstLink) {
        var previousFocus = document.activeElement;
        firstLink.focus();
        // Animated visibility may still be hidden during the initiating click.
        if (document.activeElement !== firstLink) {
          pendingFocus = function (event) {
            if (event.target !== navigationMenu) return;
            cancelInitialFocus();
            if (navigationButton.getAttribute("aria-expanded") === "true" && document.activeElement === previousFocus) firstLink.focus();
          };
          navigationMenu.addEventListener("transitionend", pendingFocus);
        }
      }
    } else if (returnFocus) {
      navigationButton.focus();
    }
  }
  navigationButton.addEventListener("click", function () {
    setFloatingNavigation(navigationButton.getAttribute("aria-expanded") !== "true", true);
  });
  navigationMenu.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      setFloatingNavigation(false, true);
    }
  });
  navigationButton.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setFloatingNavigation(false, true);
    }
  });
  navigationMenu.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (link && !link.hasAttribute("data-toggle")) {
      setFloatingNavigation(false, true);
    }
  });
  navigationMenu.addEventListener("focusout", function () {
    setTimeout(function () {
      if (!navigationMenu.contains(document.activeElement) &&
          document.activeElement !== navigationButton) {
        setFloatingNavigation(false, false);
      }
    }, 0);
  });
  window.addEventListener("resize", function () {
    if (navigationButton.getClientRects().length === 0) {
      setFloatingNavigation(false, false);
    }
  });
}

})();
