import { test, expect } from "@playwright/test";

// /agents-ia (V3) : promesse, rôle par besoin, calcul, contrôle, CTA unique, pas de débordement.
test.describe("Solutions 2IA — /agents-ia", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/agents-ia");
  });

  test("un seul h1, avec la promesse", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Vous décidez");
  });

  test("la fiche de rôle se reconfigure par besoin", async ({ page }) => {
    const sheet = page.locator("#ai-role-sheet");
    await expect(sheet).toContainText("Ne perdre aucun appel utile");
    await page.getByRole("tab", { name: /Boîte mail/ }).click();
    await expect(sheet).toContainText("Qu'aucun mail important ne dorme");
  });

  test("l'exemple suit le métier choisi", async ({ page }) => {
    const section = page.locator("#besoins");
    await expect(section).toContainText("un devis pour une visite");
    await section.getByRole("radio", { name: "Immobilier" }).click();
    await expect(section).toContainText("une visite du T3 en centre-ville");
  });

  test("le calculateur suit les chiffres du visiteur", async ({ page }) => {
    const calc = page.locator("#calcul");
    await expect(calc).toContainText("220");
    await calc.getByRole("radio", { name: /Devis à préparer/ }).click();
    // 5 devis × 20 min × 50 % = 50 min/jour × 220 / 60 ≈ 183 h
    await expect(calc).toContainText("183");
  });

  test("le niveau d'autonomie déplace le verrou", async ({ page }) => {
    const control = page.locator("#controle");
    await expect(control).toContainText("Vous décidez");
    await control.getByRole("radio", { name: /Il agit seul/ }).click();
    await expect(control).toContainText("Vous gardez le journal");
  });

  test("services liés : deux lignes, pas une section", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Services liés" });
    await expect(nav.getByRole("link")).toHaveCount(2);
  });

  test("un seul bouton d'action dans le bandeau final", async ({ page }) => {
    const cta = page.getByRole("heading", { name: /Quelle tâche aimeriez-vous déléguer/ }).locator("xpath=ancestor::section[1]");
    await expect(cta.locator('a[href="/contact"]')).toHaveCount(1);
  });

  test("aucun débordement horizontal", async ({ page }) => {
    for (const width of [1440, 1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `largeur ${width}`).toBeLessThanOrEqual(0);
    }
  });
});
