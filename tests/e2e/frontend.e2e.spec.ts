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
    await expect(page.getByRole('button', { name: 'Ativar tema escuro' })).toBeVisible()
  })

  test('changes and persists the landing theme', async ({ page }) => {
    await page.goto('http://localhost:3000')
    const toggle = page.getByRole('button', { name: /Ativar tema/ })
    await toggle.click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  })

  test('redirects anonymous visitors from the portal to login', async ({ page }) => {
    await page.goto('http://localhost:3000/portal')
    await expect(page).toHaveURL(/\/login/)
  })
})
