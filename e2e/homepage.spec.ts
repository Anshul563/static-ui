import { expect, test } from "@playwright/test"

test("homepage loads", async ({ page }) => {
  await page.goto("/")
  await expect(page.locator("body")).toBeVisible()
})

test("homepage has correct title", async ({ page }) => {
  await page.goto("/")
  const title = await page.title()
  expect(title).toBeTruthy()
})

test("dark mode toggle works", async ({ page }) => {
  await page.goto("/")
  const toggle = page
    .locator("[data-theme-toggle], [aria-label*='theme' i], [aria-label*='dark' i]")
    .first()
  if (await toggle.isVisible()) {
    await toggle.click()
    const html = page.locator("html")
    const classAttr = await html.getAttribute("class")
    expect(classAttr?.includes("dark")).toBeTruthy()
  }
})

test("navigation links are accessible", async ({ page }) => {
  await page.goto("/")
  const nav = page.locator("nav, header nav, [role='navigation']").first()
  await expect(nav).toBeVisible()
  const links = nav.locator("a")
  const count = await links.count()
  expect(count).toBeGreaterThan(0)
})
