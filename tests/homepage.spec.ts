import { test, expect } from "@playwright/test";

test.describe("Solutions 2IA — Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero section with title", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("digitales");
  });

  test("header is visible with logo", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("header")).toContainText("Solutions");
  });

  test("services section is present", async ({ page }) => {
    const services = page.locator("#services");
    await expect(services).toBeAttached();
  });

  test("CTA section has contact link", async ({ page }) => {
    const cta = page.locator("#contact");
    await expect(cta).toBeAttached();
  });

  test("footer is present", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("Solutions 2IA");
  });
});
