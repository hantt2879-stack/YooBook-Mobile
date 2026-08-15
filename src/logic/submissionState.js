// Vòng đời bài nộp — bám đúng SubmissionStatus của backend
// (xem eduverse-yoolife/src/app/teachers/_services/class-submission.model.ts).
// Prototype trước đây chỉ có boolean `submitted`, nên thiếu hẳn mắt xích
// "giáo viên trả bài → học sinh nộp lại" vốn là vòng phản hồi của dạy–học.

export const SUBMISSION_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  SUBMITTED: 2,
  LATE_SUBMITTED: 3,
  GRADED: 4,
  RETURNED: 5,
  RESUBMITTED: 6,
};

export const SUBMISSION_LABEL = {
  0: "Chưa làm",
  1: "Đang làm",
  2: "Đã nộp",
  3: "Nộp muộn",
  4: "Đã chấm",
  5: "Trả lại",
  6: "Đã nộp lại",
};

export const SUBMISSION_TINT = {
  0: { bg: "#f1f5f7", color: "#617789" },
  1: { bg: "#e7f2fb", color: "#0b6aa3" },
  2: { bg: "#eaf6f8", color: "#00708f" },
  3: { bg: "#fff5e6", color: "#b45309" },
  4: { bg: "#f0fdf4", color: "#15803d" },
  5: { bg: "#fdeef5", color: "#b13a75" },
  6: { bg: "#eaf6f8", color: "#00708f" },
};

// Chuỗi ISO cục bộ ("2026-05-17T23:59:00") so sánh được trực tiếp bằng < >
// vì cùng độ dài và cùng thứ tự từ vựng — không cần Date, tránh lệch múi giờ.
function isAfter(aIso, bIso) {
  return String(aIso) > String(bIso);
}

export function canSubmit(assignment, submission, nowIso) {
  const attempts = submission.attemptNumber ?? 0;
  const wasReturned = submission.status === SUBMISSION_STATUS.RETURNED;

  if (assignment.openAtIso && isAfter(assignment.openAtIso, nowIso)) {
    return { allowed: false, reason: "notOpen", willBeLate: false };
  }

  const late = !!assignment.dueAtIso && isAfter(nowIso, assignment.dueAtIso);

  if (attempts >= (assignment.maxAttempts ?? 1) && !wasReturned) {
    return { allowed: false, reason: "noAttemptsLeft", willBeLate: late };
  }
  if (submission.status === SUBMISSION_STATUS.GRADED) {
    return { allowed: false, reason: "alreadyGraded", willBeLate: late };
  }
  if (late && !assignment.allowLate) {
    return { allowed: false, reason: "closed", willBeLate: true };
  }

  return { allowed: true, reason: null, willBeLate: late };
}

export function applySubmit(submission, assignment, nowIso) {
  const late = !!assignment.dueAtIso && isAfter(nowIso, assignment.dueAtIso);
  const wasReturned = submission.status === SUBMISSION_STATUS.RETURNED;
  const status = wasReturned
    ? SUBMISSION_STATUS.RESUBMITTED
    : late
      ? SUBMISSION_STATUS.LATE_SUBMITTED
      : SUBMISSION_STATUS.SUBMITTED;

  return {
    ...submission,
    status,
    attemptNumber: (submission.attemptNumber ?? 0) + 1,
    submittedAtIso: nowIso,
    isLate: late,
  };
}

export function applyGrade(submission, { finalScore, feedback, gradedAtIso }) {
  return {
    ...submission,
    status: SUBMISSION_STATUS.GRADED,
    finalScore,
    feedback,
    gradedAtIso,
  };
}

export function applyReturn(submission, { feedback, returnedAtIso }) {
  return {
    ...submission,
    status: SUBMISSION_STATUS.RETURNED,
    finalScore: null,
    feedback,
    gradedAtIso: returnedAtIso,
  };
}
