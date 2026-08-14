# Thiết kế: Bổ sung nghiệp vụ LMS dạy–học cho YooBook Mobile

> Ngày: 2026-08-14 · Trạng thái: **chờ duyệt spec**
> Đối chiếu: FE web [`eduverse-yoolife`](../../../../eduverse-yoolife) và spec [`2026-07-27-assessment-fe-rebuild-design.md`](../../../../eduverse-yoolife/docs/superpowers/specs/2026-07-27-assessment-fe-rebuild-design.md)

---

## 0. Bối cảnh và bản chất sản phẩm

`YooBook-Mobile` hiện là **prototype UX/UI chạy được** (Vite + React 18), không phải app production:

- Không có router, không gọi API, không có state server. Toàn bộ dữ liệu là mock trong `src/constants.js`.
- Toàn bộ trạng thái nằm trong một state machine duy nhất: `src/useAppLogic.js` (1026 dòng, `INITIAL_STATE` 40+ khoá).
- Điều hướng là một chuỗi phẳng `state.screen` + `go(screen)`. Các màn chi tiết chọn bản ghi bằng chỉ số (`tClassIdx`, `gradeIdx`, `asgIdx`, `childIdx`, `classIdx`, `tPlanIdx`).
- Giao diện viết bằng chuỗi CSS inline qua helper `css()`; i18n là bảng tra chuỗi tiếng Việt → tiếng Anh (`src/i18n/shards/*.js`).

**Vì vậy phạm vi spec này là thuần thiết kế luồng + màn + UX/UI trên prototype**, không bao gồm nối API thật. Nơi nào nghiệp vụ đã có backend (theo web) sẽ ghi rõ để giai đoạn production sau này nối thẳng; nơi nào chưa có backend sẽ đánh dấu `⚠️ chưa có backend`.

### 0.1. Quyết định đã chốt

1. **Phạm vi phủ toàn bộ 4 vai trò**: Học sinh, Giáo viên, Phụ huynh, Trường học — theo yêu cầu "bổ sung toàn bộ".
2. **Vai trò Trường học là nghiệp vụ mới**: web `eduverse-yoolife` không có dashboard trường; trường chỉ tồn tại dưới dạng `organizationId` / `schoolName` + bước xác minh giáo viên. Vì mobile là prototype dùng mock data nên vẫn thiết kế và dựng được đầy đủ, nhưng **mọi màn của vai trò này đều đánh dấu `⚠️ chưa có backend`** và phải là giai đoạn cuối.
3. **Thứ tự triển khai theo dòng giá trị dạy–học**, không theo thứ tự vai trò: vòng lặp giao bài → làm bài → chấm → trả bài → nộp lại trước, rồi mới đến thi, onboarding, lộ trình, gamification, giáo án, trường học.
4. **Giữ nguyên phong cách kỹ thuật hiện có**: React function component + `css()` inline, mock data tách khỏi logic, i18n tra chuỗi. Không thêm thư viện mới (không router, không state library).

---

## 1. Giai đoạn 0 — Nền tảng bắt buộc trước khi thêm màn

Spec này thêm khoảng 66 màn mới. Với kiến trúc hiện tại, `useAppLogic.js` sẽ vượt 5000 dòng và `INITIAL_STATE` vượt 150 khoá — không đọc và không sửa được. Ba thay đổi nền dưới đây là điều kiện cần, làm trước mọi màn mới.

### 1.1. Ngăn xếp điều hướng thay cho chuỗi phẳng

Hiện tại nút quay lại là hằng số cứng:

```js
back: () => go(s.role === "teacher" ? "tExplore" : "explore"),
```

Với các luồng sâu (Lớp → Bài tập → Nộp bài → Kết quả → Nộp lại) nút này trả về sai màn. Thay bằng ngăn xếp:

| API mới | Ý nghĩa |
| --- | --- |
| `push(screen, params)` | Đẩy màn mới kèm tham số, giữ màn cũ trong ngăn xếp |
| `pop()` | Quay lại màn trước; nếu ngăn xếp rỗng thì về tab gốc của vai trò |
| `replace(screen, params)` | Thay màn hiện tại (dùng sau khi nộp bài, không cho quay lại màn soạn) |
| `resetTo(tabScreen)` | Bấm tab dưới cùng → xoá ngăn xếp |
| `params` | Object tham số của màn hiện tại: `{ classId, assignmentId, examId, attemptId, childId, ... }` |

Quy ước: **màn chi tiết đọc bản ghi qua `params.<id>`, không qua chỉ số trong state**. Các khoá `tClassIdx`, `gradeIdx`, `asgIdx`, `childIdx`, `classIdx`, `tPlanIdx` bị loại bỏ.

