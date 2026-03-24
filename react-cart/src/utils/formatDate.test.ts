import {formatDate, formatDateTime} from "./formatDate";

describe("formatDate", () => {
  it("year, month, day를 반환한다.", () => {
    expect(formatDate("2026-03-01")).toBe("2026년 3월 1일");
  });

  it("year, month, day, hour, minute를 반환한다.", () => {
    expect(formatDateTime("2026-03-01T09:00:00")).toBe(
      "2026. 03. 01. 오전 09:00",
    );
  });
});
