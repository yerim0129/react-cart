import type { Page } from '@playwright/test'

export async function loginUser(page: Page) {
  await page.goto('/login')
  await page.getByPlaceholder('test@test.com').fill('test@test.com')
  await page.getByPlaceholder('8자 이상 입력해주세요').fill('test1234')
  await page.getByRole('button', { name: '로그인' }).click()
  await page.waitForURL('http://localhost:5173/')
}
