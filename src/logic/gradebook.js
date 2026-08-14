// Tổng hợp điểm cho bảng điểm lớp và thống kê bài tập.
// Tách khỏi hook React để kiểm thử được và để bản production dùng lại
// nguyên vẹn khi thay dữ liệu mock bằng dữ liệu API.
import { SUBMISSION_STATUS as S } from "./submissionState.js";

const round1 = (n) => Math.round(n * 10) / 10;

const SUBMITTED_STATUSES = [S.SUBMITTED, S.LATE_SUBMITTED, S.GRADED, S.RETURNED, S.RESUBMITTED];

export function rubricTotal(criteria) {
  return round1(criteria.reduce((sum, c) => sum + (c.earnedPoints ?? 0), 0));
}

export function rubricMax(criteria) {
  return round1(criteria.reduce((sum, c) => sum + (c.maxPoints ?? 0), 0));
}

export function isRubricWeightValid(criteria) {
  if (!criteria.length) return false;
  return criteria.reduce((sum, c) => sum + (c.weightPercent ?? 0), 0) === 100;
}

export function averageScore(submissions) {
  const scored = submissions.filter(
    (s) => s.status === S.GRADED && typeof s.finalScore === "number"
  );
  if (!scored.length) return null;
  return round1(scored.reduce((sum, s) => sum + s.finalScore, 0) / scored.length);
}

export function completionRate(submissions, totalStudents) {
  if (!totalStudents) return 0;
  const submitted = submissions.filter((s) => SUBMITTED_STATUSES.includes(s.status)).length;
  return Math.round((submitted / totalStudents) * 100);
}

export function assignmentStats(submissions, totalStudents) {
  const submitted = submissions.filter((s) => SUBMITTED_STATUSES.includes(s.status));
  const scored = submitted
    .filter((s) => s.status === S.GRADED && typeof s.finalScore === "number")
    .map((s) => s.finalScore);

  return {
    submittedCount: submitted.length,
    gradedCount: scored.length,
    notStartedCount: Math.max(0, totalStudents - submitted.length),
    completionRate: completionRate(submissions, totalStudents),
    averageScore: averageScore(submissions),
    minScore: scored.length ? Math.min(...scored) : null,
    maxScore: scored.length ? Math.max(...scored) : null,
  };
}
