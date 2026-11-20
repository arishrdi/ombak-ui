import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3123);

/**
 * Smoke tests against the production build (`npm run build` first).
 * `npm run test:e2e` starts `next start` for you unless a server is already running on PORT.
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  retries: process.env.CI ? 1 : 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "off",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    // CI starts one server for the bundle check and these tests
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
