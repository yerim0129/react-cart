import {test, expect} from "@playwright/test";
import {loginUser} from "./helpers";

test.describe("결제", () => {
  test("장바구니에서 결제하기 클릭하면 결제 페이지로 이동한다", async ({
    page,
  }) => {
    await loginUser(page);
    await page.getByRole("button", {name: "장바구니 담기"}).first().click();
    await page.goto("/cart");
    await page.getByRole("button", {name: "결제하기"}).click();
    await expect(page).toHaveURL(/\/checkout/);
  });

  test("배송 정보 입력 후 주문하면 주문 완료 페이지로 이동한다", async ({
    page,
  }) => {
    await loginUser(page);

    // 홈에서 바로 장바구니 담기
    await page.getByRole("button", {name: "장바구니 담기"}).first().click();

    // 결제 페이지 이동
    await page.goto("/cart");
    await page.getByRole("button", {name: "결제하기"}).click();

    // 배송 정보 입력
    await page.getByPlaceholder("홍길동").fill("테스트유저");
    await page.getByPlaceholder("010-1234-5678").fill("010-0000-0000");
    await page
      .getByPlaceholder("서울시 강남구 테헤란로 123")
      .fill("서울시 강남구 테헤란로 123");
    await page.getByPlaceholder("101동 202호").fill("101동 202호");

    // 주문하기
    await page.getByRole("button", {name: "주문하기"}).click();

    // 주문 완료 확인 (lazy loading + API 응답 시간 고려해 timeout 늘림)
    await expect(page.getByText("주문이 완료되었습니다")).toBeVisible({
      timeout: 15000,
    });
  });

  test("장바구니가 비어있으면 결제 페이지 접근 시 장바구니로 리다이렉트된다", async ({
    page,
  }) => {
    await loginUser(page);
    await page.goto("/checkout");
    await expect(page).toHaveURL(/\/cart/);
  });
});
