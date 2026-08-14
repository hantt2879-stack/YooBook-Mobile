import { describe, expect, it } from "vitest";
import {
  SUBMISSION_STATUS as S,
  applyGrade,
  applyReturn,
  applySubmit,
  canSubmit,
} from "./submissionState.js";

const asg = {
  id: 1,
  openAtIso: "2026-05-10T00:00:00",
  dueAtIso: "2026-05-17T23:59:00",
  allowLate: true,
  maxAttempts: 2,
  maxScore: 10,
};
const fresh = { assignmentId: 1, status: S.NOT_STARTED, attemptNumber: 0, attachments: [] };

describe("canSubmit", () => {
  it("chặn khi chưa tới giờ mở", () => {
    expect(canSubmit(asg, fresh, "2026-05-09T08:00:00")).toEqual({
      allowed: false,
      reason: "notOpen",
      willBeLate: false,
    });
  });

  it("cho nộp trong hạn và không đánh dấu muộn", () => {
    expect(canSubmit(asg, fresh, "2026-05-15T08:00:00")).toEqual({
      allowed: true,
      reason: null,
      willBeLate: false,
    });
  });

  it("cho nộp sau hạn nhưng báo trước là sẽ muộn khi allowLate bật", () => {
    expect(canSubmit(asg, fresh, "2026-05-18T08:00:00")).toEqual({
      allowed: true,
      reason: null,
      willBeLate: true,
    });
  });

  it("chặn sau hạn khi allowLate tắt", () => {
    const strict = { ...asg, allowLate: false };
    expect(canSubmit(strict, fresh, "2026-05-18T08:00:00").reason).toBe("closed");
  });

  it("chặn khi đã dùng hết số lượt", () => {
    const used = { ...fresh, status: S.SUBMITTED, attemptNumber: 2 };
    expect(canSubmit(asg, used, "2026-05-15T08:00:00").reason).toBe("noAttemptsLeft");
  });

  it("chặn khi đã chấm và không bị trả lại", () => {
    const graded = { ...fresh, status: S.GRADED, attemptNumber: 1 };
    expect(canSubmit(asg, graded, "2026-05-15T08:00:00").reason).toBe("alreadyGraded");
  });

  it("cho nộp lại khi giáo viên đã trả bài, kể cả khi đã từng chấm", () => {
    const returned = { ...fresh, status: S.RETURNED, attemptNumber: 1 };
    expect(canSubmit(asg, returned, "2026-05-15T08:00:00").allowed).toBe(true);
  });
});

describe("applySubmit", () => {
  it("lần nộp đầu đúng hạn chuyển sang Đã nộp và tăng số lượt", () => {
    const next = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    expect(next.status).toBe(S.SUBMITTED);
    expect(next.attemptNumber).toBe(1);
    expect(next.isLate).toBe(false);
    expect(next.submittedAtIso).toBe("2026-05-15T08:00:00");
  });

  it("nộp sau hạn chuyển sang Nộp muộn", () => {
    const next = applySubmit(fresh, asg, "2026-05-18T08:00:00");
    expect(next.status).toBe(S.LATE_SUBMITTED);
    expect(next.isLate).toBe(true);
  });

  it("nộp sau khi bị trả bài chuyển sang Đã nộp lại", () => {
    const returned = { ...fresh, status: S.RETURNED, attemptNumber: 1 };
    const next = applySubmit(returned, asg, "2026-05-16T08:00:00");
    expect(next.status).toBe(S.RESUBMITTED);
    expect(next.attemptNumber).toBe(2);
  });

  it("không đột biến bản ghi cũ", () => {
    applySubmit(fresh, asg, "2026-05-15T08:00:00");
    expect(fresh.attemptNumber).toBe(0);
  });
});

describe("applyGrade và applyReturn", () => {
  it("chấm điểm chuyển sang Đã chấm và giữ lại điểm, nhận xét", () => {
    const submitted = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    const graded = applyGrade(submitted, {
      finalScore: 8.5,
      feedback: "Thiếu kết luận",
      gradedAtIso: "2026-05-18T09:00:00",
    });
    expect(graded.status).toBe(S.GRADED);
    expect(graded.finalScore).toBe(8.5);
    expect(graded.feedback).toBe("Thiếu kết luận");
    expect(graded.gradedAtIso).toBe("2026-05-18T09:00:00");
  });

  it("trả bài chuyển sang Trả lại và xoá điểm cũ", () => {
    const submitted = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    const graded = applyGrade(submitted, { finalScore: 4, feedback: "", gradedAtIso: "x" });
    const returned = applyReturn(graded, {
      feedback: "Làm lại phần pha tối",
      returnedAtIso: "2026-05-18T10:00:00",
    });
    expect(returned.status).toBe(S.RETURNED);
    expect(returned.finalScore).toBeNull();
    expect(returned.feedback).toBe("Làm lại phần pha tối");
  });
});
