import { test, expect } from "@playwright/test";

// /automatisation (V3) : promesse, workflow interactif, métiers, ancres conservées,
// CTA unique, aucune métrique SaaS fictive, pas de débordement.
test.describe("Solutions 2IA — /automatisation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/automatisation");
  });

  test("un seul h1, avec la promesse", async ({ page }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("tout seul");
  });

  test("plus aucune métrique de plateforme inventée", async ({ page }) => {
    const text = await page.locator("main").innerText();
    for (const fake of ["99,98", "tâches/heure", "1 247", "latence", "#847"]) expect(text).not.toContain(fake);
  });

  test("le workflow n'allume que les branches utiles", async ({ page }) => {
    const section = page.getByRole("heading", { name: /chacun dans son coin/ }).locator("xpath=ancestor::section[1]");
    await section.getByRole("radio", { name: "Formulaire" }).click();
    await expect(section).toContainText("Rendez-vous posé, confirmation envoyée");
    await expect(section.getByLabel("mis à jour")).toHaveCount(3);
  });

  test("le workflow se réécrit par métier", async ({ page }) => {
    const panel = page.locator("#auto-trade-panel");
    await expect(panel).toContainText("Nouvelle demande");
    await page.getByRole("tab", { name: /BTP/ }).click();
    await expect(panel).toContainText("Dossier chantier");
  });

  test("les ancres utilisées ailleurs existent toujours", async ({ page }) => {
    for (const id of ["mon-flux", "facture-electronique-2026", "methode"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
  });

  test("services liés : deux lignes, un seul bouton final", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Services liés" }).getByRole("link")).toHaveCount(2);
    const cta = page.getByRole("heading", { name: /Quelle tâche refaites-vous/ }).locator("xpath=ancestor::section[1]");
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
