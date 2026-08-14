# Kế hoạch triển khai: Nền tảng + Vòng lặp dạy–học lõi (Giai đoạn 0 & 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dựng nền kiến trúc (ngăn xếp điều hướng, tách dữ liệu/logic, component dùng chung) rồi bổ sung vòng lặp dạy–học lõi cho prototype YooBook Mobile: giáo viên giao bài có rubric → học sinh nộp bài kèm tệp → giáo viên chấm theo rubric hoặc trả bài → học sinh nộp lại → điểm hiện đúng ở bảng điểm hai phía.

**Architecture:** Prototype giữ nguyên mô hình một state machine dùng chung cho cả ba vai trò (đây là điểm mạnh: hành động của giáo viên nhìn thấy ngay ở phía học sinh trong cùng phiên). Thay đổi nền: (1) `state.screen` phẳng → ngăn xếp `{screen, params}` trong module thuần `src/logic/navStack.js`; (2) `src/constants.js` tách thành `src/data/*` theo miền; (3) `src/useAppLogic.js` tách thành các hook miền trong `src/logic/*`, `useAppLogic.js` chỉ còn gộp kết quả và chạy dịch; (4) logic nghiệp vụ thuần (điều hướng, trạng thái bài nộp, tính điểm) tách ra module không phụ thuộc React để kiểm thử bằng Vitest.

**Tech Stack:** Vite 5, React 18, JavaScript thuần (không TypeScript), CSS inline qua helper `css()`, Vitest (mới thêm, chỉ cho `src/logic/`). Không thêm router, không thêm state library, không thêm UI library.

## Global Constraints

- Thư mục làm việc: `E:\Yootek\YooBook  Mobile\YooBook-Mobile` (tên thư mục cha có **hai dấu cách**, luôn bọc đường dẫn trong dấu nháy).
- Nhánh làm việc: `docs/mobile-lms-design` đã tồn tại và đang được checkout. Không commit lên `main`.
- Component viết bằng `function Tên() {}` + `export default` — đúng phong cách hiện có của repo mobile (khác quy ước của repo web, không áp quy ước web sang đây).
- Mọi chuỗi hiển thị bọc trong `v.t(\`...\`)`; bản dịch tiếng Anh thêm vào shard tương ứng trong `src/i18n/shards/`.
- Không thêm mã màu hex mới trực tiếp trong JSX. Màu mới khai báo trong `src/data/shared.js` rồi import.
- Không thêm dependency runtime mới. Chỉ được thêm `vitest` vào `devDependencies`.
- Không sửa hành vi của các màn đang chạy tốt trừ khi task nói rõ. Giao diện object `v` với các màn cũ phải giữ nguyên tên khoá.
- Mỗi task kết thúc bằng đúng một commit. Thông điệp commit theo Conventional Commits, tiếng Việt phần mô tả.
- `npm test` phải xanh trước mỗi commit chạm `src/logic/`.

---

## Cấu trúc tệp sau khi hoàn thành

| Tệp | Trách nhiệm |
| --- | --- |
| `src/logic/navStack.js` | Ngăn xếp điều hướng thuần — không import React |
| `src/logic/navStack.test.js` | Test cho trên |
| `src/logic/submissionState.js` | 7 trạng thái bài nộp + quy tắc được nộp/không được nộp |
| `src/logic/submissionState.test.js` | Test cho trên |
| `src/logic/gradebook.js` | Cộng điểm rubric, điểm TB, tỉ lệ hoàn thành, thống kê bài tập |
| `src/logic/gradebook.test.js` | Test cho trên |
| `src/logic/useAppState.js` | State gốc + `setState` + điều hướng + vai trò + ngôn ngữ |
| `src/logic/useStudentLogic.js` | Mảnh `v` của học sinh |
| `src/logic/useTeacherLogic.js` | Mảnh `v` của giáo viên |
| `src/logic/useParentLogic.js` | Mảnh `v` của phụ huynh |
| `src/logic/useAccountLogic.js` | Mảnh `v` của hồ sơ/ví/gói/thiết bị/bảo mật/trợ giúp |
| `src/useAppLogic.js` | Chỉ còn: gọi 5 hook trên, gộp, `deepT`, trả `v` |
| `src/data/catalog.js` | `LESSONS`, `CATS`, `LESSON_TYPES`, `LEVELS`, `STEPS`, `QUICK`, `EXAM` |
| `src/data/shared.js` | Màu, `TAB_ICONS`, `NOTI`, bảng tint trạng thái |
| `src/data/student.js` | Lớp đang học, bài tập, bài nộp của học sinh |
| `src/data/teacher.js` | Lớp dạy, giáo án, bài tập, bài chờ chấm, rubric, học sinh |
| `src/data/parent.js` | Con, hội thoại, báo cáo, an toàn |
| `src/data/coursework.js` | **Mới** — nguồn dữ liệu chung cho bài tập + bài nộp + rubric mà cả 3 vai trò cùng đọc |
| `src/screens/ui/Sheet.jsx` | Sheet đáy dùng chung |
| `src/screens/ui/StatusChip.jsx` | Nhãn trạng thái |
| `src/screens/ui/EmptyState.jsx` | Trạng thái rỗng |
| `src/screens/ui/SegmentedTabs.jsx` | Tab đoạn |
| `src/screens/ui/ConfirmSheet.jsx` | Sheet xác nhận |
| `src/screens/ui/FilePicker.jsx` | Chọn/hiển thị tệp đính kèm giả lập |
| `src/screens/StudentWorkScreens.jsx` | **Mới** — `assignmentDetail`, `assignmentSubmit`, `submissionResult`, `submissionHistory` |
| `src/screens/TeacherGradingScreens.jsx` | **Mới** — `tGrading`, `tGrade`, `tRubricEditor`, `tGradebook`, `tAssignmentStats`, `tClassProgress` |

---

## Task 1: Ngăn xếp điều hướng thuần + hạ tầng test

**Files:**
- Create: `src/logic/navStack.js`
- Create: `src/logic/navStack.test.js`
- Modify: `package.json`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: không có (task đầu tiên)
- Produces: `createNav(screen, params?) -> Nav`, `currentScreen(nav) -> string`, `currentParams(nav) -> object`, `canPop(nav) -> boolean`, `push(nav, screen, params?) -> Nav`, `replace(nav, screen, params?) -> Nav`, `pop(nav) -> Nav`, `resetTo(screen, params?) -> Nav`. Kiểu `Nav` là `{ stack: Array<{screen: string, params: object}> }`. Mọi hàm thuần, không đột biến tham số.

- [ ] **Step 1: Cài Vitest và khai báo script test**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm install -D vitest@^2.1.8
```

Sau đó sửa `package.json`, thêm dòng `"test"` vào `scripts` (giữ nguyên các dòng còn lại):

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
```

- [ ] **Step 2: Bật Vitest trong cấu hình Vite**

Ghi đè `vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Chỉ chạy test cho logic thuần trong src/logic — giao diện kiểm chứng
  // bằng checklist bấm tay, không viết test render.
  test: {
    environment: "node",
    include: ["src/logic/**/*.test.js"],
  },
});
```

- [ ] **Step 3: Viết test thất bại cho ngăn xếp điều hướng**

Tạo `src/logic/navStack.test.js`:

```js
import { describe, expect, it } from "vitest";
import { canPop, createNav, currentParams, currentScreen, pop, push, replace, resetTo } from "./navStack.js";

describe("navStack", () => {
  it("khởi tạo với đúng một màn và params rỗng", () => {
    const nav = createNav("home");
    expect(currentScreen(nav)).toBe("home");
    expect(currentParams(nav)).toEqual({});
    expect(canPop(nav)).toBe(false);
  });

  it("push đẩy màn mới kèm params và cho phép quay lại", () => {
    const nav = push(createNav("classwork"), "assignmentDetail", { assignmentId: 7 });
    expect(currentScreen(nav)).toBe("assignmentDetail");
    expect(currentParams(nav)).toEqual({ assignmentId: 7 });
    expect(canPop(nav)).toBe(true);
  });

  it("pop quay lại đúng màn trước và giữ nguyên params của màn đó", () => {
    let nav = createNav("classwork", { tab: "todo" });
    nav = push(nav, "assignmentDetail", { assignmentId: 7 });
    nav = pop(nav);
    expect(currentScreen(nav)).toBe("classwork");
    expect(currentParams(nav)).toEqual({ tab: "todo" });
  });

  it("pop ở màn gốc không làm gì", () => {
    const nav = createNav("home");
    expect(pop(nav)).toEqual(nav);
  });

  it("replace thay màn hiện tại mà không tăng độ sâu", () => {
    let nav = push(createNav("classwork"), "assignmentSubmit", { assignmentId: 7 });
    nav = replace(nav, "submissionResult", { assignmentId: 7 });
    expect(currentScreen(nav)).toBe("submissionResult");
    expect(nav.stack).toHaveLength(2);
    expect(pop(nav).screen ?? currentScreen(pop(nav))).toBe("classwork");
  });

  it("resetTo xoá toàn bộ ngăn xếp", () => {
    let nav = push(push(createNav("home"), "explore"), "detail", { lessonId: 3 });
    nav = resetTo("profile");
    expect(currentScreen(nav)).toBe("profile");
    expect(canPop(nav)).toBe(false);
  });

  it("không đột biến ngăn xếp cũ", () => {
    const nav = createNav("home");
    push(nav, "explore");
    expect(nav.stack).toHaveLength(1);
  });
});
```

- [ ] **Step 4: Chạy test để xác nhận thất bại**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: FAIL với lỗi không phân giải được `./navStack.js`.

- [ ] **Step 5: Viết module ngăn xếp điều hướng**

Tạo `src/logic/navStack.js`:

```js
// Ngăn xếp điều hướng thuần cho prototype: mọi hàm nhận nav cũ, trả nav mới,
// không đột biến và không phụ thuộc React nên kiểm thử được độc lập.
// Thay cho chuỗi phẳng `state.screen` + `go()` trước đây, vốn khiến nút quay
// lại phải hardcode đích và không mang được tham số (assignmentId, classId...).

export function createNav(screen, params = {}) {
  return { stack: [{ screen, params }] };
}

export function current(nav) {
  return nav.stack[nav.stack.length - 1];
}

export function currentScreen(nav) {
  return current(nav).screen;
}

export function currentParams(nav) {
  return current(nav).params;
}

export function canPop(nav) {
  return nav.stack.length > 1;
}

export function push(nav, screen, params = {}) {
  return { stack: [...nav.stack, { screen, params }] };
}

export function replace(nav, screen, params = {}) {
  return { stack: [...nav.stack.slice(0, -1), { screen, params }] };
}

export function pop(nav) {
  return canPop(nav) ? { stack: nav.stack.slice(0, -1) } : nav;
}

export function resetTo(screen, params = {}) {
  return createNav(screen, params);
}
```

- [ ] **Step 6: Chạy test để xác nhận đạt**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: PASS, 7 test.

- [ ] **Step 7: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add package.json package-lock.json vite.config.js src/logic/navStack.js src/logic/navStack.test.js && git commit -m "feat(nav): ngăn xếp điều hướng thuần kèm hạ tầng Vitest"
```

---

## Task 2: Máy trạng thái bài nộp

**Files:**
- Create: `src/logic/submissionState.js`
- Create: `src/logic/submissionState.test.js`

**Interfaces:**
- Consumes: không có
- Produces:
  - `SUBMISSION_STATUS` — object hằng: `NOT_STARTED:0, IN_PROGRESS:1, SUBMITTED:2, LATE_SUBMITTED:3, GRADED:4, RETURNED:5, RESUBMITTED:6`
  - `SUBMISSION_LABEL[status] -> string` (tiếng Việt)
  - `SUBMISSION_TINT[status] -> { bg: string, color: string }`
  - `canSubmit(assignment, submission, nowIso) -> { allowed: boolean, reason: string|null, willBeLate: boolean }` với `reason` thuộc `"notOpen" | "closed" | "noAttemptsLeft" | "alreadyGraded" | null`
  - `applySubmit(submission, assignment, nowIso) -> submission` (bản mới, không đột biến)
  - `applyGrade(submission, { finalScore, feedback, gradedAtIso }) -> submission`
  - `applyReturn(submission, { feedback, returnedAtIso }) -> submission`
  - Hình dạng `assignment`: `{ id, openAtIso, dueAtIso, allowLate, maxAttempts, maxScore }`
  - Hình dạng `submission`: `{ assignmentId, status, attemptNumber, submittedAtIso, isLate, answerText, attachments, finalScore, feedback, gradedAtIso }`

- [ ] **Step 1: Viết test thất bại**

Tạo `src/logic/submissionState.test.js`:

```js
import { describe, expect, it } from "vitest";
import {
  SUBMISSION_STATUS as S,
  applyGrade,
  applyReturn,
  applySubmit,
  canSubmit,
} from "./submissionState.js";

const asg = {
  id: 1,
  openAtIso: "2026-05-10T00:00:00",
  dueAtIso: "2026-05-17T23:59:00",
  allowLate: true,
  maxAttempts: 2,
  maxScore: 10,
};
const fresh = { assignmentId: 1, status: S.NOT_STARTED, attemptNumber: 0, attachments: [] };

describe("canSubmit", () => {
  it("chặn khi chưa tới giờ mở", () => {
    expect(canSubmit(asg, fresh, "2026-05-09T08:00:00")).toEqual({
      allowed: false,
      reason: "notOpen",
      willBeLate: false,
    });
  });

  it("cho nộp trong hạn và không đánh dấu muộn", () => {
    expect(canSubmit(asg, fresh, "2026-05-15T08:00:00")).toEqual({
      allowed: true,
      reason: null,
      willBeLate: false,
    });
  });

  it("cho nộp sau hạn nhưng báo trước là sẽ muộn khi allowLate bật", () => {
    expect(canSubmit(asg, fresh, "2026-05-18T08:00:00")).toEqual({
      allowed: true,
      reason: null,
      willBeLate: true,
    });
  });

  it("chặn sau hạn khi allowLate tắt", () => {
    const strict = { ...asg, allowLate: false };
    expect(canSubmit(strict, fresh, "2026-05-18T08:00:00").reason).toBe("closed");
  });

  it("chặn khi đã dùng hết số lượt", () => {
    const used = { ...fresh, status: S.SUBMITTED, attemptNumber: 2 };
    expect(canSubmit(asg, used, "2026-05-15T08:00:00").reason).toBe("noAttemptsLeft");
  });

  it("chặn khi đã chấm và không bị trả lại", () => {
    const graded = { ...fresh, status: S.GRADED, attemptNumber: 1 };
    expect(canSubmit(asg, graded, "2026-05-15T08:00:00").reason).toBe("alreadyGraded");
  });

  it("cho nộp lại khi giáo viên đã trả bài, kể cả khi đã từng chấm", () => {
    const returned = { ...fresh, status: S.RETURNED, attemptNumber: 1 };
    expect(canSubmit(asg, returned, "2026-05-15T08:00:00").allowed).toBe(true);
  });
});

describe("applySubmit", () => {
  it("lần nộp đầu đúng hạn chuyển sang Đã nộp và tăng số lượt", () => {
    const next = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    expect(next.status).toBe(S.SUBMITTED);
    expect(next.attemptNumber).toBe(1);
    expect(next.isLate).toBe(false);
    expect(next.submittedAtIso).toBe("2026-05-15T08:00:00");
  });

  it("nộp sau hạn chuyển sang Nộp muộn", () => {
    const next = applySubmit(fresh, asg, "2026-05-18T08:00:00");
    expect(next.status).toBe(S.LATE_SUBMITTED);
    expect(next.isLate).toBe(true);
  });

  it("nộp sau khi bị trả bài chuyển sang Đã nộp lại", () => {
    const returned = { ...fresh, status: S.RETURNED, attemptNumber: 1 };
    const next = applySubmit(returned, asg, "2026-05-16T08:00:00");
    expect(next.status).toBe(S.RESUBMITTED);
    expect(next.attemptNumber).toBe(2);
  });

  it("không đột biến bản ghi cũ", () => {
    applySubmit(fresh, asg, "2026-05-15T08:00:00");
    expect(fresh.attemptNumber).toBe(0);
  });
});

describe("applyGrade và applyReturn", () => {
  it("chấm điểm chuyển sang Đã chấm và giữ lại điểm, nhận xét", () => {
    const submitted = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    const graded = applyGrade(submitted, {
      finalScore: 8.5,
      feedback: "Thiếu kết luận",
      gradedAtIso: "2026-05-18T09:00:00",
    });
    expect(graded.status).toBe(S.GRADED);
    expect(graded.finalScore).toBe(8.5);
    expect(graded.feedback).toBe("Thiếu kết luận");
    expect(graded.gradedAtIso).toBe("2026-05-18T09:00:00");
  });

  it("trả bài chuyển sang Trả lại và xoá điểm cũ", () => {
    const submitted = applySubmit(fresh, asg, "2026-05-15T08:00:00");
    const graded = applyGrade(submitted, { finalScore: 4, feedback: "", gradedAtIso: "x" });
    const returned = applyReturn(graded, {
      feedback: "Làm lại phần pha tối",
      returnedAtIso: "2026-05-18T10:00:00",
    });
    expect(returned.status).toBe(S.RETURNED);
    expect(returned.finalScore).toBeNull();
    expect(returned.feedback).toBe("Làm lại phần pha tối");
  });
});
```

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: FAIL với lỗi không phân giải được `./submissionState.js`.

- [ ] **Step 3: Viết module**

Tạo `src/logic/submissionState.js`:

```js
// Vòng đời bài nộp — bám đúng SubmissionStatus của backend
// (xem eduverse-yoolife/src/app/teachers/_services/class-submission.model.ts).
// Prototype trước đây chỉ có boolean `submitted`, nên thiếu hẳn mắt xích
// "giáo viên trả bài → học sinh nộp lại" vốn là vòng phản hồi của dạy–học.