### 1.2. Tách dữ liệu mock theo miền

`src/constants.js` (263 dòng, trộn lẫn 4 vai trò) tách thành:

```
src/data/
  catalog.js    LESSONS, CATS, LESSON_TYPES, LEVELS, SUBJECT_META   (giữ nguyên nội dung)
  curriculum.js chương trình chuẩn: Môn → Chương → Bài  (mới)
  student.js    lớp đang học, bài tập, bài nộp, lộ trình, gamification, lịch
  teacher.js    lớp dạy, giáo án, ngân hàng câu hỏi, đề thi, bài chờ chấm, bảng điểm
  parent.js     con, hội thoại, báo cáo, cài đặt an toàn
  school.js     giáo viên toàn trường, lớp toàn trường, thống kê   ⚠️ chưa có backend
  shared.js     TAB_ICONS, NOTI, màu, badge trạng thái
```

### 1.3. Tách logic theo miền

`useAppLogic.js` tách thành các hook nhận và trả về mảnh state của mình:

```
src/logic/
  useAppState.js       state gốc + setState + ngăn xếp điều hướng + vai trò + ngôn ngữ
  useStudentLogic.js
  useTeacherLogic.js
  useParentLogic.js
  useSchoolLogic.js    ⚠️ chưa có backend
  useAccountLogic.js   hồ sơ, ví, gói, thiết bị, bảo mật, trợ giúp
```

`useAppLogic.js` giữ lại vai trò tổng hợp: gọi các hook con, gộp kết quả, chạy `deepT` dịch, trả về `v`. Giao diện `v` với các màn hiện có **không đổi** để không phải sửa lại 12 file `screens/*.jsx` đang chạy tốt.

### 1.4. Thành phần UI dùng chung cần bổ sung

Hiện chỉ có `HScroll`, `FilterSheet`, `AssignSheet`, `LangSheet`. Thêm:

| Component | Dùng ở |
| --- | --- |
| `Sheet.jsx` | Sheet đáy dùng chung (tất cả sheet hiện tại viết lặp phần nền mờ + trượt lên) |
| `StatusChip.jsx` | Nhãn trạng thái (Chưa nộp / Đã nộp / Nộp muộn / Đã chấm / Trả bài / Nộp lại / Đang làm) |
| `EmptyState.jsx` | Trạng thái rỗng có icon + tiêu đề + mô tả + nút hành động |
| `ProgressRing.jsx` | Vòng tiến độ (điểm thi, mastery node, hoàn thành lộ trình) |
| `Countdown.jsx` | Đồng hồ đếm ngược nhận `deadline` tuyệt đối |
| `FilePicker.jsx` | Chọn/hiển thị tệp đính kèm (giả lập) |
| `SegmentedTabs.jsx` | Tab đoạn — hiện lặp lại 8 lần với cùng đoạn mã tô màu |
| `ConfirmSheet.jsx` | Xác nhận hành động nguy hiểm (nộp bài, xoá, rời lớp) |

### 1.5. Quy ước áp dụng cho mọi màn mới

- **Màu**: chỉ dùng hằng trong `src/data/shared.js` (mở rộng từ `ACCENT/DEEP/INK/MUTED/BORDER` + bảng tint trạng thái). Không thêm mã hex rời rạc trong JSX như hiện nay.
- **Chuỗi**: mọi chuỗi hiển thị bọc trong `v.t(...)`, và thêm bản dịch vào shard tương ứng. Shard mới: `exam.js`, `path.js`, `gamify.js`, `grading.js`, `onboarding.js`, `school.js`.
- **Trạng thái rỗng**: mọi danh sách mới bắt buộc có `EmptyState`.
- **Trạng thái tải/lỗi**: prototype không gọi API nên không mô phỏng loading, **trừ** các màn có ràng buộc thời gian thật (làm bài thi, autosave) — xem §3.3.

---

## 2. Kiến trúc điều hướng theo vai trò

Giữ 5 tab dưới cùng cho mọi vai trò (ràng buộc không gian màn hình). Nghiệp vụ mới vào theo hai đường: **hub trong tab** và **màn con đẩy vào ngăn xếp**.

### 2.1. Học sinh

