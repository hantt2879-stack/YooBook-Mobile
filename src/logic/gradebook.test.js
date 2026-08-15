import { describe, expect, it } from "vitest";
import { SUBMISSION_STATUS as S } from "./submissionState.js";
import {
  assignmentStats,
  averageScore,
  completionRate,
  isRubricWeightValid,
  rubricMax,
  rubricTotal,
} from "./gradebook.js";

const criteria = [
  { code: "C1", name: "Nêu vị trí quang hợp", maxPoints: 3, weightPercent: 30, earnedPoints: 2.5 },
  { code: "C2", name: "Mô tả hai pha", maxPoints: 5, weightPercent: 50, earnedPoints: 4 },
  { code: "C3", name: "Kết luận", maxPoints: 2, weightPercent: 20, earnedPoints: 1 },
];

describe("rubric", () => {
  it("cộng điểm đã đạt và làm tròn 1 chữ số", () => {
    expect(rubricTotal(criteria)).toBe(7.5);
  });

  it("cộng điểm tối đa", () => {
    expect(rubricMax(criteria)).toBe(10);
  });

  it("coi tiêu chí chưa chấm là 0 điểm", () => {
    expect(rubricTotal([{ maxPoints: 5, weightPercent: 100 }])).toBe(0);
  });

  it("hợp lệ khi tổng trọng số đúng 100", () => {
    expect(isRubricWeightValid(criteria)).toBe(true);
  });

  it("không hợp lệ khi tổng trọng số khác 100", () => {
    expect(isRubricWeightValid([{ maxPoints: 5, weightPercent: 60 }])).toBe(false);
  });

  it("rubric rỗng là không hợp lệ", () => {
    expect(isRubricWeightValid([])).toBe(false);
  });
});

const subs = [
  { status: S.GRADED, finalScore: 8 },
  { status: S.GRADED, finalScore: 6.5 },
  { status: S.SUBMITTED, finalScore: null },
  { status: S.NOT_STARTED, finalScore: null },
];

describe("tổng hợp", () => {
  it("điểm trung bình chỉ tính bài đã chấm", () => {
    expect(averageScore(subs)).toBe(7.3);
  });

  it("điểm trung bình là null khi chưa chấm bài nào", () => {
    expect(averageScore([{ status: S.SUBMITTED, finalScore: null }])).toBeNull();
  });

  it("tỉ lệ hoàn thành tính theo sĩ số, không theo số bản ghi", () => {
    expect(completionRate(subs, 10)).toBe(30);
  });

  it("tỉ lệ hoàn thành là 0 khi sĩ số bằng 0", () => {
    expect(completionRate(subs, 0)).toBe(0);
  });

  it("thống kê một bài tập trả đủ các chỉ số", () => {
    expect(assignmentStats(subs, 10)).toEqual({
      submittedCount: 3,
      gradedCount: 2,
      notStartedCount: 7,
      completionRate: 30,
      averageScore: 7.3,
      minScore: 6.5,
      maxScore: 8,
    });
  });

  it("thống kê khi chưa ai nộp", () => {
    expect(assignmentStats([], 20)).toEqual({
      submittedCount: 0,
      gradedCount: 0,
      notStartedCount: 20,
      completionRate: 0,
      averageScore: null,
      minScore: null,
      maxScore: null,
    });
  });
});
