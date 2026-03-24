import {renderHook, act} from "@testing-library/react";
import {useDebounce} from "@/hooks/useDebounce";

describe("useDebounce", () => {
  it("초기값을 즉시 반환한다.", () => {
    const {result} = renderHook(() => useDebounce("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("delay 전에는 값이 변경되지 않는다.", () => {
    vi.useFakeTimers();

    const {result, rerender} = renderHook(
      ({value}) => useDebounce(value, 300),
      {initialProps: {value: "hello"}},
    );

    rerender({value: "world"});

    expect(result.current).toBe("hello");

    vi.useRealTimers();
  });

  it("delay 후에는 값이 변경된다.", () => {
    vi.useFakeTimers();

    const {result, rerender} = renderHook(
      ({value}) => useDebounce(value, 300),
      {initialProps: {value: "hello"}},
    );

    rerender({value: "world"});
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe("world");

    vi.useRealTimers();
  });
});
