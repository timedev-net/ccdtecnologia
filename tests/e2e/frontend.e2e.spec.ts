import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can load homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/CCD Tecnologia/)
    const heading = page.locator('h1').first()
    await expect(heading).toContainText('O próximo salto')
    await expect(page.getByRole('link', { name: 'Área do Cliente' }).first()).toBeVisible()
  })

  test('redirects anonymous visitors from the portal to login', async ({ page }) => {
    await page.goto('http://localhost:3000/portal')
    await expect(page).toHaveURL(/\/login/)
  })
})
