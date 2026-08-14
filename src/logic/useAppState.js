import { useEffect, useRef, useState } from "react";
import { ACCENT, BORDER, INK, MUTED, TAB_ICONS } from "../data/shared.js";
import { INITIAL_COURSEWORK } from "../data/coursework.js";
import { translate } from "../i18n/dict.js";
import * as N from "./navStack.js";

// State gốc dùng chung. Các khoá riêng của một vai trò đã chuyển sang hook
// của vai trò đó; ở đây chỉ giữ những gì nhiều vai trò cùng đọc.
const INITIAL_SHARED = {
  role: "student",
  lang: "vi",
  langOpen: false,
  notiRead: false,
  // Mốc thời gian giả lập của prototype. Mọi so sánh hạn nộp dùng giá trị này
  // thay vì Date.now(), để kịch bản demo luôn tái lập được.
  nowIso: "2026-05-16T09:00:00",
  ...INITIAL_COURSEWORK,
};

export function useAppState(navStyle, initialExtra = {}) {
  const [state, setStateRaw] = useState({ ...INITIAL_SHARED, ...initialExtra });
  const [nav, setNav] = useState(() => N.createNav("login"));

  const stateRef = useRef(state);
  stateRef.current = state;

  const setState = (patch) =>
    setStateRaw((prev) => ({ ...prev, ...(typeof patch === "function" ? patch(prev) : patch) }));

  const screen = N.currentScreen(nav);
  const params = N.currentParams(nav);

  const push = (next, p) => setNav((cur) => N.push(cur, next, p));
  const replace = (next, p) => setNav((cur) => N.replace(cur, next, p));
  const pop = () => setNav((cur) => N.pop(cur));
  const resetTo = (next, p) => setNav(N.resetTo(next, p));
  const go = push; // giữ tên cũ cho các màn chưa chuyển đổi

  // Cuộn lên đầu mỗi khi đổi màn — hành vi cũ, giữ nguyên.
  const prevScreenRef = useRef(screen);
  useEffect(() => {
    if (prevScreenRef.current !== screen) {
      const el = document.querySelector(".yb-main");
      if (el) el.scrollTop = 0;
      prevScreenRef.current = screen;
    }
  }, [screen]);

  const s = state;
  const t = (str) => translate(s.lang, str);

  const cardOn = (on) => ({
    border: on ? `1.6px solid ${ACCENT}` : `1px solid ${BORDER}`,
    bg: on ? "#eaf6f8" : "#fff",
  });

  const ROLE_TABS = {
    student: [["home", "Trang chủ", "home"], ["explore", "Khám phá", "explore"], ["classwork", "Lớp học", "cls"], ["library", "Thư viện", "library"], ["profile", "Tài khoản", "profile"]],
    teacher: [["tOverview", "Trang chủ", "home"], ["tExplore", "Khám phá", "explore"], ["tPlans", "Giáo án", "book"], ["tClasses", "Lớp học", "cls"], ["profile", "Tài khoản", "profile"]],
    parent: [["pOverview", "Tổng quan", "chart"], ["pChild", "Con của tôi", "child"], ["pReport", "Báo cáo", "doc"], ["pMessages", "Tin nhắn", "msg"], ["profile", "Tài khoản", "profile"]],
  };
  const roleHome = ROLE_TABS[s.role][0][0];
  const NAV_SCREENS = ROLE_TABS[s.role].map((x) => x[0]).concat(["noti"]);

  const tabs = ROLE_TABS[s.role]
    .map((x) => ({ key: x[2], label: x[1], screen: x[0] }))
    .map((tab) => {
      const active = screen === tab.screen;
      return {
        ...tab,
        active,
        iconPath: TAB_ICONS[tab.key],
        color: active ? ACCENT : "#8ba0ae",
        sw: active ? 2.1 : 1.7,
        weight: active ? 600 : 400,
        pillBg: active ? "#fff" : "transparent",
        pillColor: active ? INK : "rgba(255,255,255,.72)",
        flex: active ? 2.1 : 1,
        // Bấm tab là điểm neo: xoá ngăn xếp để không tích luỹ vô hạn.
        onClick: () => resetTo(tab.screen),
      };
    });

  const roleMeta = {
    student: { title: "Học sinh", icon: "/assets/role/student.svg", desc: "Khám phá học liệu 3D, tham gia lớp học, làm bài tập và theo dõi tiến độ cá nhân." },
    teacher: { title: "Giáo viên", icon: "/assets/role/teacher.svg", desc: "Tạo lớp học, soạn giáo án, giao bài tập, chấm bài và theo dõi tiến độ học sinh." },
    parent: { title: "Phụ huynh", icon: "/assets/role/parent.svg", desc: "Liên kết với con, theo dõi tự học, kết quả lớp học, báo cáo tuần và cài đặt an toàn." },
  };

  const roles = Object.keys(roleMeta).map((k) => {
    const on = s.role === k;
    return {
      ...roleMeta[k],
      ...cardOn(on),
      dot: on ? `6px solid ${ACCENT}` : `1.6px solid ${BORDER}`,
      dotFill: "transparent",
      onClick: () => setState({ role: k }),
    };
  });

  const roleSwitch = Object.keys(roleMeta).map((k) => {
    const on = s.role === k;
    return {
      title: roleMeta[k].title,
      icon: roleMeta[k].icon,
      ...cardOn(on),
      opacity: on ? 1 : 0.5,
      weight: on ? 600 : 400,
      color: on ? INK : MUTED,
      onClick: () => {
        setState({ role: k, notiRead: false });
        resetTo(ROLE_TABS[k][0][0]);
      },
    };
  });

  const langOptions = [
    { code: "vi", label: "Tiếng Việt" },
    { code: "en", label: "English" },
  ].map((o) => ({ ...o, active: o.code === s.lang, onClick: () => setState({ lang: o.code, langOpen: false }) }));

  // Ba vai trò cùng ghi vào một mảng bài nộp, nên hàm ghi đặt ở tầng dùng chung.
  const upsertSubmission = (next) =>
    setState((prev) => {
      const exists = prev.submissions.some((x) => x.id === next.id);
      return {
        submissions: exists
          ? prev.submissions.map((x) => (x.id === next.id ? next : x))
          : [...prev.submissions, next],
        nextSubmissionId: exists ? prev.nextSubmissionId : prev.nextSubmissionId + 1,
      };
    });

  const addAssignment = (assignment) =>
    setState((prev) => ({ assignments: [...prev.assignments, assignment] }));

  const addRubric = (rubric) => setState((prev) => ({ rubrics: [...prev.rubrics, rubric] }));

  const findSubmission = (assignmentId, studentId) =>
    s.submissions.find((x) => x.assignmentId === assignmentId && x.studentId === studentId) ?? null;

  return {
    s, setState, stateRef,
    nav, screen, params, go, push, pop, replace, resetTo,
    t, cardOn, roleMeta, roleHome, tabs,
    showNav: NAV_SCREENS.indexOf(screen) >= 0,
    navTabs: navStyle === "tabs", navFab: navStyle === "fab", navPill: navStyle === "pill",
    tabsSplitLeft: tabs.slice(0, 2), tabsSplitRight: tabs.slice(3), tabsPill: tabs,
    roles, roleSwitch, langOptions,
    upsertSubmission, addAssignment, addRubric, findSubmission,
  };
}