| Tab | Màn gốc | Chứa |
| --- | --- | --- |
| Trang chủ | `home` | Đang học tiếp, thẻ streak/XP/gem, mission hôm nay, việc đến hạn, ôn tập hôm nay, lối tắt Lịch & Thành tích |
| Học tập | `paths` *(mới)* | Lộ trình học, hàng ôn tập giãn cách, kiểm tra đầu vào |
| Lớp học | `classwork` | Lớp của tôi, bài tập (3 tab hiện có + tab **Đề thi** mới), bảng điểm |
| Khám phá | `explore` | Hai section **Khám phá / Thư viện của tôi** — áp dụng đúng mẫu `tExploreSection` mà vai trò Giáo viên đang dùng, thay cho tab Thư viện riêng |
| Tài khoản | `profile` | Như hiện tại + Gói & hạn mức, Nhắc học |

Tab "Thư viện" bị gộp vào "Khám phá" để nhường chỗ cho tab "Học tập". Đây là mẫu đã tồn tại trong mã nguồn (`tExploreSectionTabs`), không phải mẫu mới.

### 2.2. Giáo viên

| Tab | Màn gốc | Chứa |
| --- | --- | --- |
| Trang chủ | `tOverview` | 4 chỉ số + **lưới hành động mở rộng**: Bài tập, Chấm bài, Đề thi, Ngân hàng câu hỏi, Bảng điểm, Tiến độ lớp, Phụ huynh, Báo cáo |
| Khám phá | `tExplore` | Giữ nguyên (Khám phá / Thư viện của tôi) |
| Giáo án | `tPlans` | Danh sách + trình soạn giáo án |
| Lớp học | `tClasses` | Lớp → 6 tab chi tiết hiện có + tab **Thành viên** mới |
| Tài khoản | `profile` | Như hiện tại + Trạng thái xác minh giáo viên |

Lưới hành động ở Trang chủ đóng vai trò "hub" — tránh phải thêm tab thứ 6.

### 2.3. Phụ huynh

Giữ nguyên 5 tab hiện có (`pOverview`, `pChild`, `pReport`, `pMessages`, `profile`), bổ sung màn con: liên kết con, tạo tài khoản con, chọn giáo viên, tạo hội thoại, lịch sử báo cáo.

### 2.4. Trường học ⚠️ chưa có backend

| Tab | Màn gốc |
| --- | --- |
| Tổng quan | `sOverview` |
| Giáo viên | `sTeachers` |
| Lớp học | `sClasses` |
| Báo cáo | `sReports` |
| Tài khoản | `profile` |

Thêm `school` vào `roleMeta` và `ROLE_TABS`; màn chuyển vai trò demo (`roleSwitch`) có thêm thẻ thứ tư.

---

## 3. Giai đoạn 1 — Vòng lặp dạy–học lõi

Đây là phần trả lời trực tiếp mục tiêu "cơ chế LMS dạy và học". Không có phần này, các phần còn lại chỉ là vỏ.

### 3.1. Mô hình trạng thái bài nộp

Prototype hiện chỉ có boolean `submitted`. Thay bằng 7 trạng thái đúng theo `SubmissionStatus` của backend:

```
NotStarted(0) → InProgress(1) → Submitted(2) | LateSubmitted(3) → Graded(4) → Returned(5) → Resubmitted(6)
```

`Returned` (giáo viên trả bài kèm nhận xét, yêu cầu làm lại) và `Resubmitted` là mắt xích phản hồi mà prototype đang thiếu hoàn toàn. `StatusChip` hiển thị 7 trạng thái này với tint cố định trong `shared.js`.

### 3.2. Màn phía học sinh

| # | Màn | Nội dung |
| --- | --- | --- |
| S1 | `assignmentDetail` *(nâng cấp)* | Tiêu đề, lớp, loại bài (6 loại theo `AssignmentType`), mở lúc / hạn nộp, điểm tối đa, điểm đạt, số lượt còn lại, có cho nộp muộn không, hướng dẫn, tệp đính kèm của giáo viên, rubric (chỉ đọc) |
| S2 | `assignmentSubmit` | Ô soạn bài + `FilePicker` (ảnh/tệp) + nút **Lưu nháp** và **Nộp bài**. `ConfirmSheet` trước khi nộp, cảnh báo rõ nếu đang nộp muộn |
| S3 | `submissionResult` | Điểm cuối, điểm tự động, nhận xét giáo viên, bảng rubric từng tiêu chí, dấu nộp muộn. Nếu trạng thái là `Returned` → nút **Nộp lại** dẫn về S2 |
| S4 | `submissionHistory` | Danh sách các lượt nộp (`attemptNumber`), điểm từng lượt, thời điểm |

Tab "Việc cần làm / Đã nộp / Điểm số" hiện có giữ nguyên, nhưng nguồn dữ liệu chuyển sang mô hình trạng thái ở §3.1 và bổ sung tab thứ tư **Đề thi** ở Giai đoạn 2.

### 3.3. Màn phía giáo viên

