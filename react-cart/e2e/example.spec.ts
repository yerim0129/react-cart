import {test, expect} from "@playwright/test";

test("상품목록 페이지가 로드된다.", async ({page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/shop/i);
});

test("상품 클릭하면 상세 페이지로 이동한다.", async ({page}) => {
  await page.goto("/");
  await page.locator("article a").first().click();
  await expect(page).toHaveURL(/\products\/\d+/);
});
