/**
 * Help site version watch — same idea as the app VersionUpdateBanner.
 * Never silent-reload HTML (query-string alone leaves a cached document body).
 * When version.json is newer than this page's meta asset-ver, show Reload.
 */
(function () {
  const POLL_MS = 60_000;
  const meta =
    document.querySelector('meta[name="kcal:asset-ver"]')?.getAttribute("content")?.trim() || "";

  function versionBase() {
    const link = document.querySelector('link[href*="css/tokens.css"]');
    if (link) {
      const href = link.getAttribute("href") || "";
      return href.replace(/css\/tokens\.css.*$/, "");
    }
    const script = document.currentScript;
    const dataBase = script?.getAttribute?.("data-base");
    if (typeof dataBase === "string") return dataBase;
    // Fallback from path depth
    const depth = (location.pathname.match(/\//g) || []).length - 1;
    return depth > 1 ? "../".repeat(depth - 1) : "";
  }

  function fetchLatest() {
    const base = versionBase();
    const url = base + "version.json?_=" + Date.now();
    return fetch(url, {
      cache: "no-store",
      headers: { "Cache-Control": "no-cache" },
    }).then(function (r) {
      if (!r.ok) throw new Error("version.json " + r.status);
      return r.json();
    });
  }

  function ensureBanner() {
    let el = document.getElementById("help-version-banner");
    if (el) return el;
    el = document.createElement("div");
    el.id = "help-version-banner";
    el.className = "help-version-banner";
    el.setAttribute("role", "status");
    el.hidden = true;
    el.innerHTML =
      '<div class="help-version-banner__inner">' +
      '<p class="help-version-banner__text"><strong>Newer Help is live.</strong> Reload to get the latest pages.</p>' +
      '<button type="button" class="help-version-banner__btn" id="help-version-reload">Reload latest</button>' +
      "</div>";
    document.body.appendChild(el);
    document.getElementById("help-version-reload")?.addEventListener("click", function () {
      const btn = this;
      btn.disabled = true;
      btn.textContent = "…";
      fetchLatest()
        .then(function (v) {
          const next = (v && v.assetVer) || String(Date.now());
          const u = new URL(window.location.href);
          u.searchParams.set("v", next);
          u.searchParams.set("_kcal", next + "-" + Date.now());
          // Full navigation — forces HTML revalidation (query alone used to leave stale body).
          window.location.replace(u.toString());
        })
        .catch(function () {
          window.location.reload();
        });
    });
    return el;
  }

  function showBanner(v) {
    const el = ensureBanner();
    const text = el.querySelector(".help-version-banner__text");
    if (text && v && (v.version || v.builtAt)) {
      const bits = [];
      if (v.version) bits.push("v" + String(v.version).replace(/^v/i, ""));
      if (v.builtAt) bits.push(v.builtAt);
      text.innerHTML =
        "<strong>Newer Help is live" +
        (bits.length ? " (" + bits.join(" · ") + ")" : "") +
        ".</strong> Reload to get the latest pages.";
    }
    el.hidden = false;
  }

  function check() {
    fetchLatest()
      .then(function (v) {
        if (!v || !v.assetVer) return;
        if (!meta) return;
        if (v.assetVer === meta) return;
        showBanner(v);
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", check);
  } else {
    check();
  }
  window.setInterval(check, POLL_MS);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") check();
  });
})();
