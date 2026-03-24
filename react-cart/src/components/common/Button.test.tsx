import {render, screen} from "@testing-library/react";
import Button from "@/components/common/Button";
import userEvent from "@testing-library/user-event";

describe("Button", () => {
  it("label 텍스트가 화면에 보인다", () => {
    render(<Button label="확인" />);
    expect(screen.getByText("확인")).toBeInTheDocument();
  });

  it("클릭하면 onClick이 호출된다.", async () => {
    const handleClick = vi.fn();
    render(<Button label="확인" onClick={handleClick} />);

    await userEvent.click(screen.getByText("확인"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("disabled 이면 클릭해도 onClick이 호출되지 않는다.", async () => {
    const handleClick = vi.fn();
    render(<Button label="확인" disabled onClick={handleClick} />);

    await userEvent.click(screen.getByText("확인"));

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
