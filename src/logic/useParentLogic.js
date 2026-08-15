import { ACCENT, BORDER, DEEP } from "../data/shared.js";
import { LESSONS } from "../data/catalog.js";
import { P_CHILDREN, P_CONVOS, P_REPORT, P_THREAD } from "../data/parent.js";

export const INITIAL_PARENT = {
  childIdx: 0, sent: false,
  safety: { social: true, leaderboard: true, ai: true, noti: true, limit: "60" },
};

// Same content/shape as useStudentLogic's weekActivity — the parent's "Hoạt
// động gần đây" feed mirrors the student's own activity list. Duplicated
// (rather than imported across hooks) since it's a small literal, not state.
const weekActivityList = [
  { title: "Cấu tạo tế bào thực vật", subject: "Sinh học", when: "Thứ 2 · 12/05", duration: "32 phút", status: "Hoàn thành", tint: LESSONS[0].tint },
  { title: "Ba định luật Newton", subject: "Vật lý", when: "Thứ 3 · 13/05", duration: "28 phút", status: "Hoàn thành", tint: LESSONS[4].tint },
  { title: "Thí nghiệm điện phân dung dịch CuSO₄", subject: "Hóa học", when: "Thứ 5 · 15/05", duration: "24 phút", status: "Đang học", tint: LESSONS[1].tint },
  { title: "Chiến dịch Điện Biên Phủ", subject: "Lịch sử", when: "Thứ 6 · 16/05", duration: "22 phút", status: "Hoàn thành", tint: LESSONS[3].tint },
].map((a) => ({ ...a, done: a.status === "Hoàn thành" }));

export function useParentLogic(ctx) {
  const { s, setState, go } = ctx;

  return {
    isPOverview: ctx.screen === "pOverview", isPChild: ctx.screen === "pChild", isPReport: ctx.screen === "pReport",
    isPMessages: ctx.screen === "pMessages", isPThread: ctx.screen === "pThread", isPSafety: ctx.screen === "pSafety",

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
    childActivity: weekActivityList,
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
  };
}