| # | Màn | Nội dung |
| --- | --- | --- |
| T1 | `tAssignmentCreate` *(nâng cấp)* | Thay 3 trường hiện tại (tiêu đề / lớp / hạn) bằng: loại bài tập (6 loại), nguồn nội dung (quiz · học liệu · thí nghiệm · không), mở lúc, hạn nộp, cho nộp muộn, số lượt tối đa, điểm tối đa, điểm đạt, trộn câu hỏi, hiện đáp án sau hạn, rubric, **giao riêng cho một số học sinh** (`targetUserIds`) |
| T2 | `tRubricEditor` | Danh sách tiêu chí: mã, tên, điểm tối đa, trọng số. Tổng trọng số phải bằng 100% mới cho lưu |
| T3 | `tGrading` *(nâng cấp)* | Bộ lọc theo trạng thái (Chờ chấm / Đã chấm / Nộp muộn / Đã trả), thanh tiến độ chấm, điều hướng bài trước–bài sau |
| T4 | `tGrade` *(nâng cấp)* | Xem bài làm + tệp đính kèm, chấm theo từng tiêu chí rubric (tự cộng tổng), ô nhận xét, hai nút: **Lưu điểm** và **Trả bài yêu cầu làm lại** |
| T5 | `tGradebook` | Ma trận Học sinh × Bài tập: cột trái ghim tên, cuộn ngang các bài, ô tô màu theo trạng thái + điểm, cột cuối là điểm trung bình. Chạm ô → mở T4 |
| T6 | `tAssignmentStats` | Một bài tập: đã nộp / đã chấm / chưa bắt đầu, tỉ lệ hoàn thành, điểm TB–min–max, phân bố điểm |
| T7 | `tClassProgress` | Toàn lớp: % hoàn thành TB, XP tuần TB, số học sinh hoạt động tuần này, danh sách học sinh kèm streak/level/lần hoạt động cuối |
| T8 | `tAnnouncementCreate` | Đăng thông báo lớp: tiêu đề, nội dung, ghim lên đầu |

### 3.4. Quy tắc nghiệp vụ phải thể hiện đúng trên UI

- Quá hạn mà `allowLate = false` → nút Nộp bài bị vô hiệu, hiện lý do, không ẩn nút.
- Hết số lượt (`maxAttempts`) → không cho nộp lại, hiện rõ "đã dùng 3/3 lượt".
- Trước `openAt` → bài hiển thị nhưng khoá, ghi "Mở lúc 07:00 ngày 20/05".
- `revealAnswersAfterDue = false` → màn kết quả không hiện đáp án đúng, chỉ hiện điểm.
- Giáo viên trả bài → học sinh nhận thông báo và bài quay lại tab "Việc cần làm".

---

## 4. Giai đoạn 2 — Thi trực tuyến và ngân hàng câu hỏi

Bám sát nghiệp vụ `ExamPaper` / `ExamTaking` / `QuestionBank` mà backend đã có (xem spec web 2026-07-27 §2–§3). Đây là phần backend đã hoàn thiện nhưng **cả web lẫn mobile đều chưa có UI**.

### 4.1. Phía học sinh

| # | Màn | Nội dung |
| --- | --- | --- |
| S5 | `examList` | Đề được giao: tên đề, lớp, mở lúc / hạn, trạng thái lượt làm (chưa làm / đang làm dở / đã nộp) |
| S6 | `examLobby` | Số câu, tổng điểm, thời gian làm bài, số lượt, nội quy. Nút **Bắt đầu** hoặc **Tiếp tục lượt đang dở** |
| S7 | `examRunner` | Màn làm bài — xem chi tiết §4.2 |
| S8 | `examSubmitConfirm` | Sheet xác nhận nộp, liệt kê rõ số câu chưa trả lời |
| S9 | `examResult` | Điểm, đạt/không đạt, thời gian làm. Xem lại từng câu **chỉ khi** cờ `revealAnswers` bật. Câu tự luận hiển thị "Chờ giáo viên chấm" |

### 4.2. Chi tiết màn làm bài `examRunner`

Đây là màn khó nhất và cũng là màn có ràng buộc nghiệp vụ chặt nhất:

