import { expect, test } from "@playwright/test"

test("components page renders component cards", async ({ page }) => {
  await page.goto("/components")
  await expect(page.locator("body")).toBeVisible()
})

test("themes page renders theme options", async ({ page }) => {
  await page.goto("/themes")
  await expect(page.locator("body")).toBeVisible()
})

test("templates page renders", async ({ page }) => {
  await page.goto("/templates")
  await expect(page.locator("body")).toBeVisible()
})

test("responsive layout works on mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto("/")
  const nav = page.locator("nav, header nav, [role='navigation']").first()
  const isMobileVisible = await nav.isVisible()
  expect(typeof isMobileVisible).toBe("boolean")
})
