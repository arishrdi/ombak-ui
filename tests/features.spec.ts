import { expect, test } from "./fixtures";

test("kit: add, count, dedupe, remove", async ({ page }) => {
  await page.goto("/templates/saas-landing");
  await page.getByRole("button", { name: "Add to kit" }).click();
  await page.goto("/blocks/hero-wave");
  await page.getByRole("button", { name: "Add to kit" }).click();
  await page.goto("/docs/components/aurora");
  await page.getByRole("button", { name: "Add to kit" }).click();

  // the tray counts picks and links to /kit
  const tray = page.locator("[data-kit-tray]");
  await expect(tray).toContainText("3");
  await tray.click();
  await expect(page).toHaveURL(/\/kit$/);

  // Hero Wave is part of SaaS Landing, so it is left out of the command
  await expect(page.getByText("Included with SaaS Landing")).toBeVisible();
  const command = page.locator("pre").first();
  await expect(command).toContainText("saas-landing.json");
  await expect(command).toContainText("aurora.json");
  await expect(command).not.toContainText("hero-wave.json");

  await page.getByRole("button", { name: "Remove Aurora" }).click();
  await expect(command).not.toContainText("aurora.json");
  await page.getByRole("button", { name: "Clear kit" }).click();
  await expect(page.getByText("Your kit is empty.")).toBeVisible();
});

test("kit: shared link can be imported", async ({ page }) => {
  await page.goto("/kit?items=marquee,aurora");
  await expect(page.getByText("Someone shared a kit with 2 items.")).toBeVisible();
  await page.getByRole("button", { name: "Add to my kit" }).click();
  await expect(page.locator("pre").first()).toContainText("marquee.json");
});

test("themes: presets restyle the preview and update the URL", async ({ page }) => {
  await page.goto("/themes");
  const primary = () => page.locator("[data-theme-preview]").evaluate((el) => getComputedStyle(el).getPropertyValue("--primary").trim());
  const before = await primary();
  await page.getByRole("button", { name: "Coral", exact: true }).click();
  await expect.poll(primary).not.toBe(before);
  await expect(page).toHaveURL(/p=f97362/);
  await expect(page.locator("pre")).toContainText(":root {");
  await expect(page.locator("pre")).toContainText(".dark {");
});

test("copy for AI: menu offers prompt, source and v0", async ({ page }) => {
  await page.goto("/docs/components/magnetic-button");
  await page.getByRole("button", { name: "Copy for AI" }).click();
  const menu = page.getByRole("menu");
  await expect(menu.getByRole("menuitem")).toHaveCount(3);
  await expect(menu.getByRole("menuitem", { name: /Open in v0/ })).toHaveAttribute("href", /v0\.dev\/chat\/api\/open\?url=/);
  await page.keyboard.press("Escape");
  await expect(menu).toHaveCount(0);
});

test("changelog RSS is valid", async ({ request }) => {
  const res = await request.get("/changelog/rss.xml");
  expect(res.ok()).toBe(true);
  expect(res.headers()["content-type"]).toContain("application/rss+xml");
  const xml = await res.text();
  expect(xml).toMatch(/^<\?xml/);
  expect((xml.match(/<item>/g) ?? []).length).toBeGreaterThan(5);
});
