import { test as base, expect } from "@playwright/test";

/**
 * `test` that fails when the page throws or logs a console error.
 * Use `consoleErrors` inside a test to inspect them early.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (m) => {
        if (m.type() === "error") errors.push(`console: ${m.text()}`);
      });
      await use(errors);
      expect(errors, "page errors or console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
