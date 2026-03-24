import {render, screen} from "@testing-library/react";
import ErrorMessage from "@/components/common/ErrorMessage";

describe("ErrorMessage", () => {
  it("message가 화면에 보인다", () => {
    render(<ErrorMessage message="alert" />);
    expect(screen.getByText("alert")).toBeInTheDocument;
  });

  it("alert role 을 가진 요소가 렌더링 된다.", () => {
    render(<ErrorMessage message="오류 발생" />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