- **Đồng hồ tính theo `deadline` tuyệt đối do server trả về**, không đếm từ lúc mở màn. Prototype mô phỏng bằng một mốc thời gian tính khi bắt đầu lượt làm và lưu vào state, để hành vi khi khoá màn / mở lại đúng như thật.
- **Hết giờ → khoá toàn bộ input và tự nộp**, kèm thông báo. Không dựa vào việc người dùng bấm nút.
- **Autosave từng câu**, hiển thị chỉ báo "Đã lưu HH:mm" ở đầu màn. Trạng thái lỗi lưu phải hiển thị được (prototype có nút giả lập mất mạng để duyệt UI trạng thái này).
- **Lưới câu hỏi** trong sheet đáy: số câu, màu theo đã trả lời / chưa / đã đánh dấu xem lại.
- **Bốn dạng câu hỏi**, mỗi dạng một component riêng:
  1. Một đáp án (radio) — đã có mẫu trong `exam` hiện tại
  2. Nhiều đáp án (checkbox)
  3. **Đúng/Sai 4 ý** — bốn dòng a/b/c/d, mỗi dòng một công tắc Đúng/Sai độc lập. Điểm lũy tiến theo số ý đúng (4/3/2/1/0 ý → 100%/50%/25%/10%/0% điểm câu). Dạng này **chưa từng có mẫu UI** trong cả web lẫn mobile, cần thiết kế riêng cho cả màn làm bài và màn xem lại.
  4. Tự luận — ô nhập dài, đếm ký tự

### 4.3. Phía giáo viên

| # | Màn | Nội dung |
| --- | --- | --- |
| T9 | `tQuestionBanks` | Danh sách ngân hàng câu hỏi của tôi, số câu, môn, khối |
| T10 | `tQuestionBankDetail` | Câu hỏi trong bank; lọc theo chương / mức độ / nhãn / trạng thái; chọn nhiều để gắn nhãn hoặc chuyển bank |
| T11 | `tQuestionEditor` | Soạn câu hỏi: nội dung, 4 dạng như §4.2, đáp án đúng, giải thích, ảnh minh hoạ, điểm, mức độ |
| T12 | `tQuestionImport` | Import Word/Excel: tải tệp mẫu → chọn tệp → **màn xem trước lỗi theo từng dòng** → xác nhận. Hành vi bắt buộc: **nhập tất cả hoặc không nhập gì**, không có trạng thái "nhập được X/Y câu" |
| T13 | `tAiGenerateQuestions` | Sinh câu hỏi bằng AI: chọn bank/chương/mức độ/số lượng/dạng câu → kết quả ở trạng thái **Bản nháp**, duyệt từng câu (sửa / duyệt / xoá). Không có đường tự động duyệt. Hiển thị số lượt AI còn lại trong tháng |
| T14 | `tExams` | Danh sách đề: tên, môn, khối, tổng điểm, thời gian, trạng thái |
| T15 | `tExamBuilder` | Soạn đề theo phần (Phần I / II / III): thêm câu thủ công từ bank, hoặc **bốc ngẫu nhiên** từ bank. UI phải ghi rõ đây là bốc ngẫu nhiên phẳng, chưa phải theo ma trận đề |
| T16 | `tExamAssign` | Giao đề cho lớp: chọn lớp, mở lúc, hạn, hướng dẫn, xuất bản ngay hay để nháp |
| T17 | `tExamResults` | Kết quả theo lớp: số lượt, số đã nộp, điểm TB, danh sách học sinh kèm điểm và trạng thái |
| T18 | `tGradeEssay` | Chấm câu tự luận trong bài thi: nội dung câu, bài làm, ô điểm + nhận xét. Có ô **gợi ý điểm từ AI** hiển thị cạnh ô chấm chính — giáo viên luôn phải xác nhận, điểm AI không bao giờ tự thành điểm chính thức |

**Ngoài phạm vi**: ma trận đề, mã đề, xuất file `.docx`/`.pdf` thật, phiếu trả lời OMR — backend chưa có (spec web §5). Không thiết kế màn cho phần này để tránh dựng kỳ vọng sai.

---

## 5. Giai đoạn 3 — Onboarding, xác minh và liên kết

Prototype hiện cho chọn vai trò ở màn `role` rồi vào thẳng. Thiếu toàn bộ phần thiết lập hồ sơ học tập mà web đã có (`learning-role-setup`).

