// Nguồn sự thật duy nhất cho bài tập / rubric / bài nộp của prototype.
// Cả ba vai trò đọc và ghi cùng mảng này trong state dùng chung, nhờ vậy
// hành động chấm bài của giáo viên hiện ngay ở phía học sinh trong cùng phiên.
import { SUBMISSION_STATUS as S } from "../logic/submissionState.js";

export const ASSIGNMENT_TYPE = {
  READING: 1,
  QUIZ: 2,
  EXPERIMENT: 3,
  FILE_SUBMISSION: 4,
  SHORT_ANSWER: 5,
  MIXED: 6,
};

export const ASSIGNMENT_TYPE_LABEL = {
  1: "Đọc tài liệu",
  2: "Trắc nghiệm",
  3: "Thí nghiệm ảo",
  4: "Nộp tệp",
  5: "Tự luận ngắn",
  6: "Tổng hợp",
};

// Học sinh mà prototype đang đóng vai. Trùng với T_STUDENTS[0] để bảng điểm
// phía giáo viên và màn bài tập phía học sinh nói về cùng một người.
export const CURRENT_STUDENT_ID = 1;

export const ROSTER = [
  { id: 1, name: "Nguyễn Thị Hoa", initials: "HN", tint: "#00aaab", classId: 1 },
  { id: 2, name: "Trần Quốc Bảo", initials: "QB", tint: "#f59e0b", classId: 1 },
  { id: 3, name: "Lê Minh Anh", initials: "MA", tint: "#138cd2", classId: 1 },
  { id: 4, name: "Phạm Gia Hân", initials: "GH", tint: "#22c55e", classId: 1 },
  { id: 5, name: "Đỗ Khánh Linh", initials: "KL", tint: "#ef5da8", classId: 1 },
];

export const SEED_RUBRICS = [
  {
    id: 1,
    name: "Rubric bài tự luận Sinh học",
    criteria: [
      { code: "C1", name: "Nêu đúng vị trí diễn ra quang hợp", maxPoints: 3, weightPercent: 30 },
      { code: "C2", name: "Mô tả đủ pha sáng và pha tối", maxPoints: 5, weightPercent: 50 },
      { code: "C3", name: "Kết luận vai trò với sự sống", maxPoints: 2, weightPercent: 20 },
    ],
  },
  {
    id: 2,
    name: "Rubric dự án nhóm",
    criteria: [
      { code: "D1", name: "Nội dung khoa học chính xác", maxPoints: 4, weightPercent: 40 },
      { code: "D2", name: "Trình bày và hình ảnh minh hoạ", maxPoints: 3, weightPercent: 30 },
      { code: "D3", name: "Phân công và hợp tác nhóm", maxPoints: 3, weightPercent: 30 },
    ],
  },
];

export const SEED_ASSIGNMENTS = [
  {
    id: 1,
    classId: 1,
    className: "SINH HỌC 8A1",
    title: "Bài tập tuần 20: Quang hợp của thực vật",
    type: ASSIGNMENT_TYPE.SHORT_ANSWER,
    instructions: "Trình bày quá trình quang hợp ở thực vật, có sơ đồ minh hoạ hai pha.",
    checklist: [
      "Nêu vị trí diễn ra quang hợp trong tế bào",
      "Mô tả pha sáng và pha tối",
      "Kết luận vai trò của quang hợp với sự sống",
    ],
    openAtIso: "2026-05-10T07:00:00",
    dueAtIso: "2026-05-17T23:59:00",
    allowLate: true,
    maxAttempts: 2,
    maxScore: 10,
    passingScore: 5,
    rubricId: 1,
    targetStudentIds: null,
    attachments: [{ name: "phieu-huong-dan-tuan-20.pdf", size: "480 KB", kind: "pdf" }],
    isPublished: true,
    totalStudents: 32,
  },
  {
    id: 2,
    classId: 1,
    className: "SINH HỌC 8A1",
    title: "Trắc nghiệm: Cấu tạo tế bào thực vật",
    type: ASSIGNMENT_TYPE.QUIZ,
    instructions: "Làm 3 câu trắc nghiệm trong 10 phút.",
    checklist: [],
    openAtIso: "2026-05-12T07:00:00",
    dueAtIso: "2026-05-18T23:59:00",
    allowLate: false,
    maxAttempts: 1,
    maxScore: 10,
    passingScore: 5,
    rubricId: null,
    targetStudentIds: null,
    attachments: [],
    isPublished: true,
    totalStudents: 32,
  },
  {
    id: 3,
    classId: 3,
    className: "KHTN 6A2",
    title: "Dự án nhóm: Vòng tuần hoàn nước",
    type: ASSIGNMENT_TYPE.FILE_SUBMISSION,
    instructions: "Nộp bài trình bày của nhóm dưới dạng PDF hoặc ảnh chụp poster.",
    checklist: ["Sơ đồ vòng tuần hoàn nước", "Giải thích từng giai đoạn", "Phân công nhóm"],
    openAtIso: "2026-05-08T07:00:00",
    dueAtIso: "2026-05-22T23:59:00",
    allowLate: true,
    maxAttempts: 3,
    maxScore: 10,
    passingScore: 5,
    rubricId: 2,
    targetStudentIds: null,
    attachments: [],
    isPublished: true,
    totalStudents: 34,
  },
  {
    id: 4,
    classId: 1,
    className: "SINH HỌC 8A1",
    title: "Bài tập tuần 19: Hô hấp tế bào",
    type: ASSIGNMENT_TYPE.SHORT_ANSWER,
    instructions: "So sánh hô hấp tế bào với quang hợp.",
    checklist: ["Nêu nơi diễn ra", "So sánh nguyên liệu và sản phẩm"],
    openAtIso: "2026-05-03T07:00:00",
    dueAtIso: "2026-05-10T23:59:00",
    allowLate: true,
    maxAttempts: 2,
    maxScore: 10,
    passingScore: 5,
    rubricId: 1,
    targetStudentIds: null,
    attachments: [],
    isPublished: true,
    totalStudents: 32,
  },
];

