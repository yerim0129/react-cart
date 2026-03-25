import {test, expect} from "@playwright/test";

test.describe("상품", () => {
  test("홈 접속하면 상품 목록이 렌더링된다", async ({page}) => {
    await page.goto("/");
    await expect(page.locator("article").first()).toBeVisible();
  });

  test("상품 클릭하면 상세 페이지로 이동한다", async ({page}) => {
    await page.goto("/");
    await page.locator("article a").first().click();
    await expect(page).toHaveURL(/\/products\/\d+/);
  });

  test("상품 상세 페이지에 장바구니 담기 버튼이 있다", async ({page}) => {
    await page.goto("/");
    await page.locator("article a").first().click();
    await expect(
      page.getByRole("button", {name: "장바구니 담기"}),
    ).toBeVisible();
  });

  test("검색어 입력하면 상품 목록이 필터링된다", async ({page}) => {
    await page.goto("/");
    await page.getByPlaceholder("상품 검색...").fill("블루투스");
    await expect(page.locator("article").first()).toBeVisible({ timeout: 3000 });
  });

  test("존재하지 않는 페이지 접근하면 404 페이지가 표시된다", async ({
    page,
  }) => {
    await page.goto("/not-existing-page");
    await expect(page.getByText("404")).toBeVisible();
  });
});
