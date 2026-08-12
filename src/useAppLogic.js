import { useEffect, useRef, useState } from "react";
import {
  ACCENT, DEEP, INK, MUTED, BORDER,
  CATS, LESSONS, LESSON_TYPES, LEVELS, STEPS, QUICK, QUICK_CORRECT, EXAM,
  T_METRICS, T_CLASSES, T_ASSIGNMENTS, T_SUBMISSIONS, T_PLANS, T_BLOCKS, T_STUDENTS,
  S_ASSIGNMENTS, P_CHILDREN, P_CONVOS, P_THREAD, P_REPORT, TAB_ICONS, NOTI,
} from "./constants.js";
import { translate } from "./i18n/dict.js";

const INITIAL_STATE = {
  screen: "login", role: "student", tab: "home", view: "grid", tExploreView: "grid",
  detailTab: "overview", libTab: "learning",
  step: 0, playing: false, quickPick: null,
  examIdx: 0, answers: [null, null, null], examSecs: 596,
  saved: false, topup: 1, pay: 0,
  cwTab: "todo", asgIdx: 0, submitted: false,
  tClassIdx: 0, tClassTab: "students", gradeIdx: 0, gradeScore: "8.5", graded: false,
  childIdx: 0, sent: false,
  safety: { social: true, leaderboard: true, ai: true, noti: true, limit: "60" },
  lang: "vi", langOpen: false,
  showPassword: false, remember: true,
  signupShowPassword: false, signupAgree: true,
  newShowPassword: false, otpSecs: 60,
  classIdx: 0, classDetailTab: "feed",
  classAccessMode: "code",
  classPerms: { post: false, comment: true, upload: true },
  tExploreSaved: [], tExploreAdded: [], planTab: "recent",
  tExploreSection: "explore", tLibTab: "saved", tRecentIds: [],
  tItemPlanName: {}, tItemAssignedClasses: {},
  tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null },
  profileEditing: false,
  tClassesTab: "submitted",
  notiRead: false,
  exploreCat: "Tất cả", exploreSort: "newest", search: "", sortMenuOpen: false,
  filterOpen: false, fLevel: "Tất cả", fGrade: "Tất cả", fTypes: [], fTopic: "",
  exploreSaved: [], notifPrefs: { push: true, email: true, sms: false, assignment: true, classNews: true },
  helpOpenIdx: null, planChoice: "pro", loggedOutDevices: [],
  createdClasses: [], createdAssignments: [], createdLectures: [],
  ccName: "", ccSubject: "Sinh học", ccGrade: "Lớp 8",
  caTitle: "", caCls: "", caDue: "1 tuần", clTitle: "", clCls: "", clKind: "Video",
  tPlanIdx: 0,
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

// Seed ids for the Teacher Library's "Liked" and "Purchased" facets — these
// have no in-app action that produces them (Explore only exposes Save/Add),
// so they're mocked the same way Student libSets mocks purchased/completed.
const TEACHER_LIKED_IDS = [3, 9, 14];
const TEACHER_PURCHASED_IDS = [2, 7, 13];

// Recursively runs every string in a data tree through `t`, leaving
// functions (onClick handlers), numbers, and booleans untouched. Safe to
// apply blindly: hex colors, SVG path data, and icon URLs never match a
// dictionary entry, so they just pass through unchanged.
function deepT(x, t) {
  if (typeof x === "string") return t(x);
  if (Array.isArray(x)) return x.map((v) => deepT(v, t));
  if (x && typeof x === "object") {
    const out = {};
    for (const k in x) out[k] = deepT(x[k], t);
    return out;
  }
  return x;
}

