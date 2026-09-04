/**
 * Shared Help chrome — header + footer + theme + language.
 * Brand must match beta.kcal.lol (Documentation Law / design system).
 */
(function () {
  const root = document.documentElement;
  const script = document.currentScript;
  const page = (script && script.getAttribute("data-page")) || "home";
  const lang = (script && script.getAttribute("data-lang")) || "en";
  const base = (script && script.getAttribute("data-base")) || "";

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
      btn.title = mode === "dark" ? "Light mode" : "Dark mode";
    }
  }

  function href(path) {
    return base + path;
  }

  function navLink(id, path, label) {
    const current = page === id ? ' aria-current="page"' : "";
    return `<a href="${href(path)}"${current}>${label}</a>`;
  }

  const navEn = [
    ["home", "index.html", "🏠 Home"],
    ["help", "index.html", "📚 Help"],
    ["academy", "academy/index.html", "🎓 Academy"],
    ["docs", "documentation.html", "📖 Documentation"],
    ["new", "whats-new.html", "🆕 What's New"],
    ["search", "search.html", "🔍 Search"],
  ];

  const navDe = [
    ["home", "index.html", "🏠 Start"],
    ["help", "index.html", "📚 Hilfe"],
    ["academy", "academy/index.html", "🎓 Academy"],
    ["docs", "documentation.html", "📖 Dokumentation"],
    ["new", "whats-new.html", "🆕 Neu"],
    ["search", "search.html", "🔍 Suche"],
  ];

  const nav = lang === "de" ? navDe : navEn;
  // Home + Help both point at index for now — mark Help current for guide pages
  const navHtml = nav
    .map(([id, path, label]) => {
      let cur = page === id;
      if (id === "help" && ["help", "home-guide", "foodiary", "nav"].includes(page)) cur = true;
      if (id === "academy" && page === "academy") cur = true;
      if (id === "home" && page === "home") cur = true;
      if (id === "home" && page !== "home") cur = false;
      const current = cur ? ' aria-current="page"' : "";
      return `<a href="${href(path)}"${current}>${label}</a>`;
    })
    .join("");

  const langSwitch =
    lang === "de"
      ? `<a class="help-lang" href="../index.html" style="display:inline-flex;align-items:center;text-decoration:none">EN</a>`
      : `<a class="help-lang" href="de/index.html" style="display:inline-flex;align-items:center;text-decoration:none">DE</a>`;

  const header = `
<header class="help-header" role="banner">
  <div class="help-header__inner">
    <a class="help-brand" href="${href("index.html")}">
      <img class="help-brand__mark" src="${href("assets/brand/kcal-buddy-192.png")}" width="36" height="36" alt="" />
      <span class="help-brand__text">
        <span class="help-brand__name">kCal Buddy</span>
        <span class="help-brand__sub">${lang === "de" ? "Hilfe" : "Help"}</span>
      </span>
    </a>
    <nav class="help-nav" aria-label="Primary">${navHtml}</nav>
    <div class="help-header__tools">
      <button type="button" class="help-icon-btn" id="help-theme-toggle" aria-label="Toggle color mode">🌙</button>
      ${langSwitch}
    </div>
  </div>
  <nav class="help-nav-mobile" aria-label="Primary mobile">${navHtml}</nav>
</header>`;

  const t = lang === "de"
    ? {
        tagline: "Menschen helfen, jeden Tag gesündere Gewohnheiten aufzubauen.",
        quick: "Schnelllinks",
        community: "Community",
        product: "Produkt",
        home: "Start",
        help: "Hilfe",
        docs: "Dokumentation",
        privacy: "Datenschutz",
        terms: "AGB",
        contact: "Kontakt",
        roadmap: "Roadmap",
        release: "Release Notes",
        feedback: "Feedback",
        bugs: "Fehler melden",
        version: "App-Version",
        docsVer: "Hilfe-Version",
        updated: "Zuletzt aktualisiert",
        build: "Build-Datum",
        copy: "© kcal.lol",
      }
    : {
        tagline: "Helping people build healthier habits every day.",
        quick: "Quick Links",
        community: "Community",
        product: "Product",
        home: "Home",
        help: "Help",
        docs: "Documentation",
        privacy: "Privacy",
        terms: "Terms",
        contact: "Contact",
        roadmap: "Roadmap",
        release: "Release Notes",
        feedback: "Feedback",
        bugs: "Bug Report",
        version: "Version",
        docsVer: "Documentation Version",
        updated: "Last Updated",
        build: "Build Date",
        copy: "© kcal.lol",
      };

  const inviteNote =
    lang === "de"
      ? "Beta derzeit nur auf Einladung."
      : lang === "fi"
        ? "Beta vain kutsulla."
        : "Beta is invitation-only for now.";

  const footer = `
<footer class="help-footer" role="contentinfo">
  <div class="help-footer__inner">
    <p class="help-footer__brand">kCal Buddy</p>
    <p class="help-footer__tagline">${t.tagline}</p>
    <div class="help-footer__grid">
      <div class="help-footer__col">
        <h3>${t.quick}</h3>
        <ul>
          <li><a href="${href("index.html")}">${t.home}</a></li>
          <li><a href="${href("index.html")}">${t.help}</a></li>
          <li><a href="${href("documentation.html")}">${t.docs}</a></li>
          <li><a href="https://beta.kcal.lol/#/privacy">${t.privacy}</a></li>
          <li><a href="https://beta.kcal.lol/#/terms">${t.terms}</a></li>
          <li><a href="mailto:hello@kcal.lol">${t.contact}</a></li>
          <li><a href="${href("whats-new.html")}">${t.roadmap}</a></li>
          <li><a href="${href("whats-new.html")}">${t.release}</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>${t.community}</h3>
        <ul>
          <li><span style="color:var(--text-muted)">Discord (future)</span></li>
          <li><a href="mailto:hello@kcal.lol">${t.feedback}</a></li>
          <li><a href="mailto:hello@kcal.lol">${t.bugs}</a></li>
        </ul>
      </div>
      <div class="help-footer__col">
        <h3>${t.product}</h3>
        <ul>
          <li><span style="color:var(--text-muted)">${inviteNote}</span></li>
        </ul>
      </div>
    </div>
    <div class="help-footer__meta" id="help-footer-meta">
      <div>${t.version}: <span data-v="app">…</span></div>
      <div>${t.docsVer}: <span data-v="docs">…</span></div>
      <div>${t.updated}: <span data-v="updated">…</span></div>
      <div>${t.build}: <span data-v="build">…</span></div>
    </div>
    <p class="help-footer__copy">${t.copy}</p>
  </div>
</footer>`;

  const mountHeader = document.getElementById("help-shell-header");
  const mountFooter = document.getElementById("help-shell-footer");
  if (mountHeader) mountHeader.outerHTML = header;
  if (mountFooter) mountFooter.outerHTML = footer;

  applyTheme(resolveTheme());
  document.getElementById("help-theme-toggle")?.addEventListener("click", () => {
    const next = root.getAttribute("data-color-mode") === "dark" ? "light" : "dark";
    applyTheme(next);
  });

  fetch(href("version.json"))
    .then((r) => r.json())
    .then((v) => {
      const set = (k, val) => {
        const el = document.querySelector(`[data-v="${k}"]`);
        if (el) el.textContent = val;
      };
      set("app", v.version || "—");
      set("docs", v.version || "—");
      set("updated", v.builtAt || "—");
      set("build", v.builtAt || "—");
    })
    .catch(() => {});
})();
