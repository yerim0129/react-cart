import {formatPrice} from "./formatPrice";

describe("formatPrice", () => {
  it("1000을 넘기면 ₩1,000을 반환한다.", () => {
    expect(formatPrice(1000)).toBe("₩1,000");
  });

  it("0을 넘기면 ₩0을 반환한다.", () => {
    expect(formatPrice(0)).toBe("₩0");
  });

  it("NaN을 넘기면 ₩0을 반환한다.", () => {
    expect(formatPrice(NaN)).toBe("₩0");
  });

  it("infinity를 넘기면 ₩0을 반환한다.", () => {
    expect(formatPrice(Infinity)).toBe("₩0");
  });
});
