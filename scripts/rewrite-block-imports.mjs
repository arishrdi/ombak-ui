// Blocks import components from "@/registry/ombak/<name>/<name>" so they run on this site.
// Once installed, those components live at "@/components/<name>", so rewrite the paths in the built registry JSON.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "public", "r");
const registry = JSON.parse(fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf8"));
const IMPORT = /@\/registry\/ombak\/([\w-]+)\/\1/g;

let count = 0;
for (const item of registry.items.filter((i) => i.type === "registry:block")) {
  const file = path.join(dir, `${item.name}.json`);
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  for (const f of json.files ?? []) {
    if (typeof f.content === "string") f.content = f.content.replace(IMPORT, "@/components/$1");
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
  count++;
}
console.log(`Rewrote component imports in ${count} block(s).`);
