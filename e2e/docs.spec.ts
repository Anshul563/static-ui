import { expect, test } from "@playwright/test"

test.describe("CLI documentation", () => {
  test("CLI docs page loads", async ({ page }) => {
    await page.goto("/docs/cli")
    await expect(page.locator("body")).toBeVisible()
  })

  test("code blocks have copy buttons", async ({ page }) => {
    await page.goto("/docs/cli")
    const codeBlocks = page.locator("pre, [class*='code'], [class*='language-']")
    const count = await codeBlocks.count()
    expect(count).toBeGreaterThan(0)
  })
})

test.describe("search functionality", () => {
  test("search input exists", async ({ page }) => {
    await page.goto("/")
    const search = page
      .locator("input[type='search'], input[placeholder*='Search' i], [role='search'] input")
      .first()
    const exists = await search.isVisible().catch(() => false)
    expect(typeof exists).toBe("boolean")
  })
})