| # | Màn | Vai trò | Nội dung |
| --- | --- | --- | --- |
| O1 | `roleSetup` | chung | Chọn vai trò học tập sau khi đăng ký (khác với màn `role` demo hiện tại — màn này ghi hồ sơ thật) |
| O2 | `setupStudent` | HS | Họ tên, ngày sinh, giới tính, khối lớp, trường, người giám hộ (tên/điện thoại/email), địa chỉ, **mã lớp** (tuỳ chọn, vào lớp luôn) |
| O3 | `setupTeacher` | GV | 3 bước có thanh tiến độ: **Hồ sơ** → **Trường** → **Xác minh**. Bước Trường: chọn tỉnh → phường → trường, có nút *Thêm trường mới* nếu không tìm thấy. Bước Xác minh: 3 lựa chọn — email theo tên miền trường (gửi OTP), tải tài liệu chứng minh, hoặc **để sau** |
| O4 | `setupParent` | PH | Họ tên, điện thoại, kênh liên lạc ưu tiên, múi giờ |
| O5 | `setupDone` | chung | Xác nhận + dẫn vào tab gốc của vai trò |
| O6 | `verificationStatus` | GV | Trạng thái xác minh trong Tài khoản: chưa xác minh / chờ duyệt / đã xác minh. Nêu rõ tính năng nào bị giới hạn khi chưa xác minh |
| O7 | `joinClass` | HS | Nhập mã lớp hoặc quét QR → xem trước tên lớp, giáo viên, sĩ số → xác nhận tham gia. Xử lý đủ 4 trạng thái: nhập liệu, đang xử lý, thành công, lỗi (mã sai / lớp đầy / đã ở trong lớp) |
| O8 | `leaveClass` | HS | Sheet xác nhận rời lớp, cảnh báo mất quyền xem bài tập |
| O9 | `pLinkChild` | PH | Nhập ID học sinh + mã mời, hoặc quét QR. Kèm hướng dẫn lấy mã |
| O10 | `pCreateChild` | PH | Tạo tài khoản đăng nhập cho con: họ tên, email/điện thoại, mật khẩu, quan hệ, khối lớp, trường. Tự liên kết sau khi tạo |
| O11 | `pChildSwitcher` | PH | Sheet chuyển đổi giữa các con; mọi màn phụ huynh đều bám theo con đang chọn |
| O12 | `tClassMembers` | GV | Thành viên lớp: mời học sinh (chia sẻ mã/QR), thêm **trợ giảng** và **người quan sát**, đổi vai trò, gỡ thành viên. Bốn vai trò đúng theo `ERole`: Teacher, CoTeacher, Student, Observer |

---

## 6. Giai đoạn 4 — Lộ trình học và ôn tập cá nhân hoá

Trụ cột "học" bên cạnh trụ cột "dạy" ở Giai đoạn 1. Backend đã có (`LearningPath`, `B2C2CAdaptiveLearning`).

| # | Màn | Nội dung |
| --- | --- | --- |
| S10 | `paths` | Danh sách lộ trình: môn, khối, % hoàn thành, số node đã xong / tổng, nút **Tạo lộ trình** |
| S11 | `pathCreate` | Chọn khối lớp + môn học (+ mã kết quả kiểm tra đầu vào nếu có) |
| S12 | `placementTest` | Kiểm tra đầu vào để định vị trình độ trước khi sinh lộ trình |
| S13 | `pathDetail` | **Bản đồ node cuộn dọc**: mỗi node là một chặng (bài giảng / quiz / thí nghiệm), có 3 trạng thái khoá – đang học – hoàn thành, hiển thị mức thành thạo (mastery) và huy hiệu XP. Node hiện tại được làm nổi bật |
| S14 | `nodeDetail` | Chi tiết một node: mục tiêu, thời lượng ước tính, điểm cao nhất đã đạt, nút Bắt đầu / Ôn lại |
| S15 | `reviewQueue` | Hàng ôn tập giãn cách hôm nay: các mục đến hạn ôn (`nextReviewDate`), độ khó, nút ôn nhanh |
| S16 | `calendar` | Lịch tháng + danh sách theo ngày, gộp 5 loại mục: bài tập đến hạn, mục ôn tập, mission, nhắc học, thông báo lớp — mỗi loại một tint riêng |

Màn `player` hiện có được tái sử dụng làm trình chạy node, không dựng mới.

---

## 7. Giai đoạn 5 — Gamification, cộng đồng, gói dịch vụ và an toàn

| # | Màn | Nội dung |
| --- | --- | --- |
| S17 | `game` | Trung tâm động lực: mục tiêu XP hôm nay, nhiệm vụ hằng ngày (nhận thưởng), streak + **đóng băng streak**, tim (hearts) và cách hồi tim |
| S18 | `rewards` | Huy hiệu đã đạt / chưa đạt, ghim huy hiệu, số gem, đổi gem lấy tim hoặc thẻ đóng băng |
| S19 | `leaderboard` | Bảng xếp hạng bạn cùng lớp và giải đấu (league), vùng thăng hạng. **Ẩn hoàn toàn nếu phụ huynh tắt `leaderboardEnabled`** |
| S20 | `social` | Nhóm học: nhóm của tôi, tìm nhóm, tạo nhóm, thử thách hợp tác. **Ẩn hoàn toàn nếu phụ huynh tắt `socialEnabled`** |
| S21 | `packageUsage` | Gói hiện tại + hạn mức đã dùng: số bài học, tín dụng AI, dung lượng lưu trữ. Cảnh báo khi gần hết |
| S22 | `reminderSettings` | Bật/tắt nhắc học, chọn giờ và các ngày trong tuần, kênh nhận |
| S23 | `screenTimeLock` | **Lớp phủ toàn màn hình không tắt được** khi vượt giới hạn thời gian phụ huynh đặt. Hiển thị số phút đã học / giới hạn và thời điểm mở lại. Web đã có cơ chế này (`isLocked`); mobile bắt buộc phải có, nếu không thì cài đặt an toàn của phụ huynh chỉ là trang trí |

