/* Visitor analytics: Vercel Web Analytics + Microsoft Clarity, plus click and source tracking.
   No personal data is collected here. Set CLARITY_ID below once the Clarity project exists. */
(function () {
  var CLARITY_ID = "z218tzmsma";

  // Vercel Web Analytics (cookieless). Needs Analytics enabled in the Vercel project.
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var v = document.createElement("script");
  v.defer = true;
  v.src = "/_vercel/insights/script.js";
  document.head.appendChild(v);

  // Microsoft Clarity (recordings + heatmaps), only when an ID is set.
  if (CLARITY_ID) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  // First-party log read by the admin dashboard ("Portfolio traffic" tab). No cookies, no IP stored.
  var COLLECT = "https://dashboard.jvecomva.com/api/pt";
  function log(name, extra) {
    try {
      var body = JSON.stringify({ name: name, path: location.pathname, source: extra && extra.source, type: extra && extra.type, extra: extra && extra.extra });
      if (navigator.sendBeacon) navigator.sendBeacon(COLLECT, new Blob([body], { type: "text/plain" }));
      else fetch(COLLECT, { method: "POST", body: body, keepalive: true, mode: "no-cors" });
    } catch (e) {}
  }

  function send(name, props) {
    log(name, name === "visit_source" ? props : { extra: props });
    try { window.va("event", { name: name, data: props || {} }); } catch (e) {}
    try { if (window.clarity) window.clarity("event", name); } catch (e) {}
  }

  // Where did the visitor come from? Classify AI assistants and other sources once per tab.
  var AI = [
    ["chatgpt", /chatgpt\.com|chat\.openai\.com/i],
    ["perplexity", /perplexity\.ai/i],
    ["claude", /claude\.ai/i],
    ["gemini", /gemini\.google\.com|bard\.google\.com/i],
    ["copilot", /copilot\.microsoft\.com|bing\.com\/chat/i],
    ["you.com", /you\.com/i],
    ["phind", /phind\.com/i],
    ["brave-leo", /search\.brave\.com/i],
  ];
  function classify() {
    var q = new URLSearchParams(location.search);
    var utm = (q.get("utm_source") || q.get("ref") || "").toLowerCase();
    var ref = document.referrer || "";
    var hay = utm + " " + ref;
    for (var i = 0; i < AI.length; i++) if (AI[i][1].test(hay)) return { type: "ai", source: AI[i][0] };
    if (utm) return { type: "campaign", source: utm.slice(0, 40) };
    if (!ref) return { type: "direct", source: "direct" };
    try {
      var h = new URL(ref).hostname.replace(/^www\./, "");
      if (h === location.hostname.replace(/^www\./, "")) return null;
      return { type: "referral", source: h };
    } catch (e) { return { type: "referral", source: "unknown" }; }
  }
  try {
    if (!sessionStorage.getItem("jv_src")) {
      var s = classify();
      if (s) {
        sessionStorage.setItem("jv_src", s.source);
        send("visit_source", { type: s.type, source: s.source, page: location.pathname });
        if (window.clarity) { window.clarity("set", "source", s.source); window.clarity("set", "source_type", s.type); }
      }
    }
  } catch (e) {}

  log("view");

  // Click tracking on the main buttons and links.
  function label(el) { return (el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 50); }
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("a, button");
    if (!el) return;
    var href = el.getAttribute("href") || "";
    var onclick = el.getAttribute("onclick") || "";
    var page = location.pathname;
    if (/calendly/i.test(onclick) || /calendly\.com/i.test(href)) return send("book_call_click", { label: label(el), page: page });
    if (/wa\.me|whatsapp/i.test(href)) return send("whatsapp_click", { page: page });
    if (/^mailto:/i.test(href)) return send("email_click", { page: page });
    if (/analyze\.jvecomva\.com/i.test(href)) return send("analyzer_click", { label: label(el), page: page });
    if (/linkedin\.com|facebook\.com|instagram\.com|onlinejobs\.ph/i.test(href)) return send("social_click", { to: href.replace(/^https?:\/\/(www\.)?/, "").split("/")[0], page: page });
    if (/blog\/[^/]+\.html|\/blog\/[^/]+/i.test(href) && !/blog\/(index\.html)?$/.test(href)) return send("blog_post_click", { post: href.replace(/.*blog\//, "").replace(/\.html$/, ""), page: page });
  }, true);

  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "contact-form") send("contact_form_submit", { page: location.pathname });
  }, true);
})();
