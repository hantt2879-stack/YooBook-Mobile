import { ACCENT } from "../data/shared.js";
import { LESSONS } from "../data/catalog.js";
import { T_ASSIGNMENTS, T_BLOCKS, T_CLASSES, T_METRICS, T_PLANS, T_STUDENTS, T_SUBMISSIONS } from "../data/teacher.js";
import { ASSIGNMENT_TYPE_LABEL, ROSTER } from "../data/coursework.js";
import { assignmentStats, averageScore, isRubricWeightValid, rubricMax, rubricTotal } from "./gradebook.js";
import { SUBMISSION_STATUS as S, SUBMISSION_TINT, applyGrade, applyReturn } from "./submissionState.js";
import { fmtDateTime } from "./formatDate.js";

const GRADING_FILTER = {
  pending: (x) => [S.SUBMITTED, S.LATE_SUBMITTED, S.RESUBMITTED].includes(x.status),
  graded: (x) => x.status === S.GRADED,
  late: (x) => x.isLate,
  returned: (x) => x.status === S.RETURNED,
};

// "1 tuần" -> hạn nộp tuyệt đối tính từ nowIso của prototype.
const DUE_DAYS = { "3 ngày": 3, "1 tuần": 7, "2 tuần": 14 };
function addDaysIso(iso, days) {
  const d = new Date(`${iso}Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return `${d.toISOString().slice(0, 10)}T23:59:00`;
}

export const INITIAL_TEACHER = {
  tExploreView: "grid", tClassIdx: 0, tClassTab: "students",
  gradingFilter: "pending",
  gradeDraftScores: {},
  gradeDraftFeedback: "",
  gradeReturnConfirmOpen: false,
  tClassesTab: "submitted",
  classAccessMode: "code",
  classPerms: { post: false, comment: true, upload: true },
  tExploreSaved: [], tExploreAdded: [], planTab: "recent",
  tExploreSection: "explore", tLibTab: "saved", tRecentIds: [],
  tItemPlanName: {}, tItemAssignedClasses: {},
  tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null },
  createdClasses: [], createdAssignments: [], createdLectures: [],
  ccName: "", ccSubject: "Sinh học", ccGrade: "Lớp 8",
  caTitle: "",
  caInstructions: "",
  caType: 5,
  caCls: "",
  caDue: "1 tuần",
  caAllowLate: true,
  caMaxAttempts: 2,
  caMaxScore: 10,
  caPassingScore: 5,
  caRubricId: null,
  caTargetMode: "all",
  caTargetIds: [],
  clTitle: "", clCls: "", clKind: "Video",
  tPlanIdx: 0,
  rubricDraft: {
    name: "Rubric mới",
    criteria: [
      { code: "C1", name: "", maxPoints: 5, weightPercent: 50 },
      { code: "C2", name: "", maxPoints: 5, weightPercent: 50 },
    ],
  },
  annTitle: "",
  annBody: "",
  annPinned: false,
};

// Seed ids for the Teacher Library's "Liked" and "Purchased" facets — these
// have no in-app action that produces them (Explore only exposes Save/Add),
// so they're mocked the same way Student libSets mocks purchased/completed.
const TEACHER_LIKED_IDS = [3, 9, 14];
const TEACHER_PURCHASED_IDS = [2, 7, 13];

// The teacher "Khám phá" tab reuses the exact same explore/filter state
// fields (exploreCat, fLevel, fGrade, fTypes, fTopic, exploreSort, search)
// that useStudentLogic owns — a prototype simplification that predates this
// hook split. Duplicated here rather than importing across hooks.
export function useTeacherLogic(ctx) {
  const { s, setState, t, go, push, pop, resetTo } = ctx;

  const applyFilters = (list) => list.filter((l) => {
    if (s.exploreCat !== "Tất cả" && l.subject !== s.exploreCat) return false;
    if (s.fLevel !== "Tất cả" && l.level !== s.fLevel) return false;
    if (s.fGrade !== "Tất cả" && l.grade !== s.fGrade) return false;
    if (s.fTypes.length && !s.fTypes.includes(l.type)) return false;
    if (s.fTopic && l.title !== s.fTopic) return false;
    const searchQuery = s.search.trim().toLowerCase();
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

  const tGrid = s.tExploreView === "grid";
  const draft = s.rubricDraft;

  // Bài tập đang chấm: lấy từ params, mặc định là bài tập đầu tiên còn bài chờ chấm.
  const gradingAssignmentId =
    ctx.params.assignmentId ??
    ctx.s.assignments.find((a) =>
      ctx.s.submissions.some((sub) => sub.assignmentId === a.id && GRADING_FILTER.pending(sub))
    )?.id ??
    ctx.s.assignments[0]?.id;
  const gradingAssignment = ctx.s.assignments.find((a) => a.id === gradingAssignmentId) ?? null;
  const gradingSubs = ctx.s.submissions.filter((x) => x.assignmentId === gradingAssignmentId);
  const gradingRubric = gradingAssignment
    ? ctx.s.rubrics.find((r) => r.id === gradingAssignment.rubricId)
    : null;
  const gradeSub = ctx.s.submissions.find((x) => x.id === ctx.params.submissionId) ?? null;
  const studentOf = (id) => ROSTER.find((r) => r.id === id) ?? { name: `Học sinh #${id}`, initials: "HS", tint: "#8ba0ae" };
  // Bảng điểm lớp: mỗi bài tập đã xuất bản là một cột, mỗi học sinh trong sổ điểm là một hàng.
  // Chỉ lấy bài tập của lớp classId 1 (lớp duy nhất có trong ROSTER) — màn
  // bảng điểm/thống kê hiện tại là một bảng tổng duy nhất cho giáo viên, chưa
  // có khái niệm chọn lớp, nên lọc cứng theo classId để tránh hiện cột/hàng
  // rỗng cho bài tập của lớp khác (vd. classId 3) mà không học sinh nào trong
  // ROSTER thực sự học.
  const gradebookAssignments = ctx.s.assignments.filter((a) => a.isPublished && a.classId === 1);
  const draftScores = ctx.s.gradeDraftScores;
  const draftCriteria = (gradingRubric?.criteria ?? []).map((c) => ({
    code: c.code,
    name: c.name,
    max: c.maxPoints,
    earned: draftScores[c.code] ?? 0,
  }));

  // Bảng tin lớp: đọc từ state dùng chung — cùng nguồn dữ liệu useStudentLogic
  // đọc, nên đăng thông báo hiện ngay ở phía học sinh trong cùng phiên.
  // Sắp xếp/định dạng dùng chung với classFeed qua ctx.announcementFeed
  // (useAppState.js).
  const teacherFeed = ctx.announcementFeed(ctx.s.announcements);

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

  return {
    isTOverview: ctx.screen === "tOverview", isTClasses: ctx.screen === "tClasses", isTClass: ctx.screen === "tClass",
    isTGrading: ctx.screen === "tGrading", isTGrade: ctx.screen === "tGrade",
    isTGradebook: ctx.screen === "tGradebook",
    toTGradebook: () => push("tGradebook"),
    isTAssignmentStats: ctx.screen === "tAssignmentStats",
    isTClassProgress: ctx.screen === "tClassProgress",
    toTAssignmentStats: () => ctx.push("tAssignmentStats"),
    toTClassProgress: () => ctx.push("tClassProgress"),
    statsRows: gradebookAssignments.map((a) => {
      const subs = ctx.s.submissions.filter((x) => x.assignmentId === a.id);
      const st = assignmentStats(subs, a.totalStudents);
      return {
        assignmentId: a.id,
        title: a.title,
        submittedLabel: `${st.submittedCount}/${a.totalStudents}`,
        gradedLabel: `${st.gradedCount}`,
        completionPct: `${st.completionRate}%`,
        averageLabel: st.averageScore === null ? "–" : String(st.averageScore),
        rangeLabel: st.minScore === null ? "" : `${st.minScore} – ${st.maxScore}`,
        onClick: () => ctx.push("tGrading", { assignmentId: a.id }),
      };
    }),
    classProgressSummary: (() => {
      const all = ctx.s.submissions;
      const avg = averageScore(all);
      const activeIds = new Set(all.map((x) => x.studentId));
      return [
        { label: "Sĩ số", value: String(ROSTER.length) },
        { label: "Đang hoạt động", value: String(activeIds.size) },
        { label: "Điểm TB lớp", value: avg === null ? "–" : String(avg) },
      ];
    })(),
    classProgressStudents: ROSTER.map((st) => {
      const mySubs = ctx.s.submissions.filter((x) => x.studentId === st.id);
      const avg = averageScore(mySubs);
      return {
        studentId: st.id,
        name: st.name,
        initials: st.initials,
        tint: st.tint,
        submittedLabel: `${mySubs.length}/${gradebookAssignments.length} bài đã nộp`,
        averageLabel: avg === null ? "–" : String(avg),
      };
    }),
    gradebookColumns: gradebookAssignments.map((a) => ({
      assignmentId: a.id,
      // Nhãn cột phải rất ngắn vì bảng cuộn ngang trên màn hình hẹp.
      shortTitle: a.title.length > 14 ? `${a.title.slice(0, 13)}…` : a.title,
      maxScore: a.maxScore,
    })),
    gradebookRows: ROSTER.map((st) => {
      const mySubs = ctx.s.submissions.filter((x) => x.studentId === st.id);
      const cells = gradebookAssignments.map((a) => {
        const sub = mySubs.find((x) => x.assignmentId === a.id);
        const status = sub ? sub.status : S.NOT_STARTED;
        const tint = SUBMISSION_TINT[status];
        return {
          assignmentId: a.id,
          label: typeof sub?.finalScore === "number" ? String(sub.finalScore) : "–",
          bg: tint.bg,
          color: tint.color,
          onClick: sub
            ? () =>
                setState({
                  gradeDraftScores: { ...sub.criteriaScores },
                  gradeDraftFeedback: sub.feedback ?? "",
                }) || push("tGrade", { assignmentId: a.id, submissionId: sub.id })
            : undefined,
        };
      });
      const avg = averageScore(mySubs);
      return {
        studentId: st.id,
        studentName: st.name,
        initials: st.initials,
        tint: st.tint,
        cells,
        averageLabel: avg === null ? "–" : String(avg),
      };
    }),
    gradebookClassAverageLabel: (() => {
      const avg = averageScore(ctx.s.submissions);
      return avg === null ? "–" : String(avg);
    })(),
    isTPlans: ctx.screen === "tPlans", isTPlan: ctx.screen === "tPlan",
    isTExplore: ctx.screen === "tExplore",
    isTCreateClass: ctx.screen === "tCreateClass",
    isTCreateAssignment: ctx.screen === "tCreateAssignment",
    isTCreateLecture: ctx.screen === "tCreateLecture",
    isTRubricEditor: ctx.screen === "tRubricEditor",
    toTRubricEditor: () => push("tRubricEditor"),
    rubricDraft: draft,
    rubricWeightTotal: draft.criteria.reduce((sum, c) => sum + (c.weightPercent || 0), 0),
    rubricMaxTotal: rubricMax(draft.criteria),
    rubricValid: isRubricWeightValid(draft.criteria) && draft.criteria.every((c) => c.name.trim()),
    setRubricName: (name) => setState((prev) => ({ rubricDraft: { ...prev.rubricDraft, name } })),
    setCriterion: (index, field, value) =>
      setState((prev) => ({
        rubricDraft: {
          ...prev.rubricDraft,
          criteria: prev.rubricDraft.criteria.map((c, i) =>
            i === index ? { ...c, [field]: field === "name" ? value : Number(value) || 0 } : c
          ),
        },
      })),
    addCriterion: () =>
      setState((prev) => {
        // Dựa trên số lớn nhất trong các mã hiện có, không dựa trên độ dài mảng —
        // tránh trùng mã sau khi xoá một tiêu chí rồi thêm mới (vd. [C1,C2] xoá
        // C1 còn [C2], thêm mới theo độ dài sẽ ra lại "C2" và trùng với tiêu chí
        // còn lại, khiến hai tiêu chí dùng chung một điểm khi chấm bài).
        const maxNum = prev.rubricDraft.criteria.reduce((max, c) => {
          const n = parseInt(String(c.code).replace(/^C/, ""), 10);
          return Number.isFinite(n) && n > max ? n : max;
        }, 0);
        return {
          rubricDraft: {
            ...prev.rubricDraft,
            criteria: [
              ...prev.rubricDraft.criteria,
              { code: `C${maxNum + 1}`, name: "", maxPoints: 2, weightPercent: 0 },
            ],
          },
        };
      }),
    removeCriterion: (index) =>
      setState((prev) => ({
        rubricDraft: {
          ...prev.rubricDraft,
          criteria: prev.rubricDraft.criteria.filter((_, i) => i !== index),
        },
      })),
    saveRubric: () => {
      const id = Math.max(0, ...s.rubrics.map((r) => r.id)) + 1;
      ctx.addRubric({ id, name: draft.name, criteria: draft.criteria });
      // Bài tập đang soạn dở nhận luôn rubric vừa tạo, tránh bắt giáo viên chọn lại.
      setState({ caRubricId: id });
      pop();
    },

    teacherName: "Phạm Thu Trang",
    tMetrics: T_METRICS,
    tClasses: T_CLASSES.map((c, i) => ({ ...c, tintBg: c.tint, onClick: () => { setState({ tClassIdx: i, tClassTab: "feed" }); push("tClass"); } }))
      .concat(s.createdClasses.map((c) => ({ ...c, tintBg: c.tint, onClick: () => {} }))),
    tClassesCountLabel: `${T_CLASSES.length + s.createdClasses.length} lớp đang hoạt động · ${128 + s.createdClasses.length * 0} học sinh`,
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
      setState((prev) => ({ createdClasses: [...prev.createdClasses, newClass] }));
      pop();
    },

    toTCreateAssignment: () => { setState({ caCls: s.caCls || T_CLASSES.concat(s.createdClasses)[0].name }); push("tCreateAssignment"); },
    toTCreateAssignmentForClass: () => { setState({ caCls: T_CLASSES[s.tClassIdx].name }); push("tCreateAssignment"); },
    toTCreateLecture: () => { setState({ clCls: s.clCls || T_CLASSES.concat(s.createdClasses)[0].name }); push("tCreateLecture"); },
    caTitle: s.caTitle,
    caInstructions: s.caInstructions,
    caMaxAttempts: String(s.caMaxAttempts),
    caMaxScore: String(s.caMaxScore),
    caPassingScore: String(s.caPassingScore),
    caAllowLate: s.caAllowLate,
    toggleCaAllowLate: () => setState({ caAllowLate: !s.caAllowLate }),
    setCaField: (field, value) =>
      setState({
        [field]: ["caMaxAttempts", "caMaxScore", "caPassingScore"].includes(field)
          ? Number(value) || 0
          : value,
      }),
    caTypeOptions: Object.entries(ASSIGNMENT_TYPE_LABEL).map(([value, label]) => ({
      label,
      selected: s.caType === Number(value),
      onClick: () => setState({ caType: Number(value) }),
    })),
    caClasses: T_CLASSES.concat(s.createdClasses).map((c) => ({ label: c.name, selected: s.caCls === c.name, onClick: () => setState({ caCls: c.name }) })),
    caDueOptions: ["3 ngày", "1 tuần", "2 tuần"].map((label) => ({ label, selected: s.caDue === label, onClick: () => setState({ caDue: label }) })),
    caRubricOptions: [{ id: null, name: "Không dùng tiêu chí" }, ...s.rubrics].map((r) => ({
      label: r.name,
      selected: s.caRubricId === r.id,
      onClick: () => setState({ caRubricId: r.id }),
    })),
    caTargetMode: s.caTargetMode,
    setCaTargetMode: (mode) => setState({ caTargetMode: mode }),
    caTargets: ROSTER.map((st) => ({
      id: st.id,
      name: st.name,
      selected: s.caTargetIds.includes(st.id),
      onClick: () =>
        setState((prev) => ({
          caTargetIds: prev.caTargetIds.includes(st.id)
            ? prev.caTargetIds.filter((x) => x !== st.id)
            : [...prev.caTargetIds, st.id],
        })),
    })),
    caValid:
      s.caTitle.trim().length > 0 &&
      s.caCls.length > 0 &&
      (s.caTargetMode === "all" || s.caTargetIds.length > 0),
    createAssignment: () => {
      const classesList = T_CLASSES.concat(s.createdClasses);
      const cls = classesList.find((c) => c.name === s.caCls);
      const id = Math.max(0, ...s.assignments.map((a) => a.id)) + 1;
      ctx.addAssignment({
        id,
        classId: cls?.id ?? 1,
        className: s.caCls,
        title: s.caTitle,
        type: s.caType,
        instructions: s.caInstructions,
        checklist: [],
        openAtIso: s.nowIso,
        dueAtIso: addDaysIso(s.nowIso, DUE_DAYS[s.caDue] ?? 7),
        allowLate: s.caAllowLate,
        maxAttempts: s.caMaxAttempts,
        maxScore: s.caMaxScore,
        passingScore: s.caPassingScore,
        rubricId: s.caRubricId,
        targetStudentIds: s.caTargetMode === "all" ? null : s.caTargetIds,
        attachments: [],
        isPublished: true,
        totalStudents: Number(cls?.students ?? 32),
      });
      setState({ caTitle: "", caInstructions: "", caTargetIds: [], caTargetMode: "all" });
      resetTo("tClasses");
    },
    clClasses: T_CLASSES.concat(s.createdClasses).map((c) => ({ label: c.name, selected: s.clCls === c.name, onClick: () => setState({ clCls: c.name }) })),
    clKinds: ["Video", "Mô hình 3D", "Bài đọc", "Trắc nghiệm"].map((label) => ({ label, selected: s.clKind === label, onClick: () => setState({ clKind: label }) })),
    clPreviewTitle: `Bài giảng mới ${T_BLOCKS.length + s.createdLectures.length + 1}`,
    createLecture: () => {
      const kind = s.clKind || "Video";
      const tints = { "Video": "#00aaab", "Mô hình 3D": "#138cd2", "Bài đọc": "#22c55e", "Trắc nghiệm": "#f59e0b" };
      const newLecture = { kind, title: `Bài giảng mới ${T_BLOCKS.length + s.createdLectures.length + 1}`, dur: "5:00", tint: tints[kind], isNew: true };
      setState((prev) => ({ createdLectures: [...prev.createdLectures, newLecture] }));
      pop();
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
    toTClasses: () => go("tClasses"), toTPlans: () => go("tPlans"),
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
    tNews: teacherFeed,
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
    // Bảng tóm tắt chấm điểm dùng lại ở tab "Chấm bài" trong Chi tiết lớp — dữ
    // liệu minh hoạ cố định, tách biệt với luồng chấm bài thật (isTGrading/isTGrade
    // bên dưới) vốn đọc trực tiếp từ ctx.s.submissions.
    tGradeSummary: [
      { label: "Chờ chấm", value: "12", bg: "#eaf6f8", color: "#00708f" },
      { label: "Đã chấm", value: "86", bg: "#f0fdf4", color: "#15803d" },
      { label: "Nộp muộn", value: "4", bg: "#fff5e6", color: "#b45309" },
    ],
    tSubmissions: T_SUBMISSIONS.map((x) => ({ ...x, onClick: () => go("tGrading") })),
    toTGrading: () => push("tGrading", { assignmentId: gradingAssignmentId }),
    gradingAssignmentTitle: gradingAssignment?.title ?? "",
    gradingProgressLabel: `${gradingSubs.filter((x) => x.status === S.GRADED).length}/${gradingSubs.length} ${t("bài đã chấm")}`,
    gradingFilterTabs: [
      ["pending", "Chờ chấm"],
      ["graded", "Đã chấm"],
      ["late", "Nộp muộn"],
      ["returned", "Đã trả"],
    ].map(([key, label]) => ({
      label,
      active: s.gradingFilter === key,
      onClick: () => setState({ gradingFilter: key }),
    })),
    gradingRows: gradingSubs.filter(GRADING_FILTER[s.gradingFilter]).map((sub) => {
      const st = studentOf(sub.studentId);
      return {
        id: sub.id,
        studentName: st.name,
        initials: st.initials,
        tint: st.tint,
        submittedLabel: fmtDateTime(sub.submittedAtIso),
        status: sub.status,
        attemptLabel: `Lần ${sub.attemptNumber}`,
        scoreLabel: typeof sub.finalScore === "number" ? String(sub.finalScore) : "",
        onClick: () =>
          setState({
            gradeDraftScores: { ...sub.criteriaScores },
            gradeDraftFeedback: sub.feedback ?? "",
          }) || push("tGrade", { assignmentId: gradingAssignmentId, submissionId: sub.id }),
      };
    }),
    gradeTarget: gradeSub && {
      submissionId: gradeSub.id,
      studentName: studentOf(gradeSub.studentId).name,
      initials: studentOf(gradeSub.studentId).initials,
      tint: studentOf(gradeSub.studentId).tint,
      submittedLabel: fmtDateTime(gradeSub.submittedAtIso),
      isLate: !!gradeSub.isLate,
      attemptNumber: gradeSub.attemptNumber,
      answerText: gradeSub.answerText ?? "",
      attachments: gradeSub.attachments ?? [],
      assignmentTitle: gradingAssignment?.title ?? "",
      maxScore: String(gradingAssignment?.maxScore ?? 10),
    },
    gradeCriteria: draftCriteria.map((c) => ({
      ...c,
      onChange: (value) =>
        setState((prev) => ({
          gradeDraftScores: { ...prev.gradeDraftScores, [c.code]: Math.min(c.max, Number(value) || 0) },
        })),
    })),
    gradeTotalLabel: draftCriteria.length
      ? `${rubricTotal(draftCriteria.map((c) => ({ earnedPoints: c.earned })))} / ${gradingAssignment?.maxScore ?? 10}`
      : "",
    gradeFeedback: s.gradeDraftFeedback,
    setGradeFeedback: (text) => setState({ gradeDraftFeedback: text }),
    gradeReturnConfirmOpen: s.gradeReturnConfirmOpen,
    openReturnConfirm: () => setState({ gradeReturnConfirmOpen: true }),
    closeReturnConfirm: () => setState({ gradeReturnConfirmOpen: false }),
    saveGrade: () => {
      if (!gradeSub) return;
      const total = rubricTotal(draftCriteria.map((c) => ({ earnedPoints: c.earned })));
      ctx.upsertSubmission({
        ...applyGrade(gradeSub, {
          finalScore: total,
          feedback: s.gradeDraftFeedback,
          gradedAtIso: s.nowIso,
        }),
        criteriaScores: { ...draftScores },
      });
      pop();
    },
    returnSubmission: () => {
      if (!gradeSub) return;
      ctx.upsertSubmission(
        applyReturn(gradeSub, {
          feedback: s.gradeDraftFeedback,
          returnedAtIso: s.nowIso,
        })
      );
      setState({ gradeReturnConfirmOpen: false });
      pop();
    },
    tBlocks: T_BLOCKS.concat(s.createdLectures),
    planTabs: [["recent", "Gần đây"], ["draft", "Bản nháp"], ["published", "Đã xuất bản"]].map(([k, label]) => {
      const on = s.planTab === k;
      return { key: k, label, bg: on ? "#00aaab" : "transparent", color: on ? "#fff" : "#455771", weight: on ? 600 : 400, onClick: () => setState({ planTab: k }) };
    }),
    tPlans: (() => {
      const all = T_PLANS.map((p, i) => ({ ...p, onClick: () => { setState({ tPlanIdx: i }); push("tPlan"); } }));
      if (s.planTab === "draft") return all.filter((p) => p.status === "Bản nháp");
      if (s.planTab === "published") return all.filter((p) => p.status === "Đã xuất bản");
      return all;
    })(),
    tPlanTitle: T_PLANS[s.tPlanIdx].title,
    tPlanSub: T_PLANS[s.tPlanIdx].sub,
    tPlanStatus: T_PLANS[s.tPlanIdx].status,

    tExploreItems: sortLessons(applyFilters(LESSONS)).map((l) => ({
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
      { label: "Tạo bài tập", iconPath: "M8.5 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1.5M8.5 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM9 14l2.2 2.2L15.5 12", bg: "#eaf6f8", color: ACCENT, onClick: () => { setState({ caCls: s.caCls || T_CLASSES.concat(s.createdClasses)[0].name }); push("tCreateAssignment"); } },
      { label: "Tạo bài giảng", iconPath: "M4 6h16v10H4zM8 20h8M12 16v4", bg: "#fdeef5", color: "#b13a75", onClick: () => { setState({ clCls: s.clCls || T_CLASSES.concat(s.createdClasses)[0].name }); push("tCreateLecture"); } },
      { label: "Chấm bài", iconPath: "M9 14l2.2 2.2L15.5 12M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z", bg: "#e7f2fb", color: "#0b6aa3", onClick: () => push("tGrading", {}) },
      { label: "Bảng điểm", iconPath: "M4 20V10.5M10 20V4.5M16 20v-7M21.5 20h-19", bg: "#f0fdf4", color: "#15803d", onClick: () => push("tGradebook") },
      { label: "Thống kê bài tập", iconPath: "M5 19V9M12 19V5M19 19v-6", bg: "#fff5e6", color: "#b45309", onClick: () => push("tAssignmentStats") },
      { label: "Tiến độ lớp", iconPath: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1", bg: "#eaf6f8", color: "#00708f", onClick: () => push("tClassProgress") },
      { label: "Đăng thông báo", iconPath: "M4 9.5h4l7-4.5v14l-7-4.5H4zM18 9a3.4 3.4 0 0 1 0 6", bg: "#fdeef5", color: "#b13a75", onClick: () => push("tAnnouncementCreate") },
    ],

    isTAnnouncementCreate: ctx.screen === "tAnnouncementCreate",
    annTitle: ctx.s.annTitle,
    annBody: ctx.s.annBody,
    annPinned: ctx.s.annPinned,
    setAnnField: (field, value) => ctx.setState({ [field]: value }),
    toggleAnnPinned: () => ctx.setState({ annPinned: !ctx.s.annPinned }),
    annValid: ctx.s.annTitle.trim().length > 0 && ctx.s.annBody.trim().length > 0,
    postAnnouncement: () => {
      const id = Math.max(0, ...ctx.s.announcements.map((n) => n.id)) + 1;
      ctx.setState((prev) => ({
        announcements: [
          ...prev.announcements,
          { id, classId: 1, title: prev.annTitle, body: prev.annBody, createdAtIso: prev.nowIso, isPinned: prev.annPinned },
        ],
        annTitle: "",
        annBody: "",
        annPinned: false,
      }));
      ctx.pop();
    },
  };
}
