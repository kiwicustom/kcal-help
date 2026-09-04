/**
 * Shared Help Platform chrome — header + footer + theme + language.
 * Brand must match beta.kcal.lol. Phase 2.5 golden polish.
 */
(function () {
  const root = document.documentElement;
  const script = document.currentScript;
  const page = (script && script.getAttribute("data-page")) || "site";
  const lang = (script && script.getAttribute("data-lang")) || "en";
  const base = (script && script.getAttribute("data-base")) || "";
  const file = (script && script.getAttribute("data-file")) || "index.html";
  const pageUpdated = (script && script.getAttribute("data-updated")) || "";

  const THEME_KEY = "kcal.help.colorMode";

  function resolveTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(mode) {
    root.setAttribute("data-color-mode", mode);
    localStorage.setItem(THEME_KEY, mode);
    const btn = document.getElementById("help-theme-toggle");
    if (btn) {
      btn.textContent = mode === "dark" ? "☀️" : "🌙";
      btn.setAttribute("aria-label", mode === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function href(path) {
    return base + path;
  }

  const nav = [
    ["help", "help/index.html", "Help"],
    ["academy", "academy/index.html", "Academy"],
    ["docs", "docs/index.html", "Docs"],
  ];

  const navHtml = nav
    .map(([id, path, label]) => {
      const cur = page === id ? ' aria-current="page"' : "";
      return `<a href="${href(path)}"${cur}>${label}</a>`;
    })
    .join("");

  // Language: EN / DE / FI — flex-centered group (no padding hacks)
  const langSwitch = `
    <div class="help-lang-switch" role="group" aria-label="Language">
      <a class="help-lang" href="${href("index.html")}" ${lang === "en" ? 'aria-current="true"' : ""}>EN</a>
      <a class="help-lang" href="${href("de/index.html")}" ${lang === "de" ? 'aria-current="true"' : ""}>DE</a>
      <span class="help-lang help-lang--soon" title="Suomi — coming soon" aria-disabled="true">FI</span>
    </div>`;

  const sub =
    page === "academy" ? "Academy" : page === "docs" ? "Docs" : page === "help" ? "Help" : "Help Platform";

  const header = `
<header class="help-header" role="banner">
  <div class="help-header__inner">
    <a class="help-brand" href="${href("index.html")}">
      <img class="help-brand__mark" src="${href("assets/brand/kcal-buddy-192.png")}" width="36" height="36" alt="" />
      <span class="help-brand__text">
        <span class="help-brand__name">kCal Buddy</span>
        <span class="help-brand__sub">${sub}</span>
      </span>
    </a>
    <nav class="help-nav" aria-label="Primary">${navHtml}</nav>
    <div class="help-header__tools">
      <button type="button" class="help-icon-btn" id="help-search-hook" data-ext="search" aria-label="Search (coming soon)" title="Search — Phase B">🔍</button>
      <button type="button" class="help-icon-btn" id="help-theme-toggle" aria-label="Toggle color mode">🌙</button>
      ${langSwitch}
    </div>
  </div>
  <nav class="help-nav-mobile" aria-label="Primary mobile">${navHtml}</nav>
</header>`;

  const footer = `
<footer class="help-footer" role="contentinfo">
  <div class="help-footer__inner">
    <p class="help-footer__brand">kCal Buddy</p>
    <p class="help-footer__tagline">Helping people build healthier habits every day.</p>
    <div class="help-footer__grid">
      <div class="help-footer__col">
        <h3>Learn</h3>
        <ul>
          <li><a href="${href("academy/index.html")}">Buddy Academy</a></li>
          <li><a href="${href("help/index.html")}">Help</a></li>
          <li><a href="${href("docs/index.html")}">Developer Docs</a></li>
          <li><a href="${href("docs/release-notes.html")}">Release Notes</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>Legal</h3>
        <ul>
          <li><a href="https://beta.kcal.lol/#/privacy">Privacy</a></li>
          <li><a href="https://beta.kcal.lol/#/terms">Terms</a></li>
          <li><a href="mailto:hello@kcal.lol">Contact</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>Product</h3>
        <ul>
          <li><span class="help-footer__muted">Beta is invitation-only</span></li>
          <li><a href="mailto:hello@kcal.lol">Feedback</a></li>
        </ul>
      </div>
    </div>
    <div class="help-footer__meta" id="help-footer-meta">
      <div><span class="help-footer__meta-label">Version</span> <span data-v="app">…</span></div>
      <div><span class="help-footer__meta-label">Documentation Version</span> <span data-v="docs">…</span></div>
      <div><span class="help-footer__meta-label">Last Updated</span> <span data-v="updated">${pageUpdated || "…"}</span></div>
    </div>
    <p class="help-footer__copy">© ${new Date().getFullYear()} kcal.lol · kiwicustom GmbH</p>
  </div>
</footer>`;

  const mountHeader = document.getElementById("help-shell-header");
  const mountFooter = document.getElementById("help-shell-footer");
  if (mountHeader) mountHeader.outerHTML = header;
  if (mountFooter) mountFooter.outerHTML = footer;

  applyTheme(resolveTheme());
  document.getElementById("help-theme-toggle")?.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-color-mode") === "dark" ? "light" : "dark");
  });

  document.getElementById("help-search-hook")?.addEventListener("click", () => {
    window.KcalHelpExtensions?.openSearch?.();
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      window.KcalHelpExtensions?.openSearch?.();
    }
  });

  fetch(href("version.json"))
    .then((r) => r.json())
    .then((v) => {
      const meta = document.getElementById("help-footer-meta");
      if (!meta) return;
      const app = meta.querySelector('[data-v="app"]');
      const docs = meta.querySelector('[data-v="docs"]');
      const upd = meta.querySelector('[data-v="updated"]');
      if (app) app.textContent = v.version || "—";
      if (docs) docs.textContent = v.docsVersion || "1.1.0-phase2";
      if (upd && (!pageUpdated || upd.textContent === "…")) upd.textContent = v.builtAt || v.generatedAt?.slice(0, 10) || "—";
    })
    .catch(() => {});
})();
