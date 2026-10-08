#!/usr/bin/env node
/**
 * Turns the explainer's Markdown (with ```mermaid fences) into one HTML page.
 *
 *   node explainer-html.mjs <in.md> <out.html>
 *
 * The page embeds the Markdown as data and renders it in the browser with two
 * small libraries from cdnjs (marked for Markdown, mermaid for the diagrams), so
 * the file is a single page that opens anywhere with a network connection and
 * has nothing to install. Relative image paths are kept, so the HTML must sit
 * next to the Markdown, with the shots folder beside both.
 */
import fs from "node:fs";
import path from "node:path";

const [, , input, output] = process.argv;
if (!input || !output) {
  console.error("usage: node explainer-html.mjs <in.md> <out.html>");
  process.exit(2);
}

const md = fs.readFileSync(input, "utf8");
const titleMatch = md.match(/^#\s+(.+)$/mu);
const title = (titleMatch ? titleMatch[1] : path.basename(input, ".md")).trim();
// Inside <script type="text/markdown"> only a closing script tag can break out.
const safe = md.replace(/<\/script/giu, "<\\/script");
const esc = (s) => s.replace(/[&<>"]/gu, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>
  :root { --bg:#fbfaf7; --fg:#1f1d1a; --muted:#6b655c; --line:#e3ded4; --accent:#2f5d50; --code:#f1eee7; }
  @media (prefers-color-scheme: dark) { :root { --bg:#17171a; --fg:#e8e6e1; --muted:#a09a90; --line:#2e2d33; --accent:#8fc2b3; --code:#232227; } }
  html { background: var(--bg); }
  body { margin:0; color:var(--fg); font:16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  main { max-width: 880px; margin: 0 auto; padding: 32px 16px 80px; }
  h1 { font-size: 2rem; line-height: 1.2; margin: 0 0 .5em; }
  h2 { font-size: 1.4rem; margin: 2.2em 0 .6em; padding-top: .8em; border-top: 1px solid var(--line); }
  h3 { font-size: 1.1rem; margin: 1.6em 0 .4em; }
  p, li { max-width: 72ch; }
  a { color: var(--accent); }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: .95rem; }
  th, td { text-align: left; padding: .5em .7em; border-bottom: 1px solid var(--line); vertical-align: top; }
  th { color: var(--muted); font-weight: 600; }
  code { background: var(--code); padding: .1em .35em; border-radius: 4px; font-size: .9em; }
  pre { background: var(--code); padding: 1em; border-radius: 8px; overflow: auto; }
  pre code { background: none; padding: 0; }
  pre.mermaid { background: transparent; padding: 0; overflow: visible; text-align: center; }
  img { max-width: 100%; height: auto; border: 1px solid var(--line); border-radius: 8px; display: block; margin: 1em 0; }
  blockquote { margin: 1em 0; padding: .2em 1em; border-left: 3px solid var(--accent); color: var(--muted); }
  .muted { color: var(--muted); }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/9.1.6/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.1/mermaid.min.js"></script>
</head>
<body>
<main id="doc"><p class="muted">Rendering…</p></main>
<script type="text/markdown" id="src">
${safe}
</script>
<script>
(function () {
  var src = document.getElementById("src").textContent;
  var renderer = new marked.Renderer();
  var escapeHtml = function (s) { return s.replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); };
  renderer.code = function (code, infostring) {
    var lang = (infostring || "").trim().split(/\\s+/)[0];
    if (lang === "mermaid") return '<pre class="mermaid">' + escapeHtml(code) + "</pre>";
    return "<pre><code>" + escapeHtml(code) + "</code></pre>";
  };
  marked.setOptions({ renderer: renderer, gfm: true, breaks: false, mangle: false, headerIds: false });
  document.getElementById("doc").innerHTML = marked.parse(src);
  var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  mermaid.initialize({ startOnLoad: false, theme: dark ? "dark" : "neutral", securityLevel: "loose" });
  mermaid.run({ querySelector: "pre.mermaid" });
})();
</script>
</body>
</html>
`;

fs.writeFileSync(output, html);
console.log(JSON.stringify({ ok: true, input, output, title, bytes: Buffer.byteLength(html) }));
