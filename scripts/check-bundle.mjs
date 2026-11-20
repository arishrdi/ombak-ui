// Fails when a page's initial JavaScript (gzip) grows past its budget. Needs a running production
// server (`npm start`); reads each page's HTML, sums the gzip size of the scripts it loads.
// Usage: node scripts/check-bundle.mjs [baseUrl]
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const base = process.argv[2] ?? "http://localhost:3000";

// KB, gzip. ~188 KB is the React + Next.js + layout floor; budgets leave a little headroom.
const BUDGETS = {
  "/": 260,
  "/docs/components": 205,
  "/docs/components/marquee": 205,
  "/docs/components/wave-background": 205,
  "/blocks": 205,
  "/blocks/hero-wave": 205,
  "/templates": 205,
  "/templates/saas-landing": 205,
  "/kit": 205,
  "/themes": 245,
  "/changelog": 205,
};

const gz = (file) => zlib.gzipSync(fs.readFileSync(file)).length;
let failed = 0;

for (const [route, budget] of Object.entries(BUDGETS)) {
  const html = await (await fetch(base + route)).text();
  const scripts = [...new Set(html.match(/\/_next\/static\/chunks\/[^"']+\.js/g) ?? [])];
  const bytes = scripts.reduce((sum, src) => sum + gz(path.join(".next", src.replace(/^\/_next/, ""))), 0);
  const kb = Math.round(bytes / 1024);
  const ok = kb <= budget;
  if (!ok) failed++;
  console.log(`${ok ? "ok  " : "OVER"} ${route.padEnd(36)} ${String(kb).padStart(4)} KB  (budget ${budget})`);
}

if (failed) {
  console.error(`\n${failed} page(s) over budget. Load the new code lazily, or raise the budget in scripts/check-bundle.mjs if it's worth it.`);
  process.exit(1);
}
