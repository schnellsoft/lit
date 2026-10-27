(function bindSiteNav() {
  if (window.__siteNavBound) return;
  window.__siteNavBound = true;

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(".site-menu-toggle");
    if (toggle) {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      return;
    }
    if (event.target.closest(".site-nav a")) {
      const toggleButton = document.querySelector(".site-menu-toggle");
      if (!toggleButton) return;
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.setAttribute("aria-label", "Open navigation menu");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const toggle = document.querySelector('.site-menu-toggle[aria-expanded="true"]');
    if (!toggle) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.focus();
  });
})();
