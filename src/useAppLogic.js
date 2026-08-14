import { deepT } from "./logic/deepT.js";
import { useAccountLogic, INITIAL_ACCOUNT } from "./logic/useAccountLogic.js";
import { useAppState } from "./logic/useAppState.js";
import { useParentLogic, INITIAL_PARENT } from "./logic/useParentLogic.js";
import { useStudentLogic, INITIAL_STUDENT } from "./logic/useStudentLogic.js";
import { useTeacherLogic, INITIAL_TEACHER } from "./logic/useTeacherLogic.js";

// navStyle: "tabs" | "fab" | "pill"
export function useAppLogic(navStyle = "tabs") {
  const ctx = useAppState(navStyle, {
    ...INITIAL_STUDENT,
    ...INITIAL_TEACHER,
    ...INITIAL_PARENT,
    ...INITIAL_ACCOUNT,
  });

  const vals = {
    showNav: ctx.showNav,
    navTabs: ctx.navTabs, navFab: ctx.navFab, navPill: ctx.navPill,
    tabs: ctx.tabs, tabsSplitLeft: ctx.tabsSplitLeft, tabsSplitRight: ctx.tabsSplitRight, tabsPill: ctx.tabsPill,
    roles: ctx.roles, roleSwitch: ctx.roleSwitch,
    isRole: ctx.screen === "role",
    toRole: () => ctx.push("role"),
    toHome: () => ctx.resetTo(ctx.roleHome),
    back: ctx.pop,
    canGoBack: ctx.nav.stack.length > 1,
    lang: ctx.s.lang,
    langOpen: ctx.s.langOpen,
    langLabel: ctx.s.lang.toUpperCase(),
    toggleLangMenu: () => ctx.setState({ langOpen: !ctx.s.langOpen }),
    closeLangMenu: () => ctx.setState({ langOpen: false }),
    isStudent: ctx.s.role === "student",
    isTeacher: ctx.s.role === "teacher",
    isParent: ctx.s.role === "parent",
    ...useStudentLogic(ctx),
    ...useTeacherLogic(ctx),
    ...useParentLogic(ctx),
    ...useAccountLogic(ctx),
  };

  const translated = deepT(vals, ctx.t);
  // Nhãn ngôn ngữ giữ dạng bản ngữ, không dịch chéo.
  translated.langOptions = ctx.langOptions;
  // Chuỗi người dùng đang gõ không được đi qua từ điển, nếu không một truy vấn
  // trùng chuỗi nguồn tiếng Việt sẽ bị viết lại ngay giữa lúc gõ.
  translated.search = ctx.s.search;
  translated.t = ctx.t;
  return translated;
}
