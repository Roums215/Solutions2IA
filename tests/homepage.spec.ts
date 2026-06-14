import { test, expect } from "@playwright/test";

test.describe("Solutions 2IA — Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero section with title", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    // Le hero parle de remplacer ce qui prend du temps par des « outils ».
    await expect(heading).toContainText(/outils/i);
  });

  test("header is visible with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toContainText("Contact");
  });

  test("main content is present", async ({ page }) => {
    await expect(page.locator("main")).toBeAttached();
  });

  test("page exposes a contact link", async ({ page }) => {
    await expect(page.locator('a[href="/contact"]').first()).toBeAttached();
  });

  test("footer is present", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Solutions 2IA");
  });
});
