import { useEffect } from "react";
import { ACCENT, INK, MUTED, BORDER } from "../data/shared.js";
import { CATS, EXAM, LESSONS, LESSON_TYPES, LEVELS, QUICK, QUICK_CORRECT, STEPS } from "../data/catalog.js";
import { S_ASSIGNMENTS } from "../data/student.js";
import { T_CLASSES, T_STUDENTS } from "../data/teacher.js";
import { ASSIGNMENT_TYPE_LABEL, CURRENT_STUDENT_ID } from "../data/coursework.js";
import { SUBMISSION_STATUS as S, canSubmit, applySubmit } from "./submissionState.js";

const REASON_LABEL = {
  notOpen: "Bài tập chưa mở",
  closed: "Đã quá hạn nộp",
  noAttemptsLeft: "Đã hết lượt nộp",
  alreadyGraded: "Bài đã được chấm",
};

// "2026-05-17T23:59:00" -> "17/05 · 23:59"
function fmt(iso) {
  if (!iso) return "";
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)} · ${iso.slice(11, 16)}`;
}

function statusOf(submission) {
  return submission ? submission.status : S.NOT_STARTED;
}

export const INITIAL_STUDENT = {
  tab: "home", view: "grid",
  detailTab: "overview", libTab: "learning",
  step: 0, playing: false, quickPick: null,
  examIdx: 0, answers: [null, null, null], examSecs: 596,
  saved: false,
  cwTab: "todo", asgIdx: 0, submitted: false,
  draftText: "",
  draftFiles: [],
  draftSavedAtIso: null,
  submitConfirmOpen: false,
  classIdx: 0, classDetailTab: "feed",
  exploreCat: "Tất cả", exploreSort: "newest", search: "", sortMenuOpen: false,
  filterOpen: false, fLevel: "Tất cả", fGrade: "Tất cả", fTypes: [], fTopic: "",
  exploreSaved: [],
};

// Shared announcement mock for the student-facing Class Detail newsfeed —
// the same content the teacher dashboard's own "Bảng tin" tab shows.
const CLASS_NEWS = [
  { title: "Nhắc nộp bài tập tuần 20", when: "Hôm nay · 07:40", body: "Các em hoàn thành bài tập tuần 20 trước 23:59 ngày 17/05. Phần sơ đồ pha tối là bắt buộc." },
  { title: "Lịch kiểm tra giữa kỳ", when: "12/05 · 16:10", body: "Kiểm tra giữa kỳ diễn ra tiết 2 ngày 19/05, nội dung từ bài 1 đến bài 6." },
];

// Avatar initials for T_STUDENTS, aligned by index (kept separate since the
// roster's own initials aren't stored on that constant).
const STUDENT_INITIALS = ["HN", "QB", "MA", "GH", "KL"];

// Per-class mock data (teacher + lesson progress) for the student-facing
// Class Detail screen, aligned by index with T_CLASSES. Kept separate from
// TeacherScreens' own T_CLASSES usage so the two role-specific views never
// share navigation state.
const CLASS_EXTRA = [
  {
    teacher: "Cô Phạm Thu Trang", initials: "PT", tint: "linear-gradient(135deg,#138cd2,#00708f)", teacherMeta: "THCS Chu Văn An",
    lessons: [
      { title: "Cấu tạo tế bào thực vật", status: "Đã học", pct: "100%", statusBg: "#f0fdf4", statusColor: "#15803d" },
      { title: "Quang hợp ở thực vật", status: "Đang học", pct: "60%", statusBg: "#eaf6f8", statusColor: "#00708f" },
      { title: "Hô hấp tế bào", status: "Chưa học", pct: "0%", statusBg: "#f1f5f7", statusColor: "#617789" },
    ],
  },
  {
    teacher: "Cô Phạm Thu Trang", initials: "PT", tint: "linear-gradient(135deg,#138cd2,#00708f)", teacherMeta: "THCS Chu Văn An",
    lessons: [
      { title: "Cấu tạo tế bào thực vật", status: "Đã học", pct: "100%", statusBg: "#f0fdf4", statusColor: "#15803d" },
      { title: "Quang hợp ở thực vật", status: "Chưa học", pct: "0%", statusBg: "#f1f5f7", statusColor: "#617789" },
    ],
  },
  {
    teacher: "Thầy Vũ Đình Nam", initials: "VN", tint: "linear-gradient(135deg,#22c55e,#15803d)", teacherMeta: "THCS Chu Văn An",
    lessons: [
      { title: "Vòng tuần hoàn nước trong tự nhiên", status: "Đang học", pct: "72%", statusBg: "#eaf6f8", statusColor: "#00708f" },
      { title: "Trạng thái của nước", status: "Đã học", pct: "100%", statusBg: "#f0fdf4", statusColor: "#15803d" },
    ],
  },
  {
    teacher: "Cô Phạm Thu Trang", initials: "PT", tint: "linear-gradient(135deg,#138cd2,#00708f)", teacherMeta: "THCS Chu Văn An",
    lessons: [
      { title: "Di truyền học cơ bản", status: "Đang học", pct: "28%", statusBg: "#eaf6f8", statusColor: "#00708f" },
    ],
  },
];

// Same underlying explore/filter state (exploreCat, fLevel, fGrade, fTypes,
// fTopic, exploreSort, search) is also read by useTeacherLogic's tExplore —
// the prototype shares one filter bar's state across the student and teacher
// "Khám phá" screens. Keep these two small helpers duplicated there rather
// than introducing a cross-hook dependency.
export function useStudentLogic(ctx) {
  const { s, setState, t, cardOn, go, push, resetTo } = ctx;

  // Bộ đếm giờ làm bài kiểm tra: chỉ chạy khi đang ở màn "exam", khởi động
  // lại mỗi khi đổi màn (thay cho việc đọc stateRef bên trong interval cũ).
  useEffect(() => {
    if (ctx.screen !== "exam") return;
    const id = setInterval(() => {
      setState((prev) => (prev.examSecs > 0 ? { examSecs: prev.examSecs - 1 } : {}));
    }, 1000);
    return () => clearInterval(id);
  }, [ctx.screen]);

  const step = STEPS[s.step];

  const mkLesson = (l) => ({
    ...l, tintBg: l.tint, onClick: () => go("detail"), onView: () => go("detail"), onLearnNow: () => { setState({ step: 0, playing: false, quickPick: null }); push("player"); },
    isSaved: s.exploreSaved.includes(l.id),
    onSave: () => setState((prev) => ({ exploreSaved: prev.exploreSaved.includes(l.id) ? prev.exploreSaved.filter((x) => x !== l.id) : [...prev.exploreSaved, l.id] })),
  });

  const chipDefs = [{ label: "Tất cả", icon: "/assets/cat/all.svg" }].concat(CATS.slice(0, 6));
  const chips = chipDefs.map((c) => {
    const on = s.exploreCat === c.label;
    return {
      ...c, onClick: () => setState({ exploreCat: c.label }),
      border: on ? `1.4px solid ${ACCENT}` : `1px solid ${BORDER}`,
      bg: on ? ACCENT : "#fff", color: on ? "#fff" : "#455771",
      iconFilter: on ? "brightness(0) invert(1)" : "none",
    };
  });
  const activeGrades = (() => {
    const set = new Set(LESSONS.map((l) => l.grade));
    return ["Tất cả", ...Array.from(set).sort((a, b) => parseInt(a.replace("Lớp ", ""), 10) - parseInt(b.replace("Lớp ", ""), 10))];
  })();

  const searchQuery = s.search.trim().toLowerCase();
  const applyFilters = (list) => list.filter((l) => {
    if (s.exploreCat !== "Tất cả" && l.subject !== s.exploreCat) return false;
    if (s.fLevel !== "Tất cả" && l.level !== s.fLevel) return false;
    if (s.fGrade !== "Tất cả" && l.grade !== s.fGrade) return false;
    if (s.fTypes.length && !s.fTypes.includes(l.type)) return false;
    if (s.fTopic && l.title !== s.fTopic) return false;
    if (searchQuery) {
      const hay = `${l.title} ${l.subject} ${l.grade} ${l.type} ${l.typeLabel}`.toLowerCase();
      if (!hay.includes(searchQuery)) return false;
    }
    return true;
  });
  const sortLessons = (list) => {
    if (s.exploreSort === "popular") return [...list].sort((a, b) => parseInt(b.reviews, 10) - parseInt(a.reviews, 10));
    if (s.exploreSort === "rating") return [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    return list;
  };
  const filterBySubject = applyFilters; // kept for readability at call sites below
  const SORT_LABELS = { newest: "Mới nhất", popular: "Phổ biến", rating: "Đánh giá cao" };
  const exploreSortLabel = SORT_LABELS[s.exploreSort];
  const SORT_CYCLE = ["newest", "popular", "rating"];
  const sortMenuOptions = SORT_CYCLE.map((key) => ({
    key, label: SORT_LABELS[key], selected: s.exploreSort === key,
    onClick: () => setState({ exploreSort: key, sortMenuOpen: false }),
  }));
  const toggleSortMenu = () => setState({ sortMenuOpen: !s.sortMenuOpen });
  const closeSortMenu = () => setState({ sortMenuOpen: false });

  const trendingTopics = Array.from(new Set(LESSONS.map((l) => l.title))).slice(0, 10);
  const filterLevels = ["Tất cả", ...LEVELS].map((label) => ({
    label, selected: s.fLevel === label, onClick: () => setState({ fLevel: label }),
  }));
  const filterGrades = activeGrades.map((label) => ({
    label, selected: s.fGrade === label, onClick: () => setState({ fGrade: label }),
  }));
  const filterSubjects = [{ label: "Tất cả" }].concat(CATS).map((c) => ({
    label: c.label, selected: s.exploreCat === c.label, onClick: () => setState({ exploreCat: c.label }),
  }));
  const filterTypes = LESSON_TYPES.map((label) => {
    const on = s.fTypes.includes(label);
    return { label, selected: on, onClick: () => setState((prev) => ({ fTypes: prev.fTypes.includes(label) ? prev.fTypes.filter((x) => x !== label) : [...prev.fTypes, label] })) };
  });
  const filterTopics = trendingTopics.map((label) => ({
    label, selected: s.fTopic === label, onClick: () => setState({ fTopic: s.fTopic === label ? "" : label }),
  }));
  const filterSorts = [["newest", "Mới nhất"], ["popular", "Phổ biến"], ["rating", "Đánh giá cao"]].map(([key, label]) => ({
    label, selected: s.exploreSort === key, onClick: () => setState({ exploreSort: key }),
  }));
  const activeFilterCount = (s.fLevel !== "Tất cả" ? 1 : 0) + (s.fGrade !== "Tất cả" ? 1 : 0) + s.fTypes.length + (s.fTopic ? 1 : 0) + (s.exploreCat !== "Tất cả" ? 1 : 0);
  const resetFilters = () => setState({ exploreCat: "Tất cả", fLevel: "Tất cả", fGrade: "Tất cả", fTypes: [], fTopic: "", exploreSort: "newest" });
  const openFilter = () => setState({ filterOpen: true });
  const closeFilter = () => setState({ filterOpen: false });

  const grid = s.view === "grid";
  const detailTabDefs = [
    { key: "overview", label: "Tổng quan" }, { key: "content", label: "Nội dung" }, { key: "reviews", label: "Đánh giá" },
  ];
  const detailTabs = detailTabDefs.map((tb) => {
    const on = s.detailTab === tb.key;
    return { label: tb.label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ detailTab: tb.key }) };
  });

  const libTabDefs = [
    { key: "learning", label: "Đang học" }, { key: "purchased", label: "Đã mua" },
    { key: "saved", label: "Đã lưu" }, { key: "completed", label: "Hoàn thành" },
  ];
  const libTabs = libTabDefs.map((tb) => {
    const on = s.libTab === tb.key;
    return { label: tb.label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ libTab: tb.key }) };
  });
  const libSets = {
    learning: [
      { title: "Cấu tạo tế bào thực vật", meta: "Sinh học · Bài 3/5", pct: "60%", bar: ACCENT, tint: LESSONS[0].tint, img: LESSONS[0].img },
      { title: "Ba định luật Newton", meta: "Vật lý · Bài 2/6", pct: "33%", bar: "#138cd2", tint: LESSONS[4].tint, img: LESSONS[4].img },
      { title: "Thí nghiệm điện phân dung dịch CuSO₄", meta: "Hóa học · Bài 1/4", pct: "25%", bar: "#f59e0b", tint: LESSONS[1].tint, img: LESSONS[1].img },
    ],
    purchased: [
      { title: "Ba định luật Newton", meta: "Vật lý · Đã mua 20/04/2026", pct: "100%", bar: "#138cd2", tint: LESSONS[4].tint, img: LESSONS[4].img },
      { title: "Chiến dịch Điện Biên Phủ", meta: "Lịch sử · Đã mua 02/03/2026", pct: "100%", bar: "#22c55e", tint: LESSONS[3].tint, img: LESSONS[3].img },
    ],
    saved: [
      { title: "Hệ Mặt Trời trong không gian 3D", meta: "Khoa học · Đã lưu 2 ngày trước", pct: "0%", bar: MUTED, tint: LESSONS[2].tint, img: LESSONS[2].img },
      { title: "Địa hình Việt Nam qua bản đồ 3D", meta: "Địa lý · Đã lưu 5 ngày trước", pct: "0%", bar: MUTED, tint: LESSONS[5].tint, img: LESSONS[5].img },
    ],
    completed: [
      { title: "Chiến dịch Điện Biên Phủ", meta: "Lịch sử · Hoàn thành 12/07", pct: "100%", bar: "#22c55e", tint: LESSONS[3].tint, img: LESSONS[3].img },
    ],
  };
  const libraryItems = libSets[s.libTab].map((l) => ({ ...l, tintBg: l.tint, barColor: l.bar, onClick: () => go("detail") }));

  const quickOptions = QUICK.map((tx, i) => {
    const picked = s.quickPick === i;
    const revealed = s.quickPick !== null;
    const correct = i === QUICK_CORRECT;
    let border = `1px solid ${BORDER}`, bg = "#fff", dotBg = "#edf7f9", dotColor = "#455771", dotBorder = "1px solid #ddeaf0", color = "#455771", weight = 400;
    if (revealed && correct) { border = "1.6px solid #22c55e"; bg = "#f0fdf4"; dotBg = "#22c55e"; dotColor = "#fff"; dotBorder = "1px solid #22c55e"; color = "#15803d"; weight = 600; }
    else if (picked) { border = "1.6px solid #ef4444"; bg = "#fef2f2"; dotBg = "#ef4444"; dotColor = "#fff"; dotBorder = "1px solid #ef4444"; color = "#b91c1c"; weight = 600; }
    return { text: tx, letter: "ABCD"[i], border, bg, dotBg, dotColor, dotBorder, color, weight, onClick: () => setState({ quickPick: i }) };
  });

  const q = EXAM[s.examIdx];
  const picked = s.answers[s.examIdx];
  const examOptions = q.opts.map((tx, i) => {
    const on = picked === i;
    return {
      text: tx, letter: "ABCD"[i],
      border: on ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`,
      bg: on ? "#eaf6f8" : "#fff",
      dotBg: on ? ACCENT : "#edf7f9", dotColor: on ? "#fff" : "#455771",
      dotBorder: on ? `1px solid ${ACCENT}` : `1px solid ${BORDER}`,
      color: on ? INK : "#455771", weight: on ? 600 : 400,
      onClick: () => { const a = s.answers.slice(); a[s.examIdx] = i; setState({ answers: a }); },
    };
  });
  const examDots = EXAM.map((_, i) => ({ bg: i < s.examIdx ? ACCENT : i === s.examIdx ? INK : "#e3eef2" }));
  const mm = String(Math.floor(s.examSecs / 60)).padStart(2, "0");
  const ss = String(s.examSecs % 60).padStart(2, "0");
  const lastQ = s.examIdx === EXAM.length - 1;
  const correctCount = s.answers.filter((a, i) => a === EXAM[i].correct).length;
  const score = Math.round((correctCount / EXAM.length) * 100) / 10;

  const stepDots = STEPS.map((_, i) => ({
    bg: i < s.step ? ACCENT : i === s.step ? INK : "#e3eef2",
    onClick: () => setState({ step: i, playing: false, quickPick: null }),
  }));

  const weekActivityList = [
    { title: "Cấu tạo tế bào thực vật", subject: "Sinh học", when: "Thứ 2 · 12/05", duration: "32 phút", status: "Hoàn thành", tint: LESSONS[0].tint },
    { title: "Ba định luật Newton", subject: "Vật lý", when: "Thứ 3 · 13/05", duration: "28 phút", status: "Hoàn thành", tint: LESSONS[4].tint },
    { title: "Thí nghiệm điện phân dung dịch CuSO₄", subject: "Hóa học", when: "Thứ 5 · 15/05", duration: "24 phút", status: "Đang học", tint: LESSONS[1].tint },
    { title: "Chiến dịch Điện Biên Phủ", subject: "Lịch sử", when: "Thứ 6 · 16/05", duration: "22 phút", status: "Hoàn thành", tint: LESSONS[3].tint },
  ].map((a) => ({ ...a, done: a.status === "Hoàn thành" }));

  const myAssignments = ctx.s.assignments
    .filter((a) => a.isPublished)
    .filter((a) => !a.targetStudentIds || a.targetStudentIds.includes(CURRENT_STUDENT_ID))
    .map((a) => {
      const sub = ctx.findSubmission(a.id, CURRENT_STUDENT_ID);
      return { assignment: a, submission: sub, status: statusOf(sub) };
    });

  const TAB_FILTER = {
    todo: (x) => [S.NOT_STARTED, S.IN_PROGRESS, S.RETURNED].includes(x.status),
    done: (x) => [S.SUBMITTED, S.LATE_SUBMITTED, S.RESUBMITTED].includes(x.status),
    grades: (x) => x.status === S.GRADED,
  };

  const cwItems = myAssignments.filter(TAB_FILTER[s.cwTab]).map((x) => ({
    id: x.assignment.id,
    title: x.assignment.title,
    className: x.assignment.className,
    status: x.status,
    typeLabel: ASSIGNMENT_TYPE_LABEL[x.assignment.type],
    dueLabel: `Hạn ${fmt(x.assignment.dueAtIso)}`,
    scoreLabel: typeof x.submission?.finalScore === "number" ? String(x.submission.finalScore) : "",
    onClick: () => ctx.push("assignmentDetail", { assignmentId: x.assignment.id }),
  }));

  const currentAsg = ctx.s.assignments.find((a) => a.id === ctx.params.assignmentId) ?? null;
  const currentSub = currentAsg ? ctx.findSubmission(currentAsg.id, CURRENT_STUDENT_ID) : null;
  const gate = currentAsg
    ? canSubmit(currentAsg, currentSub ?? { status: S.NOT_STARTED, attemptNumber: 0 }, ctx.s.nowIso)
    : { allowed: false, reason: null, willBeLate: false };
  const rubric = currentAsg ? ctx.s.rubrics.find((r) => r.id === currentAsg.rubricId) : null;

  return {
    isHome: ctx.screen === "home",
    isLearningActivity: ctx.screen === "learningActivity", isStudyTime: ctx.screen === "studyTime",
    isLearningStreak: ctx.screen === "learningStreak", isAverageScore: ctx.screen === "averageScore",
    isExplore: ctx.screen === "explore", isDetail: ctx.screen === "detail", isPlayer: ctx.screen === "player",
    isComplete: ctx.screen === "complete", isExam: ctx.screen === "exam", isExamResult: ctx.screen === "examresult",
    isLibrary: ctx.screen === "library",
    isClasswork: ctx.screen === "classwork",
    isClassDetail: ctx.screen === "classDetail",

    toExplore: () => go("explore"),
    toPlayer: () => go("player"), toDetail: () => go("detail"),
    toExam: () => { setState({ examIdx: 0, answers: [null, null, null], examSecs: 596 }); push("exam"); },
    toLibrary: () => go("library"),
    toClasswork: () => go("classwork"),

    categories: CATS,
    featured: LESSONS.slice(0, 3).map(mkLesson),
    lessons: sortLessons(filterBySubject(LESSONS)).map(mkLesson),
    resumePct: "60%",
    stats: [
      { value: "4", label: "Bài đã học", icon: "/assets/lib/learning.svg", bg: "#eaf6f8", onClick: () => go("learningActivity") },
      { value: "2h 15p", label: "Thời gian học", icon: "/assets/lib/completed.svg", bg: "#e8f6ee", onClick: () => go("studyTime") },
      { value: "7", label: "Ngày liên tiếp", icon: "/assets/learning-points.svg", bg: "#fff5e6", onClick: () => go("learningStreak") },
      { value: "8.4", label: "Điểm trung bình", icon: "/assets/lesson/star.svg", bg: "#fdeef5", onClick: () => go("averageScore") },
    ],

    weekActivity: weekActivityList,

    dailyStudy: (() => {
      const mins = [25, 18, 0, 32, 20, 15, 25];
      const max = Math.max(...mins);
      return ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, i) => ({
        day, minutes: mins[i], barPct: max ? Math.round((mins[i] / max) * 100) : 0,
      }));
    })(),
    subjectStudy: [
      { subject: "Sinh học", minutes: 60, tint: "#00aaab" },
      { subject: "Vật lý", minutes: 40, tint: "#138cd2" },
      { subject: "Hóa học", minutes: 35, tint: "#f59e0b" },
    ].map((x) => ({ ...x, label: x.minutes >= 60 ? `${Math.floor(x.minutes / 60)}h ${x.minutes % 60}p` : `${x.minutes} phút` })),

    streakDays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => ({ day, done: true })),
    bestStreak: "15",
    streakMessage: "Bạn đang duy trì mạch học rất tốt! Cố gắng thêm 8 ngày nữa để phá kỷ lục 15 ngày liên tiếp của mình.",

    recentScores: [
      { title: "Kiểm tra: Cấu tạo tế bào thực vật", subject: "Sinh học", score: "9.0", when: "16/05" },
      { title: "Trắc nghiệm: Ba định luật Newton", subject: "Vật lý", score: "8.0", when: "14/05" },
      { title: "Bài tập: Thí nghiệm điện phân dung dịch CuSO₄", subject: "Hóa học", score: "7.5", when: "12/05" },
      { title: "Kiểm tra 15 phút: Mô phân sinh", subject: "Sinh học", score: "9.1", when: "10/05" },
    ].map((r) => {
      const n = parseFloat(r.score);
      const perf = n >= 8 ? { label: "Tốt", color: "#15803d", bg: "#f0fdf4" } : n >= 6.5 ? { label: "Khá", color: "#b45309", bg: "#fff5e6" } : { label: "Cần cải thiện", color: "#b91c1c", bg: "#fef2f2" };
      return { ...r, ...perf };
    }),

    chips, resultCount: String(filterBySubject(LESSONS).length),
    exploreSortLabel, sortMenuOpen: s.sortMenuOpen, sortMenuOptions, toggleSortMenu, closeSortMenu,
    filterOpen: s.filterOpen, openFilter, closeFilter,
    filterLevels, filterGrades, filterSubjects, filterTypes, filterTopics, filterSorts,
    search: s.search, setSearch: (val) => setState({ search: val }),
    activeFilterCount, hasActiveFilters: activeFilterCount > 0, resetFilters, applyFilterSheet: closeFilter,
    toggleView: () => setState({ view: grid ? "list" : "grid" }),
    gridBg: grid ? "#195658" : "transparent", gridFg: grid ? "#fff" : "#8ba0ae",
    listBg: grid ? "transparent" : "#195658", listFg: grid ? "#8ba0ae" : "#fff",
    gridCols: grid ? "1fr 1fr" : "1fr",
    cardDir: grid ? "column" : "row",
    mediaH: grid ? "104px" : "auto", mediaW: grid ? "auto" : "104px",

    detailTabs,
    detailTabOverview: s.detailTab === "overview",
    detailTabContent: s.detailTab === "content",
    detailTabReviews: s.detailTab === "reviews",
    detailFacts: [
      { k: "Khối lớp", v: "Lớp 6" }, { k: "Bộ sách", v: "Kết nối tri thức" },
      { k: "Loại học liệu", v: "Mô hình 3D tương tác" }, { k: "Thiết bị hỗ trợ", v: "Điện thoại, máy tính, VR" },
    ],
    steps: STEPS.map((st, i) => ({ ...st, onClick: () => { setState({ step: i, playing: false, quickPick: null }); push("player"); } })),
    savedFill: s.saved ? INK : "none",
    toggleSave: () => setState({ saved: !s.saved }),
    reviews: [
      { initials: "LM", name: "Lê Minh", when: "3 ngày trước", stars: "5", tint: "#00aaab", text: "Mô hình 3D rất trực quan, học sinh lớp mình xoay và tách lớp được nên hiểu bài nhanh hơn hẳn." },
      { initials: "TH", name: "Trần Hà", when: "1 tuần trước", stars: "5", tint: "#138cd2", text: "Phần chú thích từng bào quan viết ngắn gọn, bám sát sách Kết nối tri thức." },
      { initials: "NV", name: "Nguyễn Vân", when: "2 tuần trước", stars: "4", tint: "#ef5da8", text: "Nội dung tốt. Mong có thêm bản so sánh tế bào động vật trong cùng bài." },
    ],

    stepNum: step.num, stepTitle: step.title, stepKind: step.kind, stepDur: step.dur,
    stepBody: step.body, stepTint: step.tint, stepSlot: step.slot,
    stepHasQuiz: !!step.quiz, stepHasNotes: !!step.points, stepPoints: step.points || [],
    quickOptions,
    playing: s.playing, notPlaying: !s.playing,
    togglePlay: () => setState({ playing: !s.playing }),
    mediaPct: s.playing ? "42%" : "8%",
    mediaElapsed: s.playing ? "1:45" : "0:20",
    nextLabel: s.step === STEPS.length - 1 ? "Hoàn thành bài học" : "Tiếp tục",
    nextStep: () => (s.step === STEPS.length - 1 ? go("complete") : setState({ step: s.step + 1, playing: false, quickPick: null })),
    prevStep: () => (s.step === 0 ? go("detail") : setState({ step: s.step - 1, playing: false, quickPick: null })),
    stepDots,

    completeStats: [
      { value: "5/5", label: "Phần đã học" }, { value: "28p", label: "Thời gian" }, { value: "100%", label: "Tiến độ" },
    ],

    examClock: mm + ":" + ss,
    examPos: (s.examIdx + 1) + "/" + EXAM.length,
    examQuestion: q.q, examOptions, examDots,
    examNextLabel: lastQ ? "Nộp bài" : "Câu tiếp theo",
    examNextBg: picked === null ? "#a9c6ce" : ACCENT,
    nextQ: () => { if (picked === null) return; lastQ ? go("examresult") : setState({ examIdx: s.examIdx + 1 }); },
    prevQ: () => (s.examIdx === 0 ? go("complete") : setState({ examIdx: s.examIdx - 1 })),
    scoreText: score.toFixed(1),
    scoreOffset: 402 - (402 * correctCount) / EXAM.length,
    scoreTitle: correctCount === EXAM.length ? "Xuất sắc!" : correctCount >= 2 ? "Làm tốt lắm!" : "Cần ôn lại",
    scoreSub: s.lang === "en"
      ? `You answered ${correctCount}/${EXAM.length} questions correctly in the "${t("Cấu tạo tế bào thực vật")}" quiz.`
      : `Bạn trả lời đúng ${correctCount}/${EXAM.length} câu trong bài kiểm tra Cấu tạo tế bào thực vật.`,
    examReview: EXAM.map((e, i) => {
      const ok = s.answers[i] === e.correct;
      return {
        text: e.q, markBg: ok ? "#22c55e" : "#ef4444",
        markPath: ok ? "M5 12.5L10 17.5 19 6.5" : "M6 6l12 12M18 6L6 18",
        ansLabel: ok ? `${t("Đúng")} · ${t(e.opts[e.correct])}` : `${t("Đáp án đúng")}: ${t(e.opts[e.correct])}`,
        ansColor: ok ? "#15803d" : "#b91c1c",
      };
    }),
    restartExam: () => { setState({ examIdx: 0, answers: [null, null, null], examSecs: 596 }); push("exam"); },

    libraryCards: [
      { title: "Đang học", value: "3", icon: "/assets/lib/learning.svg", hint: "Tiếp tục từ nơi bạn dừng lại", onClick: () => setState({ libTab: "learning" }) },
      { title: "Hoàn thành", value: "12", icon: "/assets/lib/completed.svg", hint: "Bài học đã hoàn tất trong kỳ", onClick: () => setState({ libTab: "completed" }) },
      { title: "Đã mua", value: "8", icon: "/assets/lib/purchased.svg", hint: "Học liệu sở hữu vĩnh viễn", onClick: () => setState({ libTab: "purchased" }) },
      { title: "Đã lưu", value: "24", icon: "/assets/lib/saved.svg", hint: "Danh sách xem sau của bạn", onClick: () => setState({ libTab: "saved" }) },
    ],
    libTabs, libraryItems,

    cwTabs: [["todo", "Việc cần làm"], ["done", "Đã nộp"], ["grades", "Điểm số"]].map(([k, label]) => {
      const on = s.cwTab === k;
      return { label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ cwTab: k }) };
    }),
    cwItems,
    isAssignmentDetail: ctx.screen === "assignmentDetail",
    isAssignmentSubmit: ctx.screen === "assignmentSubmit",
    draftText: ctx.s.draftText,
    setDraftText: (text) => ctx.setState({ draftText: text }),
    draftFiles: ctx.s.draftFiles,
    // Prototype không đọc tệp thật — mỗi lần bấm thêm một tệp mẫu để duyệt giao diện.
    addDraftFile: () =>
      ctx.setState((prev) => ({
        draftFiles: [
          ...prev.draftFiles,
          { name: `bai-lam-${prev.draftFiles.length + 1}.pdf`, size: "1,1 MB", kind: "pdf" },
        ],
      })),
    removeDraftFile: (index) =>
      ctx.setState((prev) => ({ draftFiles: prev.draftFiles.filter((_, i) => i !== index) })),
    draftSavedLabel: ctx.s.draftSavedAtIso ? `${t("Đã lưu nháp")} ${fmt(ctx.s.draftSavedAtIso)}` : "",
    saveDraft: () => ctx.setState({ draftSavedAtIso: ctx.s.nowIso }),
    canConfirmSubmit: ctx.s.draftText.trim().length > 0 || ctx.s.draftFiles.length > 0,
    submitConfirmOpen: ctx.s.submitConfirmOpen,
    openSubmitConfirm: () => ctx.setState({ submitConfirmOpen: true }),
    closeSubmitConfirm: () => ctx.setState({ submitConfirmOpen: false }),
    confirmSubmit: () => {
      if (!currentAsg) return;
      const base = currentSub ?? {
        id: ctx.s.nextSubmissionId,
        assignmentId: currentAsg.id,
        studentId: CURRENT_STUDENT_ID,
        status: S.NOT_STARTED,
        attemptNumber: 0,
        attachments: [],
        finalScore: null,
        feedback: "",
        gradedAtIso: null,
        criteriaScores: {},
        criteriaComments: {},
      };
      const next = applySubmit(
        { ...base, answerText: ctx.s.draftText, attachments: ctx.s.draftFiles },
        currentAsg,
        ctx.s.nowIso
      );
      ctx.upsertSubmission(next);
      ctx.setState({ submitConfirmOpen: false, draftText: "", draftFiles: [], draftSavedAtIso: null });
      ctx.replace("submissionResult", { assignmentId: currentAsg.id });
    },
    asgSubmission: currentSub,
    asgStatus: statusOf(currentSub),
    asgGate: { ...gate, reasonLabel: gate.reason ? REASON_LABEL[gate.reason] : "" },
    asg: currentAsg && {
      id: currentAsg.id,
      title: currentAsg.title,
      className: currentAsg.className,
      typeLabel: ASSIGNMENT_TYPE_LABEL[currentAsg.type],
      instructions: currentAsg.instructions,
      checklist: currentAsg.checklist.map((text) => ({ text })),
      openLabel: fmt(currentAsg.openAtIso),
      dueLabel: fmt(currentAsg.dueAtIso),
      maxScore: String(currentAsg.maxScore),
      passingScore: String(currentAsg.passingScore),
      attemptsLeftLabel: `${Math.max(0, currentAsg.maxAttempts - (currentSub?.attemptNumber ?? 0))}/${currentAsg.maxAttempts}`,
      allowLateLabel: currentAsg.allowLate ? "Cho phép nộp muộn" : "Không nhận bài muộn",
      attachments: currentAsg.attachments,
      criteria: rubric ? rubric.criteria : [],
    },
    toAssignmentSubmit: () => ctx.push("assignmentSubmit", { assignmentId: ctx.params.assignmentId }),
    toSubmissionResult: () => ctx.push("submissionResult", { assignmentId: ctx.params.assignmentId }),
    toSubmissionHistory: () => ctx.push("submissionHistory", { assignmentId: ctx.params.assignmentId }),

    myClasses: T_CLASSES.map((c, i) => ({
      ...c, tintBg: c.tint,
      onClick: () => { setState({ classIdx: i, classDetailTab: "feed" }); push("classDetail"); },
    })),
    classDetailTabs: [["feed", "Bảng tin"], ["students", "Học sinh"], ["assignments", "Bài tập"], ["content", "Nội dung lớp"]].map(([k, label]) => {
      const on = s.classDetailTab === k;
      return { key: k, label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ classDetailTab: k }) };
    }),
    classTabFeed: s.classDetailTab === "feed", classTabStudents: s.classDetailTab === "students",
    classTabAssignments: s.classDetailTab === "assignments", classTabContent: s.classDetailTab === "content",
    classDetailName: T_CLASSES[s.classIdx].name,
    classDetailSub: T_CLASSES[s.classIdx].sub,
    classDetailCode: T_CLASSES[s.classIdx].code,
    classDetailStudents: T_CLASSES[s.classIdx].students,
    classDetailProgress: T_CLASSES[s.classIdx].progress,
    classDetailTint: T_CLASSES[s.classIdx].tint,
    classDetailImg: T_CLASSES[s.classIdx].img,
    classDetailTeacher: CLASS_EXTRA[s.classIdx].teacher,
    classDetailTeacherInitials: CLASS_EXTRA[s.classIdx].initials,
    classDetailTeacherTint: CLASS_EXTRA[s.classIdx].tint,
    classDetailTeacherMeta: CLASS_EXTRA[s.classIdx].teacherMeta,
    classDetailContent: CLASS_EXTRA[s.classIdx].lessons,
    classDetailFeed: CLASS_NEWS,
    classDetailRoster: T_STUDENTS.map((st, i) => ({ name: st.name, tint: st.tint, initials: STUDENT_INITIALS[i] })),
    classDetailAssignments: (() => {
      const byTitle = new Map();
      [...S_ASSIGNMENTS.todo, ...S_ASSIGNMENTS.done].forEach((a) => byTitle.set(a.title, a));
      S_ASSIGNMENTS.grades.forEach((a) => byTitle.set(a.title, a));
      return Array.from(byTitle.values()).filter((a) => a.cls === T_CLASSES[s.classIdx].name);
    })(),
  };
}
