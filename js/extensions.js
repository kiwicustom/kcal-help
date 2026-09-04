/**
 * Phase B+ extension hooks — DO NOT implement features here yet.
 * SSOT: docs/product/BUDDY-ACADEMY-HELP-PLATFORM.md
 *
 * Mount points use [data-ext="…"] in generated HTML.
 */
(function (global) {
  const hooks = {
    /** Future: ⌘K / Ctrl+K search */
    openSearch() {},
    /** Future: index query */
    search(_query) {
      return [];
    },
    /** Future: 0–5 star ratings */
    submitRating(_payload) {},
    /** Future: page view / scroll / completion */
    track(_event, _props) {},
    /** Future: hotspot screenshot clicks */
    onScreenshotHotspot(_shotId, _hotspotId) {},
    /** Future: video / GIF embeds */
    mountMedia(_el, _spec) {},
    /** Future: AI search */
    askAi(_question) {},
    /** Future: community / challenges */
    openCommunity() {},
    openChallenge(_id) {},
  };

  global.KcalHelpExtensions = hooks;
  document.documentElement.setAttribute("data-help-extensions", "ready");
})(typeof window !== "undefined" ? window : globalThis);