// navStyle: "tabs" | "fab" | "pill"
export function useAppLogic(navStyle = "tabs") {
  const [state, setStateRaw] = useState(INITIAL_STATE);
  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = (patch) => {
    setStateRaw((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  };

  const go = (screen) => setState({ screen });

  useEffect(() => {
    const t = setInterval(() => {
      if (stateRef.current.screen === "exam" && stateRef.current.examSecs > 0) {
        setState((s) => ({ examSecs: s.examSecs - 1 }));
      }
      if (stateRef.current.screen === "verification" && stateRef.current.otpSecs > 0) {
        setState((s) => ({ otpSecs: s.otpSecs - 1 }));
      }
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const prevScreenRef = useRef(state.screen);
  useEffect(() => {
    if (prevScreenRef.current !== state.screen) {
      const el = document.querySelector(".yb-main");
      if (el) el.scrollTop = 0;
      prevScreenRef.current = state.screen;
    }
  }, [state.screen]);

  const s = state;
  const t = (str) => translate(s.lang, str);
  const step = STEPS[s.step];

  const langOptions = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ].map((o) => ({ ...o, active: o.code === s.lang, onClick: () => setState({ lang: o.code, langOpen: false }) }));

  const ROLE_TABS = {
    student: [["home", "Trang chủ", "home"], ["explore", "Khám phá", "explore"], ["classwork", "Lớp học", "cls"], ["library", "Thư viện", "library"], ["profile", "Tài khoản", "profile"]],
    teacher: [["tOverview", "Trang chủ", "home"], ["tExplore", "Khám phá", "explore"], ["tPlans", "Giáo án", "book"], ["tClasses", "Lớp học", "cls"], ["profile", "Tài khoản", "profile"]],
    parent: [["pOverview", "Tổng quan", "chart"], ["pChild", "Con của tôi", "child"], ["pReport", "Báo cáo", "doc"], ["pMessages", "Tin nhắn", "msg"], ["profile", "Tài khoản", "profile"]],
  };
  const roleHome = ROLE_TABS[s.role][0][0];
  const NAV_SCREENS = ROLE_TABS[s.role].map((t) => t[0]).concat(["noti"]);
  const tabDefs = ROLE_TABS[s.role].map((t) => ({ key: t[2], label: t[1], screen: t[0] }));
  const tabs = tabDefs.map((t) => {
    const active = s.screen === t.screen;
    return {
      ...t, active, iconPath: TAB_ICONS[t.key],
      color: active ? ACCENT : "#8ba0ae", sw: active ? 2.1 : 1.7,
      weight: active ? 600 : 400,
      pillBg: active ? "#fff" : "transparent",
      pillColor: active ? INK : "rgba(255,255,255,.72)",
      flex: active ? 2.1 : 1,
      onClick: () => go(t.screen),
    };
  });

  const cardOn = (on) => ({
    border: on ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`,
    bg: on ? "#eaf6f8" : "#fff",
  });

  const roleMeta = {
    student: { title: "Học sinh", icon: "/assets/role/student.svg", desc: "Khám phá học liệu 3D, tham gia lớp học, làm bài tập và theo dõi tiến độ cá nhân." },
    teacher: { title: "Giáo viên", icon: "/assets/role/teacher.svg", desc: "Tạo lớp học, soạn giáo án, giao bài tập, chấm bài và theo dõi tiến độ học sinh." },
    parent: { title: "Phụ huynh", icon: "/assets/role/parent.svg", desc: "Liên kết với con, theo dõi tự học, kết quả lớp học, báo cáo tuần và cài đặt an toàn." },
  };
  const roles = Object.keys(roleMeta).map((k) => {
    const on = s.role === k;
    return {
      ...roleMeta[k], ...cardOn(on),
      dot: on ? `6px solid ${ACCENT}` : `1.6px solid ${BORDER}`,
      dotFill: "transparent",
      onClick: () => setState({ role: k }),
    };
  });
  const roleSwitch = Object.keys(roleMeta).map((k) => {
    const on = s.role === k;
    return {
      title: roleMeta[k].title, icon: roleMeta[k].icon, ...cardOn(on),
      opacity: on ? 1 : 0.5, weight: on ? 600 : 400, color: on ? INK : MUTED,
      onClick: () => setState({ role: k, screen: ROLE_TABS[k][0][0], notiRead: false }),
    };
  });

  const mkLesson = (l) => ({
    ...l, tintBg: l.tint, onClick: () => go("detail"), onView: () => go("detail"), onLearnNow: () => setState({ screen: "player", step: 0, playing: false, quickPick: null }),
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
  const tGrid = s.tExploreView === "grid";
  const detailTabDefs = [
    { key: "overview", label: "Tổng quan" }, { key: "content", label: "Nội dung" }, { key: "reviews", label: "Đánh giá" },
  ];
  const detailTabs = detailTabDefs.map((t) => {
    const on = s.detailTab === t.key;
    return { label: t.label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ detailTab: t.key }) };
  });

  const libTabDefs = [
    { key: "learning", label: "Đang học" }, { key: "purchased", label: "Đã mua" },
    { key: "saved", label: "Đã lưu" }, { key: "completed", label: "Hoàn thành" },
  ];
  const libTabs = libTabDefs.map((t) => {
    const on = s.libTab === t.key;
    return { label: t.label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ libTab: t.key }) };
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

  const quickOptions = QUICK.map((t, i) => {
    const picked = s.quickPick === i;
    const revealed = s.quickPick !== null;
    const correct = i === QUICK_CORRECT;
    let border = `1px solid ${BORDER}`, bg = "#fff", dotBg = "#edf7f9", dotColor = "#455771", dotBorder = "1px solid #ddeaf0", color = "#455771", weight = 400;
    if (revealed && correct) { border = "1.6px solid #22c55e"; bg = "#f0fdf4"; dotBg = "#22c55e"; dotColor = "#fff"; dotBorder = "1px solid #22c55e"; color = "#15803d"; weight = 600; }
    else if (picked) { border = "1.6px solid #ef4444"; bg = "#fef2f2"; dotBg = "#ef4444"; dotColor = "#fff"; dotBorder = "1px solid #ef4444"; color = "#b91c1c"; weight = 600; }
    return { text: t, letter: "ABCD"[i], border, bg, dotBg, dotColor, dotBorder, color, weight, onClick: () => setState({ quickPick: i }) };
  });

  const q = EXAM[s.examIdx];
  const picked = s.answers[s.examIdx];
  const examOptions = q.opts.map((t, i) => {
    const on = picked === i;
    return {
      text: t, letter: "ABCD"[i],
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

  const topups = [
    { v: 50000, label: "50.000đ", bonus: "—" }, { v: 100000, label: "100.000đ", bonus: "+5.000đ" },
    { v: 200000, label: "200.000đ", bonus: "+15.000đ" }, { v: 500000, label: "500.000đ", bonus: "+50.000đ" },
    { v: 1000000, label: "1.000.000đ", bonus: "+120.000đ" }, { v: 0, label: "Khác", bonus: "Tự nhập" },
  ];
  const topupAmounts = topups.map((t, i) => {
    const on = s.topup === i;
    return { label: t.label, bonus: t.bonus, ...cardOn(on), color: on ? DEEP : "#455771", onClick: () => setState({ topup: i }) };
  });
  const pays = [
    { tag: "VNP", name: "VNPAY QR", desc: "Quét mã bằng ứng dụng ngân hàng", tint: "#195658" },
    { tag: "MOMO", name: "Ví MoMo", desc: "Thanh toán qua ví điện tử MoMo", tint: "#ef5da8" },
    { tag: "ATM", name: "Thẻ nội địa / ATM", desc: "Vietcombank ···· 4821", tint: "#138cd2" },
  ];
  const payMethods = pays.map((m, i) => {
    const on = s.pay === i;
    return { ...m, ...cardOn(on), dotBorder: on ? `6px solid ${ACCENT}` : `1.6px solid ${BORDER}`, dotBg: "transparent", onClick: () => setState({ pay: i }) };
  });

  const weekActivityList = [
    { title: "Cấu tạo tế bào thực vật", subject: "Sinh học", when: "Thứ 2 · 12/05", duration: "32 phút", status: "Hoàn thành", tint: LESSONS[0].tint },
    { title: "Ba định luật Newton", subject: "Vật lý", when: "Thứ 3 · 13/05", duration: "28 phút", status: "Hoàn thành", tint: LESSONS[4].tint },
    { title: "Thí nghiệm điện phân dung dịch CuSO₄", subject: "Hóa học", when: "Thứ 5 · 15/05", duration: "24 phút", status: "Đang học", tint: LESSONS[1].tint },
    { title: "Chiến dịch Điện Biên Phủ", subject: "Lịch sử", when: "Thứ 6 · 16/05", duration: "22 phút", status: "Hoàn thành", tint: LESSONS[3].tint },
  ].map((a) => ({ ...a, done: a.status === "Hoàn thành" }));

  const pushRecent = (id) => setState((prev) => ({ tRecentIds: [id, ...prev.tRecentIds.filter((x) => x !== id)].slice(0, 10) }));
  const openAssignSheet = (mode, itemId) => setState({ tAssignSheet: { open: true, mode, itemId, selectedId: null } });
  const closeAssignSheet = () => setState({ tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null } });
  const selectAssignOption = (id) => setState((prev) => ({ tAssignSheet: { ...prev.tAssignSheet, selectedId: id } }));
  const confirmAssignSheet = () => {
    const { mode, itemId, selectedId } = s.tAssignSheet;
    if (selectedId === null || selectedId === undefined) return;
    if (mode === "plan") {
      setState((prev) => ({
        tExploreAdded: prev.tExploreAdded.includes(itemId) ? prev.tExploreAdded : [...prev.tExploreAdded, itemId],
        tItemPlanName: { ...prev.tItemPlanName, [itemId]: T_PLANS[selectedId].title },
        tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null },
      }));
    } else {
      setState((prev) => ({
        tItemAssignedClasses: { ...prev.tItemAssignedClasses, [itemId]: Array.from(new Set([...(prev.tItemAssignedClasses[itemId] || []), selectedId])) },
        tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null },
      }));
    }
  };

  const vals = {
    isLogin: s.screen === "login", isRole: s.screen === "role", isHome: s.screen === "home",
    isSignup: s.screen === "signup", isForgotPassword: s.screen === "forgotPassword",
    isVerification: s.screen === "verification", isNewPassword: s.screen === "newPassword",
    isSuccess: s.screen === "success",
    isLearningActivity: s.screen === "learningActivity", isStudyTime: s.screen === "studyTime",
    isLearningStreak: s.screen === "learningStreak", isAverageScore: s.screen === "averageScore",
    isExplore: s.screen === "explore", isDetail: s.screen === "detail", isPlayer: s.screen === "player",
    isComplete: s.screen === "complete", isExam: s.screen === "exam", isExamResult: s.screen === "examresult",
    isLibrary: s.screen === "library", isNoti: s.screen === "noti", isProfile: s.screen === "profile",
    isProfileDetail: s.screen === "profileDetail", isChangePassword: s.screen === "changePassword",
    isWallet: s.screen === "wallet",

    showNav: NAV_SCREENS.indexOf(s.screen) >= 0,
    navTabs: navStyle === "tabs", navFab: navStyle === "fab", navPill: navStyle === "pill",
    tabs, tabsSplitLeft: tabs.slice(0, 2), tabsSplitRight: tabs.slice(3), tabsPill: tabs,

    toRole: () => go("role"), toHome: () => go(roleHome), toExplore: () => go("explore"),
    toPlayer: () => setState({ screen: "player" }), toDetail: () => go("detail"),
    toExam: () => setState({ screen: "exam", examIdx: 0, answers: [null, null, null], examSecs: 596 }),
    toLibrary: () => go("library"), toNoti: () => go("noti"), toProfile: () => go("profile"),
    toWallet: () => go("wallet"),
    toLogin: () => setState({ screen: "login", otpSecs: 60 }),
    back: () => go(s.role === "teacher" ? "tExplore" : "explore"),

    toSignup: () => go("signup"), toForgotPassword: () => go("forgotPassword"),
    toVerification: () => go("verification"), toNewPassword: () => go("newPassword"),
    toSuccess: () => go("success"),
    togglePassword: () => setState({ showPassword: !s.showPassword }),
    toggleRemember: () => setState({ remember: !s.remember }),
    toggleSignupPassword: () => setState({ signupShowPassword: !s.signupShowPassword }),
    toggleSignupAgree: () => setState({ signupAgree: !s.signupAgree }),
    toggleNewPassword: () => setState({ newShowPassword: !s.newShowPassword }),
    passwordMask: s.showPassword ? "Yootek@2026" : "••••••••",
    signupPasswordMask: s.signupShowPassword ? "Yootek@2026" : "••••••••",
    newPasswordMask: s.newShowPassword ? "Yootek@2026" : "••••••••",
    otpClock: "00:" + String(s.otpSecs).padStart(2, "0"),
    canResendOtp: s.otpSecs === 0,
    resendOtp: () => setState({ otpSecs: 60 }),
    remember: s.remember, signupAgree: s.signupAgree,

    userName: "Nguyễn Thị Hoa",
    roleLabel: roleMeta[s.role].title,
    roles, roleSwitch,
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
    childActivity: weekActivityList,

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
    steps: STEPS.map((st, i) => ({ ...st, onClick: () => setState({ screen: "player", step: i, playing: false, quickPick: null }) })),
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
    restartExam: () => setState({ screen: "exam", examIdx: 0, answers: [null, null, null], examSecs: 596 }),

    libraryCards: [
      { title: "Đang học", value: "3", icon: "/assets/lib/learning.svg", hint: "Tiếp tục từ nơi bạn dừng lại", onClick: () => setState({ libTab: "learning" }) },
      { title: "Hoàn thành", value: "12", icon: "/assets/lib/completed.svg", hint: "Bài học đã hoàn tất trong kỳ", onClick: () => setState({ libTab: "completed" }) },
      { title: "Đã mua", value: "8", icon: "/assets/lib/purchased.svg", hint: "Học liệu sở hữu vĩnh viễn", onClick: () => setState({ libTab: "purchased" }) },
      { title: "Đã lưu", value: "24", icon: "/assets/lib/saved.svg", hint: "Danh sách xem sau của bạn", onClick: () => setState({ libTab: "saved" }) },
    ],
    libTabs, libraryItems,

    notifications: NOTI[s.role].map((n) => ({ ...n, unread: n.unread && !s.notiRead })),
    unreadNotiCount: NOTI[s.role].filter((n) => n.unread).length,
    hasUnreadNoti: !s.notiRead && NOTI[s.role].some((n) => n.unread),
    markAllRead: () => setState({ notiRead: true }),

    profileRows: [
      { label: "Hồ sơ cá nhân", value: "", iconPath: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1", onClick: () => setState({ screen: "profileDetail", profileEditing: false }) },
      s.role === "teacher"
        ? { label: "Lớp học của tôi", value: `${T_CLASSES.length + s.createdClasses.length} lớp`, iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("tClasses") }
        : s.role === "parent"
        ? { label: "Học sinh liên kết", value: `${P_CHILDREN.length} con`, iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("pChild") }
        : { label: "Lớp học của tôi", value: "6A2", iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("classwork") },
      { label: "Ví & giao dịch", value: "450.000đ", iconPath: "M3 8.5A2.5 2.5 0 0 1 5.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-8zM16.5 12.5h.01", onClick: () => go("wallet") },
      { label: "Gói dịch vụ", value: "Pro", iconPath: "M4 17l1.6-9L10 12l2-6 2 6 4.4-4 1.6 9H4z", onClick: () => go("servicePlan") },
      { label: "Thiết bị của tôi", value: "2/3", iconPath: "M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM11 17.5h2", onClick: () => go("devices") },
      { label: "Thông báo & tuỳ chọn", value: "", iconPath: "M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4zM13.7 19.6a2 2 0 0 1-3.4 0", onClick: () => go("notifPrefs") },
      { label: "Tài khoản & bảo mật", value: "", iconPath: "M12 3.5l7 3v5.2c0 4.3-2.9 7.6-7 8.8-4.1-1.2-7-4.5-7-8.8V6.5l7-3z", onClick: () => go("accountSecurity") },
      { label: "Ngôn ngữ", value: s.lang === "en" ? "English" : "Tiếng Việt", iconPath: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.2 12h17.6M12 3.2c4.5 5 4.5 12.6 0 17.6M12 3.2c-4.5 5-4.5 12.6 0 17.6", onClick: () => setState({ langOpen: true }) },
      { label: "Trợ giúp & hỗ trợ", value: "", iconPath: "M9.1 9a2.9 2.9 0 1 1 4.4 2.9c-.9.6-1.5 1.1-1.5 2.3M12 17.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", onClick: () => go("helpSupport") },
    ],

    isServicePlan: s.screen === "servicePlan", isDevices: s.screen === "devices",
    isNotifPrefs: s.screen === "notifPrefs", isAccountSecurity: s.screen === "accountSecurity",
    isHelpSupport: s.screen === "helpSupport",

    planFeatures: s.role === "teacher"
      ? ["Không giới hạn học liệu 3D/XR/VR360", "Tạo và xuất bản không giới hạn giáo án", "Chấm bài hỗ trợ AI", "Ưu tiên hỗ trợ kỹ thuật"]
      : s.role === "parent"
      ? ["Theo dõi không giới hạn số học sinh liên kết", "Báo cáo tuần chi tiết", "Cài đặt an toàn nâng cao", "Ưu tiên hỗ trợ kỹ thuật"]
      : ["Không giới hạn học liệu 3D/XR/VR360", "Tải tài liệu học offline", "Không quảng cáo", "Ưu tiên hỗ trợ kỹ thuật"],
    planOptions: [
      { key: "free", name: "Free", price: "0đ / tháng", desc: "Truy cập cơ bản, giới hạn học liệu mỗi tháng" },
      { key: "pro", name: "Pro", price: "49.000đ / tháng", desc: "Không giới hạn học liệu và tính năng nâng cao" },
      { key: "proplus", name: "Pro+", price: "99.000đ / tháng", desc: "Toàn bộ tính năng Pro và hỗ trợ ưu tiên 24/7" },
    ].map((p) => ({ ...p, selected: (s.planChoice || "pro") === p.key, onClick: () => setState({ planChoice: p.key }) })),

    devices: [
      { name: "iPhone 15 Pro", meta: "Hà Nội · Đang hoạt động", current: true, iconPath: "M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5zM11 17.5h2" },
      { name: "Windows PC - Chrome", meta: "Hà Nội · 2 ngày trước", current: false, iconPath: "M3.5 5.5h17v11h-17zM8 20.5h8M12 16.5v4" },
    ].map((d, i) => ({
      ...d, loggedOut: s.loggedOutDevices.includes(i),
      onLogout: () => setState((prev) => ({ loggedOutDevices: [...prev.loggedOutDevices, i] })),
    })),

    notifPrefRows: [
      { key: "push", label: "Thông báo đẩy", desc: "Nhận thông báo trực tiếp trên điện thoại" },
      { key: "email", label: "Email", desc: "Nhận bản tóm tắt qua email" },
      { key: "sms", label: "SMS", desc: "Nhận tin nhắn nhắc hạn quan trọng" },
      { key: "assignment", label: "Nhắc bài tập", desc: "Nhắc trước khi bài tập đến hạn" },
      { key: "classNews", label: "Thông báo lớp học", desc: "Thông báo mới từ bảng tin lớp học" },
    ].map((r) => {
      const on = s.notifPrefs[r.key];
      return { ...r, trackBg: on ? ACCENT : "#dbe7ec", knobLeft: on ? "22px" : "2px", onClick: () => setState({ notifPrefs: { ...s.notifPrefs, [r.key]: !on } }) };
    }),

    securityEmail: s.role === "teacher" ? "trang.pham@thcs-cvahn.edu.vn" : s.role === "parent" ? "dung.nguyen@gmail.com" : "hoa.nguyen@thpt-nguyenhue.edu.vn",

    helpFaqs: [
      { q: "Làm sao để đổi mật khẩu?", a: "Vào Tài khoản → Tài khoản & bảo mật → Đổi mật khẩu, nhập mật khẩu hiện tại và mật khẩu mới." },
      { q: "Học liệu 3D không tải được, phải làm sao?", a: "Kiểm tra kết nối mạng và thử tải lại. Nếu vẫn lỗi, hãy liên hệ hỗ trợ qua hotline hoặc email bên dưới." },
      { q: "Làm sao để nâng cấp lên gói Pro?", a: "Vào Tài khoản → Gói dịch vụ, chọn gói phù hợp và nhấn Nâng cấp." },
      { q: "Tôi có thể đổi vai trò Học sinh / Giáo viên / Phụ huynh không?", a: "Có, bạn có thể chuyển vai trò demo ngay trong màn hình Tài khoản." },
    ].map((f, i) => ({ ...f, open: s.helpOpenIdx === i, onClick: () => setState({ helpOpenIdx: s.helpOpenIdx === i ? null : i }) })),

    toProfileDetail: () => setState({ screen: "profileDetail", profileEditing: false }),
    toDevices: () => go("devices"),
    toggleProfileEdit: () => setState({ profileEditing: !s.profileEditing }),
    profileEditing: s.profileEditing,
    toChangePassword: () => go("changePassword"),

    profileName: s.role === "teacher" ? "Phạm Thu Trang" : s.role === "parent" ? "Nguyễn Văn Dũng" : "Nguyễn Thị Hoa",
    profileInitials: s.role === "teacher" ? "PT" : s.role === "parent" ? "ND" : "HN",
    profileAvatarTint: s.role === "teacher" ? "linear-gradient(135deg,#138cd2,#00708f)" : s.role === "parent" ? "linear-gradient(135deg,#ef5da8,#a03a6d)" : "linear-gradient(135deg,#00aaab,#00708f)",
    profileCommon: [
      s.role === "teacher"
        ? { label: "Ngày sinh", value: "03/11/1989" }
        : s.role === "parent"
        ? { label: "Ngày sinh", value: "20/02/1985" }
        : { label: "Ngày sinh", value: "12/05/2012" },
      s.role === "teacher"
        ? { label: "Email", value: "trang.pham@thcs-cvahn.edu.vn" }
        : s.role === "parent"
        ? { label: "Email", value: "dung.nguyen@gmail.com" }
        : { label: "Email", value: "hoa.nguyen@thpt-nguyenhue.edu.vn" },
      s.role === "teacher"
        ? { label: "Số điện thoại", value: "091 456 7890" }
        : s.role === "parent"
        ? { label: "Số điện thoại", value: "098 765 4321" }
        : { label: "Số điện thoại", value: "090 123 4567" },
      { label: "Địa chỉ", value: s.role === "teacher" ? "45 Nguyễn Trãi, Hà Nội" : "12 Lê Lợi, Quận 1, TP.HCM" },
    ],
    profileBio: s.role === "teacher"
      ? "Giáo viên Sinh học với 8 năm kinh nghiệm giảng dạy khối THCS."
      : s.role === "parent"
      ? "Phụ huynh luôn đồng hành cùng con trong học tập."
      : "Học sinh lớp 6A2, yêu thích Sinh học và các mô hình 3D.",
    profileRoleTitle: s.role === "teacher" ? "Thông tin giảng dạy" : s.role === "parent" ? "Học sinh liên kết" : "Thông tin học tập",
    profileRoleFields: s.role === "teacher"
      ? [
          { label: "Chức danh", value: "Giáo viên" },
          { label: "Tổ / Bộ môn", value: "Sinh học" },
          { label: "Khối lớp giảng dạy", value: [...new Set(T_CLASSES.map((c) => c.sub.split(" · ")[1]))].join(", ") },
          { label: "Trường học", value: "THCS Chu Văn An" },
        ]
      : s.role === "parent"
      ? []
      : [
          { label: "Trường", value: "THPT Nguyễn Huệ" },
          { label: "Lớp", value: "6A2" },
          { label: "Khối", value: "Lớp 6" },
          { label: "Mã học sinh", value: "HS2024-0182" },
        ],
    profileChildren: P_CHILDREN.map((c) => ({ name: c.name, meta: c.meta, initials: c.initials, tint: c.tint, relation: "Cha" })),

    topupAmounts, payMethods,
    topupLabel: topups[s.topup].v ? topups[s.topup].label : "số tiền khác",

    isStudent: s.role === "student", isTeacher: s.role === "teacher", isParent: s.role === "parent",
    isClasswork: s.screen === "classwork", isAssignment: s.screen === "assignment",
    isClassDetail: s.screen === "classDetail",
    isTOverview: s.screen === "tOverview", isTClasses: s.screen === "tClasses", isTClass: s.screen === "tClass",
    isTGrading: s.screen === "tGrading", isTGrade: s.screen === "tGrade",
    isTPlans: s.screen === "tPlans", isTPlan: s.screen === "tPlan",
    isTExplore: s.screen === "tExplore",
    isPOverview: s.screen === "pOverview", isPChild: s.screen === "pChild", isPReport: s.screen === "pReport",
    isPMessages: s.screen === "pMessages", isPThread: s.screen === "pThread", isPSafety: s.screen === "pSafety",

    cwTabs: [["todo", "Việc cần làm"], ["done", "Đã nộp"], ["grades", "Điểm số"]].map(([k, label]) => {
      const on = s.cwTab === k;
      return { label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ cwTab: k }) };
    }),
    cwItems: S_ASSIGNMENTS[s.cwTab].map((a, i) => ({ ...a, hasScore: !!a.score, onClick: () => setState({ screen: "assignment", asgIdx: i, submitted: s.cwTab !== "todo" }) })),
    toClasswork: () => go("classwork"),

    myClasses: T_CLASSES.map((c, i) => ({
      ...c, tintBg: c.tint,
      onClick: () => setState({ screen: "classDetail", classIdx: i, classDetailTab: "feed" }),
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
    asgTitle: (S_ASSIGNMENTS[s.cwTab][s.asgIdx] || S_ASSIGNMENTS.todo[0]).title,
    asgCls: (S_ASSIGNMENTS[s.cwTab][s.asgIdx] || S_ASSIGNMENTS.todo[0]).cls,
    asgDue: (S_ASSIGNMENTS[s.cwTab][s.asgIdx] || S_ASSIGNMENTS.todo[0]).due,
    submitted: s.submitted, notSubmitted: !s.submitted,
    submitAsg: () => setState({ submitted: true }),
    asgChecklist: [
      { text: "Nêu vị trí diễn ra quang hợp trong tế bào" },
      { text: "Mô tả pha sáng và pha tối" },
      { text: "Kết luận vai trò của quang hợp với sự sống" },
    ],

    teacherName: "Phạm Thu Trang",
    tMetrics: T_METRICS,
    tClasses: T_CLASSES.map((c, i) => ({ ...c, tintBg: c.tint, onClick: () => setState({ screen: "tClass", tClassIdx: i, tClassTab: "feed" }) }))
      .concat(s.createdClasses.map((c) => ({ ...c, tintBg: c.tint, onClick: () => {} }))),
    tClassesCountLabel: `${T_CLASSES.length + s.createdClasses.length} lớp đang hoạt động · ${128 + s.createdClasses.length * 0} học sinh`,
    isTCreateClass: s.screen === "tCreateClass",
    toTCreateClass: () => go("tCreateClass"),
    ccSubjects: ["Sinh học", "Vật lý", "Hóa học", "Khoa học tự nhiên"].map((label) => ({
      label, selected: s.ccSubject === label, onClick: () => setState({ ccSubject: label }),
    })),
    ccGrades: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"].map((label) => ({
      label, selected: s.ccGrade === label, onClick: () => setState({ ccGrade: label }),
    })),
    ccPreviewName: (() => {
      const abbr = { "Sinh học": "SINH HỌC", "Vật lý": "VẬT LÝ", "Hóa học": "HÓA HỌC", "Khoa học tự nhiên": "KHTN" }[s.ccSubject];
      const gradeNum = s.ccGrade.replace("Lớp ", "");
      const count = T_CLASSES.concat(s.createdClasses).filter((c) => c.sub.startsWith(s.ccSubject) || c.sub.includes(s.ccSubject)).length;
      return `${abbr} ${gradeNum}A${count + 1}`;
    })(),
    createClass: () => {
      const abbr = { "Sinh học": "SINH HỌC", "Vật lý": "VẬT LÝ", "Hóa học": "HÓA HỌC", "Khoa học tự nhiên": "KHTN" }[s.ccSubject];
      const img = { "Sinh học": "/assets/thumbs/thumb-bio-cell.svg", "Vật lý": "/assets/thumbs/thumb-physics-newton.svg", "Hóa học": "/assets/thumbs/thumb-chem-electrolysis.svg", "Khoa học tự nhiên": "/assets/thumbs/thumb-science-watercycle.svg" }[s.ccSubject];
      const tints = ["linear-gradient(135deg,#00aaab,#00708f)", "linear-gradient(135deg,#138cd2,#195658)", "linear-gradient(135deg,#22c55e,#15803d)", "linear-gradient(135deg,#ef5da8,#a03a6d)"];
      const gradeNum = s.ccGrade.replace("Lớp ", "");
      const count = T_CLASSES.concat(s.createdClasses).filter((c) => c.sub.startsWith(s.ccSubject) || c.sub.includes(s.ccSubject)).length;
      const newClass = {
        name: `${abbr} ${gradeNum}A${count + 1}`, sub: `${s.ccSubject} · ${s.ccGrade}`,
        code: `${abbr.slice(0, 2)}${gradeNum}N${count + 1}-26`, students: "0", progress: "0%",
        tint: tints[s.createdClasses.length % tints.length], img, isNew: true,
      };
      setState((prev) => ({ createdClasses: [...prev.createdClasses, newClass], screen: "tClasses" }));
    },

    isTCreateAssignment: s.screen === "tCreateAssignment",
    isTCreateLecture: s.screen === "tCreateLecture",
    toTCreateAssignment: () => setState({ screen: "tCreateAssignment", caCls: s.caCls || T_CLASSES.concat(s.createdClasses)[0].name }),
    toTCreateAssignmentForClass: () => setState({ screen: "tCreateAssignment", caCls: T_CLASSES[s.tClassIdx].name }),
    toTCreateLecture: () => setState({ screen: "tCreateLecture", clCls: s.clCls || T_CLASSES.concat(s.createdClasses)[0].name }),
    caClasses: T_CLASSES.concat(s.createdClasses).map((c) => ({ label: c.name, selected: s.caCls === c.name, onClick: () => setState({ caCls: c.name }) })),
    caDueOptions: ["3 ngày", "1 tuần", "2 tuần"].map((label) => ({ label, selected: s.caDue === label, onClick: () => setState({ caDue: label }) })),
    caPreviewTitle: `Bài tập tuần ${20 + T_ASSIGNMENTS.length + s.createdAssignments.length + 1}: Ôn tập`,
    createAssignment: () => {
      const cls = s.caCls || T_CLASSES[0].name;
      const total = T_CLASSES.concat(s.createdClasses).find((c) => c.name === cls);
      const title = `Bài tập tuần ${20 + T_ASSIGNMENTS.length + s.createdAssignments.length + 1}: Ôn tập`;
      const newAssignment = { title, cls, due: `hạn trong ${s.caDue}`, submitted: `0/${total ? total.students : 30}`, pending: "0 bài chờ chấm", isNew: true };
      setState((prev) => ({ createdAssignments: [...prev.createdAssignments, newAssignment], screen: "tClasses", tClassesTab: "upcoming" }));
    },
    clClasses: T_CLASSES.concat(s.createdClasses).map((c) => ({ label: c.name, selected: s.clCls === c.name, onClick: () => setState({ clCls: c.name }) })),
    clKinds: ["Video", "Mô hình 3D", "Bài đọc", "Trắc nghiệm"].map((label) => ({ label, selected: s.clKind === label, onClick: () => setState({ clKind: label }) })),
    clPreviewTitle: `Bài giảng mới ${T_BLOCKS.length + s.createdLectures.length + 1}`,
    createLecture: () => {
      const kind = s.clKind || "Video";
      const tints = { "Video": "#00aaab", "Mô hình 3D": "#138cd2", "Bài đọc": "#22c55e", "Trắc nghiệm": "#f59e0b" };
      const newLecture = { kind, title: `Bài giảng mới ${T_BLOCKS.length + s.createdLectures.length + 1}`, dur: "5:00", tint: tints[kind], isNew: true };
      setState((prev) => ({ createdLectures: [...prev.createdLectures, newLecture], screen: "tOverview" }));
    },
    tAssignments: T_ASSIGNMENTS.concat(s.createdAssignments).map((a) => ({ ...a, onClick: () => go("tGrading") })),
    tUpcoming: [...T_ASSIGNMENTS]
      .sort((a, b) => a.due.split("/").reverse().join("").localeCompare(b.due.split("/").reverse().join("")))
      .slice(0, 2)
      .concat(s.createdAssignments)
      .map((a) => ({ ...a, onClick: () => go("tGrading") })),
    tClassesTabs: [["submitted", "Bài đã nộp"], ["grading", "Bài cần chấm"], ["upcoming", "Sắp đến hạn"]].map(([k, label]) => {
      const on = s.tClassesTab === k;
      return { key: k, label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ tClassesTab: k }) };
    }),
    tcTabSubmitted: s.tClassesTab === "submitted", tcTabGrading: s.tClassesTab === "grading", tcTabUpcoming: s.tClassesTab === "upcoming",
    toTClasses: () => go("tClasses"), toTGrading: () => go("tGrading"), toTPlans: () => go("tPlans"),
    toTOverview: () => go("tOverview"), toTPlan: () => go("tPlan"),
    tClassName: T_CLASSES[s.tClassIdx].name,
    tClassSub: T_CLASSES[s.tClassIdx].sub,
    tClassCode: T_CLASSES[s.tClassIdx].code,
    tClassStudents: T_CLASSES[s.tClassIdx].students,
    tClassProgress: T_CLASSES[s.tClassIdx].progress,
    tClassTint: T_CLASSES[s.tClassIdx].tint,
    tClassImg: T_CLASSES[s.tClassIdx].img,
    tClassTabs: [["feed", "Bảng tin"], ["students", "Học sinh"], ["work", "Bài tập"], ["grading", "Chấm bài"], ["content", "Nội dung lớp"], ["settings", "Cài đặt"]].map(([k, label]) => {
      const on = s.tClassTab === k;
      return { key: k, label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ tClassTab: k }) };
    }),
    tTabFeed: s.tClassTab === "feed", tTabStudents: s.tClassTab === "students", tTabWork: s.tClassTab === "work",
    tTabGrading: s.tClassTab === "grading", tTabContent: s.tClassTab === "content", tTabSettings: s.tClassTab === "settings",
    tStudents: T_STUDENTS,
    tNews: [
      { title: "Nhắc nộp bài tập tuần 20", when: "Hôm nay · 07:40", body: "Các em hoàn thành bài tập tuần 20 trước 23:59 ngày 17/05. Phần sơ đồ pha tối là bắt buộc." },
      { title: "Lịch kiểm tra giữa kỳ", when: "12/05 · 16:10", body: "Kiểm tra giữa kỳ diễn ra tiết 2 ngày 19/05, nội dung từ bài 1 đến bài 6." },
    ],
    tClassAssignments: T_ASSIGNMENTS.concat(s.createdAssignments).filter((a) => a.cls === T_CLASSES[s.tClassIdx].name).map((a) => ({ ...a, onClick: () => go("tGrading") })),
    tClassInfo: [
      { label: "Tên lớp", value: T_CLASSES[s.tClassIdx].name },
      { label: "Khối lớp", value: T_CLASSES[s.tClassIdx].sub.split(" · ")[1] || T_CLASSES[s.tClassIdx].sub },
      { label: "Năm học", value: "2025 - 2026" },
      { label: "Trường / Tổ chức", value: "THCS Chu Văn An" },
      { label: "Sĩ số dự kiến", value: "40" },
    ],
    tClassDesc: "Lớp học Sinh học trọng tâm ôn tập chương trình, tăng cường mô hình 3D và bài tập thực hành.",
    tClassAccessOptions: [
      { key: "code", title: "Công khai bằng mã lớp", desc: "Học sinh nhập mã lớp để tham gia" },
      { key: "invite", title: "Chỉ tham gia qua liên kết mời", desc: "Chỉ học sinh có liên kết mời mới tham gia được" },
    ].map((o) => ({ ...o, selected: s.classAccessMode === o.key, onClick: () => setState({ classAccessMode: o.key }) })),
    tClassMainTeacher: { name: "Phạm Thu Trang", initials: "PT", tint: "linear-gradient(135deg,#138cd2,#00708f)" },
    tClassCoTeachers: [
      { name: "Vũ Đình Nam", initials: "VN", tint: "linear-gradient(135deg,#22c55e,#15803d)", addedOn: "14/6/2026" },
    ],
    tClassPermRows: [
      { key: "post", label: "Học sinh có thể đăng bài lên bảng tin" },
      { key: "comment", label: "Học sinh có thể bình luận" },
      { key: "upload", label: "Học sinh có thể tải tài liệu" },
    ].map((r) => {
      const on = s.classPerms[r.key];
      return { ...r, trackBg: on ? ACCENT : "#dbe7ec", knobLeft: on ? "22px" : "2px", onClick: () => setState({ classPerms: { ...s.classPerms, [r.key]: !on } }) };
    }),
    resetClassSettings: () => setState({ classAccessMode: "code", classPerms: { post: false, comment: true, upload: true } }),
    tGradeSummary: [
      { label: "Chờ chấm", value: "12", bg: "#eaf6f8", color: "#00708f" },
      { label: "Đã chấm", value: "86", bg: "#f0fdf4", color: "#15803d" },
      { label: "Nộp muộn", value: "4", bg: "#fff5e6", color: "#b45309" },
    ],
    tSubmissions: T_SUBMISSIONS.map((x, i) => ({ ...x, onClick: () => setState({ screen: "tGrade", gradeIdx: i, graded: false }) })),
    subName: T_SUBMISSIONS[s.gradeIdx].name,
    subAt: T_SUBMISSIONS[s.gradeIdx].at,
    subAttempt: T_SUBMISSIONS[s.gradeIdx].attempt,
    subAnswer: T_SUBMISSIONS[s.gradeIdx].answer,
    subTint: T_SUBMISSIONS[s.gradeIdx].tint,
    gradeScore: s.gradeScore,
    graded: s.graded, notGraded: !s.graded,
    scoreChips: ["6.0", "7.0", "8.0", "8.5", "9.0", "10"].map((v) => ({
      label: v, bg: s.gradeScore === v ? "#eaf6f8" : "#fff",
      border: s.gradeScore === v ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`,
      color: s.gradeScore === v ? DEEP : "#455771",
      onClick: () => setState({ gradeScore: v }),
    })),
    saveGrade: () => setState({ graded: true }),
    tBlocks: T_BLOCKS.concat(s.createdLectures),
    planTabs: [["recent", "Gần đây"], ["draft", "Bản nháp"], ["published", "Đã xuất bản"]].map(([k, label]) => {
      const on = s.planTab === k;
      return { key: k, label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ planTab: k }) };
    }),
    tPlans: (() => {
      const all = T_PLANS.map((p, i) => ({ ...p, onClick: () => setState({ screen: "tPlan", tPlanIdx: i }) }));
      if (s.planTab === "draft") return all.filter((p) => p.status === "Bản nháp");
      if (s.planTab === "published") return all.filter((p) => p.status === "Đã xuất bản");
      return all;
    })(),
    tPlanTitle: T_PLANS[s.tPlanIdx].title,
    tPlanSub: T_PLANS[s.tPlanIdx].sub,
    tPlanStatus: T_PLANS[s.tPlanIdx].status,

    tExploreItems: sortLessons(filterBySubject(LESSONS)).map((l) => ({
      ...l, tintBg: l.tint,
      isSaved: s.tExploreSaved.includes(l.id),
      isAdded: s.tExploreAdded.includes(l.id),
      onPreview: () => { pushRecent(l.id); go("detail"); },
      onSave: () => setState((prev) => ({ tExploreSaved: prev.tExploreSaved.includes(l.id) ? prev.tExploreSaved.filter((x) => x !== l.id) : [...prev.tExploreSaved, l.id] })),
      onAdd: () => openAssignSheet("plan", l.id),
    })),
    toggleTExploreView: () => setState({ tExploreView: tGrid ? "list" : "grid" }),
    tGridBg: tGrid ? "#195658" : "transparent", tGridFg: tGrid ? "#fff" : "#8ba0ae",
    tListBg: tGrid ? "transparent" : "#195658", tListFg: tGrid ? "#8ba0ae" : "#fff",
    tExploreGridCols: tGrid ? "1fr 1fr" : "1fr",

    tExploreSectionTabs: [["explore", "Khám phá"], ["library", "Thư viện của tôi"]].map(([k, label]) => {
      const on = s.tExploreSection === k;
      return { key: k, label, active: on, color: on ? "#00aaab" : "#455771", weight: on ? 600 : 500, onClick: () => setState({ tExploreSection: k }) };
    }),
    isTExploreSection: s.tExploreSection === "explore", isTLibrarySection: s.tExploreSection === "library",

    tLibTabs: [
      { key: "saved", label: "Đã lưu" }, { key: "liked", label: "Yêu thích" },
      { key: "purchased", label: "Đã mua" }, { key: "recent", label: "Gần đây" },
      { key: "used", label: "Dùng trong giáo án" },
    ].map((tb) => {
      const on = s.tLibTab === tb.key;
      return { ...tb, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ tLibTab: tb.key }) };
    }),
    tLibraryItems: (() => {
      const idsByTab = {
        saved: s.tExploreSaved, liked: TEACHER_LIKED_IDS, purchased: TEACHER_PURCHASED_IDS,
        recent: s.tRecentIds, used: s.tExploreAdded,
      };
      const ids = idsByTab[s.tLibTab] || [];
      return ids.map((id) => LESSONS.find((l) => l.id === id)).filter(Boolean).map((l) => ({
        ...l, tintBg: l.tint,
        planName: s.tItemPlanName[l.id],
        assignedCount: (s.tItemAssignedClasses[l.id] || []).length,
        onPreview: () => { pushRecent(l.id); go("detail"); },
        onAddToPlan: () => openAssignSheet("plan", l.id),
        onAssignClass: () => openAssignSheet("class", l.id),
      }));
    })(),

    tAssignSheetOpen: s.tAssignSheet.open,
    tAssignSheetTitle: s.tAssignSheet.mode === "class" ? "Giao cho lớp học" : "Thêm vào giáo án",
    tAssignSheetOptions: (s.tAssignSheet.mode === "class"
      ? T_CLASSES.concat(s.createdClasses).map((c) => ({ id: c.name, label: c.name }))
      : T_PLANS.map((p, i) => ({ id: i, label: p.title }))
    ).map((o) => ({ ...o, selected: s.tAssignSheet.selectedId === o.id, onClick: () => selectAssignOption(o.id) })),
    tAssignSheetConfirmDisabled: s.tAssignSheet.selectedId === null,
    closeAssignSheet, confirmAssignSheet,
    tQuickActions: [
      { label: "Tạo giáo án", iconPath: "M4.5 5.4A1.9 1.9 0 0 1 6.4 3.5H17a1.9 1.9 0 0 1 1.9 1.9v13.2H6.4a1.9 1.9 0 0 0-1.9 1.9V5.4zM8.5 8h6.5M8.5 11.5h6.5", bg: "#eaf6f8", color: "#00708f", onClick: () => go("tPlan") },
      { label: "Tạo bài tập", iconPath: "M8.5 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1.5M8.5 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM9 14l2.2 2.2L15.5 12", bg: "#eaf6f8", color: ACCENT, onClick: () => setState({ screen: "tCreateAssignment", caCls: s.caCls || T_CLASSES.concat(s.createdClasses)[0].name }) },
      { label: "Tạo bài giảng", iconPath: "M4 6h16v10H4zM8 20h8M12 16v4", bg: "#fdeef5", color: "#b13a75", onClick: () => setState({ screen: "tCreateLecture", clCls: s.clCls || T_CLASSES.concat(s.createdClasses)[0].name }) },
    ],

    parentName: "Nguyễn Văn Dũng",
    children: P_CHILDREN.map((c, i) => {
      const on = s.childIdx === i;
      return {
        name: c.name, initials: c.initials, tint: c.tint, meta: c.meta,
        border: on ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`, bg: on ? "#eaf6f8" : "#fff",
        weight: on ? 600 : 400, onClick: () => setState({ childIdx: i }),
      };
    }),
    childName: P_CHILDREN[s.childIdx].name,
    childMeta: P_CHILDREN[s.childIdx].meta,
    childInitials: P_CHILDREN[s.childIdx].initials,
    childTint: P_CHILDREN[s.childIdx].tint,
    childPath: P_CHILDREN[s.childIdx].path,
    childStats: [
      { label: "Tổng XP", value: P_CHILDREN[s.childIdx].xp, bg: "#eaf6f8", color: "#00708f" },
      { label: "Cấp độ", value: P_CHILDREN[s.childIdx].level, bg: "#e7f2fb", color: "#0b6aa3" },
      { label: "Ngày liên tiếp", value: P_CHILDREN[s.childIdx].streak, bg: "#fff5e6", color: "#b45309" },
      { label: "Phút học", value: P_CHILDREN[s.childIdx].minutes, bg: "#fdeef5", color: "#b13a75" },
    ],
    childClasses: P_CHILDREN[s.childIdx].classes,
    childAssignments: P_CHILDREN[s.childIdx].assignments,
    childMissions: P_CHILDREN[s.childIdx].missions,
    nextAction: "Giữ lịch học ngắn, đều và để trẻ có cảm giác hoàn thành mỗi ngày.",
    toPChild: () => go("pChild"), toPReport: () => go("pReport"), toPMessages: () => go("pMessages"),
    toPOverview: () => go("pOverview"), toPSafety: () => go("pSafety"), toPThread: () => go("pThread"),
    reportPeriod: P_REPORT.period, reportSummary: P_REPORT.summary,
    reportMetrics: P_REPORT.metrics,
    reportStrengths: P_REPORT.strengths.map((t) => ({ text: t })),
    reportImprovements: P_REPORT.improvements.map((t) => ({ text: t })),
    convos: P_CONVOS.map((c) => ({ ...c, hasUnread: !!c.unread, onClick: () => go("pThread") })),
    thread: P_THREAD.map((m) => {
      const mine = m.who === "parent";
      return {
        ...m, align: mine ? "flex-end" : "flex-start",
        bg: mine ? "#00aaab" : "#fff", color: mine ? "#fff" : "#455771",
        border: mine ? "1px solid #00aaab" : `1px solid ${BORDER}`,
        metaColor: mine ? "rgba(255,255,255,.75)" : "#455771",
      };
    }),
    sent: s.sent,
    sendMsg: () => setState({ sent: true }),
    safetyRows: [
      { label: "Social learning", desc: "Cho phép tham gia nhóm học và thử thách", key: "social" },
      { label: "Leaderboard", desc: "Hiển thị tên con trên bảng xếp hạng", key: "leaderboard" },
      { label: "AI tutor", desc: "Trợ lý AI gợi ý bài tập và giải thích", key: "ai" },
      { label: "Thông báo", desc: "Nhận thông báo lớp học và nhắc hạn nộp", key: "noti" },
    ].map((r) => {
      const on = s.safety[r.key];
      return {
        ...r, trackBg: on ? ACCENT : "#dbe7ec", knobLeft: on ? "22px" : "2px",
        onClick: () => setState({ safety: { ...s.safety, [r.key]: !on } }),
      };
    }),
    limitChips: ["30", "60", "90", "120"].map((v) => ({
      label: v + " phút", bg: s.safety.limit === v ? "#eaf6f8" : "#fff",
      border: s.safety.limit === v ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`,
      color: s.safety.limit === v ? DEEP : "#455771",
      onClick: () => setState({ safety: { ...s.safety, limit: v } }),
    })),

    lang: s.lang,
    langOpen: s.langOpen,
    langLabel: s.lang.toUpperCase(),
    toggleLangMenu: () => setState({ langOpen: !s.langOpen }),
    closeLangMenu: () => setState({ langOpen: false }),
  };

  const translated = deepT(vals, t);
  // Keep language-picker option labels as endonyms ("Tiếng Việt"/"English")
  // rather than translating them into the currently active language.
  translated.langOptions = langOptions;
  // Raw user input must never round-trip through the dictionary lookup —
  // a query that happens to match a Vietnamese source string (e.g. "Toán")
  // would otherwise get silently rewritten while the user is still typing.
  translated.search = s.search;
  translated.t = t;
  return translated;
}
