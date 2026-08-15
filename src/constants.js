// Lớp tái xuất giữ tương thích ngược: dữ liệu mock đã tách theo miền sang
// src/data/*, nhưng các màn cũ vẫn import từ đây. Tệp mới nên import thẳng
// từ src/data/<miền>.js.
export { ACCENT, BORDER, DEEP, INK, MUTED, NOTI, TAB_ICONS } from "./data/shared.js";
export { CATS, EXAM, LESSONS, LESSON_TYPES, LEVELS, QUICK, QUICK_CORRECT, STEPS } from "./data/catalog.js";
export { S_ASSIGNMENTS } from "./data/student.js";
export { T_ASSIGNMENTS, T_BLOCKS, T_CLASSES, T_METRICS, T_PLANS, T_STUDENTS, T_SUBMISSIONS } from "./data/teacher.js";
export { P_CHILDREN, P_CONVOS, P_REPORT, P_THREAD } from "./data/parent.js";
