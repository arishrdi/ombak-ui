import registry from "../registry.json" with { type: "json" };
import { expect, test } from "./fixtures";

const isTemplate = (i: { categories?: string[] }) => i.categories?.includes("template") ?? false;
const blocks = registry.items.filter((i) => i.type === "registry:block" && !isTemplate(i)).map((i) => i.name);
const templates = registry.items.filter((i) => i.type === "registry:block" && isTemplate(i)).map((i) => i.name);

const ROUTES = ["/", "/docs", "/docs/installation", "/blocks", "/templates", "/kit", "/themes", "/changelog"];

for (const route of ROUTES) {
  test(`page loads: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1").first()).toBeVisible();
  });
}

for (const name of blocks) {
  test(`block page: ${name}`, async ({ page }) => {
    await page.goto(`/blocks/${name}`);
    await expect(page.locator("h1")).toBeVisible();
    // the preview iframe grows to fit (or uses its fixed height) once the block renders
    await expect(page.locator("iframe").first()).toHaveCSS("opacity", "1");
  });
}

for (const name of templates) {
  test(`template page: ${name}`, async ({ page }) => {
    await page.goto(`/templates/${name}`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("iframe").first()).toHaveCSS("opacity", "1");
  });
}

test("gallery previews load as you scroll", async ({ page }) => {
  await page.goto("/docs/components");
  for (let y = 0; y < 40_000; y += 900) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(60);
  }
  await expect(page.locator("main .animate-pulse")).toHaveCount(0);
});

test("thumbnails render still frames", async ({ page }) => {
  await page.goto("/view/saas-landing?still");
  await expect(page.locator("#block-root")).toBeVisible();
  expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
});
