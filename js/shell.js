/**
 * Shared Help Platform chrome — header + footer + theme + language.
 * Brand must match beta.kcal.lol.
 * EN/DE share the same IA; chrome language persists via localStorage when
 * browsing EN content pages after choosing DE (translations still incomplete).
 */
(function () {
  const root = document.documentElement;
  const script = document.currentScript;
  const page = (script && script.getAttribute("data-page")) || "site";
  const base = (script && script.getAttribute("data-base")) || "";
  const pageUpdated = (script && script.getAttribute("data-updated")) || "";

  const THEME_KEY = "kcal.help.colorMode";
  const LANG_KEY = "kcal.help.lang";

  const assetVer =
    document.querySelector('meta[name="kcal:asset-ver"]')?.getAttribute("content") || "";

  function resolveLang() {
    const pathDe = /\/de(\/|$)/i.test(location.pathname);
    const attr = (script && script.getAttribute("data-lang")) || "";
    const stored = localStorage.getItem(LANG_KEY) || "";
    let lang = "en";
    if (pathDe) lang = "de";
    else if (attr === "de" || attr === "en") lang = attr;
    else if (stored === "de" || stored === "en") lang = stored;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (_) {}
    return lang;
  }

  const lang = resolveLang();
  const de = lang === "de";

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
    let url = base + path;
    if (!assetVer) return url;
    if (/^(https?:|mailto:)/i.test(url)) return url;
    url += url.includes("?") ? "&" : "?";
    url += "v=" + encodeURIComponent(assetVer);
    return url;
  }

  const homePath = de ? "de/index.html" : "index.html";
  const helpPath = "help/index.html";
  const academyPath = "academy/index.html";
  const releaseNotesPath = "docs/release-notes.html";

  const labels = de
    ? {
        help: "Hilfe",
        academy: "Academy",
        docs: "Docs",
        docsTitle: "Entwickler-Docs — demnächst",
        releaseNotes: "Release Notes",
        learn: "Lernen",
        academyLink: "Buddy Academy",
        helpLink: "Hilfe",
        docsLink: "Entwickler-Docs",
        docsSoon: "Demnächst",
        legal: "Rechtliches",
        privacy: "Datenschutz",
        terms: "AGB",
        contact: "Kontakt",
        product: "Produkt",
        beta: "Beta nur auf Einladung",
        feedback: "Feedback",
        version: "Version",
        docsVersion: "Dokumentations-Version",
        updated: "Zuletzt aktualisiert",
        subHelp: "Hilfe",
        subAcademy: "Academy",
        subDocs: "Docs",
        subRelease: "Release Notes",
        subSite: "Hilfe-Plattform",
        searchSoon: "Suche (demnächst)",
        tagline: "Helping people build healthier habits every day.",
      }
    : {
        help: "Help",
        academy: "Academy",
        docs: "Docs",
        docsTitle: "Developer Docs — coming soon",
        releaseNotes: "Release Notes",
        learn: "Learn",
        academyLink: "Buddy Academy",
        helpLink: "Help",
        docsLink: "Developer Docs",
        docsSoon: "Coming soon",
        legal: "Legal",
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
        product: "Product",
        beta: "Beta is invitation-only",
        feedback: "Feedback",
        version: "Version",
        docsVersion: "Documentation Version",
        updated: "Last Updated",
        subHelp: "Help",
        subAcademy: "Academy",
        subDocs: "Docs",
        subRelease: "Release Notes",
        subSite: "Help Platform",
        searchSoon: "Search (coming soon)",
        tagline: "Helping people build healthier habits every day.",
      };

  const navHtml = `
    <a href="${href(helpPath)}"${page === "help" ? ' aria-current="page"' : ""}>${labels.help}</a>
    <a href="${href(academyPath)}"${page === "academy" ? ' aria-current="page"' : ""}>${labels.academy}</a>
    <a href="${href(releaseNotesPath)}"${page === "release" ? ' aria-current="page"' : ""}>${labels.releaseNotes}</a>
    <span class="help-nav__soon" title="${labels.docsTitle}" aria-disabled="true">${labels.docs}</span>
  `;

  const langSwitch = `
    <div class="help-lang-switch" role="group" aria-label="Language">
      <a class="help-lang" href="${href("index.html")}" data-set-lang="en" ${lang === "en" ? 'aria-current="true"' : ""}>EN</a>
      <a class="help-lang" href="${href("de/index.html")}" data-set-lang="de" ${lang === "de" ? 'aria-current="true"' : ""}>DE</a>
      <span class="help-lang help-lang--soon" title="Suomi — coming soon" aria-disabled="true">FI</span>
    </div>`;

  const sub =
    page === "academy"
      ? labels.subAcademy
      : page === "release"
        ? labels.subRelease
        : page === "docs"
          ? labels.subDocs
          : page === "help"
            ? labels.subHelp
            : labels.subSite;

  const brandSrc = base + "assets/brand/kcal-buddy-192.png" + (assetVer ? "?v=" + encodeURIComponent(assetVer) : "");

  const header = `
<header class="help-header" role="banner">
  <div class="help-header__inner">
    <a class="help-brand" href="${href(homePath)}">
      <img class="help-brand__mark" src="${brandSrc}" width="36" height="36" alt="" />
      <span class="help-brand__text">
        <span class="help-brand__name">kCal Buddy</span>
        <span class="help-brand__sub">${sub}</span>
      </span>
    </a>
    <nav class="help-nav" aria-label="Primary">${navHtml}</nav>
    <div class="help-header__tools">
      <button type="button" class="help-icon-btn" id="help-search-hook" data-ext="search" aria-label="${labels.searchSoon}" title="${labels.searchSoon}">🔍</button>
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
    <p class="help-footer__tagline">${labels.tagline}</p>
    <div class="help-footer__grid">
      <div class="help-footer__col">
        <h3>${labels.learn}</h3>
        <ul>
          <li><a href="${href(academyPath)}">${labels.academyLink}</a></li>
          <li><a href="${href(helpPath)}">${labels.helpLink}</a></li>
          <li><span class="help-footer__muted" title="${labels.docsTitle}">${labels.docsLink} · ${labels.docsSoon}</span></li>
          <li><a href="${href(releaseNotesPath)}">${labels.releaseNotes}</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>${labels.legal}</h3>
        <ul>
          <li><a href="https://beta.kcal.lol/#/privacy">${labels.privacy}</a></li>
          <li><a href="https://beta.kcal.lol/#/terms">${labels.terms}</a></li>
          <li><a href="mailto:hello@kcal.lol">${labels.contact}</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>${labels.product}</h3>
        <ul>
          <li><span class="help-footer__muted">${labels.beta}</span></li>
          <li><a href="mailto:hello@kcal.lol">${labels.feedback}</a></li>
        </ul>
      </div>
    </div>
    <div class="help-footer__meta" id="help-footer-meta">
      <div><span class="help-footer__meta-label">${labels.version}</span> <span data-v="app">…</span></div>
      <div><span class="help-footer__meta-label">${labels.docsVersion}</span> <span data-v="docs">…</span></div>
      <div><span class="help-footer__meta-label">${labels.updated}</span> <span data-v="updated">${pageUpdated || "…"}</span></div>
    </div>
    <p class="help-footer__copy">© ${new Date().getFullYear()} kcal.lol · kiwicustom GmbH</p>
  </div>
</footer>`;

  const mountHeader = document.getElementById("help-shell-header");
  const mountFooter = document.getElementById("help-shell-footer");
  if (mountHeader) mountHeader.outerHTML = header;
  if (mountFooter) mountFooter.outerHTML = footer;

  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-set-lang]").forEach((a) => {
    a.addEventListener("click", () => {
      try {
        localStorage.setItem(LANG_KEY, a.getAttribute("data-set-lang") || "en");
      } catch (_) {}
    });
  });

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

  const versionUrl = base + "version.json" + (assetVer ? "?v=" + encodeURIComponent(assetVer) : "");
  fetch(versionUrl)
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
