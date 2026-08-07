import { useEffect, useRef, useState } from "react";
import {
  ACCENT, DEEP, INK, MUTED, BORDER,
  CATS, LESSONS, STEPS, QUICK, QUICK_CORRECT, EXAM,
  T_METRICS, T_CLASSES, T_ASSIGNMENTS, T_SUBMISSIONS, T_PLANS, T_BLOCKS, T_STUDENTS,
  S_ASSIGNMENTS, P_CHILDREN, P_CONVOS, P_THREAD, P_REPORT, TAB_ICONS, NOTI,
} from "./constants.js";

const INITIAL_STATE = {
  screen: "login", role: "student", tab: "home", view: "grid",
  detailTab: "overview", libTab: "learning",
  step: 0, playing: false, quickPick: null,
  examIdx: 0, answers: [null, null, null], examSecs: 596,
  saved: false, topup: 1, pay: 0,
  cwTab: "todo", asgIdx: 0, submitted: false,
  tClassIdx: 0, tClassTab: "students", gradeIdx: 0, gradeScore: "8.5", graded: false,
  childIdx: 0, sent: false,
  safety: { social: true, leaderboard: true, ai: true, noti: true, limit: "60" },
};

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
  const step = STEPS[s.step];

  const ROLE_TABS = {
    student: [["home", "Trang chủ", "home"], ["explore", "Khám phá", "explore"], ["classwork", "Lớp học", "cls"], ["library", "Thư viện", "library"], ["profile", "Tài khoản", "profile"]],
    teacher: [["tOverview", "Tổng quan", "chart"], ["tClasses", "Lớp học", "cls"], ["tGrading", "Chấm bài", "check"], ["tPlans", "Giáo án", "book"], ["profile", "Tài khoản", "profile"]],
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
      onClick: () => setState({ role: k, screen: ROLE_TABS[k][0][0] }),
    };
  });

  const mkLesson = (l) => ({ ...l, tintBg: l.tint, onClick: () => go("detail") });

  const chipDefs = [{ label: "Tất cả", icon: "/assets/cat/all.svg" }].concat(CATS.slice(0, 6));
  const chips = chipDefs.map((c, i) => {
    const on = i === 0;
    return {
      ...c, onClick: () => {},
      border: on ? `1.4px solid ${ACCENT}` : `1px solid ${BORDER}`,
      bg: on ? "#eaf6f8" : "#fff", color: on ? DEEP : "#25475a",
      iconOpacity: on ? 1 : 0.7,
    };
  });

  const grid = s.view === "grid";
  const detailTabDefs = [
    { key: "overview", label: "Tổng quan" }, { key: "content", label: "Nội dung" }, { key: "reviews", label: "Đánh giá" },
  ];
  const detailTabs = detailTabDefs.map((t) => {
    const on = s.detailTab === t.key;
    return { label: t.label, bg: on ? "#fff" : "transparent", color: on ? INK : MUTED, weight: on ? 600 : 400, onClick: () => setState({ detailTab: t.key }) };
  });

  const libTabDefs = [
    { key: "learning", label: "Đang học" }, { key: "saved", label: "Đã lưu" }, { key: "completed", label: "Hoàn thành" },
  ];
  const libTabs = libTabDefs.map((t) => {
    const on = s.libTab === t.key;
    return { label: t.label, bg: on ? "#fff" : "transparent", color: on ? INK : MUTED, weight: on ? 600 : 400, onClick: () => setState({ libTab: t.key }) };
  });
  const libSets = {
    learning: [
      { title: "Cấu tạo tế bào thực vật", meta: "Sinh học · Bài 3/5", pct: "60%", bar: ACCENT, tint: LESSONS[0].tint },
      { title: "Ba định luật Newton", meta: "Vật lý · Bài 2/6", pct: "33%", bar: "#138cd2", tint: LESSONS[4].tint },
      { title: "Thí nghiệm điện phân dung dịch CuSO₄", meta: "Hóa học · Bài 1/4", pct: "25%", bar: "#f59e0b", tint: LESSONS[1].tint },
    ],
    saved: [
      { title: "Hệ Mặt Trời trong không gian 3D", meta: "Khoa học · Đã lưu 2 ngày trước", pct: "0%", bar: MUTED, tint: LESSONS[2].tint },
      { title: "Địa hình Việt Nam qua bản đồ 3D", meta: "Địa lý · Đã lưu 5 ngày trước", pct: "0%", bar: MUTED, tint: LESSONS[5].tint },
    ],
    completed: [
      { title: "Chiến dịch Điện Biên Phủ", meta: "Lịch sử · Hoàn thành 12/07", pct: "100%", bar: "#22c55e", tint: LESSONS[3].tint },
    ],
  };
  const libraryItems = libSets[s.libTab].map((l) => ({ ...l, tintBg: l.tint, barColor: l.bar, onClick: () => go("detail") }));

  const quickOptions = QUICK.map((t, i) => {
    const picked = s.quickPick === i;
    const revealed = s.quickPick !== null;
    const correct = i === QUICK_CORRECT;
    let border = `1px solid ${BORDER}`, bg = "#fff", dotBg = "#edf7f9", dotColor = MUTED, dotBorder = "1px solid #ddeaf0", color = "#25475a", weight = 400;
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
      dotBg: on ? ACCENT : "#edf7f9", dotColor: on ? "#fff" : MUTED,
      dotBorder: on ? `1px solid ${ACCENT}` : `1px solid ${BORDER}`,
      color: on ? INK : "#25475a", weight: on ? 600 : 400,
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
    return { label: t.label, bonus: t.bonus, ...cardOn(on), color: on ? DEEP : INK, onClick: () => setState({ topup: i }) };
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

  const vals = {
    isLogin: s.screen === "login", isRole: s.screen === "role", isHome: s.screen === "home",
    isExplore: s.screen === "explore", isDetail: s.screen === "detail", isPlayer: s.screen === "player",
    isComplete: s.screen === "complete", isExam: s.screen === "exam", isExamResult: s.screen === "examresult",
    isLibrary: s.screen === "library", isNoti: s.screen === "noti", isProfile: s.screen === "profile",
    isWallet: s.screen === "wallet",

    showNav: NAV_SCREENS.indexOf(s.screen) >= 0,
    navTabs: navStyle === "tabs", navFab: navStyle === "fab", navPill: navStyle === "pill",
    tabs, tabsSplitLeft: tabs.slice(0, 2), tabsSplitRight: tabs.slice(3), tabsPill: tabs,

    toRole: () => go("role"), toHome: () => go(roleHome), toExplore: () => go("explore"),
    toPlayer: () => setState({ screen: "player" }), toDetail: () => go("detail"),
    toExam: () => setState({ screen: "exam", examIdx: 0, answers: [null, null, null], examSecs: 596 }),
    toLibrary: () => go("library"), toNoti: () => go("noti"), toProfile: () => go("profile"),
    toWallet: () => go("wallet"), toLogin: () => go("login"), back: () => go("explore"),

    userName: "Nguyễn Thị Hoa",
    roleLabel: roleMeta[s.role].title,
    roles, roleSwitch,
    categories: CATS,
    featured: LESSONS.slice(0, 3).map(mkLesson),
    lessons: LESSONS.map(mkLesson),
    resumePct: "60%",
    stats: [
      { value: "4", label: "Bài đã học", icon: "/assets/lib/learning.svg", bg: "#eaf6f8" },
      { value: "2h 15p", label: "Thời gian học", icon: "/assets/lib/completed.svg", bg: "#e8f6ee" },
      { value: "7", label: "Ngày liên tiếp", icon: "/assets/learning-points.svg", bg: "#fff5e6" },
      { value: "8.4", label: "Điểm trung bình", icon: "/assets/lesson/star.svg", bg: "#fdeef5" },
    ],

    chips, resultCount: "248",
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
    scoreSub: "Bạn trả lời đúng " + correctCount + "/" + EXAM.length + " câu trong bài kiểm tra Cấu tạo tế bào thực vật.",
    examReview: EXAM.map((e, i) => {
      const ok = s.answers[i] === e.correct;
      return {
        text: e.q, markBg: ok ? "#22c55e" : "#ef4444",
        markPath: ok ? "M5 12.5L10 17.5 19 6.5" : "M6 6l12 12M18 6L6 18",
        ansLabel: ok ? "Đúng · " + e.opts[e.correct] : "Đáp án đúng: " + e.opts[e.correct],
        ansColor: ok ? "#15803d" : "#b91c1c",
      };
    }),
    restartExam: () => setState({ screen: "exam", examIdx: 0, answers: [null, null, null], examSecs: 596 }),

    libraryCards: [
      { title: "Đang học", value: "3", icon: "/assets/lib/learning.svg", hint: "Tiếp tục từ nơi bạn dừng lại" },
      { title: "Hoàn thành", value: "12", icon: "/assets/lib/completed.svg", hint: "Bài học đã hoàn tất trong kỳ" },
      { title: "Đã mua", value: "8", icon: "/assets/lib/purchased.svg", hint: "Học liệu sở hữu vĩnh viễn" },
      { title: "Đã lưu", value: "24", icon: "/assets/lib/saved.svg", hint: "Danh sách xem sau của bạn" },
    ],
    libTabs, libraryItems,

    notifications: NOTI[s.role],

    profileRows: [
      { label: "Hồ sơ cá nhân", value: "", iconPath: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1", onClick: () => {} },
      { label: "Lớp học của tôi", value: "6A2", iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => {} },
      { label: "Ví & giao dịch", value: "450.000đ", iconPath: "M3 8.5A2.5 2.5 0 0 1 5.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-8zM16.5 12.5h.01", onClick: () => go("wallet") },
      { label: "Gói dịch vụ", value: "Pro", iconPath: "M4 17l1.6-9L10 12l2-6 2 6 4.4-4 1.6 9H4z", onClick: () => {} },
      { label: "Thiết bị của tôi", value: "2/3", iconPath: "M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM11 17.5h2", onClick: () => {} },
      { label: "Ngôn ngữ", value: "Tiếng Việt", iconPath: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.2 12h17.6M12 3.2c4.5 5 4.5 12.6 0 17.6M12 3.2c-4.5 5-4.5 12.6 0 17.6", onClick: () => {} },
    ],

    topupAmounts, payMethods,
    topupLabel: topups[s.topup].v ? topups[s.topup].label : "số tiền khác",

    isStudent: s.role === "student", isTeacher: s.role === "teacher", isParent: s.role === "parent",
    isClasswork: s.screen === "classwork", isAssignment: s.screen === "assignment",
    isTOverview: s.screen === "tOverview", isTClasses: s.screen === "tClasses", isTClass: s.screen === "tClass",
    isTGrading: s.screen === "tGrading", isTGrade: s.screen === "tGrade",
    isTPlans: s.screen === "tPlans", isTPlan: s.screen === "tPlan",
    isPOverview: s.screen === "pOverview", isPChild: s.screen === "pChild", isPReport: s.screen === "pReport",
    isPMessages: s.screen === "pMessages", isPThread: s.screen === "pThread", isPSafety: s.screen === "pSafety",

    cwTabs: [["todo", "Việc cần làm"], ["done", "Đã nộp"], ["grades", "Điểm số"]].map(([k, label]) => {
      const on = s.cwTab === k;
      return { label, bg: on ? "#fff" : "transparent", color: on ? INK : MUTED, weight: on ? 600 : 400, onClick: () => setState({ cwTab: k }) };
    }),
    cwItems: S_ASSIGNMENTS[s.cwTab].map((a, i) => ({ ...a, hasScore: !!a.score, onClick: () => setState({ screen: "assignment", asgIdx: i, submitted: s.cwTab !== "todo" }) })),
    toClasswork: () => go("classwork"),
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
    tClasses: T_CLASSES.map((c, i) => ({ ...c, tintBg: c.tint, onClick: () => setState({ screen: "tClass", tClassIdx: i }) })),
    tAssignments: T_ASSIGNMENTS.map((a) => ({ ...a, onClick: () => go("tGrading") })),
    toTClasses: () => go("tClasses"), toTGrading: () => go("tGrading"), toTPlans: () => go("tPlans"),
    toTOverview: () => go("tOverview"), toTPlan: () => go("tPlan"),
    tClassName: T_CLASSES[s.tClassIdx].name,
    tClassSub: T_CLASSES[s.tClassIdx].sub,
    tClassCode: T_CLASSES[s.tClassIdx].code,
    tClassStudents: T_CLASSES[s.tClassIdx].students,
    tClassProgress: T_CLASSES[s.tClassIdx].progress,
    tClassTint: T_CLASSES[s.tClassIdx].tint,
    tClassTabs: [["students", "Học sinh"], ["work", "Bài tập"], ["news", "Thông báo"]].map(([k, label]) => {
      const on = s.tClassTab === k;
      return { label, bg: on ? "#fff" : "transparent", color: on ? INK : MUTED, weight: on ? 600 : 400, onClick: () => setState({ tClassTab: k }) };
    }),
    tTabStudents: s.tClassTab === "students", tTabWork: s.tClassTab === "work", tTabNews: s.tClassTab === "news",
    tStudents: T_STUDENTS,
    tNews: [
      { title: "Nhắc nộp bài tập tuần 20", when: "Hôm nay · 07:40", body: "Các em hoàn thành bài tập tuần 20 trước 23:59 ngày 17/05. Phần sơ đồ pha tối là bắt buộc." },
      { title: "Lịch kiểm tra giữa kỳ", when: "12/05 · 16:10", body: "Kiểm tra giữa kỳ diễn ra tiết 2 ngày 19/05, nội dung từ bài 1 đến bài 6." },
    ],
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
      color: s.gradeScore === v ? DEEP : INK,
      onClick: () => setState({ gradeScore: v }),
    })),
    saveGrade: () => setState({ graded: true }),
    tPlans: T_PLANS.map((p) => ({ ...p, onClick: () => go("tPlan") })),
    tBlocks: T_BLOCKS,

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
        bg: mine ? "#00aaab" : "#fff", color: mine ? "#fff" : "#25475a",
        border: mine ? "1px solid #00aaab" : `1px solid ${BORDER}`,
        metaColor: mine ? "rgba(255,255,255,.75)" : MUTED,
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
      color: s.safety.limit === v ? DEEP : INK,
      onClick: () => setState({ safety: { ...s.safety, limit: v } }),
    })),
  };

  return vals;
}
