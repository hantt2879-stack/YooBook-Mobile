import { describe, expect, it } from "vitest";
import { canPop, createNav, currentParams, currentScreen, pop, push, replace, resetTo } from "./navStack.js";

describe("navStack", () => {
  it("khởi tạo với đúng một màn và params rỗng", () => {
    const nav = createNav("home");
    expect(currentScreen(nav)).toBe("home");
    expect(currentParams(nav)).toEqual({});
    expect(canPop(nav)).toBe(false);
  });

  it("push đẩy màn mới kèm params và cho phép quay lại", () => {
    const nav = push(createNav("classwork"), "assignmentDetail", { assignmentId: 7 });
    expect(currentScreen(nav)).toBe("assignmentDetail");
    expect(currentParams(nav)).toEqual({ assignmentId: 7 });
    expect(canPop(nav)).toBe(true);
  });

  it("pop quay lại đúng màn trước và giữ nguyên params của màn đó", () => {
    let nav = createNav("classwork", { tab: "todo" });
    nav = push(nav, "assignmentDetail", { assignmentId: 7 });
    nav = pop(nav);
    expect(currentScreen(nav)).toBe("classwork");
    expect(currentParams(nav)).toEqual({ tab: "todo" });
  });

  it("pop ở màn gốc không làm gì", () => {
    const nav = createNav("home");
    expect(pop(nav)).toEqual(nav);
  });

  it("replace thay màn hiện tại mà không tăng độ sâu", () => {
    let nav = push(createNav("classwork"), "assignmentSubmit", { assignmentId: 7 });
    nav = replace(nav, "submissionResult", { assignmentId: 7 });
    expect(currentScreen(nav)).toBe("submissionResult");
    expect(nav.stack).toHaveLength(2);
    expect(pop(nav).screen ?? currentScreen(pop(nav))).toBe("classwork");
  });

  it("resetTo xoá toàn bộ ngăn xếp", () => {
    let nav = push(push(createNav("home"), "explore"), "detail", { lessonId: 3 });
    nav = resetTo("profile");
    expect(currentScreen(nav)).toBe("profile");
    expect(canPop(nav)).toBe(false);
  });

  it("không đột biến ngăn xếp cũ", () => {
    const nav = createNav("home");
    push(nav, "explore");
    expect(nav.stack).toHaveLength(1);
  });
});