Ràng buộc chéo cần thể hiện đúng: 4 công tắc trong màn `pSafety` của phụ huynh (social, leaderboard, AI tutor, thông báo) và giới hạn thời gian phải **thực sự thay đổi giao diện phía học sinh** trong prototype, không chỉ đổi trạng thái công tắc.

---

## 8. Giai đoạn 6 — Soạn giáo án

Phần nặng nhất phía giáo viên. Backend đã có đầy đủ (`LessonPlan`, `LessonPlanFolder`, 9 loại block, clone từ cây chương trình chuẩn).

| # | Màn | Nội dung |
| --- | --- | --- |
| T19 | `tPlanCreate` | Tạo giáo án: khối, môn, chương trình, bài trong chương trình chuẩn, tiêu đề, mục tiêu, thời lượng |
| T20 | `tPlanEditor` | Trình soạn: cột nội dung là danh sách block; nút mở **sheet cây cấu trúc** (Môn → Chương → Bài) để chuyển giữa các mục; thêm / sửa / xoá / kéo sắp xếp block |
| T21 | `tPlanBlockEditor` | Soạn từng loại block. 9 loại theo `ELessonBlockType`: Văn bản, Tiêu đề, Ảnh, Video, **Học liệu 3D/VR** (chọn từ Thư viện), **Quiz** (chọn hoặc tạo nhanh), **Thí nghiệm**, Nhúng, Tệp |
| T22 | `tCurriculumClone` | Sao chép cây chương trình chuẩn vào giáo án, chọn có kèm phần lý thuyết hay không |
| T23 | `tPlanPublish` | Chọn các lớp được gán + xuất bản. Giáo án chưa xuất bản không giao được cho lớp |
| T24 | `tPlanPreview` | Xem trước đúng như học sinh nhìn thấy |

Màn `tPlan` hiện tại (chỉ hiển thị tiêu đề + danh sách block tĩnh) được thay bằng T20.

---

## 9. Giai đoạn 7 — Vai trò Trường học ⚠️ chưa có backend

Toàn bộ giai đoạn này là **nghiệp vụ mới**, không có đối chiếu ở web `eduverse-yoolife` cũng như ở backend. Dựng được trên prototype vì prototype dùng mock data, nhưng phải xếp cuối và đánh dấu rõ để không tạo kỳ vọng sai về tiến độ production.

| # | Màn | Nội dung |
| --- | --- | --- |
| A1 | `sOverview` | Tổng quan trường: số lớp / giáo viên / học sinh đang hoạt động, tỉ lệ hoàn thành bài tập toàn trường, điểm trung bình theo khối, số giáo viên chờ duyệt |
| A2 | `sTeachers` | Danh sách giáo viên: môn, số lớp, trạng thái xác minh. Duyệt / từ chối hồ sơ giáo viên đăng ký vào trường |
| A3 | `sTeacherDetail` | Hồ sơ giáo viên, tài liệu xác minh, các lớp đang dạy |
| A4 | `sClasses` | Lớp toàn trường, lọc theo khối và môn, phân công giáo viên chủ nhiệm / trợ giảng |
| A5 | `sStudents` | Học sinh toàn trường, lọc theo khối/lớp, xem hồ sơ |
| A6 | `sReports` | Báo cáo toàn trường theo khối / môn / kỳ; so sánh giữa các lớp |
| A7 | `sSettings` | Thông tin trường, năm học, mã tham gia trường, chính sách xác minh giáo viên |

**Ràng buộc bắt buộc ghi trong spec**: trước khi triển khai giai đoạn này ở bản production, cần một vòng làm việc riêng với backend để định nghĩa thực thể Trường/Tổ chức, quyền quản trị, và quy trình duyệt giáo viên. Prototype chỉ để lấy phản hồi nghiệp vụ sớm.

---

## 10. Tổng hợp thứ tự và phụ thuộc

