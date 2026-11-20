// Validates the built registry in public/r against what the shadcn CLI and the shadcn registry
// directory expect. Run after `npm run registry:build`; exits non-zero with a list of problems.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dir = path.join(root, "public", "r");
const source = JSON.parse(fs.readFileSync(path.join(root, "registry.json"), "utf8"));
const problems = [];
const fail = (msg) => problems.push(msg);

// index: valid JSON, every item listed, and no inlined file content (directory requirement)
let index;
try {
  index = JSON.parse(fs.readFileSync(path.join(dir, "registry.json"), "utf8"));
} catch (e) {
  fail(`public/r/registry.json is missing or not valid JSON: ${e.message}`);
}
if (index) {
  if (index.items?.length !== source.items.length) fail(`index lists ${index.items?.length} items, registry.json has ${source.items.length}`);
  for (const item of index.items ?? []) {
    if ((item.files ?? []).some((f) => "content" in f)) fail(`index entry "${item.name}" inlines file content`);
  }
}

const names = new Set(source.items.map((i) => i.name));
const homepage = (source.homepage ?? "").replace(/\/$/, "");

for (const item of source.items) {
  const file = path.join(dir, `${item.name}.json`);
  let built;
  try {
    built = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    fail(`public/r/${item.name}.json is missing or not valid JSON: ${e.message}`);
    continue;
  }
  if (built.name !== item.name) fail(`${item.name}.json has name "${built.name}"`);
  for (const f of built.files ?? []) {
    if (typeof f.content !== "string" || !f.content.trim()) fail(`${item.name}.json: file ${f.path} has no content`);
    // installed files live in components/, so site-internal paths must have been rewritten
    if (/@\/registry\//.test(f.content ?? "")) fail(`${item.name}.json still imports from @/registry/ (run npm run registry:build)`);
  }
  // dependencies on our own items must point at items that exist
  for (const dep of item.registryDependencies ?? []) {
    const m = dep.match(/\/r\/([\w-]+)\.json$/);
    if (m && dep.startsWith(homepage) && !names.has(m[1])) fail(`${item.name} depends on unknown item "${m[1]}"`);
  }
}

if (problems.length) {
  console.error(`Registry check failed (${problems.length}):\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`Registry OK: ${source.items.length} items, index clean, imports rewritten, dependencies resolve.`);