export const SUBMISSION_STATUS = {
  NOT_STARTED: 0,
  IN_PROGRESS: 1,
  SUBMITTED: 2,
  LATE_SUBMITTED: 3,
  GRADED: 4,
  RETURNED: 5,
  RESUBMITTED: 6,
};

export const SUBMISSION_LABEL = {
  0: "Chưa làm",
  1: "Đang làm",
  2: "Đã nộp",
  3: "Nộp muộn",
  4: "Đã chấm",
  5: "Trả lại",
  6: "Đã nộp lại",
};

export const SUBMISSION_TINT = {
  0: { bg: "#f1f5f7", color: "#617789" },
  1: { bg: "#e7f2fb", color: "#0b6aa3" },
  2: { bg: "#eaf6f8", color: "#00708f" },
  3: { bg: "#fff5e6", color: "#b45309" },
  4: { bg: "#f0fdf4", color: "#15803d" },
  5: { bg: "#fdeef5", color: "#b13a75" },
  6: { bg: "#eaf6f8", color: "#00708f" },
};

// Chuỗi ISO cục bộ ("2026-05-17T23:59:00") so sánh được trực tiếp bằng < >
// vì cùng độ dài và cùng thứ tự từ vựng — không cần Date, tránh lệch múi giờ.
function isAfter(aIso, bIso) {
  return String(aIso) > String(bIso);
}

export function canSubmit(assignment, submission, nowIso) {
  const attempts = submission.attemptNumber ?? 0;
  const wasReturned = submission.status === SUBMISSION_STATUS.RETURNED;

  if (assignment.openAtIso && isAfter(assignment.openAtIso, nowIso)) {
    return { allowed: false, reason: "notOpen", willBeLate: false };
  }

  const late = !!assignment.dueAtIso && isAfter(nowIso, assignment.dueAtIso);

  if (attempts >= (assignment.maxAttempts ?? 1) && !wasReturned) {
    return { allowed: false, reason: "noAttemptsLeft", willBeLate: late };
  }
  if (submission.status === SUBMISSION_STATUS.GRADED) {
    return { allowed: false, reason: "alreadyGraded", willBeLate: late };
  }
  if (late && !assignment.allowLate) {
    return { allowed: false, reason: "closed", willBeLate: true };
  }

  return { allowed: true, reason: null, willBeLate: late };
}

export function applySubmit(submission, assignment, nowIso) {
  const late = !!assignment.dueAtIso && isAfter(nowIso, assignment.dueAtIso);
  const wasReturned = submission.status === SUBMISSION_STATUS.RETURNED;
  const status = wasReturned
    ? SUBMISSION_STATUS.RESUBMITTED
    : late
      ? SUBMISSION_STATUS.LATE_SUBMITTED
      : SUBMISSION_STATUS.SUBMITTED;

  return {
    ...submission,
    status,
    attemptNumber: (submission.attemptNumber ?? 0) + 1,
    submittedAtIso: nowIso,
    isLate: late,
  };
}

export function applyGrade(submission, { finalScore, feedback, gradedAtIso }) {
  return {
    ...submission,
    status: SUBMISSION_STATUS.GRADED,
    finalScore,
    feedback,
    gradedAtIso,
  };
}

export function applyReturn(submission, { feedback, returnedAtIso }) {
  return {
    ...submission,
    status: SUBMISSION_STATUS.RETURNED,
    finalScore: null,
    feedback,
    gradedAtIso: returnedAtIso,
  };
}
```

- [ ] **Step 4: Chạy test để xác nhận đạt**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: PASS, 20 test (7 của Task 1 + 13 mới).

- [ ] **Step 5: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic/submissionState.js src/logic/submissionState.test.js && git commit -m "feat(coursework): máy trạng thái bài nộp 7 trạng thái kèm quy tắc nộp lại"
```

---

## Task 3: Tính điểm rubric và tổng hợp bảng điểm

**Files:**
- Create: `src/logic/gradebook.js`
- Create: `src/logic/gradebook.test.js`

**Interfaces:**
- Consumes: `SUBMISSION_STATUS` từ `src/logic/submissionState.js`
- Produces:
  - `rubricTotal(criteria) -> number` — cộng `earnedPoints`, làm tròn 1 chữ số thập phân
  - `rubricMax(criteria) -> number` — cộng `maxPoints`
  - `isRubricWeightValid(criteria) -> boolean` — tổng `weightPercent` bằng 100
  - `averageScore(submissions) -> number|null` — trung bình `finalScore` của các bài đã chấm, làm tròn 1 chữ số; `null` nếu chưa có bài nào được chấm
  - `completionRate(submissions, totalStudents) -> number` — phần trăm nguyên (0–100) số bài đã nộp trên sĩ số
  - `assignmentStats(submissions, totalStudents) -> { submittedCount, gradedCount, notStartedCount, completionRate, averageScore, minScore, maxScore }`
  - Hình dạng `criterion`: `{ code, name, maxPoints, weightPercent, earnedPoints, comment }`

- [ ] **Step 1: Viết test thất bại**

Tạo `src/logic/gradebook.test.js`:

```js
import { describe, expect, it } from "vitest";
import { SUBMISSION_STATUS as S } from "./submissionState.js";
import {
  assignmentStats,
  averageScore,
  completionRate,
  isRubricWeightValid,
  rubricMax,
  rubricTotal,
} from "./gradebook.js";

const criteria = [
  { code: "C1", name: "Nêu vị trí quang hợp", maxPoints: 3, weightPercent: 30, earnedPoints: 2.5 },
  { code: "C2", name: "Mô tả hai pha", maxPoints: 5, weightPercent: 50, earnedPoints: 4 },
  { code: "C3", name: "Kết luận", maxPoints: 2, weightPercent: 20, earnedPoints: 1 },
];

describe("rubric", () => {
  it("cộng điểm đã đạt và làm tròn 1 chữ số", () => {
    expect(rubricTotal(criteria)).toBe(7.5);
  });

  it("cộng điểm tối đa", () => {
    expect(rubricMax(criteria)).toBe(10);
  });

  it("coi tiêu chí chưa chấm là 0 điểm", () => {
    expect(rubricTotal([{ maxPoints: 5, weightPercent: 100 }])).toBe(0);
  });

  it("hợp lệ khi tổng trọng số đúng 100", () => {
    expect(isRubricWeightValid(criteria)).toBe(true);
  });

  it("không hợp lệ khi tổng trọng số khác 100", () => {
    expect(isRubricWeightValid([{ maxPoints: 5, weightPercent: 60 }])).toBe(false);
  });

  it("rubric rỗng là không hợp lệ", () => {
    expect(isRubricWeightValid([])).toBe(false);
  });
});

const subs = [
  { status: S.GRADED, finalScore: 8 },
  { status: S.GRADED, finalScore: 6.5 },
  { status: S.SUBMITTED, finalScore: null },
  { status: S.NOT_STARTED, finalScore: null },
];

describe("tổng hợp", () => {
  it("điểm trung bình chỉ tính bài đã chấm", () => {
    expect(averageScore(subs)).toBe(7.3);
  });

  it("điểm trung bình là null khi chưa chấm bài nào", () => {
    expect(averageScore([{ status: S.SUBMITTED, finalScore: null }])).toBeNull();
  });

  it("tỉ lệ hoàn thành tính theo sĩ số, không theo số bản ghi", () => {
    expect(completionRate(subs, 10)).toBe(30);
  });

  it("tỉ lệ hoàn thành là 0 khi sĩ số bằng 0", () => {
    expect(completionRate(subs, 0)).toBe(0);
  });

  it("thống kê một bài tập trả đủ các chỉ số", () => {
    expect(assignmentStats(subs, 10)).toEqual({
      submittedCount: 3,
      gradedCount: 2,
      notStartedCount: 7,
      completionRate: 30,
      averageScore: 7.3,
      minScore: 6.5,
      maxScore: 8,
    });
  });

  it("thống kê khi chưa ai nộp", () => {
    expect(assignmentStats([], 20)).toEqual({
      submittedCount: 0,
      gradedCount: 0,
      notStartedCount: 20,
      completionRate: 0,
      averageScore: null,
      minScore: null,
      maxScore: null,
    });
  });
});
```

Lưu ý về kỳ vọng: `submittedCount` đếm mọi bài đã rời trạng thái `NOT_STARTED`/`IN_PROGRESS` (ở ví dụ trên là 3 — hai bài `GRADED` và một bài `SUBMITTED`); `notStartedCount` là `totalStudents - submittedCount`.

- [ ] **Step 2: Chạy test để xác nhận thất bại**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: FAIL với lỗi không phân giải được `./gradebook.js`.

- [ ] **Step 3: Viết module**

Tạo `src/logic/gradebook.js`:

```js
// Tổng hợp điểm cho bảng điểm lớp và thống kê bài tập.
// Tách khỏi hook React để kiểm thử được và để bản production dùng lại
// nguyên vẹn khi thay dữ liệu mock bằng dữ liệu API.
import { SUBMISSION_STATUS as S } from "./submissionState.js";

const round1 = (n) => Math.round(n * 10) / 10;

const SUBMITTED_STATUSES = [S.SUBMITTED, S.LATE_SUBMITTED, S.GRADED, S.RETURNED, S.RESUBMITTED];

export function rubricTotal(criteria) {
  return round1(criteria.reduce((sum, c) => sum + (c.earnedPoints ?? 0), 0));
}

export function rubricMax(criteria) {
  return round1(criteria.reduce((sum, c) => sum + (c.maxPoints ?? 0), 0));
}

export function isRubricWeightValid(criteria) {
  if (!criteria.length) return false;
  return criteria.reduce((sum, c) => sum + (c.weightPercent ?? 0), 0) === 100;
}

export function averageScore(submissions) {
  const scored = submissions.filter(
    (s) => s.status === S.GRADED && typeof s.finalScore === "number"
  );
  if (!scored.length) return null;
  return round1(scored.reduce((sum, s) => sum + s.finalScore, 0) / scored.length);
}

export function completionRate(submissions, totalStudents) {
  if (!totalStudents) return 0;
  const submitted = submissions.filter((s) => SUBMITTED_STATUSES.includes(s.status)).length;
  return Math.round((submitted / totalStudents) * 100);
}

export function assignmentStats(submissions, totalStudents) {
  const submitted = submissions.filter((s) => SUBMITTED_STATUSES.includes(s.status));
  const scored = submitted
    .filter((s) => s.status === S.GRADED && typeof s.finalScore === "number")
    .map((s) => s.finalScore);

  return {
    submittedCount: submitted.length,
    gradedCount: scored.length,
    notStartedCount: Math.max(0, totalStudents - submitted.length),
    completionRate: completionRate(submissions, totalStudents),
    averageScore: averageScore(submissions),
    minScore: scored.length ? Math.min(...scored) : null,
    maxScore: scored.length ? Math.max(...scored) : null,
  };
}
```

- [ ] **Step 4: Chạy test để xác nhận đạt**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test
```

Kỳ vọng: PASS, 32 test.

- [ ] **Step 5: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic/gradebook.js src/logic/gradebook.test.js && git commit -m "feat(gradebook): tính điểm rubric và thống kê bài tập"
```

---

## Task 4: Tách dữ liệu mock theo miền

Đây là refactor thuần: **nội dung các hằng không đổi một ký tự nào**, chỉ đổi tệp chứa. `src/constants.js` giữ lại làm lớp tái xuất để 12 tệp `screens/*.jsx` và `useAppLogic.js` không phải sửa import trong task này.

**Files:**
- Create: `src/data/shared.js`, `src/data/catalog.js`, `src/data/student.js`, `src/data/teacher.js`, `src/data/parent.js`
- Modify: `src/constants.js` (thay toàn bộ bằng lớp tái xuất)

**Interfaces:**
- Consumes: không có
- Produces: các hằng cũ, nay có nguồn mới nhưng vẫn xuất qua `src/constants.js` với **đúng tên cũ**:
  - `src/data/shared.js`: `ACCENT`, `DEEP`, `INK`, `MUTED`, `BORDER`, `TAB_ICONS`, `NOTI`
  - `src/data/catalog.js`: `CATS`, `LESSONS`, `LESSON_TYPES`, `LEVELS`, `STEPS`, `QUICK`, `QUICK_CORRECT`, `EXAM`
  - `src/data/student.js`: `S_ASSIGNMENTS`
  - `src/data/teacher.js`: `T_METRICS`, `T_CLASSES`, `T_ASSIGNMENTS`, `T_SUBMISSIONS`, `T_PLANS`, `T_BLOCKS`, `T_STUDENTS`
  - `src/data/parent.js`: `P_CHILDREN`, `P_CONVOS`, `P_THREAD`, `P_REPORT`

- [ ] **Step 1: Tạo `src/data/shared.js`**

Cắt từ `src/constants.js` sang tệp mới, giữ nguyên nội dung: dòng 1 (`ACCENT`, `DEEP`, `INK`, `MUTED`, `BORDER`), khối `TAB_ICONS` (dòng 229–242) và khối `NOTI` (dòng 244–263). Thêm đầu tệp một dòng chú thích:

```js
// Token giao diện và dữ liệu dùng chung cho mọi vai trò.
// Mọi màu mới phải khai báo ở đây, không viết hex rời trong JSX.
```

- [ ] **Step 2: Tạo `src/data/catalog.js`**

Cắt sang: `CATS`, `SUBJECT_META`, `levelOf`, `CURATED_LESSONS`, `TOPIC_POOL`, `GRADE_RANGE`, `TYPE_POOL`, `genCatalogLessons`, `LESSONS`, `LESSON_TYPES`, `LEVELS`, `STEPS`, `QUICK`, `QUICK_CORRECT`, `EXAM` (dòng 3–126 của tệp cũ). `SUBJECT_META`, `levelOf`, `CURATED_LESSONS`, `TOPIC_POOL`, `GRADE_RANGE`, `TYPE_POOL`, `genCatalogLessons` **giữ nguyên là nội bộ tệp, không export**.

- [ ] **Step 3: Tạo `src/data/teacher.js`, `src/data/student.js`, `src/data/parent.js`**

- `teacher.js`: `T_METRICS`, `T_CLASSES`, `T_ASSIGNMENTS`, `T_SUBMISSIONS`, `T_PLANS`, `T_BLOCKS`, `T_STUDENTS` (dòng 128–172).
- `student.js`: `S_ASSIGNMENTS` (dòng 173–187).
- `parent.js`: `P_CHILDREN`, `P_CONVOS`, `P_THREAD`, `P_REPORT` (dòng 188–228).

`teacher.js` cần `import { ACCENT } from "./shared.js";`? Không — kiểm tra lại: các khối này chỉ dùng chuỗi hex trực tiếp, không tham chiếu hằng màu. Không thêm import nào.

- [ ] **Step 4: Thay `src/constants.js` bằng lớp tái xuất**

Ghi đè toàn bộ `src/constants.js`:

```js
// Lớp tái xuất giữ tương thích ngược: dữ liệu mock đã tách theo miền sang
// src/data/*, nhưng các màn cũ vẫn import từ đây. Tệp mới nên import thẳng
// từ src/data/<miền>.js.
export { ACCENT, BORDER, DEEP, INK, MUTED, NOTI, TAB_ICONS } from "./data/shared.js";
export { CATS, EXAM, LESSONS, LESSON_TYPES, LEVELS, QUICK, QUICK_CORRECT, STEPS } from "./data/catalog.js";
export { S_ASSIGNMENTS } from "./data/student.js";
export { T_ASSIGNMENTS, T_BLOCKS, T_CLASSES, T_METRICS, T_PLANS, T_STUDENTS, T_SUBMISSIONS } from "./data/teacher.js";
export { P_CHILDREN, P_CONVOS, P_REPORT, P_THREAD } from "./data/parent.js";
```

- [ ] **Step 5: Kiểm chứng ứng dụng vẫn chạy nguyên vẹn**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công, không cảnh báo import thiếu. Sau đó chạy `npm run dev`, mở app và bấm qua 3 vai trò (đổi vai trò ở màn Tài khoản), xác nhận không màn nào trắng và console không có lỗi.

