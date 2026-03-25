import {test, expect} from "@playwright/test";
import {loginUser} from "./helpers";

test.describe("인증", () => {
  test("로그인 성공하면 홈으로 이동한다", async ({page}) => {
    await loginUser(page);
    await expect(page).toHaveURL("http://localhost:5173/");
    await expect(page.getByRole("button", {name: "로그아웃"})).toBeVisible();
  });

  test("잘못된 비밀번호로 로그인하면 에러 메시지가 표시된다", async ({
    page,
  }) => {
    await page.goto("/login");
    await page.getByPlaceholder("test@test.com").fill("test@test.com");
    await page.getByPlaceholder("8자 이상 입력해주세요").fill("wrongpassword");
    await page.getByRole("button", {name: "로그인"}).click();
    await expect(page.getByRole("alert")).toBeVisible();
  });

  test("로그아웃하면 로그인 링크가 표시된다", async ({page}) => {
    await loginUser(page);
    await page.getByRole("button", {name: "로그아웃"}).click();
    await expect(page.getByRole("link", {name: "로그인"})).toBeVisible();
  });

  test("비로그인 상태로 장바구니 접근하면 로그인 페이지로 이동한다", async ({
    page,
  }) => {
    await page.goto("/cart");
    await expect(page).toHaveURL(/\/login/);
  });

  test("회원가입 성공하면 로그인 페이지로 이동한다", async ({page}) => {
    const uniqueEmail = `test_${Date.now()}@test.com`;

    await page.goto("/register");
    await page.getByPlaceholder("홍길동").fill("테스터");
    await page.getByPlaceholder("example@email.com").fill(uniqueEmail);
    await page.getByPlaceholder("8자 이상 입력해주세요").fill("test1234");
    await page
      .getByPlaceholder("비밀번호를 다시 입력해주세요")
      .fill("test1234");
    await page.getByRole("button", {name: "회원가입"}).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