| Giai đoạn | Nội dung | Số màn mới | Phụ thuộc | Backend |
| --- | --- | --- | --- | --- |
| 0 | Nền tảng: ngăn xếp điều hướng, tách dữ liệu/logic, component dùng chung | 0 | — | không cần |
| 1 | Vòng lặp dạy–học lõi | 12 | GĐ 0 | ✅ đã có |
| 2 | Thi trực tuyến + ngân hàng câu hỏi | 15 | GĐ 0, GĐ 1 (trạng thái bài nộp) | ✅ đã có |
| 3 | Onboarding, xác minh, liên kết | 12 | GĐ 0 | ✅ đã có |
| 4 | Lộ trình học + ôn tập + lịch | 7 | GĐ 0 | ✅ đã có |
| 5 | Gamification, cộng đồng, gói, khoá thời gian | 7 | GĐ 0, GĐ 3 (liên kết PH–HS) | ✅ đã có |
| 6 | Soạn giáo án | 6 | GĐ 0, GĐ 1 (gán bài tập từ giáo án) | ✅ đã có |
| 7 | Vai trò Trường học | 7 | GĐ 0, GĐ 3 (xác minh GV) | ❌ chưa có |

Tổng: **66 màn mới** trên nền 50 màn hiện có.

Giai đoạn 1–3 là phần bắt buộc để prototype thể hiện được "cơ chế LMS dạy và học". Giai đoạn 4–6 là phần làm sản phẩm khác biệt. Giai đoạn 7 là phần thăm dò nghiệp vụ.

---

## 11. Cách kiểm chứng

Prototype không có test framework và spec này không đưa việc thêm framework vào phạm vi. Cách kiểm chứng thay thế:

1. **Checklist luồng theo vai trò** — mỗi giai đoạn kèm một danh sách bấm tay đi hết luồng, ví dụ giai đoạn 1: *GV tạo bài tập có rubric → HS thấy bài, nộp kèm ảnh → GV chấm theo rubric và trả bài → HS thấy trạng thái Trả bài và nộp lại → GV chấm lần 2 → điểm xuất hiện đúng ở bảng điểm cả hai phía*.
2. **Kiểm tra chéo hai vai trò**: mọi hành động của một vai trò phải nhìn thấy được ở vai trò kia trong cùng phiên (state dùng chung). Đây là điểm mạnh của prototype một-state-machine, cần giữ.
3. **Rà chuỗi**: mọi chuỗi mới có mặt ở shard i18n; chuyển ngôn ngữ sang EN không còn chuỗi tiếng Việt sót trên các màn mới.
4. **Rà màu**: không còn mã hex mới nằm rời trong JSX của màn mới.

---

## 12. Ngoài phạm vi

- Nối API thật, xác thực thật, lưu trữ thật.
- Ma trận đề, mã đề, xuất file đề `.docx`/`.pdf`, phiếu trả lời OMR — backend chưa có.
- Marketplace ngân hàng câu hỏi công khai (backend có cột `IsPublic` nhưng chưa mở nghiệp vụ).
- Thanh toán thật trong luồng nạp ví / nâng gói.
- Chế độ ngoại tuyến thật (chỉ mô phỏng trạng thái lỗi lưu ở màn làm bài thi).
- Ứng dụng native, thông báo đẩy thật, VR/AR thật.

---

## 13. Tự rà soát spec

- **Placeholder**: không còn mục "TBD"/"TODO"; mọi màn đều có mô tả nội dung cụ thể hoặc lý do bị chặn.
- **Nhất quán nội bộ**: tab "Thư viện" của học sinh bị gộp vào "Khám phá" ở §2.1 — đã ghi rõ lý do (nhường chỗ cho tab "Học tập") và nêu rõ đây là mẫu đã tồn tại trong mã, không phải mẫu mới. Giai đoạn 2 phụ thuộc Giai đoạn 1 vì tab "Đề thi" nằm trong màn `classwork` đã sửa ở Giai đoạn 1 — đã ghi ở bảng §10.
- **Phạm vi**: spec bao 8 giai đoạn, quá lớn cho một implementation plan duy nhất. **Mỗi giai đoạn sẽ có một plan riêng**; plan đầu tiên là Giai đoạn 0 + Giai đoạn 1.
- **Mơ hồ**: ba điểm từng có thể hiểu hai cách đã được chốt rõ — vai trò Trường học là nghiệp vụ mới chưa có backend (§0.1.2), điểm AI không bao giờ tự thành điểm chính thức (§4.3 T18), cài đặt an toàn của phụ huynh phải thực sự đổi giao diện học sinh chứ không chỉ đổi công tắc (§7).
