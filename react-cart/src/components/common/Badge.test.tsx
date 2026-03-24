import {render, screen} from "@testing-library/react";
import Badge from "@/components/common/Badge";

describe("Badge", () => {
  it("label 텍스트가 화면에 보인다.", () => {
    render(<Badge label="신상품" />);
    expect(screen.getByText("신상품")).toBeInTheDocument();
  });

  it("variant를 지정하지 않으면 default가 적용된다.", () => {
    render(<Badge label="신상품" />);
    expect(screen.getByText("신상품")).toBeInTheDocument();
  });
});
