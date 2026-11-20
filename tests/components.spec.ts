import registry from "../registry.json" with { type: "json" };
import { expect, test } from "./fixtures";

// One test per component, generated from the registry, so new components are covered automatically.
const components = registry.items.filter((i) => i.type === "registry:component").map((i) => i.name);

for (const slug of components) {
  test(`component page: ${slug}`, async ({ page }) => {
    await page.goto(`/docs/components/${slug}`);
    await expect(page.locator("h1")).toBeVisible();

    // the demo loads on the client; the placeholder must go away
    await expect(page.locator('[aria-label="Loading demo"]')).toHaveCount(0);

    // the playground (when there is one) loads on first open and renders its stage
    const tab = page.locator('button:text-is("playground")');
    if (await tab.count()) {
      await tab.click();
      await expect(page.locator("[data-playground-stage]")).toBeVisible();
      const slider = page.locator("aside input[type=range]").first();
      if (await slider.count()) {
        await slider.focus();
        await page.keyboard.press("ArrowRight");
      }
      await expect(page.locator("[data-playground-stage] ~ div pre")).toContainText("<");
    }
  });
}