- [ ] **Step 6: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/constants.js src/data && git commit -m "refactor(data): tách dữ liệu mock theo miền, giữ constants.js làm lớp tái xuất"
```

---

## Task 5: Tách logic theo miền và nối ngăn xếp điều hướng

Refactor lớn nhất của kế hoạch. Nguyên tắc an toàn: **object `v` trả ra phải giữ nguyên mọi tên khoá cũ** để 12 tệp `screens/*.jsx` không phải sửa. Chỉ có cơ chế điều hướng bên dưới thay đổi.

**Files:**
- Create: `src/logic/useAppState.js`, `src/logic/useStudentLogic.js`, `src/logic/useTeacherLogic.js`, `src/logic/useParentLogic.js`, `src/logic/useAccountLogic.js`
- Modify: `src/useAppLogic.js` (thu về khoảng 60 dòng)

**Interfaces:**
- Consumes: `navStack.js` (Task 1)
- Produces:
  - `useAppState(navStyle) -> ctx` với `ctx = { s, setState, nav, params, screen, go, push, pop, replace, resetTo, t, cardOn, roleTabs, roleHome, tabs, showNav, navTabs, navFab, navPill, langOptions, roles, roleSwitch }`
  - `useStudentLogic(ctx) -> object` — mảnh `v` của học sinh
  - `useTeacherLogic(ctx) -> object`
  - `useParentLogic(ctx) -> object`
  - `useAccountLogic(ctx) -> object`
  - `ctx.go(screen)` giữ nguyên chữ ký cũ nhưng nay là `push`; `ctx.pop()` là hàm quay lại thật.

- [ ] **Step 1: Tạo `src/logic/useAppState.js`**

```js
import { useEffect, useRef, useState } from "react";
import { ACCENT, BORDER, INK, MUTED, TAB_ICONS } from "../data/shared.js";
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

  return {
    s, setState, stateRef,
    nav, screen, params, go, push, pop, replace, resetTo,
    t, cardOn, roleMeta, roleHome, tabs,
    showNav: NAV_SCREENS.indexOf(screen) >= 0,
    navTabs: navStyle === "tabs", navFab: navStyle === "fab", navPill: navStyle === "pill",
    tabsSplitLeft: tabs.slice(0, 2), tabsSplitRight: tabs.slice(3), tabsPill: tabs,
    roles, roleSwitch, langOptions,
  };
}
```

- [ ] **Step 2: Tách bốn hook miền**

Mỗi hook nhận `ctx` và trả về mảnh `v` của mình. Phân chia theo đúng ranh giới sau — cắt nguyên khối từ `src/useAppLogic.js` cũ, thay `s.` bằng `ctx.s.`, `setState` bằng `ctx.setState`, `go` bằng `ctx.go`, `t` bằng `ctx.t`, `cardOn` bằng `ctx.cardOn`:

| Hook | Nhận các khoá `INITIAL_STATE` cũ | Trả các khoá `v` cũ |
| --- | --- | --- |
| `useStudentLogic` | `tab, view, detailTab, libTab, step, playing, quickPick, examIdx, answers, examSecs, saved, cwTab, asgIdx, submitted, classIdx, classDetailTab, exploreCat, exploreSort, search, sortMenuOpen, filterOpen, fLevel, fGrade, fTypes, fTopic, exploreSaved` | `isHome…isExamResult`, `featured, lessons, chips, stats, weekActivity, dailyStudy, subjectStudy, streakDays, recentScores, detailTabs, detailFacts, steps, reviews, step*, quickOptions, exam*, score*, libraryCards, libTabs, libraryItems, cwTabs, cwItems, myClasses, classDetail*, asg*, filter*, toggleView, grid*, list*, cardDir, mediaH, mediaW` |
| `useTeacherLogic` | `tExploreView, tClassIdx, tClassTab, gradeIdx, gradeScore, graded, tClassesTab, tExploreSaved, tExploreAdded, planTab, tExploreSection, tLibTab, tRecentIds, tItemPlanName, tItemAssignedClasses, tAssignSheet, tPlanIdx, createdClasses, createdAssignments, createdLectures, cc*, ca*, cl*, classAccessMode, classPerms` | `isTOverview…isTExplore, isTCreateClass, isTCreateAssignment, isTCreateLecture`, `tMetrics, tClasses, tClassesCountLabel, tAssignments, tUpcoming, tClassesTabs, tcTab*, tClass*, tStudents, tNews, tGradeSummary, tSubmissions, sub*, gradeScore, graded, scoreChips, saveGrade, tBlocks, planTabs, tPlans, tPlan*, tExploreItems, tLib*, tAssignSheet*, tQuickActions, createClass, createAssignment, createLecture` |
| `useParentLogic` | `childIdx, sent, safety` | `isPOverview…isPSafety`, `parentName, children, child*, nextAction, report*, convos, thread, sent, sendMsg, safetyRows, limitChips, toP*` |
| `useAccountLogic` | `topup, pay, showPassword, remember, signupShowPassword, signupAgree, newShowPassword, otpSecs, profileEditing, notifPrefs, helpOpenIdx, planChoice, loggedOutDevices` | `isLogin…isSuccess, isProfile, isProfileDetail, isChangePassword, isWallet, isServicePlan, isDevices, isNotifPrefs, isAccountSecurity, isHelpSupport`, `profileRows, profile*, planFeatures, planOptions, devices, notifPrefRows, securityEmail, helpFaqs, topupAmounts, payMethods, topupLabel, toggle*, passwordMask, otpClock, canResendOtp, resendOtp, userName, roleLabel` |

Bộ đếm giây (`examSecs`, `otpSecs`) chuyển vào hook sở hữu khoá đó: `examSecs` → `useStudentLogic`, `otpSecs` → `useAccountLogic`. Mỗi hook tự chạy `useEffect` với `setInterval` của riêng mình, điều kiện kiểm tra `ctx.screen`.

State khởi tạo của mỗi hook đặt trong hằng `INITIAL_<MIỀN>` ngay trong tệp hook, rồi truyền vào `useAppState` qua tham số `initialExtra` — xem Step 3.

- [ ] **Step 3: Viết `src/useAppLogic.js` mới**

Ghi đè toàn bộ:

```js
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
    ...ctx.tabsBundle,
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
```

Bỏ khoá `ctx.tabsBundle` khỏi đoạn trên nếu `useAppState` không trả khoá đó — đây là dòng thừa, xoá dòng `...ctx.tabsBundle,`.

- [ ] **Step 4: Chuyển `deepT` sang tệp riêng**

Tạo `src/logic/deepT.js` với nội dung nguyên văn hàm `deepT` đang nằm trong `useAppLogic.js` (dòng 100–109 của tệp cũ), thêm `export` trước `function`.

- [ ] **Step 5: Thay nút quay lại hardcode bằng `pop`**

Trong toàn bộ `src/screens/*.jsx`, thay các handler quay lại đang trỏ cứng về một màn cụ thể bằng `v.back`:

| Tệp | Thay `onClick={v.toClasswork}` / `onClick={v.toTGrading}` / … | Thành |
| --- | --- | --- |
| `StudentLibraryWorkScreens.jsx` dòng 88, 181, 206 | nút mũi tên quay lại ở `classDetail` và `assignment` | `onClick={v.back}` |
| `TeacherScreens.jsx` dòng 577 và các nút mũi tên tương tự | | `onClick={v.back}` |
| `CommonScreens.jsx`, `ParentScreens.jsx`, `StudentLearnScreens.jsx` | mọi nút có SVG `M14.5 5L7.5 12l7 7` | `onClick={v.back}` |

Giữ nguyên các nút hành động cuối luồng (ví dụ "Về danh sách bài tập" ở dòng 206) vì đó là điều hướng có chủ đích, không phải nút quay lại.

- [ ] **Step 6: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test && npm run build
```

Kỳ vọng: 32 test PASS, build thành công.

Sau đó `npm run dev` và bấm checklist hồi quy:
1. Đăng nhập → Trang chủ học sinh → Khám phá → chi tiết học liệu → **nút quay lại về đúng Khám phá**.
2. Lớp học → chi tiết lớp → **quay lại về đúng Lớp học**.
3. Đổi vai trò sang Giáo viên → Lớp học → chi tiết lớp → Chấm bài → chi tiết bài nộp → **bấm quay lại ba lần đi ngược đúng thứ tự**.
4. Bấm tab bất kỳ ở thanh dưới → ngăn xếp đặt lại, nút quay lại không còn hiện.
5. Đổi ngôn ngữ sang English trên 5 màn ngẫu nhiên, không màn nào lỗi.

- [ ] **Step 7: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/useAppLogic.js src/logic src/screens && git commit -m "refactor(logic): tách hook theo miền và chuyển điều hướng sang ngăn xếp"
```

---

## Task 6: Component giao diện dùng chung

**Files:**
- Create: `src/screens/ui/Sheet.jsx`, `src/screens/ui/StatusChip.jsx`, `src/screens/ui/EmptyState.jsx`, `src/screens/ui/SegmentedTabs.jsx`, `src/screens/ui/ConfirmSheet.jsx`, `src/screens/ui/FilePicker.jsx`
- Modify: `src/screens/FilterSheet.jsx`, `src/screens/AssignSheet.jsx`, `src/screens/LangSheet.jsx` (dùng lại `Sheet`)

**Interfaces:**
- Consumes: `SUBMISSION_LABEL`, `SUBMISSION_TINT` từ `src/logic/submissionState.js`
- Produces:
  - `<Sheet open title onClose footer>{children}</Sheet>`
  - `<StatusChip status />` — `status` là số 0–6
  - `<EmptyState title desc actionLabel onAction />`
  - `<SegmentedTabs items />` — `items: Array<{label, active, onClick}>`
  - `<ConfirmSheet open title desc confirmLabel tone onConfirm onCancel />` — `tone` là `"accent"` hoặc `"warning"`
  - `<FilePicker files onAdd onRemove readOnly />` — `files: Array<{name, size, kind}>`

- [ ] **Step 1: Tạo `src/screens/ui/Sheet.jsx`**

```jsx
import { css } from "../../css.js";

// Khung sheet đáy dùng chung. Trước đây ba tệp FilterSheet/AssignSheet/LangSheet
// lặp lại y hệt phần nền mờ, bo góc và animation trượt lên.
export default function Sheet({ open, title, onClose, footer, children, maxHeight = "82%" }) {
  if (!open) return null;
  return (
    <div style={css(`position:absolute;inset:0;z-index:80;display:flex;flex-direction:column;justify-content:flex-end`)}>
      <div onClick={onClose} style={css(`position:absolute;inset:0;background:rgba(15,50,52,.45)`)}></div>
      <div style={css(`position:relative;max-height:${maxHeight};background:#fcfcfc;border-radius:24px 24px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.18);display:flex;flex-direction:column;animation:ybup .25s ease`)}>
        {title && (
          <div style={css(`padding:16px 20px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddeaf0`)}>
            <div style={css(`font-size:16px;font-weight:700;color:#455771`)}>{title}</div>
            <div onClick={onClose} style={css(`width:32px;height:32px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </div>
          </div>
        )}
        <div style={css(`flex:1;overflow-y:auto;padding:16px 20px 8px`)}>{children}</div>
        {footer && <div style={css(`padding:14px 20px 22px;border-top:1px solid #ddeaf0;display:flex;gap:10px;background:#fcfcfc`)}>{footer}</div>}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Tạo `src/screens/ui/StatusChip.jsx`**

```jsx
import { css } from "../../css.js";
import { SUBMISSION_LABEL, SUBMISSION_TINT } from "../../logic/submissionState.js";

export default function StatusChip({ status, t }) {
  const tint = SUBMISSION_TINT[status] ?? SUBMISSION_TINT[0];
  const label = SUBMISSION_LABEL[status] ?? SUBMISSION_LABEL[0];
  return (
    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${tint.bg};color:${tint.color};font-size:10.5px;font-weight:600;display:inline-flex;align-items:center;flex:none`)}>
      {t ? t(label) : label}
    </div>
  );
}
```

- [ ] **Step 3: Tạo `src/screens/ui/EmptyState.jsx`**

```jsx
import { css } from "../../css.js";

export default function EmptyState({ title, desc, actionLabel, onAction }) {
  return (
    <div style={css(`margin-top:28px;padding:28px 20px;border:1px dashed #bcd7e0;border-radius:20px;background:#f8fcfd;text-align:center`)}>
      <div style={css(`width:46px;height:46px;margin:0 auto;border-radius:999px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5.5h14v13H5zM8.5 10h7M8.5 14h4" /></svg>
      </div>
      <div style={css(`margin-top:12px;font-size:14.5px;font-weight:600;color:#455771`)}>{title}</div>
      {desc && <div style={css(`margin-top:6px;font-size:12.5px;line-height:1.55;color:#617789;text-wrap:pretty`)}>{desc}</div>}
      {actionLabel && (
        <div onClick={onAction} style={css(`margin:16px auto 0;height:42px;max-width:220px;border-radius:14px;background:#00aaab;color:#fff;font-size:13.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{actionLabel}</div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Tạo `src/screens/ui/SegmentedTabs.jsx`**

```jsx
import { css } from "../../css.js";

// Thay cho đoạn tô màu tab đang lặp lại 8 lần trong các màn hiện có.
export default function SegmentedTabs({ items }) {
  return (
    <div style={css(`display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
      {items.map((tab, i) => (
        <div
          key={i}
          onClick={tab.onClick}
          style={css(`flex:1;height:36px;border-radius:11px;background:${tab.active ? "#00aaab" : "transparent"};color:${tab.active ? "#fff" : "#455771"};font-size:12.5px;font-weight:${tab.active ? 600 : 400};display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap`)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Tạo `src/screens/ui/ConfirmSheet.jsx`**

```jsx
import { css } from "../../css.js";
import Sheet from "./Sheet.jsx";

export default function ConfirmSheet({ open, title, desc, confirmLabel, cancelLabel, tone = "accent", onConfirm, onCancel }) {
  const bg = tone === "warning" ? "#f59e0b" : "#00aaab";
  const shadow = tone === "warning" ? "rgba(245,158,11,.3)" : "rgba(0,170,171,.28)";
  return (
    <Sheet
      open={open}
      title={title}
      onClose={onCancel}
      maxHeight="52%"
      footer={
        <>
          <div onClick={onCancel} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{cancelLabel}</div>
          <div onClick={onConfirm} style={css(`flex:1.4;height:50px;border-radius:16px;background:${bg};color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px ${shadow}`)}>{confirmLabel}</div>
        </>
      }
    >
      <div style={css(`font-size:13.5px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{desc}</div>
    </Sheet>
  );
}
```

- [ ] **Step 6: Tạo `src/screens/ui/FilePicker.jsx`**

```jsx
import { css } from "../../css.js";

const KIND_LABEL = { pdf: "PDF", image: "IMG", doc: "DOC" };

export default function FilePicker({ files = [], onAdd, onRemove, readOnly, addLabel, addHint }) {
  return (
    <div style={css(`display:flex;flex-direction:column;gap:9px`)}>
      {files.map((f, i) => (
        <div key={i} style={css(`display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
          <div style={css(`width:30px;height:30px;flex:none;border-radius:9px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00708f`)}>{KIND_LABEL[f.kind] ?? "FILE"}</div>
          <div style={css(`flex:1;min-width:0`)}>
            <div style={css(`font-size:12.5px;font-weight:500;color:#455771;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{f.name}</div>
            <div style={css(`font-size:10.5px;color:#617789`)}>{f.size}</div>
          </div>
          {!readOnly && (
            <div onClick={() => onRemove(i)} style={css(`width:26px;height:26px;flex:none;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </div>
          )}
        </div>
      ))}
      {!readOnly && (
        <div onClick={onAdd} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;cursor:pointer`)}>
          <div style={css(`width:34px;height:34px;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.9" strokeLinecap="round"><path d="M12 16V5m0 0L7.5 9.5M12 5l4.5 4.5M4.5 19h15" /></svg>
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{addLabel}</div>
            <div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{addHint}</div>
          </div>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 7: Chuyển ba sheet cũ sang dùng `Sheet`**

Sửa `FilterSheet.jsx`, `AssignSheet.jsx`, `LangSheet.jsx`: bỏ phần khung (nền mờ, hộp bo góc, header, footer) và bọc nội dung trong `<Sheet open={...} title={...} onClose={...} footer={...}>`. Nội dung bên trong giữ nguyên. Với `FilterSheet.jsx`, `open` là `v.filterOpen`, `title` là `v.t(\`Bộ lọc\`)`, `onClose` là `v.closeFilter`, `footer` là hai nút "Đặt lại" và "Áp dụng" hiện có.

- [ ] **Step 8: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công. Sau đó `npm run dev`, mở lần lượt ba sheet (Bộ lọc ở Khám phá, Thêm vào giáo án ở Thư viện giáo viên, Ngôn ngữ ở Tài khoản) và xác nhận giao diện không đổi so với trước.

- [ ] **Step 9: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/screens && git commit -m "refactor(ui): bổ sung component dùng chung và gộp khung sheet"
```

---

## Task 7: Nguồn dữ liệu bài tập dùng chung cho ba vai trò

Đây là nền của cả Giai đoạn 1. Bài tập, rubric và bài nộp phải nằm trong **một mảng duy nhất trong state dùng chung**, không phải hằng riêng của từng vai trò — nếu không, giáo viên chấm xong học sinh sẽ không thấy điểm.

**Files:**
- Create: `src/data/coursework.js`
- Create: `src/i18n/shards/grading.js`
- Modify: `src/i18n/dict.js`
- Modify: `src/logic/useAppState.js`

**Interfaces:**
- Consumes: `SUBMISSION_STATUS` (Task 2)
- Produces:
  - `ASSIGNMENT_TYPE` — `READING:1, QUIZ:2, EXPERIMENT:3, FILE_SUBMISSION:4, SHORT_ANSWER:5, MIXED:6`
  - `ASSIGNMENT_TYPE_LABEL[type] -> string`
  - `CURRENT_STUDENT_ID` — `1`
  - `ROSTER` — `Array<{ id, name, initials, tint, classId }>`
  - `SEED_RUBRICS` — `Array<{ id, name, criteria: Array<{code,name,maxPoints,weightPercent}> }>`
  - `SEED_ASSIGNMENTS` — `Array<Assignment>` với `Assignment = { id, classId, className, title, type, instructions, checklist, openAtIso, dueAtIso, allowLate, maxAttempts, maxScore, passingScore, rubricId, targetStudentIds, attachments, isPublished, totalStudents }`
  - `SEED_SUBMISSIONS` — `Array<Submission>` với `Submission = { id, assignmentId, studentId, status, attemptNumber, submittedAtIso, isLate, answerText, attachments, finalScore, feedback, gradedAtIso, criteriaScores, criteriaComments }`
  - `INITIAL_COURSEWORK` — `{ assignments, submissions, rubrics, nextSubmissionId }` để nạp vào state dùng chung

- [ ] **Step 1: Tạo `src/data/coursework.js`**

```js
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

export const INITIAL_COURSEWORK = {
  assignments: SEED_ASSIGNMENTS,
  submissions: SEED_SUBMISSIONS,
  rubrics: SEED_RUBRICS,
  nextSubmissionId: 7,
};
```

Lưu ý chủ đích: học sinh đang đóng vai (`id: 1`) **chưa có bài nộp cho bài tập 1** — đó là điểm bắt đầu của kịch bản demo "làm bài → nộp → được chấm".

- [ ] **Step 2: Nạp dữ liệu bài tập vào state dùng chung**

Trong `src/logic/useAppState.js`, sửa hằng `INITIAL_SHARED` để gộp `INITIAL_COURSEWORK`:

```js
import { INITIAL_COURSEWORK } from "../data/coursework.js";

const INITIAL_SHARED = {
  role: "student",
  lang: "vi",
  langOpen: false,
  notiRead: false,
  nowIso: "2026-05-16T09:00:00",
  ...INITIAL_COURSEWORK,
};
```

Bổ sung vào giá trị trả về của `useAppState` bốn hàm ghi dùng chung (đặt ngay trước câu `return`):

```js
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
```

Và thêm `upsertSubmission, addAssignment, addRubric, findSubmission` vào object `return`.

- [ ] **Step 3: Tạo shard i18n `src/i18n/shards/grading.js`**

```js
// Bản dịch cho vòng lặp giao bài – nộp bài – chấm bài (Giai đoạn 1).
export default {
  "Chưa làm": "Not started",
  "Đang làm": "In progress",
  "Đã nộp": "Submitted",
  "Nộp muộn": "Submitted late",
  "Đã chấm": "Graded",
  "Trả lại": "Returned",
  "Đã nộp lại": "Resubmitted",
  "Đọc tài liệu": "Reading",
  "Trắc nghiệm": "Quiz",
  "Thí nghiệm ảo": "Virtual experiment",
  "Nộp tệp": "File submission",
  "Tự luận ngắn": "Short answer",
  "Tổng hợp": "Mixed",
  "Chi tiết bài tập": "Assignment detail",
  "Yêu cầu bài làm": "Requirements",
  "Bài làm của bạn": "Your work",
  "Tệp giáo viên đính kèm": "Teacher attachments",
  "Tiêu chí chấm điểm": "Grading criteria",
  "Điểm tối đa": "Max score",
  "Điểm đạt": "Passing score",
  "Số lượt còn lại": "Attempts left",
  "Hạn nộp": "Due",
  "Mở lúc": "Opens at",
  "Bài tập chưa mở": "Assignment not open yet",
  "Đã quá hạn nộp": "Past due date",
  "Đã hết lượt nộp": "No attempts left",
  "Bài đã được chấm": "Already graded",
  "Nộp bài": "Submit",
  "Nộp lại": "Resubmit",
  "Lưu nháp": "Save draft",
  "Đã lưu nháp": "Draft saved",
  "Xác nhận nộp bài": "Confirm submission",
  "Bài sẽ được ghi nhận là nộp muộn.": "This will be recorded as a late submission.",
  "Sau khi nộp bạn không sửa được nữa.": "You cannot edit after submitting.",
  "Đính kèm tệp": "Attach file",
  "Ảnh, PDF hoặc tài liệu, tối đa 20MB": "Image, PDF or document, up to 20MB",
  "Kết quả bài làm": "Submission result",
  "Nhận xét của giáo viên": "Teacher feedback",
  "Lịch sử nộp bài": "Submission history",
  "Lần nộp": "Attempt",
  "Giáo viên đã trả bài": "Teacher returned this work",
  "Chưa có bài tập nào": "No assignments yet",
  "Chưa có bài nộp nào cần chấm": "No submissions to grade",
  "Bảng điểm lớp": "Class gradebook",
  "Thống kê bài tập": "Assignment statistics",
  "Tiến độ lớp": "Class progress",
  "Chấm theo tiêu chí": "Grade by criteria",
  "Tổng điểm": "Total score",
  "Lưu điểm": "Save score",
  "Trả bài yêu cầu làm lại": "Return for revision",
  "Trọng số phải cộng đủ 100%": "Weights must total 100%",
  "Đăng thông báo": "Post announcement",
  "Ghim lên đầu": "Pin to top",
};
```

- [ ] **Step 4: Đăng ký shard mới**

Sửa `src/i18n/dict.js`: thêm `import grading from "./shards/grading.js";` cùng nhóm import, và `...grading,` vào cuối object `EN` (đặt sau `...account,` để khoá trùng nếu có thì bản của shard này thắng).

- [ ] **Step 5: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm test && npm run build
```

Kỳ vọng: 32 test PASS, build thành công. Ứng dụng chưa đổi giao diện ở bước này — dữ liệu mới đã nằm trong state nhưng chưa màn nào đọc.

- [ ] **Step 6: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/data/coursework.js src/i18n src/logic/useAppState.js && git commit -m "feat(coursework): nguồn dữ liệu bài tập dùng chung cho ba vai trò"
```

---

## Task 8: Học sinh — danh sách bài tập và màn chi tiết theo trạng thái thật

**Files:**
- Create: `src/screens/StudentWorkScreens.jsx`
- Modify: `src/logic/useStudentLogic.js`
- Modify: `src/screens/StudentLibraryWorkScreens.jsx` (xoá khối `v.isAssignment` cũ, dòng 179–210)
- Modify: `src/App.jsx` (gắn màn mới)

**Interfaces:**
- Consumes: `canSubmit`, `SUBMISSION_STATUS` (Task 2); `ASSIGNMENT_TYPE_LABEL`, `CURRENT_STUDENT_ID` (Task 7); `ctx.findSubmission` (Task 7); `StatusChip`, `EmptyState`, `FilePicker` (Task 6)
- Produces (thêm vào `v`):
  - `cwItems: Array<{ id, title, className, status, typeLabel, dueLabel, scoreLabel, onClick }>` — thay bản cũ đọc từ `S_ASSIGNMENTS`
  - `isAssignmentDetail: boolean`
  - `asg: { id, title, className, typeLabel, instructions, checklist, openLabel, dueLabel, maxScore, passingScore, attemptsLeftLabel, attachments, criteria, status }`
  - `asgGate: { allowed, reason, reasonLabel, willBeLate }`
  - `asgSubmission: Submission|null`
  - `toAssignment(assignmentId): void`
  - `toAssignmentSubmit(): void`, `toSubmissionResult(): void`, `toSubmissionHistory(): void`

- [ ] **Step 1: Thêm logic bài tập cho học sinh**

Trong `src/logic/useStudentLogic.js`, thêm phần sau (đặt cạnh phần `cwTabs` hiện có, và **xoá** đoạn `cwItems` cũ đọc từ `S_ASSIGNMENTS`):

```js
import { ASSIGNMENT_TYPE_LABEL, CURRENT_STUDENT_ID } from "../data/coursework.js";
import { SUBMISSION_STATUS as S, canSubmit } from "./submissionState.js";

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
```

rồi trong thân hook:

```js
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

  const cwItems = myAssignments.filter(TAB_FILTER[ctx.s.cwTab]).map((x) => ({
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
```

và bổ sung vào object trả về:

```js
    cwItems,
    isAssignmentDetail: ctx.screen === "assignmentDetail",
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
```

- [ ] **Step 2: Cập nhật danh sách bài tập ở màn `classwork`**

Trong `src/screens/StudentLibraryWorkScreens.jsx`, thay khối render `v.cwItems` (dòng 70–81) bằng:

```jsx
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
            {v.cwItems.length === 0 && (
              <EmptyState title={v.t(`Chưa có bài tập nào`)} desc={v.t(`Bài tập giáo viên giao sẽ hiện ở đây.`)} />
            )}
            {v.cwItems.map((a) => (
              <div key={a.id} onClick={a.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <div style={css(`display:flex;align-items:center;gap:7px`)}>
                    <StatusChip status={a.status} t={v.t} />
                    <span style={css(`font-size:10.5px;color:#617789`)}>{a.typeLabel}</span>
                  </div>
                  {a.scoreLabel && <div style={css(`font-size:19px;font-weight:700;color:#00708f`)}>{a.scoreLabel}</div>}
                </div>
                <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{a.title}</div>
                <div style={css(`font-size:11.5px;color:#455771;margin-top:5px`)}>{a.className} · {a.dueLabel}</div>
              </div>
            ))}
          </div>
```

Thêm hai import ở đầu tệp: `import EmptyState from "./ui/EmptyState.jsx";` và `import StatusChip from "./ui/StatusChip.jsx";`

- [ ] **Step 3: Xoá màn bài tập cũ**

Xoá toàn bộ khối `{v.isAssignment && ( … )}` (dòng 179–210) khỏi `StudentLibraryWorkScreens.jsx`, cùng các khoá `v` chỉ phục vụ nó trong `useStudentLogic.js`: `isAssignment`, `asgTitle`, `asgCls`, `asgDue`, `asgChecklist`, `submitted`, `notSubmitted`, `submitAsg`.

- [ ] **Step 4: Tạo `src/screens/StudentWorkScreens.jsx` với màn chi tiết**

```jsx
import { css } from "../css.js";
import EmptyState from "./ui/EmptyState.jsx";
import FilePicker from "./ui/FilePicker.jsx";
import StatusChip from "./ui/StatusChip.jsx";

function BackButton({ onClick }) {
  return (
    <div onClick={onClick} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div style={css(`flex:1;min-width:0;padding:11px 12px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
      <div style={css(`font-size:10.5px;color:#617789`)}>{label}</div>
      <div style={css(`font-size:14px;font-weight:600;color:#455771;margin-top:3px`)}>{value}</div>
    </div>
  );
}

export default function StudentWorkScreens({ v }) {
  if (!v.isAssignmentDetail) return null;
  if (!v.asg) {
    return (
      <div style={css(`padding:6px 20px 40px`)}>
        <BackButton onClick={v.back} />
        <EmptyState title={v.t(`Không tìm thấy bài tập`)} desc={v.t(`Bài tập có thể đã bị gỡ khỏi lớp.`)} />
      </div>
    );
  }

  const gate = v.asgGate;

  return (
    <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
      <BackButton onClick={v.back} />

      <div style={css(`margin-top:16px;display:flex;align-items:center;gap:8px`)}>
        <StatusChip status={v.asgStatus} t={v.t} />
        <span style={css(`font-size:11px;color:#617789`)}>{v.asg.typeLabel}</span>
      </div>
      <div style={css(`margin-top:8px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.asg.className}</div>
      <div style={css(`font-size:20px;font-weight:700;color:#455771;line-height:1.32;margin-top:7px;text-wrap:pretty`)}>{v.asg.title}</div>

      <div style={css(`margin-top:14px;display:flex;gap:9px`)}>
        <Fact label={v.t(`Hạn nộp`)} value={v.asg.dueLabel} />
        <Fact label={v.t(`Điểm tối đa`)} value={v.asg.maxScore} />
        <Fact label={v.t(`Số lượt còn lại`)} value={v.asg.attemptsLeftLabel} />
      </div>
      <div style={css(`margin-top:9px;font-size:11.5px;color:#617789`)}>
        {v.t(`Mở lúc`)} {v.asg.openLabel} · {v.t(v.asg.allowLateLabel)} · {v.t(`Điểm đạt`)} {v.asg.passingScore}
      </div>

      <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Yêu cầu bài làm`)}</div>
      <div style={css(`margin-top:9px;padding:13px 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.asg.instructions}</div>
      <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
        {v.asg.checklist.map((c, i) => (
          <div key={i} style={css(`display:flex;gap:11px;align-items:flex-start;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
            <div style={css(`width:7px;height:7px;flex:none;border-radius:999px;background:#00aaab;margin-top:6px`)}></div>
            <span style={css(`font-size:13px;line-height:1.5;color:#455771`)}>{c.text}</span>
          </div>
        ))}
      </div>

      {v.asg.attachments.length > 0 && (
        <>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tệp giáo viên đính kèm`)}</div>
          <div style={css(`margin-top:9px`)}><FilePicker files={v.asg.attachments} readOnly /></div>
        </>
      )}

      {v.asg.criteria.length > 0 && (
        <>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
          <div style={css(`margin-top:9px;display:flex;flex-direction:column;gap:8px`)}>
            {v.asg.criteria.map((c) => (
              <div key={c.code} style={css(`display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <span style={css(`flex:1;min-width:0;font-size:12.5px;color:#455771;line-height:1.45`)}>{c.name}</span>
                <span style={css(`flex:none;font-size:12.5px;font-weight:600;color:#00708f`)}>{c.maxPoints} đ</span>
              </div>
            ))}
          </div>
        </>
      )}

      {v.asgSubmission && (
        <div onClick={v.toSubmissionResult} style={css(`margin-top:18px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;display:flex;align-items:center;gap:11px;cursor:pointer`)}>
          <div style={css(`flex:1;min-width:0`)}>
            <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Kết quả bài làm`)}</div>
            <div style={css(`font-size:11.5px;color:#617789;margin-top:3px`)}>{v.t(`Lần nộp`)} {v.asgSubmission.attemptNumber}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2" strokeLinecap="round"><path d="M9.5 5l7 7-7 7" /></svg>
        </div>
      )}

      {gate.allowed ? (
        <div onClick={v.toAssignmentSubmit} style={css(`margin-top:20px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>
          {v.asgSubmission ? v.t(`Nộp lại`) : v.t(`Nộp bài`)}
        </div>
      ) : (
        <div style={css(`margin-top:20px;height:54px;border-radius:16px;background:#f1f5f7;color:#8ba0ae;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center`)}>
          {v.t(gate.reasonLabel)}
        </div>
      )}
      {gate.allowed && gate.willBeLate && (
        <div style={css(`margin-top:10px;padding:11px 13px;border:1px solid #fbe0b3;background:#fff5e6;border-radius:14px;font-size:12px;color:#b45309;line-height:1.5`)}>
          {v.t(`Bài sẽ được ghi nhận là nộp muộn.`)}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 5: Gắn màn mới vào `App.jsx`**

Thêm import và đặt component ngay sau `StudentLibraryWorkScreens`:

```jsx
import StudentWorkScreens from "./screens/StudentWorkScreens.jsx";
```

```jsx
        <StudentLibraryWorkScreens v={v} />
        <StudentWorkScreens v={v} />
```

- [ ] **Step 6: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công.

`npm run dev`, rồi kiểm tra bằng tay:
1. Vai trò Học sinh → Lớp học → tab **Việc cần làm**: thấy "Bài tập tuần 20" (Chưa làm) và "Trắc nghiệm: Cấu tạo tế bào" (Chưa làm) và "Dự án nhóm" (Chưa làm).
2. Tab **Điểm số**: thấy "Bài tập tuần 19" với nhãn Đã chấm và điểm 8.5.
3. Mở "Bài tập tuần 20": thấy hạn 17/05 · 23:59, điểm tối đa 10, lượt còn lại 2/2, 3 tiêu chí rubric, 1 tệp đính kèm, nút **Nộp bài** bật.
4. Mở "Trắc nghiệm: Cấu tạo tế bào": `allowLate` tắt và hạn 18/05 vẫn còn → nút Nộp bài vẫn bật.
5. Đổi `nowIso` trong `useAppState.js` tạm thành `"2026-05-19T09:00:00"`, tải lại: bài Trắc nghiệm chuyển sang nút xám **Đã quá hạn nộp**, còn bài tuần 20 vẫn nộp được kèm cảnh báo nộp muộn. Trả `nowIso` về `"2026-05-16T09:00:00"` sau khi kiểm tra xong.

- [ ] **Step 7: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/screens src/logic/useStudentLogic.js src/App.jsx && git commit -m "feat(student): danh sách và chi tiết bài tập theo trạng thái thật"
```

---

## Task 9: Học sinh — màn soạn và nộp bài

**Files:**
- Modify: `src/screens/StudentWorkScreens.jsx`
- Modify: `src/logic/useStudentLogic.js`

**Interfaces:**
- Consumes: `applySubmit` (Task 2), `ctx.upsertSubmission` (Task 7), `ConfirmSheet`, `FilePicker` (Task 6)
- Produces (thêm vào `v`):
  - `isAssignmentSubmit: boolean`
  - `draftText: string`, `setDraftText(text): void`
  - `draftFiles: Array<{name,size,kind}>`, `addDraftFile(): void`, `removeDraftFile(index): void`
  - `draftSavedLabel: string` — rỗng khi chưa lưu nháp
  - `saveDraft(): void`
  - `submitConfirmOpen: boolean`, `openSubmitConfirm(): void`, `closeSubmitConfirm(): void`, `confirmSubmit(): void`
  - `canConfirmSubmit: boolean` — bài rỗng thì không cho nộp

- [ ] **Step 1: Thêm state nháp vào `INITIAL_STUDENT`**

```js
  draftText: "",
  draftFiles: [],
  draftSavedAtIso: null,
  submitConfirmOpen: false,
```

- [ ] **Step 2: Thêm logic nộp bài**

Trong `src/logic/useStudentLogic.js`, thêm import `applySubmit` và các khoá sau vào object trả về:

```js
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
    draftSavedLabel: ctx.s.draftSavedAtIso ? `Đã lưu nháp ${fmt(ctx.s.draftSavedAtIso)}` : "",
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
```

`ctx.replace` thay vì `push` là có chủ đích: sau khi nộp, nút quay lại phải về chi tiết bài tập chứ không quay lại màn soạn đã mất dữ liệu.

- [ ] **Step 3: Thêm màn soạn bài vào `StudentWorkScreens.jsx`**

Đổi đầu component từ `if (!v.isAssignmentDetail) return null;` thành `if (!v.isAssignmentDetail && !v.isAssignmentSubmit && !v.isSubmissionResult && !v.isSubmissionHistory) return null;`, bọc phần thân hiện tại trong `{v.isAssignmentDetail && ( … )}`, rồi thêm khối sau (import `ConfirmSheet` ở đầu tệp):

```jsx
      {v.isAssignmentSubmit && v.asg && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.asg.className}</div>
          <div style={css(`font-size:19px;font-weight:700;color:#455771;line-height:1.32;margin-top:6px;text-wrap:pretty`)}>{v.asg.title}</div>

          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Bài làm của bạn`)}</div>
          <textarea
            value={v.draftText}
            onChange={(e) => v.setDraftText(e.target.value)}
            placeholder={v.t(`Nhập bài làm của bạn...`)}
            style={css(`margin-top:10px;width:100%;box-sizing:border-box;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:150px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)}
          />

          <div style={css(`margin-top:14px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Đính kèm tệp`)}</div>
          <div style={css(`margin-top:9px`)}>
            <FilePicker
              files={v.draftFiles}
              onAdd={v.addDraftFile}
              onRemove={v.removeDraftFile}
              addLabel={v.t(`Đính kèm tệp`)}
              addHint={v.t(`Ảnh, PDF hoặc tài liệu, tối đa 20MB`)}
            />
          </div>

          {v.draftSavedLabel && (
            <div style={css(`margin-top:12px;font-size:11.5px;color:#15803d`)}>{v.draftSavedLabel}</div>
          )}

          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.saveDraft} style={css(`width:126px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Lưu nháp`)}</div>
            <div
              onClick={v.canConfirmSubmit ? v.openSubmitConfirm : undefined}
              style={css(`flex:1;height:52px;border-radius:16px;background:${v.canConfirmSubmit ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.canConfirmSubmit ? "pointer" : "default"}`)}
            >
              {v.t(`Nộp bài`)}
            </div>
          </div>

          <ConfirmSheet
            open={v.submitConfirmOpen}
            title={v.t(`Xác nhận nộp bài`)}
            desc={v.asgGate.willBeLate ? v.t(`Bài sẽ được ghi nhận là nộp muộn.`) : v.t(`Sau khi nộp bạn không sửa được nữa.`)}
            confirmLabel={v.t(`Nộp bài`)}
            cancelLabel={v.t(`Hủy`)}
            tone={v.asgGate.willBeLate ? "warning" : "accent"}
            onConfirm={v.confirmSubmit}
            onCancel={v.closeSubmitConfirm}
          />
        </div>
      )}
```

- [ ] **Step 4: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công.

`npm run dev`, kiểm tra bằng tay:
1. Học sinh → Lớp học → "Bài tập tuần 20" → **Nộp bài** → màn soạn hiện đúng tên bài.
2. Chưa nhập gì: nút Nộp bài mờ và không bấm được.
3. Nhập một đoạn văn → nút bật; bấm **Lưu nháp** → hiện dòng "Đã lưu nháp 16/05 · 09:00".
4. Thêm hai tệp rồi xoá một tệp → danh sách cập nhật đúng.
5. Bấm **Nộp bài** → sheet xác nhận hiện, nội dung là "Sau khi nộp bạn không sửa được nữa." (chưa quá hạn).
6. Xác nhận → chuyển sang màn kết quả; bấm quay lại → về **chi tiết bài tập**, không quay lại màn soạn.
7. Quay ra tab **Việc cần làm**: bài tuần 20 đã biến mất; sang tab **Đã nộp** thấy bài với nhãn *Đã nộp*.

- [ ] **Step 5: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/screens/StudentWorkScreens.jsx src/logic/useStudentLogic.js && git commit -m "feat(student): màn soạn và nộp bài kèm nháp, đính kèm và xác nhận"
```

---

## Task 10: Học sinh — kết quả bài làm, rubric và lịch sử nộp

**Files:**
- Modify: `src/screens/StudentWorkScreens.jsx`
- Modify: `src/logic/useStudentLogic.js`

**Interfaces:**
- Consumes: `rubricTotal`, `rubricMax` (Task 3); `SUBMISSION_STATUS` (Task 2)
- Produces (thêm vào `v`):
  - `isSubmissionResult: boolean`, `isSubmissionHistory: boolean`
  - `resultView: { statusLabelKey, submittedLabel, isLate, scoreLabel, maxScoreLabel, passed, feedback, answerText, attachments, criteriaRows, totalLabel } | null` với `criteriaRows: Array<{ code, name, earned, max }>`
  - `resultIsReturned: boolean`
  - `historyRows: Array<{ attemptNumber, submittedLabel, statusLabel, status, scoreLabel }>`

Ghi chú thiết kế: prototype giữ **một bản ghi bài nộp cho mỗi cặp (bài tập, học sinh)** và tăng `attemptNumber` mỗi lần nộp, đúng như backend. Vì vậy màn lịch sử dựng danh sách từ `attemptNumber` hiện tại trở về 1, các lượt trước hiển thị nhãn "Đã thay thế" — không giả vờ có nội dung cũ mà dữ liệu không có.

- [ ] **Step 1: Thêm logic kết quả và lịch sử**

Trong `src/logic/useStudentLogic.js`, thêm import `rubricMax, rubricTotal` từ `./gradebook.js` và bổ sung vào object trả về:

```js
    isSubmissionResult: ctx.screen === "submissionResult",
    isSubmissionHistory: ctx.screen === "submissionHistory",
    resultIsReturned: currentSub?.status === S.RETURNED,
    resultView: currentSub && currentAsg && (() => {
      const criteriaRows = (rubric?.criteria ?? []).map((c) => ({
        code: c.code,
        name: c.name,
        earned: currentSub.criteriaScores?.[c.code] ?? 0,
        max: c.maxPoints,
      }));
      const graded = currentSub.status === S.GRADED;
      return {
        submittedLabel: fmt(currentSub.submittedAtIso),
        isLate: !!currentSub.isLate,
        scoreLabel: graded ? String(currentSub.finalScore) : "—",
        maxScoreLabel: String(currentAsg.maxScore),
        passed: graded && currentSub.finalScore >= currentAsg.passingScore,
        feedback: currentSub.feedback ?? "",
        answerText: currentSub.answerText ?? "",
        attachments: currentSub.attachments ?? [],
        criteriaRows,
        totalLabel: criteriaRows.length
          ? `${rubricTotal(criteriaRows.map((r) => ({ earnedPoints: r.earned })))} / ${rubricMax(criteriaRows.map((r) => ({ maxPoints: r.max })))}`
          : "",
      };
    })(),
    historyRows: currentSub
      ? Array.from({ length: currentSub.attemptNumber }, (_, i) => {
          const n = currentSub.attemptNumber - i;
          const isCurrent = n === currentSub.attemptNumber;
          return {
            attemptNumber: n,
            submittedLabel: isCurrent ? fmt(currentSub.submittedAtIso) : "",
            status: isCurrent ? currentSub.status : S.SUBMITTED,
            statusLabel: isCurrent ? "" : "Đã thay thế",
            scoreLabel:
              isCurrent && typeof currentSub.finalScore === "number" ? String(currentSub.finalScore) : "",
          };
        })
      : [],
```

- [ ] **Step 2: Thêm hai màn vào `StudentWorkScreens.jsx`**

```jsx
      {v.isSubmissionResult && v.resultView && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;display:flex;align-items:center;gap:8px`)}>
            <StatusChip status={v.asgStatus} t={v.t} />
            {v.resultView.isLate && <span style={css(`font-size:11px;color:#b45309`)}>{v.t(`Nộp muộn`)}</span>}
          </div>
          <div style={css(`font-size:19px;font-weight:700;color:#455771;line-height:1.32;margin-top:8px;text-wrap:pretty`)}>{v.asg.title}</div>
          <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{v.t(`Lần nộp`)} {v.asgSubmission.attemptNumber} · {v.resultView.submittedLabel}</div>

          <div style={css(`margin-top:16px;padding:18px;border-radius:20px;background:${v.resultIsReturned ? "#fdeef5" : "#eaf6f8"};display:flex;align-items:center;gap:16px`)}>
            <div style={css(`font-size:38px;font-weight:700;color:${v.resultIsReturned ? "#b13a75" : "#00708f"};line-height:1`)}>{v.resultView.scoreLabel}</div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:12px;color:#617789`)}>{v.t(`Điểm tối đa`)} {v.resultView.maxScoreLabel}</div>
              {v.resultView.scoreLabel !== "—" && (
                <div style={css(`margin-top:4px;font-size:13px;font-weight:600;color:${v.resultView.passed ? "#15803d" : "#b45309"}`)}>
                  {v.resultView.passed ? v.t(`Đạt`) : v.t(`Chưa đạt`)}
                </div>
              )}
            </div>
          </div>

          {v.resultIsReturned && (
            <div style={css(`margin-top:12px;padding:14px;border:1.4px solid #f3c6dd;border-radius:16px;background:#fff`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#b13a75`)}>{v.t(`Giáo viên đã trả bài`)}</div>
              <div style={css(`font-size:12.5px;line-height:1.6;color:#455771;margin-top:6px;text-wrap:pretty`)}>{v.resultView.feedback}</div>
              <div onClick={v.toAssignmentSubmit} style={css(`margin-top:14px;height:46px;border-radius:14px;background:#00aaab;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Nộp lại`)}</div>
            </div>
          )}

          {!v.resultIsReturned && v.resultView.feedback && (
            <>
              <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Nhận xét của giáo viên`)}</div>
              <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.resultView.feedback}</div>
            </>
          )}

          {v.resultView.criteriaRows.length > 0 && (
            <>
              <div style={css(`margin-top:18px;display:flex;align-items:baseline;justify-content:space-between`)}>
                <div style={css(`font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
                <div style={css(`font-size:12.5px;font-weight:600;color:#00708f`)}>{v.resultView.totalLabel}</div>
              </div>
              <div style={css(`margin-top:9px;display:flex;flex-direction:column;gap:8px`)}>
                {v.resultView.criteriaRows.map((r) => (
                  <div key={r.code} style={css(`padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                    <div style={css(`display:flex;align-items:center;gap:10px`)}>
                      <span style={css(`flex:1;min-width:0;font-size:12.5px;color:#455771;line-height:1.45`)}>{r.name}</span>
                      <span style={css(`flex:none;font-size:12.5px;font-weight:600;color:#00708f`)}>{r.earned} / {r.max}</span>
                    </div>
                    <div style={css(`margin-top:8px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}>
                      <div style={css(`height:100%;width:${r.max ? Math.round((r.earned / r.max) * 100) : 0}%;border-radius:999px;background:#00aaab`)}></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Bài làm của bạn`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.resultView.answerText}</div>
          {v.resultView.attachments.length > 0 && (
            <div style={css(`margin-top:11px`)}><FilePicker files={v.resultView.attachments} readOnly /></div>
          )}

          <div onClick={v.toSubmissionHistory} style={css(`margin-top:18px;height:48px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Lịch sử nộp bài`)}</div>
        </div>
      )}

      {v.isSubmissionHistory && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Lịch sử nộp bài`)}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px;text-wrap:pretty`)}>{v.asg?.title}</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            {v.historyRows.map((r) => (
              <div key={r.attemptNumber} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:34px;height:34px;flex:none;border-radius:999px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#00708f`)}>{r.attemptNumber}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.t(`Lần nộp`)} {r.attemptNumber}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{r.submittedLabel || v.t(r.statusLabel)}</div>
                </div>
                {r.scoreLabel && <div style={css(`font-size:17px;font-weight:700;color:#00708f;flex:none`)}>{r.scoreLabel}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
```

- [ ] **Step 3: Bổ sung bản dịch còn thiếu**

Thêm vào `src/i18n/shards/grading.js`:

```js
  "Đạt": "Passed",
  "Chưa đạt": "Not passed",
  "Đã thay thế": "Replaced",
  "Nhập bài làm của bạn...": "Enter your work...",
  "Không tìm thấy bài tập": "Assignment not found",
  "Bài tập có thể đã bị gỡ khỏi lớp.": "This assignment may have been removed from the class.",
  "Bài tập giáo viên giao sẽ hiện ở đây.": "Assignments from your teacher will appear here.",
```

- [ ] **Step 4: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công.

`npm run dev`, kiểm tra bằng tay:
1. Tab **Điểm số** → "Bài tập tuần 19" → màn kết quả hiện điểm 8.5, nhãn **Đạt**, ba tiêu chí với tổng "8.5 / 10", nhận xét "Trình bày rõ, thiếu kết luận."
2. Bấm **Lịch sử nộp bài** → thấy đúng 1 lượt.
3. Nộp bài tuần 20 (theo Task 9) → màn kết quả hiện điểm "—", chưa có nhận xét, không có nhãn Đạt/Chưa đạt.

- [ ] **Step 5: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/screens/StudentWorkScreens.jsx src/logic/useStudentLogic.js src/i18n/shards/grading.js && git commit -m "feat(student): màn kết quả bài làm theo rubric và lịch sử nộp"
```

---

## Task 11: Giáo viên — trình soạn rubric

**Files:**
- Create: `src/screens/TeacherGradingScreens.jsx`
- Modify: `src/logic/useTeacherLogic.js`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `isRubricWeightValid`, `rubricMax` (Task 3); `ctx.addRubric` (Task 7)
- Produces (thêm vào `v`):
  - `isTRubricEditor: boolean`
  - `rubricDraft: { name: string, criteria: Array<{code,name,maxPoints,weightPercent}> }`
  - `setRubricName(name): void`
  - `setCriterion(index, field, value): void` — `field` thuộc `"name" | "maxPoints" | "weightPercent"`
  - `addCriterion(): void`, `removeCriterion(index): void`
  - `rubricWeightTotal: number`, `rubricMaxTotal: number`, `rubricValid: boolean`
  - `saveRubric(): void` — lưu vào state rồi `pop()`
  - `toTRubricEditor(): void`

- [ ] **Step 1: Thêm state nháp rubric vào `INITIAL_TEACHER`**

```js
  rubricDraft: {
    name: "Rubric mới",
    criteria: [
      { code: "C1", name: "", maxPoints: 5, weightPercent: 50 },
      { code: "C2", name: "", maxPoints: 5, weightPercent: 50 },
    ],
  },
```

- [ ] **Step 2: Thêm logic rubric**

Trong `src/logic/useTeacherLogic.js`, thêm import `isRubricWeightValid, rubricMax` từ `./gradebook.js` và bổ sung:

```js
  const draft = ctx.s.rubricDraft;
```

```js
    isTRubricEditor: ctx.screen === "tRubricEditor",
    toTRubricEditor: () => ctx.push("tRubricEditor"),
    rubricDraft: draft,
    rubricWeightTotal: draft.criteria.reduce((sum, c) => sum + (c.weightPercent || 0), 0),
    rubricMaxTotal: rubricMax(draft.criteria),
    rubricValid: isRubricWeightValid(draft.criteria) && draft.criteria.every((c) => c.name.trim()),
    setRubricName: (name) => ctx.setState((prev) => ({ rubricDraft: { ...prev.rubricDraft, name } })),
    setCriterion: (index, field, value) =>
      ctx.setState((prev) => ({
        rubricDraft: {
          ...prev.rubricDraft,
          criteria: prev.rubricDraft.criteria.map((c, i) =>
            i === index ? { ...c, [field]: field === "name" ? value : Number(value) || 0 } : c
          ),
        },
      })),
    addCriterion: () =>
      ctx.setState((prev) => ({
        rubricDraft: {
          ...prev.rubricDraft,
          criteria: [
            ...prev.rubricDraft.criteria,
            { code: `C${prev.rubricDraft.criteria.length + 1}`, name: "", maxPoints: 2, weightPercent: 0 },
          ],
        },
      })),
    removeCriterion: (index) =>
      ctx.setState((prev) => ({
        rubricDraft: {
          ...prev.rubricDraft,
          criteria: prev.rubricDraft.criteria.filter((_, i) => i !== index),
        },
      })),
    saveRubric: () => {
      const id = Math.max(0, ...ctx.s.rubrics.map((r) => r.id)) + 1;
      ctx.addRubric({ id, name: draft.name, criteria: draft.criteria });
      // Bài tập đang soạn dở nhận luôn rubric vừa tạo, tránh bắt giáo viên chọn lại.
      ctx.setState({ caRubricId: id });
      ctx.pop();
    },
```

- [ ] **Step 3: Tạo `src/screens/TeacherGradingScreens.jsx`**

```jsx
import { css } from "../css.js";
import EmptyState from "./ui/EmptyState.jsx";
import SegmentedTabs from "./ui/SegmentedTabs.jsx";
import StatusChip from "./ui/StatusChip.jsx";

function BackButton({ onClick }) {
  return (
    <div onClick={onClick} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", width }) {
  return (
    <div style={css(width ? `width:${width};flex:none` : `flex:1;min-width:0`)}>
      <div style={css(`font-size:11px;color:#617789;margin-bottom:5px`)}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={css(`width:100%;box-sizing:border-box;height:42px;padding:0 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:13px;color:#455771;font-family:inherit;outline:none`)}
      />
    </div>
  );
}

export default function TeacherGradingScreens({ v }) {
  return (
    <>
      {v.isTRubricEditor && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px;text-wrap:pretty`)}>{v.t(`Chia điểm theo tiêu chí để chấm nhất quán giữa các bài.`)}</div>

          <div style={css(`margin-top:16px`)}>
            <Field label={v.t(`Tên bộ tiêu chí`)} value={v.rubricDraft.name} onChange={v.setRubricName} />
          </div>

          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
            {v.rubricDraft.criteria.map((c, i) => (
              <div key={i} style={css(`padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
                  <span style={css(`font-size:11.5px;font-weight:700;color:#00708f`)}>{c.code}</span>
                  <div onClick={() => v.removeCriterion(i)} style={css(`width:26px;height:26px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </div>
                </div>
                <div style={css(`margin-top:9px`)}>
                  <Field label={v.t(`Nội dung tiêu chí`)} value={c.name} onChange={(val) => v.setCriterion(i, "name", val)} />
                </div>
                <div style={css(`margin-top:9px;display:flex;gap:9px`)}>
                  <Field label={v.t(`Điểm tối đa`)} type="number" value={c.maxPoints} onChange={(val) => v.setCriterion(i, "maxPoints", val)} />
                  <Field label={v.t(`Trọng số %`)} type="number" value={c.weightPercent} onChange={(val) => v.setCriterion(i, "weightPercent", val)} />
                </div>
              </div>
            ))}
          </div>

          <div onClick={v.addCriterion} style={css(`margin-top:12px;height:46px;border-radius:14px;border:1.4px dashed #bcd7e0;background:#f8fcfd;color:#00708f;font-size:13.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Thêm tiêu chí`)}</div>

          <div style={css(`margin-top:16px;padding:13px;border-radius:14px;background:${v.rubricValid ? "#f0fdf4" : "#fff5e6"};display:flex;align-items:center;justify-content:space-between`)}>
            <span style={css(`font-size:12.5px;color:${v.rubricValid ? "#15803d" : "#b45309"}`)}>
              {v.rubricValid ? v.t(`Hợp lệ`) : v.t(`Trọng số phải cộng đủ 100%`)}
            </span>
            <span style={css(`font-size:12.5px;font-weight:600;color:${v.rubricValid ? "#15803d" : "#b45309"}`)}>{v.rubricWeightTotal}% · {v.rubricMaxTotal} đ</span>
          </div>

          <div
            onClick={v.rubricValid ? v.saveRubric : undefined}
            style={css(`margin-top:18px;height:52px;border-radius:16px;background:${v.rubricValid ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.rubricValid ? "pointer" : "default"}`)}
          >
            {v.t(`Lưu bộ tiêu chí`)}
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 4: Gắn vào `App.jsx`**

```jsx
import TeacherGradingScreens from "./screens/TeacherGradingScreens.jsx";
```

```jsx
        <TeacherScreens v={v} />
        <TeacherGradingScreens v={v} />
```

- [ ] **Step 5: Bổ sung bản dịch**

Thêm vào `src/i18n/shards/grading.js`:

```js
  "Chia điểm theo tiêu chí để chấm nhất quán giữa các bài.": "Split points by criteria so grading stays consistent.",
  "Tên bộ tiêu chí": "Rubric name",
  "Nội dung tiêu chí": "Criterion",
  "Trọng số %": "Weight %",
  "Thêm tiêu chí": "Add criterion",
  "Hợp lệ": "Valid",
  "Lưu bộ tiêu chí": "Save rubric",
```

- [ ] **Step 6: Kiểm chứng**

Chạy:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && npm run build
```

Kỳ vọng: build thành công. Màn này chưa có lối vào từ giao diện — sẽ nối ở Task 12. Kiểm tra tạm bằng cách sửa `INITIAL_SHARED` để `createNav("tRubricEditor")`, xác nhận: sửa trọng số về tổng 100 và điền tên hai tiêu chí thì dải trạng thái chuyển xanh và nút Lưu bật; thêm tiêu chí thứ ba làm tổng khác 100 thì nút tắt lại. Hoàn tác thay đổi `createNav` sau khi kiểm tra.

- [ ] **Step 7: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/screens src/logic/useTeacherLogic.js src/App.jsx src/i18n/shards/grading.js && git commit -m "feat(teacher): trình soạn rubric kèm kiểm tra trọng số"
```

---

## Task 12: Giáo viên — màn tạo bài tập đầy đủ tham số

**Files:**
- Modify: `src/logic/useTeacherLogic.js`
- Modify: `src/screens/TeacherScreens.jsx` (thay khối `v.isTCreateAssignment`)

**Interfaces:**
- Consumes: `ASSIGNMENT_TYPE`, `ASSIGNMENT_TYPE_LABEL`, `ROSTER` (Task 7); `ctx.addAssignment` (Task 7); `toTRubricEditor` (Task 11)
- Produces (thêm vào `v`):
  - `caTitle, caInstructions` + setter `setCaField(field, value)`
  - `caTypeOptions: Array<{label, selected, onClick}>`
  - `caClasses` — giữ tên cũ, vẫn là danh sách lớp chọn được
  - `caDueOptions` — giữ tên cũ, nay sinh ra `dueAtIso` thật
  - `caAllowLate: boolean`, `toggleCaAllowLate(): void`
  - `caMaxAttempts, caMaxScore, caPassingScore` + dùng chung `setCaField`
  - `caRubricOptions: Array<{label, selected, onClick}>` — kèm mục "Không dùng tiêu chí"
  - `caTargetMode: "all" | "some"`, `setCaTargetMode(mode): void`
  - `caTargets: Array<{id, name, selected, onClick}>`
  - `caValid: boolean`
  - `createAssignment(): void` — giữ tên cũ nhưng nay ghi vào `state.assignments`

- [ ] **Step 1: Mở rộng `INITIAL_TEACHER`**

Thay các khoá `caTitle, caCls, caDue` cũ bằng:

```js
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
```

- [ ] **Step 2: Thêm logic tạo bài tập**

```js
  // "1 tuần" -> hạn nộp tuyệt đối tính từ nowIso của prototype.
  const DUE_DAYS = { "3 ngày": 3, "1 tuần": 7, "2 tuần": 14 };
  function addDaysIso(iso, days) {
    const d = new Date(`${iso}Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return `${d.toISOString().slice(0, 10)}T23:59:00`;
  }
```

```js
    caTitle: ctx.s.caTitle,
    caInstructions: ctx.s.caInstructions,
    caMaxAttempts: String(ctx.s.caMaxAttempts),
    caMaxScore: String(ctx.s.caMaxScore),
    caPassingScore: String(ctx.s.caPassingScore),
    caAllowLate: ctx.s.caAllowLate,
    toggleCaAllowLate: () => ctx.setState({ caAllowLate: !ctx.s.caAllowLate }),
    setCaField: (field, value) =>
      ctx.setState({
        [field]: ["caMaxAttempts", "caMaxScore", "caPassingScore"].includes(field)
          ? Number(value) || 0
          : value,
      }),
    caTypeOptions: Object.entries(ASSIGNMENT_TYPE_LABEL).map(([value, label]) => ({
      label,
      selected: ctx.s.caType === Number(value),
      onClick: () => ctx.setState({ caType: Number(value) }),
    })),
    caRubricOptions: [{ id: null, name: "Không dùng tiêu chí" }, ...ctx.s.rubrics].map((r) => ({
      label: r.name,
      selected: ctx.s.caRubricId === r.id,
      onClick: () => ctx.setState({ caRubricId: r.id }),
    })),
    caTargetMode: ctx.s.caTargetMode,
    setCaTargetMode: (mode) => ctx.setState({ caTargetMode: mode }),
    caTargets: ROSTER.map((st) => ({
      id: st.id,
      name: st.name,
      selected: ctx.s.caTargetIds.includes(st.id),
      onClick: () =>
        ctx.setState((prev) => ({
          caTargetIds: prev.caTargetIds.includes(st.id)
            ? prev.caTargetIds.filter((x) => x !== st.id)
            : [...prev.caTargetIds, st.id],
        })),
    })),
    caValid:
      ctx.s.caTitle.trim().length > 0 &&
      ctx.s.caCls.length > 0 &&
      (ctx.s.caTargetMode === "all" || ctx.s.caTargetIds.length > 0),
    createAssignment: () => {
      const cls = ctx.s.classesList.find((c) => c.name === ctx.s.caCls);
      const id = Math.max(0, ...ctx.s.assignments.map((a) => a.id)) + 1;
      ctx.addAssignment({
        id,
        classId: cls?.id ?? 1,
        className: ctx.s.caCls,
        title: ctx.s.caTitle,
        type: ctx.s.caType,
        instructions: ctx.s.caInstructions,
        checklist: [],
        openAtIso: ctx.s.nowIso,
        dueAtIso: addDaysIso(ctx.s.nowIso, DUE_DAYS[ctx.s.caDue] ?? 7),
        allowLate: ctx.s.caAllowLate,
        maxAttempts: ctx.s.caMaxAttempts,
        maxScore: ctx.s.caMaxScore,
        passingScore: ctx.s.caPassingScore,
        rubricId: ctx.s.caRubricId,
        targetStudentIds: ctx.s.caTargetMode === "all" ? null : ctx.s.caTargetIds,
        attachments: [],
        isPublished: true,
        totalStudents: Number(cls?.students ?? 32),
      });
      ctx.setState({ caTitle: "", caInstructions: "", caTargetIds: [], caTargetMode: "all" });
      ctx.resetTo("tClasses");
    },
```

`ctx.s.classesList` là danh sách lớp giáo viên đang dạy — nếu hook hiện dùng tên khác (`T_CLASSES` nhập trực tiếp), dùng đúng tên đó và bỏ dòng tra `cls`, gán `classId: 1`.

- [ ] **Step 3: Viết lại màn tạo bài tập**

Thay toàn bộ khối `{v.isTCreateAssignment && ( … )}` trong `src/screens/TeacherScreens.jsx` bằng:

```jsx
      {v.isTCreateAssignment && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
          </div>
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Tạo bài tập`)}</div>

          <div style={css(`margin-top:16px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Tiêu đề`)}</div>
          <input value={v.caTitle} onChange={(e) => v.setCaField("caTitle", e.target.value)} placeholder={v.t(`Ví dụ: Bài tập tuần 21`)}
            style={css(`margin-top:8px;width:100%;box-sizing:border-box;height:46px;padding:0 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;font-size:13.5px;color:#455771;font-family:inherit;outline:none`)} />

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Hướng dẫn`)}</div>
          <textarea value={v.caInstructions} onChange={(e) => v.setCaField("caInstructions", e.target.value)}
            style={css(`margin-top:8px;width:100%;box-sizing:border-box;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;min-height:88px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)} />

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Loại bài tập`)}</div>
          <div style={css(`margin-top:8px;display:flex;flex-wrap:wrap;gap:8px`)}>
            {v.caTypeOptions.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:36px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#455771"};border-radius:999px;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Lớp học`)}</div>
          <div style={css(`margin-top:8px;display:flex;flex-wrap:wrap;gap:8px`)}>
            {v.caClasses.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:36px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#455771"};border-radius:999px;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Hạn nộp`)}</div>
          <div style={css(`margin-top:8px;display:flex;gap:8px`)}>
            {v.caDueOptions.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`flex:1;height:38px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#455771"};border-radius:12px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{o.label}</div>
            ))}
          </div>

          <div onClick={v.toggleCaAllowLate} style={css(`margin-top:14px;display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;cursor:pointer`)}>
            <div style={css(`flex:1;font-size:13px;color:#455771`)}>{v.t(`Cho phép nộp muộn`)}</div>
            <div style={css(`position:relative;width:42px;height:24px;border-radius:999px;background:${v.caAllowLate ? "#00aaab" : "#dbe7ec"};flex:none`)}>
              <div style={css(`position:absolute;top:2px;left:${v.caAllowLate ? "22px" : "2px"};width:20px;height:20px;border-radius:999px;background:#fff;transition:left .18s`)}></div>
            </div>
          </div>

          <div style={css(`margin-top:14px;display:flex;gap:9px`)}>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:11px;color:#617789;margin-bottom:5px`)}>{v.t(`Số lượt tối đa`)}</div>
              <input type="number" value={v.caMaxAttempts} onChange={(e) => v.setCaField("caMaxAttempts", e.target.value)} style={css(`width:100%;box-sizing:border-box;height:42px;padding:0 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:13px;color:#455771;font-family:inherit;outline:none`)} />
            </div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:11px;color:#617789;margin-bottom:5px`)}>{v.t(`Điểm tối đa`)}</div>
              <input type="number" value={v.caMaxScore} onChange={(e) => v.setCaField("caMaxScore", e.target.value)} style={css(`width:100%;box-sizing:border-box;height:42px;padding:0 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:13px;color:#455771;font-family:inherit;outline:none`)} />
            </div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:11px;color:#617789;margin-bottom:5px`)}>{v.t(`Điểm đạt`)}</div>
              <input type="number" value={v.caPassingScore} onChange={(e) => v.setCaField("caPassingScore", e.target.value)} style={css(`width:100%;box-sizing:border-box;height:42px;padding:0 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:13px;color:#455771;font-family:inherit;outline:none`)} />
            </div>
          </div>

          <div style={css(`margin-top:14px;display:flex;align-items:center;justify-content:space-between`)}>
            <span style={css(`font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</span>
            <span onClick={v.toTRubricEditor} style={css(`font-size:12.5px;color:#00708f;cursor:pointer`)}>{v.t(`Tạo mới`)}</span>
          </div>
          <div style={css(`margin-top:8px;display:flex;flex-wrap:wrap;gap:8px`)}>
            {v.caRubricOptions.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:36px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#455771"};border-radius:999px;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Giao cho`)}</div>
          <div style={css(`margin-top:8px;display:flex;gap:8px`)}>
            {[["all", `Cả lớp`], ["some", `Một số học sinh`]].map(([mode, label]) => (
              <div key={mode} onClick={() => v.setCaTargetMode(mode)} style={css(`flex:1;height:38px;border:${v.caTargetMode === mode ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${v.caTargetMode === mode ? "#eaf6f8" : "#fff"};color:${v.caTargetMode === mode ? "#00708f" : "#455771"};border-radius:12px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(label)}</div>
            ))}
          </div>
          {v.caTargetMode === "some" && (
            <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:8px`)}>
              {v.caTargets.map((st) => (
                <div key={st.id} onClick={st.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:11px 13px;border:${st.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${st.selected ? "#eaf6f8" : "#fff"};border-radius:14px;cursor:pointer`)}>
                  <div style={css(`width:20px;height:20px;flex:none;border-radius:6px;border:${st.selected ? "none" : "1.6px solid #ddeaf0"};background:${st.selected ? "#00aaab" : "#fff"};display:flex;align-items:center;justify-content:center`)}>
                    {st.selected && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><path d="M5 12.5L10 17.5 19 6.5" /></svg>}
                  </div>
                  <span style={css(`font-size:13px;color:#455771`)}>{st.name}</span>
                </div>
              ))}
            </div>
          )}

          <div onClick={v.caValid ? v.createAssignment : undefined} style={css(`margin-top:20px;height:54px;border-radius:16px;background:${v.caValid ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.caValid ? "pointer" : "default"}`)}>{v.t(`Giao bài tập`)}</div>
        </div>
      )}
```

- [ ] **Step 4: Bổ sung bản dịch**

Thêm vào `src/i18n/shards/grading.js`:

```js
  "Tạo bài tập": "Create assignment",
  "Tiêu đề": "Title",
  "Ví dụ: Bài tập tuần 21": "Example: Week 21 assignment",
  "Hướng dẫn": "Instructions",
  "Loại bài tập": "Assignment type",
  "Cho phép nộp muộn": "Allow late submission",
  "Không nhận bài muộn": "No late submissions",
  "Số lượt tối đa": "Max attempts",
  "Không dùng tiêu chí": "No rubric",
  "Tạo mới": "Create new",
  "Giao cho": "Assign to",
  "Cả lớp": "Whole class",
  "Một số học sinh": "Selected students",
  "Giao bài tập": "Assign",
```

- [ ] **Step 5: Kiểm chứng luồng chéo hai vai trò**

Chạy `npm run build` (kỳ vọng thành công) rồi `npm run dev`:
1. Vai trò Giáo viên → Trang chủ → **Tạo bài tập**.
2. Nhập tiêu đề "Bài tập tuần 21: Ôn tập", chọn loại **Tự luận ngắn**, chọn lớp **SINH HỌC 8A1**, hạn **3 ngày**, tắt cho phép nộp muộn, chọn rubric "Rubric bài tự luận Sinh học".
3. Chọn **Một số học sinh** nhưng chưa tick ai → nút Giao bài tập mờ. Tick "Nguyễn Thị Hoa" → nút bật.
4. Bấm **Giao bài tập** → về màn Lớp học.
5. Đổi vai trò sang **Học sinh** → Lớp học → tab Việc cần làm → **thấy bài tập vừa giao**, hạn 19/05, ba tiêu chí rubric hiển thị đúng.
6. Quay lại tạo một bài nữa, lần này chọn **Cả lớp** và giao cho lớp KHTN 6A2 → học sinh vẫn thấy vì không giới hạn danh sách.

- [ ] **Step 6: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic/useTeacherLogic.js src/screens/TeacherScreens.jsx src/i18n/shards/grading.js && git commit -m "feat(teacher): tạo bài tập đầy đủ tham số, rubric và giao riêng học sinh"
```

---

## Task 13: Giáo viên — chấm bài theo rubric và trả bài

Mắt xích quan trọng nhất của Giai đoạn 1. Màn `tGrade` cũ chỉ nhập một con số; bản mới chấm theo từng tiêu chí và có đường **trả bài yêu cầu làm lại**.

**Files:**
- Modify: `src/logic/useTeacherLogic.js`
- Modify: `src/screens/TeacherGradingScreens.jsx`
- Modify: `src/screens/TeacherScreens.jsx` (xoá khối `v.isTGrading` và `v.isTGrade` cũ)

**Interfaces:**
- Consumes: `applyGrade`, `applyReturn` (Task 2); `rubricTotal` (Task 3); `ctx.upsertSubmission` (Task 7); `ROSTER`, `SEED_RUBRICS` qua state (Task 7)
- Produces (thêm vào `v`):
  - `isTGrading, isTGrade` — giữ tên cũ
  - `gradingFilterTabs: Array<{label, active, onClick}>` — Chờ chấm / Đã chấm / Nộp muộn / Đã trả
  - `gradingRows: Array<{ id, studentName, initials, tint, submittedLabel, status, attemptLabel, scoreLabel, onClick }>`
  - `gradingProgressLabel: string` — ví dụ "2/5 bài đã chấm"
  - `gradeTarget: { submissionId, studentName, initials, tint, submittedLabel, isLate, attemptNumber, answerText, attachments, assignmentTitle, maxScore } | null`
  - `gradeCriteria: Array<{ code, name, max, earned, onChange(value) }>`
  - `gradeTotalLabel: string`
  - `gradeFeedback: string`, `setGradeFeedback(text): void`
  - `saveGrade(): void`, `returnSubmission(): void` — cả hai `pop()` sau khi ghi
  - `gradeReturnConfirmOpen: boolean`, `openReturnConfirm(): void`, `closeReturnConfirm(): void`

- [ ] **Step 1: Mở rộng `INITIAL_TEACHER`**

Xoá `gradeIdx`, `gradeScore`, `graded`; thêm:

```js
  gradingFilter: "pending",
  gradeDraftScores: {},
  gradeDraftFeedback: "",
  gradeReturnConfirmOpen: false,
```

- [ ] **Step 2: Thêm logic chấm bài**

```js
import { SUBMISSION_STATUS as S, applyGrade, applyReturn } from "./submissionState.js";
import { rubricTotal } from "./gradebook.js";
import { ROSTER } from "../data/coursework.js";

const GRADING_FILTER = {
  pending: (x) => [S.SUBMITTED, S.LATE_SUBMITTED, S.RESUBMITTED].includes(x.status),
  graded: (x) => x.status === S.GRADED,
  late: (x) => x.isLate,
  returned: (x) => x.status === S.RETURNED,
};
```

```js
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
  const draftScores = ctx.s.gradeDraftScores;
  const draftCriteria = (gradingRubric?.criteria ?? []).map((c) => ({
    code: c.code,
    name: c.name,
    max: c.maxPoints,
    earned: draftScores[c.code] ?? 0,
  }));
```

```js
    isTGrading: ctx.screen === "tGrading",
    isTGrade: ctx.screen === "tGrade",
    toTGrading: () => ctx.push("tGrading", { assignmentId: gradingAssignmentId }),
    gradingAssignmentTitle: gradingAssignment?.title ?? "",
    gradingProgressLabel: `${gradingSubs.filter((x) => x.status === S.GRADED).length}/${gradingSubs.length} bài đã chấm`,
    gradingFilterTabs: [
      ["pending", "Chờ chấm"],
      ["graded", "Đã chấm"],
      ["late", "Nộp muộn"],
      ["returned", "Đã trả"],
    ].map(([key, label]) => ({
      label,
      active: ctx.s.gradingFilter === key,
      onClick: () => ctx.setState({ gradingFilter: key }),
    })),
    gradingRows: gradingSubs.filter(GRADING_FILTER[ctx.s.gradingFilter]).map((sub) => {
      const st = studentOf(sub.studentId);
      return {
        id: sub.id,
        studentName: st.name,
        initials: st.initials,
        tint: st.tint,
        submittedLabel: fmtT(sub.submittedAtIso),
        status: sub.status,
        attemptLabel: `Lần ${sub.attemptNumber}`,
        scoreLabel: typeof sub.finalScore === "number" ? String(sub.finalScore) : "",
        onClick: () =>
          ctx.setState({
            gradeDraftScores: { ...sub.criteriaScores },
            gradeDraftFeedback: sub.feedback ?? "",
          }) || ctx.push("tGrade", { assignmentId: gradingAssignmentId, submissionId: sub.id }),
      };
    }),
    gradeTarget: gradeSub && {
      submissionId: gradeSub.id,
      studentName: studentOf(gradeSub.studentId).name,
      initials: studentOf(gradeSub.studentId).initials,
      tint: studentOf(gradeSub.studentId).tint,
      submittedLabel: fmtT(gradeSub.submittedAtIso),
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
        ctx.setState((prev) => ({
          gradeDraftScores: { ...prev.gradeDraftScores, [c.code]: Math.min(c.max, Number(value) || 0) },
        })),
    })),
    gradeTotalLabel: draftCriteria.length
      ? `${rubricTotal(draftCriteria.map((c) => ({ earnedPoints: c.earned })))} / ${gradingAssignment?.maxScore ?? 10}`
      : "",
    gradeFeedback: ctx.s.gradeDraftFeedback,
    setGradeFeedback: (text) => ctx.setState({ gradeDraftFeedback: text }),
    gradeReturnConfirmOpen: ctx.s.gradeReturnConfirmOpen,
    openReturnConfirm: () => ctx.setState({ gradeReturnConfirmOpen: true }),
    closeReturnConfirm: () => ctx.setState({ gradeReturnConfirmOpen: false }),
    saveGrade: () => {
      if (!gradeSub) return;
      const total = rubricTotal(draftCriteria.map((c) => ({ earnedPoints: c.earned })));
      ctx.upsertSubmission({
        ...applyGrade(gradeSub, {
          finalScore: total,
          feedback: ctx.s.gradeDraftFeedback,
          gradedAtIso: ctx.s.nowIso,
        }),
        criteriaScores: { ...draftScores },
      });
      ctx.pop();
    },
    returnSubmission: () => {
      if (!gradeSub) return;
      ctx.upsertSubmission(
        applyReturn(gradeSub, {
          feedback: ctx.s.gradeDraftFeedback,
          returnedAtIso: ctx.s.nowIso,
        })
      );
      ctx.setState({ gradeReturnConfirmOpen: false });
      ctx.pop();
    },
```

`fmtT` là bản sao của hàm `fmt` ở `useStudentLogic.js`. Để không lặp, chuyển hàm này vào `src/logic/formatDate.js` với nội dung:

```js
// "2026-05-17T23:59:00" -> "17/05 · 23:59"
export function fmtDateTime(iso) {
  if (!iso) return "";
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)} · ${iso.slice(11, 16)}`;
}
```

rồi cả `useStudentLogic.js` lẫn `useTeacherLogic.js` import và dùng tên `fmtDateTime` (thay `fmt` và `fmtT`).

- [ ] **Step 3: Xoá hai màn cũ**

Xoá khối `{v.isTGrading && ( … )}` và `{v.isTGrade && ( … )}` khỏi `src/screens/TeacherScreens.jsx`, cùng các khoá `v` chỉ phục vụ chúng: `tGradeSummary`, `tSubmissions`, `subName`, `subAt`, `subAttempt`, `subAnswer`, `subTint`, `gradeScore`, `graded`, `notGraded`, `scoreChips`.

- [ ] **Step 4: Thêm hai màn mới vào `TeacherGradingScreens.jsx`**

Thêm import `ConfirmSheet`, `FilePicker` và hai khối sau vào fragment trả về:

```jsx
      {v.isTGrading && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771;text-wrap:pretty`)}>{v.gradingAssignmentTitle}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px`)}>{v.gradingProgressLabel}</div>
          <div style={css(`margin-top:16px`)}><SegmentedTabs items={v.gradingFilterTabs} /></div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
            {v.gradingRows.length === 0 && <EmptyState title={v.t(`Chưa có bài nộp nào cần chấm`)} />}
            {v.gradingRows.map((r) => (
              <div key={r.id} onClick={r.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${r.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12.5px`)}>{r.initials}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{r.studentName}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{r.submittedLabel} · {v.t(r.attemptLabel)}</div>
                </div>
                {r.scoreLabel
                  ? <div style={css(`font-size:17px;font-weight:700;color:#00708f;flex:none`)}>{r.scoreLabel}</div>
                  : <StatusChip status={r.status} t={v.t} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTGrade && v.gradeTarget && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;display:flex;align-items:center;gap:12px`)}>
            <div style={css(`width:46px;height:46px;flex:none;border-radius:999px;background:${v.gradeTarget.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:15px`)}>{v.gradeTarget.initials}</div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:17px;font-weight:700;color:#455771`)}>{v.gradeTarget.studentName}</div>
              <div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{v.gradeTarget.submittedLabel} · {v.t(`Lần nộp`)} {v.gradeTarget.attemptNumber}</div>
            </div>
            {v.gradeTarget.isLate && <span style={css(`flex:none;height:23px;padding:0 10px;border-radius:999px;background:#fff5e6;color:#b45309;font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Nộp muộn`)}</span>}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Câu trả lời`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.65;color:#455771;text-wrap:pretty`)}>{v.gradeTarget.answerText}</div>
          {v.gradeTarget.attachments.length > 0 && (
            <div style={css(`margin-top:11px`)}><FilePicker files={v.gradeTarget.attachments} readOnly /></div>
          )}

          {v.gradeCriteria.length > 0 ? (
            <>
              <div style={css(`margin-top:18px;display:flex;align-items:baseline;justify-content:space-between`)}>
                <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Chấm theo tiêu chí`)}</div>
                <div style={css(`font-size:14px;font-weight:700;color:#00708f`)}>{v.gradeTotalLabel}</div>
              </div>
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:10px`)}>
                {v.gradeCriteria.map((c) => (
                  <div key={c.code} style={css(`padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`font-size:12.5px;color:#455771;line-height:1.45`)}>{c.name}</div>
                    <div style={css(`margin-top:9px;display:flex;align-items:center;gap:10px`)}>
                      <input type="number" step="0.5" min="0" max={c.max} value={c.earned} onChange={(e) => c.onChange(e.target.value)}
                        style={css(`width:84px;box-sizing:border-box;height:42px;padding:0 12px;border:1.6px solid #00aaab;border-radius:12px;background:#eaf6f8;font-size:15px;font-weight:600;color:#00708f;font-family:inherit;outline:none`)} />
                      <span style={css(`font-size:12.5px;color:#617789`)}>/ {c.max} {v.t(`điểm`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Tổng điểm`)}</div>
              <div style={css(`margin-top:9px;font-size:12.5px;color:#617789`)}>{v.t(`Bài tập này không dùng tiêu chí chấm điểm.`)}</div>
            </>
          )}

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Nhận xét`)}</div>
          <textarea value={v.gradeFeedback} onChange={(e) => v.setGradeFeedback(e.target.value)}
            style={css(`margin-top:9px;width:100%;box-sizing:border-box;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:92px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)} />

          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.saveGrade} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Lưu điểm`)}</div>
            <div onClick={v.openReturnConfirm} style={css(`width:132px;height:52px;border-radius:16px;border:1px solid #f3c6dd;background:#fff;color:#b13a75;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.3;cursor:pointer`)}>{v.t(`Trả bài`)}</div>
          </div>

          <ConfirmSheet
            open={v.gradeReturnConfirmOpen}
            title={v.t(`Trả bài yêu cầu làm lại`)}
            desc={v.t(`Học sinh sẽ thấy bài quay lại mục Việc cần làm kèm nhận xét của bạn. Điểm hiện tại sẽ bị xoá.`)}
            confirmLabel={v.t(`Trả bài`)}
            cancelLabel={v.t(`Hủy`)}
            tone="warning"
            onConfirm={v.returnSubmission}
            onCancel={v.closeReturnConfirm}
          />
        </div>
      )}
```

- [ ] **Step 5: Bổ sung bản dịch**

```js
  "Chờ chấm": "Pending",
  "Đã trả": "Returned",
  "Lần 1": "Attempt 1",
  "Lần 2": "Attempt 2",
  "Lần 3": "Attempt 3",
  "Câu trả lời": "Answer",
  "Nhận xét": "Feedback",
  "điểm": "points",
  "Bài tập này không dùng tiêu chí chấm điểm.": "This assignment has no rubric.",
  "Trả bài": "Return",
  "Học sinh sẽ thấy bài quay lại mục Việc cần làm kèm nhận xét của bạn. Điểm hiện tại sẽ bị xoá.":
    "The student will see this back in To do with your feedback. The current score will be cleared.",
```

- [ ] **Step 6: Kiểm chứng vòng lặp đầy đủ**

Chạy `npm run build` (kỳ vọng thành công) rồi `npm run dev` và đi hết kịch bản:
1. **Học sinh** → nộp "Bài tập tuần 20" theo Task 9.
2. Đổi sang **Giáo viên** → Trang chủ → **Chấm bài** → tab *Chờ chấm* hiện Nguyễn Thị Hoa, Trần Quốc Bảo, Lê Minh Anh.
3. Mở bài của Nguyễn Thị Hoa → chấm C1=3, C2=4, C3=1 → tổng hiện "8 / 10" → nhập nhận xét → **Lưu điểm**.
4. Quay ra: bài chuyển sang tab *Đã chấm* với điểm 8.
5. Đổi sang **Học sinh** → tab Điểm số → thấy bài tuần 20 điểm 8, mở ra thấy đúng ba tiêu chí 3/4/1 và nhận xét.
6. Đổi lại **Giáo viên** → mở bài của Trần Quốc Bảo → nhập nhận xét → **Trả bài** → xác nhận.
7. Bài của Bảo nằm ở tab *Đã trả*. (Học sinh đang đóng vai là Hoa nên không thấy trực tiếp — kiểm tra phía học sinh bằng bài của Phạm Gia Hân đã có sẵn trạng thái *Trả lại* trong dữ liệu mẫu.)
8. Chấm bài Hoa lần nữa sau khi trả bài: mở bài Hoa, bấm **Trả bài** → đổi sang Học sinh → bài tuần 20 quay về tab **Việc cần làm** với nhãn *Trả lại*, mở ra thấy hộp hồng "Giáo viên đã trả bài" và nút **Nộp lại**. Nộp lại → trạng thái thành *Đã nộp lại*, `Lần nộp` tăng lên 2.

- [ ] **Step 7: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic src/screens src/i18n/shards/grading.js && git commit -m "feat(teacher): chấm bài theo rubric và trả bài yêu cầu làm lại"
```

---

## Task 14: Giáo viên — bảng điểm lớp

**Files:**
- Modify: `src/logic/useTeacherLogic.js`
- Modify: `src/screens/TeacherGradingScreens.jsx`

**Interfaces:**
- Consumes: `averageScore` (Task 3); `SUBMISSION_TINT` (Task 2); `ROSTER` (Task 7)
- Produces (thêm vào `v`):
  - `isTGradebook: boolean`, `toTGradebook(): void`
  - `gradebookColumns: Array<{ assignmentId, shortTitle, maxScore }>`
  - `gradebookRows: Array<{ studentId, studentName, initials, tint, cells: Array<{ assignmentId, label, bg, color, onClick }>, averageLabel }>`
  - `gradebookClassAverageLabel: string`

- [ ] **Step 1: Thêm logic bảng điểm**

```js
  const gradebookAssignments = ctx.s.assignments.filter((a) => a.isPublished);
```

```js
    isTGradebook: ctx.screen === "tGradebook",
    toTGradebook: () => ctx.push("tGradebook"),
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
                ctx.setState({
                  gradeDraftScores: { ...sub.criteriaScores },
                  gradeDraftFeedback: sub.feedback ?? "",
                }) || ctx.push("tGrade", { assignmentId: a.id, submissionId: sub.id })
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
```

Thêm import `SUBMISSION_TINT` và `averageScore`.

- [ ] **Step 2: Thêm màn bảng điểm**

```jsx
      {v.isTGradebook && (
        <div style={css(`padding:6px 0 120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:0 20px`)}>
            <BackButton onClick={v.back} />
            <div style={css(`margin-top:16px;display:flex;align-items:baseline;justify-content:space-between`)}>
              <div style={css(`font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Bảng điểm lớp`)}</div>
              <div style={css(`font-size:13px;font-weight:600;color:#00708f`)}>{v.t(`TB`)} {v.gradebookClassAverageLabel}</div>
            </div>
            <div style={css(`font-size:12px;color:#617789;margin-top:4px`)}>{v.t(`Chạm vào ô điểm để mở bài nộp.`)}</div>
          </div>

          <div style={css(`margin-top:16px;display:flex`)}>
            <div style={css(`flex:none;width:132px;border-right:1px solid #ddeaf0;background:#fcfcfc;z-index:2`)}>
              <div style={css(`height:48px;padding:0 12px;display:flex;align-items:center;font-size:11px;font-weight:600;color:#617789;border-bottom:1px solid #ddeaf0`)}>{v.t(`Học sinh`)}</div>
              {v.gradebookRows.map((r) => (
                <div key={r.studentId} style={css(`height:52px;padding:0 12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #edf7f9`)}>
                  <div style={css(`width:26px;height:26px;flex:none;border-radius:999px;background:${r.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:10px`)}>{r.initials}</div>
                  <span style={css(`flex:1;min-width:0;font-size:11.5px;color:#455771;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{r.studentName}</span>
                </div>
              ))}
            </div>

            <div style={css(`flex:1;min-width:0;overflow-x:auto`)}>
              <div style={css(`display:inline-flex;flex-direction:column;min-width:100%`)}>
                <div style={css(`display:flex;height:48px;border-bottom:1px solid #ddeaf0`)}>
                  {v.gradebookColumns.map((c) => (
                    <div key={c.assignmentId} style={css(`flex:none;width:86px;padding:0 8px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10.5px;font-weight:600;color:#617789;line-height:1.3`)}>{c.shortTitle}</div>
                  ))}
                  <div style={css(`flex:none;width:64px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;color:#00708f`)}>{v.t(`TB`)}</div>
                </div>
                {v.gradebookRows.map((r) => (
                  <div key={r.studentId} style={css(`display:flex;height:52px;border-bottom:1px solid #edf7f9`)}>
                    {r.cells.map((cell) => (
                      <div key={cell.assignmentId} onClick={cell.onClick} style={css(`flex:none;width:86px;padding:7px 8px;display:flex;align-items:center;justify-content:center;cursor:${cell.onClick ? "pointer" : "default"}`)}>
                        <div style={css(`width:100%;height:100%;border-radius:10px;background:${cell.bg};color:${cell.color};font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center`)}>{cell.label}</div>
                      </div>
                    ))}
                    <div style={css(`flex:none;width:64px;display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;color:#00708f`)}>{r.averageLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
```

- [ ] **Step 3: Bổ sung bản dịch**

```js
  "TB": "Avg",
  "Chạm vào ô điểm để mở bài nộp.": "Tap a cell to open the submission.",
```

- [ ] **Step 4: Kiểm chứng**

`npm run build` (kỳ vọng thành công), `npm run dev`, tạm mở màn bằng cách thêm mục "Bảng điểm" vào lưới hành động ở Task 15 — hoặc kiểm tra ngay bằng `createNav("tGradebook")` rồi hoàn tác. Xác nhận: cột trái ghim khi cuộn ngang; ô của Nguyễn Thị Hoa ở bài tuần 19 hiện 8.5 nền xanh lá; ô chưa nộp hiện "–" nền xám và không bấm được; chạm ô 8.5 mở đúng màn chấm bài của Hoa.

- [ ] **Step 5: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic/useTeacherLogic.js src/screens/TeacherGradingScreens.jsx src/i18n/shards/grading.js && git commit -m "feat(teacher): bảng điểm lớp dạng ma trận cuộn ngang"
```

---

## Task 15: Giáo viên — thống kê bài tập, tiến độ lớp và lưới hành động

**Files:**
- Modify: `src/logic/useTeacherLogic.js`
- Modify: `src/screens/TeacherGradingScreens.jsx`
- Modify: `src/screens/TeacherScreens.jsx` (lưới hành động ở `tOverview`)

**Interfaces:**
- Consumes: `assignmentStats` (Task 3)
- Produces (thêm vào `v`):
  - `isTAssignmentStats: boolean`, `isTClassProgress: boolean`
  - `statsRows: Array<{ assignmentId, title, submittedLabel, gradedLabel, completionPct, averageLabel, rangeLabel, onClick }>`
  - `classProgressSummary: Array<{ label, value }>`
  - `classProgressStudents: Array<{ studentId, name, initials, tint, submittedLabel, averageLabel }>`
  - `tQuickActions` — mở rộng bản hiện có thành 8 mục

- [ ] **Step 1: Thêm logic thống kê**

```js
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
```

- [ ] **Step 2: Mở rộng lưới hành động ở trang chủ giáo viên**

Thay mảng `tQuickActions` hiện có (3 mục) bằng 8 mục. Giữ nguyên ba mục cũ và thêm năm mục mới:

```js
    tQuickActions: [
      { label: "Tạo giáo án", iconPath: "M4.5 5.4A1.9 1.9 0 0 1 6.4 3.5H17a1.9 1.9 0 0 1 1.9 1.9v13.2H6.4a1.9 1.9 0 0 0-1.9 1.9V5.4zM8.5 8h6.5M8.5 11.5h6.5", bg: "#eaf6f8", color: "#00708f", onClick: () => ctx.push("tPlan") },
      { label: "Tạo bài tập", iconPath: "M8.5 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1.5M8.5 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM9 14l2.2 2.2L15.5 12", bg: "#eaf6f8", color: "#00aaab", onClick: () => ctx.push("tCreateAssignment") },
      { label: "Tạo bài giảng", iconPath: "M4 6h16v10H4zM8 20h8M12 16v4", bg: "#fdeef5", color: "#b13a75", onClick: () => ctx.push("tCreateLecture") },
      { label: "Chấm bài", iconPath: "M9 14l2.2 2.2L15.5 12M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z", bg: "#e7f2fb", color: "#0b6aa3", onClick: () => ctx.push("tGrading", {}) },
      { label: "Bảng điểm", iconPath: "M4 20V10.5M10 20V4.5M16 20v-7M21.5 20h-19", bg: "#f0fdf4", color: "#15803d", onClick: () => ctx.push("tGradebook") },
      { label: "Thống kê bài tập", iconPath: "M5 19V9M12 19V5M19 19v-6", bg: "#fff5e6", color: "#b45309", onClick: () => ctx.push("tAssignmentStats") },
      { label: "Tiến độ lớp", iconPath: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1", bg: "#eaf6f8", color: "#00708f", onClick: () => ctx.push("tClassProgress") },
      { label: "Đăng thông báo", iconPath: "M4 9.5h4l7-4.5v14l-7-4.5H4zM18 9a3.4 3.4 0 0 1 0 6", bg: "#fdeef5", color: "#b13a75", onClick: () => ctx.push("tAnnouncementCreate") },
    ],
```

Trong `TeacherScreens.jsx`, đổi lưới hành động từ `grid-template-columns:1fr 1fr 1fr` sang `grid-template-columns:1fr 1fr` để 8 mục xuống 4 hàng dễ chạm hơn.

- [ ] **Step 3: Thêm hai màn vào `TeacherGradingScreens.jsx`**

```jsx
      {v.isTAssignmentStats && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Thống kê bài tập`)}</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
            {v.statsRows.length === 0 && <EmptyState title={v.t(`Chưa có bài tập nào`)} />}
            {v.statsRows.map((r) => (
              <div key={r.assignmentId} onClick={r.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4;text-wrap:pretty`)}>{r.title}</div>
                <div style={css(`margin-top:11px;height:6px;border-radius:999px;background:#edf7f9;overflow:hidden`)}>
                  <div style={css(`height:100%;width:${r.completionPct};border-radius:999px;background:#00aaab`)}></div>
                </div>
                <div style={css(`margin-top:10px;display:flex;align-items:center;gap:14px;font-size:11.5px;color:#617789`)}>
                  <span>{v.t(`Đã nộp`)} <b style={css(`color:#455771`)}>{r.submittedLabel}</b></span>
                  <span>{v.t(`Đã chấm`)} <b style={css(`color:#455771`)}>{r.gradedLabel}</b></span>
                  <span>{v.t(`TB`)} <b style={css(`color:#00708f`)}>{r.averageLabel}</b></span>
                  {r.rangeLabel && <span>{r.rangeLabel}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTClassProgress && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Tiến độ lớp`)}</div>
          <div style={css(`margin-top:16px;display:flex;gap:9px`)}>
            {v.classProgressSummary.map((m, i) => (
              <div key={i} style={css(`flex:1;min-width:0;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;text-align:center`)}>
                <div style={css(`font-size:22px;font-weight:700;color:#00708f;line-height:1.1`)}>{m.value}</div>
                <div style={css(`font-size:10.5px;color:#617789;margin-top:4px`)}>{v.t(m.label)}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            {v.classProgressStudents.map((st) => (
              <div key={st.studentId} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12.5px`)}>{st.initials}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{st.name}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{st.submittedLabel}</div>
                </div>
                <div style={css(`flex:none;font-size:17px;font-weight:700;color:#00708f`)}>{st.averageLabel}</div>
              </div>
            ))}
          </div>
        </div>
      )}
```

- [ ] **Step 4: Bổ sung bản dịch**

```js
  "Chấm bài": "Grading",
  "Bảng điểm": "Gradebook",
  "Sĩ số": "Class size",
  "Đang hoạt động": "Active",
  "Điểm TB lớp": "Class average",
  "bài đã nộp": "submitted",
```

- [ ] **Step 5: Kiểm chứng**

`npm run build` (kỳ vọng thành công), `npm run dev`:
1. Giáo viên → Trang chủ → lưới 8 hành động hiện đủ, hai cột.
2. **Thống kê bài tập**: bài tuần 19 hiện "3/32", đã chấm 3, TB 7.9, dải "6 – 9.1"; thanh tiến độ khoảng 9%.
3. Chạm một dòng → mở màn chấm bài đúng bài tập đó.
4. **Tiến độ lớp**: ba ô tóm tắt và 5 học sinh, điểm TB của Lê Minh Anh là 9.1.
5. **Bảng điểm** mở được từ lưới hành động.

- [ ] **Step 6: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src/logic/useTeacherLogic.js src/screens && git commit -m "feat(teacher): thống kê bài tập, tiến độ lớp và lưới hành động mở rộng"
```

---

## Task 16: Đăng thông báo lớp và rà soát cuối Giai đoạn 1

**Files:**
- Modify: `src/logic/useTeacherLogic.js`, `src/logic/useStudentLogic.js`
- Modify: `src/screens/TeacherGradingScreens.jsx`
- Modify: `src/data/coursework.js`
- Modify: `src/i18n/shards/grading.js`

**Interfaces:**
- Consumes: `ctx.setState` (Task 5)
- Produces (thêm vào `v`):
  - `isTAnnouncementCreate: boolean`
  - `annTitle, annBody` + `setAnnField(field, value)`, `annPinned: boolean`, `toggleAnnPinned(): void`, `annValid: boolean`, `postAnnouncement(): void`
  - Phía học sinh: `classDetailFeed` đọc từ `state.announcements` thay vì hằng `CLASS_NEWS`

- [ ] **Step 1: Chuyển bảng tin lớp vào state dùng chung**

Thêm vào `src/data/coursework.js`:

```js
export const SEED_ANNOUNCEMENTS = [
  { id: 1, classId: 1, title: "Nhắc nộp bài tập tuần 20", body: "Các em hoàn thành bài tập tuần 20 trước 23:59 ngày 17/05. Phần sơ đồ pha tối là bắt buộc.", createdAtIso: "2026-05-16T07:40:00", isPinned: true },
  { id: 2, classId: 1, title: "Lịch kiểm tra giữa kỳ", body: "Kiểm tra giữa kỳ diễn ra tiết 2 ngày 19/05, nội dung từ bài 1 đến bài 6.", createdAtIso: "2026-05-12T16:10:00", isPinned: false },
];
```

và thêm `announcements: SEED_ANNOUNCEMENTS` vào `INITIAL_COURSEWORK`.

Trong `useStudentLogic.js` và `useTeacherLogic.js`, thay hằng `CLASS_NEWS` / `tNews` bằng đọc từ `ctx.s.announcements`, sắp xếp ghim lên đầu rồi mới đến mới nhất:

```js
  const feed = [...ctx.s.announcements]
    .sort((a, b) => Number(b.isPinned) - Number(a.isPinned) || b.createdAtIso.localeCompare(a.createdAtIso))
    .map((n) => ({ title: n.title, when: fmtDateTime(n.createdAtIso), body: n.body, isPinned: n.isPinned }));
```

Gán `classDetailFeed: feed` (học sinh) và `tNews: feed` (giáo viên). Xoá hằng `CLASS_NEWS` khỏi `useStudentLogic.js`.

- [ ] **Step 2: Thêm logic đăng thông báo**

Thêm `annTitle: "", annBody: "", annPinned: false` vào `INITIAL_TEACHER`, rồi:

```js
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
```

- [ ] **Step 3: Thêm màn đăng thông báo**

```jsx
      {v.isTAnnouncementCreate && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Đăng thông báo`)}</div>

          <div style={css(`margin-top:16px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Tiêu đề`)}</div>
          <input value={v.annTitle} onChange={(e) => v.setAnnField("annTitle", e.target.value)}
            style={css(`margin-top:8px;width:100%;box-sizing:border-box;height:46px;padding:0 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;font-size:13.5px;color:#455771;font-family:inherit;outline:none`)} />

          <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.t(`Nội dung`)}</div>
          <textarea value={v.annBody} onChange={(e) => v.setAnnField("annBody", e.target.value)}
            style={css(`margin-top:8px;width:100%;box-sizing:border-box;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;min-height:120px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)} />

          <div onClick={v.toggleAnnPinned} style={css(`margin-top:14px;display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;cursor:pointer`)}>
            <div style={css(`flex:1;font-size:13px;color:#455771`)}>{v.t(`Ghim lên đầu`)}</div>
            <div style={css(`position:relative;width:42px;height:24px;border-radius:999px;background:${v.annPinned ? "#00aaab" : "#dbe7ec"};flex:none`)}>
              <div style={css(`position:absolute;top:2px;left:${v.annPinned ? "22px" : "2px"};width:20px;height:20px;border-radius:999px;background:#fff;transition:left .18s`)}></div>
            </div>
          </div>

          <div onClick={v.annValid ? v.postAnnouncement : undefined} style={css(`margin-top:20px;height:54px;border-radius:16px;background:${v.annValid ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.annValid ? "pointer" : "default"}`)}>{v.t(`Đăng thông báo`)}</div>
        </div>
      )}
```

- [ ] **Step 4: Rà chuỗi và màu**

Chạy hai lệnh rà soát:

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && grep -rn "#[0-9a-fA-F]\{6\}" src/screens/StudentWorkScreens.jsx src/screens/TeacherGradingScreens.jsx src/screens/ui | wc -l
```

Ghi lại con số. Với mỗi mã màu không nằm trong bảng của `src/data/shared.js`, bổ sung hằng vào `shared.js` và thay thế. Mã màu đã có trong bảng tint trạng thái (`SUBMISSION_TINT`) không tính là vi phạm vì đã tập trung một chỗ.

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && grep -rno "v\.t(\`[^\`]*\`)" src/screens/StudentWorkScreens.jsx src/screens/TeacherGradingScreens.jsx | sed 's/.*v\.t(`//;s/`)//' | sort -u
```

Đối chiếu danh sách kết quả với các khoá trong `src/i18n/shards/grading.js`; mọi chuỗi thiếu phải bổ sung bản dịch tiếng Anh.

- [ ] **Step 5: Chạy checklist nghiệm thu Giai đoạn 1**

`npm test` (kỳ vọng 32 test PASS) và `npm run build` (kỳ vọng thành công), rồi `npm run dev` và đi trọn kịch bản dạy–học, ghi kết quả từng bước:

1. **Giáo viên** tạo rubric 3 tiêu chí tổng trọng số 100% → lưu được.
2. **Giáo viên** tạo bài tập "Bài tập tuần 21", loại Tự luận ngắn, lớp SINH HỌC 8A1, hạn 3 ngày, có rubric vừa tạo, giao **cả lớp** → giao thành công.
3. **Giáo viên** đăng thông báo có ghim → thông báo lên đầu bảng tin lớp.
4. Đổi vai trò **Học sinh**: thấy bài tuần 21 ở Việc cần làm; mở chi tiết thấy đúng hạn, rubric, điểm đạt; mở lớp thấy thông báo vừa đăng ở đầu bảng tin.
5. **Học sinh** nộp bài kèm 1 tệp → trạng thái *Đã nộp*, màn kết quả hiện điểm "—".
6. Đổi vai trò **Giáo viên** → Chấm bài → bài của Nguyễn Thị Hoa ở tab Chờ chấm → chấm theo 3 tiêu chí → Lưu điểm.
7. **Bảng điểm**: ô của Hoa ở cột bài tuần 21 hiện đúng tổng điểm, cột TB cập nhật.
8. **Thống kê bài tập**: bài tuần 21 hiện 1 đã nộp, 1 đã chấm.
9. Đổi vai trò **Học sinh** → tab Điểm số → thấy điểm và nhận xét, ba tiêu chí đúng số đã chấm.
10. Đổi vai trò **Giáo viên** → mở lại bài của Hoa → **Trả bài** → xác nhận.
11. Đổi vai trò **Học sinh** → bài quay về **Việc cần làm** với nhãn *Trả lại*, có nút **Nộp lại** → nộp lại → `Lần nộp` = 2, trạng thái *Đã nộp lại*.
12. Chuyển ngôn ngữ sang **English** và lặp bước 4–6: không còn chuỗi tiếng Việt sót trên các màn mới.

- [ ] **Step 6: Commit**

```bash
cd "E:/Yootek/YooBook  Mobile/YooBook-Mobile" && git add src && git commit -m "feat(teacher): đăng thông báo lớp và hoàn tất vòng lặp dạy-học Giai đoạn 1"
```

---

## Tự rà soát kế hoạch

**1. Phủ spec.** Giai đoạn 0 của spec: ngăn xếp điều hướng → Task 1 và 5; tách dữ liệu → Task 4; tách logic → Task 5; component dùng chung → Task 6. Giai đoạn 1 của spec: mô hình 7 trạng thái (§3.1) → Task 2; màn học sinh S1–S4 (§3.2) → Task 8, 9, 10; màn giáo viên T1–T8 (§3.3) → Task 12 (T1), 11 (T2), 13 (T3, T4), 14 (T5), 15 (T6, T7), 16 (T8); quy tắc nghiệp vụ (§3.4) → Task 2 (`canSubmit`) và bước kiểm chứng của Task 8. Component `ProgressRing` và `Countdown` liệt kê trong spec §1.4 **không có task** — có chủ ý: cả hai chỉ dùng cho màn thi ở Giai đoạn 2, dựng sớm là YAGNI. Đã ghi lại ở mục Ngoài phạm vi bên dưới.

**2. Rà placeholder.** Không có bước nào ghi "TBD", "xử lý lỗi phù hợp" hay "viết test cho phần trên". Mọi bước sửa mã đều kèm khối mã. Task 4 và Task 5 mô tả việc di chuyển mã theo bảng phân chia thay vì chép lại nguyên khối — hợp lệ vì nội dung không đổi, và bảng đã liệt kê đích danh từng hằng và từng khoá `v`.

**3. Nhất quán kiểu.** `SUBMISSION_STATUS` dùng chung tên viết tắt `S` ở mọi tệp import. `fmtDateTime` là tên cuối cùng (Task 13 gộp `fmt` của học sinh và `fmtT` của giáo viên về `src/logic/formatDate.js`); Task 8, 9, 10 viết `fmt` cục bộ trước đó — **khi làm Task 13 phải đổi cả ba tệp sang `fmtDateTime`**, đã ghi rõ trong Step 2 của Task 13. `rubricTotal` nhận mảng `{earnedPoints}` và `rubricMax` nhận mảng `{maxPoints}` — mọi nơi gọi đều ánh xạ đúng dạng này. `ctx.push(screen, params)` dùng thống nhất; không nơi nào còn gọi `go(screen)` với tham số thứ hai.

## Ngoài phạm vi kế hoạch này

- `ProgressRing`, `Countdown` — dựng ở Giai đoạn 2 khi màn thi cần.
- Giai đoạn 2–7 của spec — mỗi giai đoạn một kế hoạch riêng.
- Nối API thật; prototype vẫn dùng mock trong state.
- Test render giao diện; chỉ `src/logic/` có test tự động.
