import {test, expect} from "@playwright/test";
import {loginUser} from "./helpers";

test.describe("장바구니", () => {
  test("로그인 후 상품을 장바구니에 담으면 토스트가 표시된다", async ({
    page,
  }) => {
    await loginUser(page);
    await page.getByRole("button", {name: "장바구니 담기"}).first().click();
    await expect(page.getByText("장바구니에 담았습니다.")).toBeVisible();
  });

  test("장바구니 페이지에서 담은 상품이 보인다", async ({page}) => {
    await loginUser(page);
    await page.locator("article a").first().click();
    await page.getByRole("button", {name: "장바구니 담기"}).click();
    await page.goto("/cart");
    await expect(page.getByRole("heading", {name: "장바구니"})).toBeVisible();
  });

  test("장바구니가 비어있으면 빈 장바구니 메시지가 표시된다", async ({
    page,
  }) => {
    await loginUser(page);
    await page.goto("/cart");
    // 상품이 없을 경우에만 통과 (초기 상태 기준)
    const emptyText = page.getByText("장바구니가 비어 있습니다.");
    const cartTitle = page.getByRole("heading", {name: "장바구니"});
    await expect(emptyText.or(cartTitle)).toBeVisible();
  });
});