export const SEED_SUBMISSIONS = [
  // Bài tuần 19 — đã chấm, dùng để bảng điểm có sẵn dữ liệu.
  {
    id: 1, assignmentId: 4, studentId: 1, status: S.GRADED, attemptNumber: 1,
    submittedAtIso: "2026-05-10T20:14:00", isLate: false,
    answerText: "Hô hấp tế bào diễn ra ở ti thể, phân giải glucôzơ để tạo ATP.",
    attachments: [], finalScore: 8.5, feedback: "Trình bày rõ, thiếu kết luận.",
    gradedAtIso: "2026-05-12T09:00:00",
    criteriaScores: { C1: 3, C2: 4.5, C3: 1 }, criteriaComments: {},
  },
  {
    id: 2, assignmentId: 4, studentId: 2, status: S.GRADED, attemptNumber: 1,
    submittedAtIso: "2026-05-11T07:02:00", isLate: true,
    answerText: "Em nêu được nơi diễn ra nhưng chưa so sánh đủ.",
    attachments: [], finalScore: 6, feedback: "Cần ôn lại phần mô dẫn.",
    gradedAtIso: "2026-05-12T09:10:00",
    criteriaScores: { C1: 2, C2: 3, C3: 1 }, criteriaComments: {},
  },
  {
    id: 3, assignmentId: 4, studentId: 3, status: S.GRADED, attemptNumber: 1,
    submittedAtIso: "2026-05-09T18:41:00", isLate: false,
    answerText: "Em có bảng so sánh hai quá trình ở cuối bài.",
    attachments: [], finalScore: 9.1, feedback: "Bảng so sánh rất tốt.",
    gradedAtIso: "2026-05-12T09:20:00",
    criteriaScores: { C1: 3, C2: 5, C3: 1.1 }, criteriaComments: {},
  },
  // Bài tuần 20 — đang mở, hỗn hợp trạng thái để màn chấm bài có việc để làm.
  {
    id: 4, assignmentId: 1, studentId: 2, status: S.SUBMITTED, attemptNumber: 1,
    submittedAtIso: "2026-05-15T20:14:00", isLate: false,
    answerText: "Quang hợp diễn ra ở lục lạp, cần ánh sáng, nước và khí CO₂. Sản phẩm tạo ra là glucôzơ và khí ôxi. Em có đính kèm sơ đồ mô tả pha sáng và pha tối.",
    attachments: [{ name: "so-do-quang-hop.pdf", size: "1,2 MB", kind: "pdf" }],
    finalScore: null, feedback: "", gradedAtIso: null,
    criteriaScores: {}, criteriaComments: {},
  },
  {
    id: 5, assignmentId: 1, studentId: 3, status: S.SUBMITTED, attemptNumber: 1,
    submittedAtIso: "2026-05-15T18:41:00", isLate: false,
    answerText: "Em trình bày hai pha của quang hợp và so sánh với hô hấp tế bào ở phần cuối bài làm.",
    attachments: [], finalScore: null, feedback: "", gradedAtIso: null,
    criteriaScores: {}, criteriaComments: {},
  },
  {
    id: 6, assignmentId: 1, studentId: 4, status: S.RETURNED, attemptNumber: 1,
    submittedAtIso: "2026-05-14T21:30:00", isLate: false,
    answerText: "Bài làm mới có phần pha sáng.",
    attachments: [], finalScore: null,
    feedback: "Em bổ sung pha tối và kết luận rồi nộp lại giúp cô nhé.",
    gradedAtIso: "2026-05-15T08:00:00",
    criteriaScores: {}, criteriaComments: {},
  },
];

export const SEED_ANNOUNCEMENTS = [
  { id: 1, classId: 1, title: "Nhắc nộp bài tập tuần 20", body: "Các em hoàn thành bài tập tuần 20 trước 23:59 ngày 17/05. Phần sơ đồ pha tối là bắt buộc.", createdAtIso: "2026-05-16T07:40:00", isPinned: true },
  { id: 2, classId: 1, title: "Lịch kiểm tra giữa kỳ", body: "Kiểm tra giữa kỳ diễn ra tiết 2 ngày 19/05, nội dung từ bài 1 đến bài 6.", createdAtIso: "2026-05-12T16:10:00", isPinned: false },
];

export const INITIAL_COURSEWORK = {
  assignments: SEED_ASSIGNMENTS,
  submissions: SEED_SUBMISSIONS,
  rubrics: SEED_RUBRICS,
  announcements: SEED_ANNOUNCEMENTS,
  nextSubmissionId: 7,
};
