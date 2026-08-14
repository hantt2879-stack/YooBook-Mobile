import { ACCENT, BORDER, DEEP } from "../data/shared.js";
import { LESSONS } from "../data/catalog.js";
import { T_ASSIGNMENTS, T_BLOCKS, T_CLASSES, T_METRICS, T_PLANS, T_STUDENTS, T_SUBMISSIONS } from "../data/teacher.js";

export const INITIAL_TEACHER = {
  tExploreView: "grid", tClassIdx: 0, tClassTab: "students", gradeIdx: 0, gradeScore: "8.5", graded: false,
  tClassesTab: "submitted",
  classAccessMode: "code",
  classPerms: { post: false, comment: true, upload: true },
  tExploreSaved: [], tExploreAdded: [], planTab: "recent",
  tExploreSection: "explore", tLibTab: "saved", tRecentIds: [],
  tItemPlanName: {}, tItemAssignedClasses: {},
  tAssignSheet: { open: false, mode: null, itemId: null, selectedId: null },
  createdClasses: [], createdAssignments: [], createdLectures: [],
  ccName: "", ccSubject: "Sinh học", ccGrade: "Lớp 8",
  caTitle: "", caCls: "", caDue: "1 tuần", clTitle: "", clCls: "", clKind: "Video",
  tPlanIdx: 0,
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
  const { s, setState, go, push, pop, resetTo } = ctx;

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
    isTPlans: ctx.screen === "tPlans", isTPlan: ctx.screen === "tPlan",
    isTExplore: ctx.screen === "tExplore",
    isTCreateClass: ctx.screen === "tCreateClass",
    isTCreateAssignment: ctx.screen === "tCreateAssignment",
    isTCreateLecture: ctx.screen === "tCreateLecture",

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
    caClasses: T_CLASSES.concat(s.createdClasses).map((c) => ({ label: c.name, selected: s.caCls === c.name, onClick: () => setState({ caCls: c.name }) })),
    caDueOptions: ["3 ngày", "1 tuần", "2 tuần"].map((label) => ({ label, selected: s.caDue === label, onClick: () => setState({ caDue: label }) })),
    caPreviewTitle: `Bài tập tuần ${20 + T_ASSIGNMENTS.length + s.createdAssignments.length + 1}: Ôn tập`,
    createAssignment: () => {
      const cls = s.caCls || T_CLASSES[0].name;
      const total = T_CLASSES.concat(s.createdClasses).find((c) => c.name === cls);
      const title = `Bài tập tuần ${20 + T_ASSIGNMENTS.length + s.createdAssignments.length + 1}: Ôn tập`;
      const newAssignment = { title, cls, due: `hạn trong ${s.caDue}`, submitted: `0/${total ? total.students : 30}`, pending: "0 bài chờ chấm", isNew: true };
      setState((prev) => ({ createdAssignments: [...prev.createdAssignments, newAssignment], tClassesTab: "upcoming" }));
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
    tSubmissions: T_SUBMISSIONS.map((x, i) => ({ ...x, onClick: () => { setState({ gradeIdx: i, graded: false }); push("tGrade"); } })),
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
    ],
  };
}
