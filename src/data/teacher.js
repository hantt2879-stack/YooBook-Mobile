export const T_METRICS = [
  { label: "Lớp đang dạy", value: "5", hint: "Tổng số lớp đang hoạt động", bg: "#eaf6f8", color: "#00aaab" },
  { label: "Bài cần chấm", value: "12", hint: "Bài tập cần chấm điểm", bg: "#e7f2fb", color: "#138cd2" },
  { label: "Sắp đến hạn", value: "3", hint: "Trong 3 ngày tới", bg: "#fff5e6", color: "#f59e0b" },
  { label: "Học sinh", value: "128", hint: "Cần theo dõi và hỗ trợ", bg: "#fdeef5", color: "#ef5da8" },
];
// `id` phải khớp với `classId` dùng trong SEED_ASSIGNMENTS/ROSTER (coursework.js)
// — đây là khoá dùng để lọc bảng điểm/thống kê/tiến độ/thông báo đúng theo lớp
// đang mở, thay cho việc hardcode classId === 1.
export const T_CLASSES = [
  { id: 1, name: "SINH HỌC 8A1", sub: "Sinh học · Lớp 8", code: "SH8A1-24", students: "32", progress: "60%", tint: "linear-gradient(135deg,#00aaab,#00708f)", img: "/assets/thumbs/thumb-bio-cell.svg" },
  { id: 2, name: "SINH HỌC 8A2", sub: "Sinh học · Lớp 8", code: "SH8A2-24", students: "30", progress: "45%", tint: "linear-gradient(135deg,#138cd2,#195658)", img: "/assets/thumbs/thumb-bio-cell.svg" },
  { id: 3, name: "KHTN 6A2", sub: "Khoa học tự nhiên · Lớp 6", code: "KH6A2-24", students: "34", progress: "72%", tint: "linear-gradient(135deg,#22c55e,#15803d)", img: "/assets/thumbs/thumb-science-watercycle.svg" },
  { id: 4, name: "SINH HỌC 9A1", sub: "Sinh học · Lớp 9", code: "SH9A1-24", students: "32", progress: "28%", tint: "linear-gradient(135deg,#ef5da8,#a03a6d)", img: "/assets/thumbs/thumb-bio-cell.svg" },
];
export const T_ASSIGNMENTS = [
  { title: "Bài tập tuần 20: Quang hợp của thực vật", cls: "SINH HỌC 8A1", due: "17/05/2026", submitted: "28/32", pending: "4 bài chờ chấm" },
  { title: "Kiểm tra giữa kỳ: Cấu tạo tế bào", cls: "SINH HỌC 8A2", due: "19/05/2026", submitted: "25/30", pending: "5 bài chờ chấm" },
  { title: "Dự án nhóm: Vòng tuần hoàn nước", cls: "KHTN 6A2", due: "22/05/2026", submitted: "31/34", pending: "3 bài chờ chấm" },
];
export const T_SUBMISSIONS = [
  { name: "Nguyễn Thị Hoa", at: "16/05 · 20:14", attempt: "Lần 1", status: "Đã nộp", statusTint: "#00708f", statusBg: "#eaf6f8", tint: "#00aaab", late: false,
    answer: "Quang hợp diễn ra ở lục lạp, cần ánh sáng, nước và khí CO₂. Sản phẩm tạo ra là glucôzơ và khí ôxi. Em có đính kèm sơ đồ mô tả pha sáng và pha tối." },
  { name: "Trần Quốc Bảo", at: "17/05 · 07:02", attempt: "Lần 2", status: "Nộp muộn", statusTint: "#b45309", statusBg: "#fff5e6", tint: "#f59e0b", late: true,
    answer: "Lục lạp chứa diệp lục hấp thụ ánh sáng. Em chưa kịp vẽ sơ đồ pha tối, mong cô cho nộp bổ sung." },
  { name: "Lê Minh Anh", at: "16/05 · 18:41", attempt: "Lần 1", status: "Đã nộp", statusTint: "#00708f", statusBg: "#eaf6f8", tint: "#138cd2", late: false,
    answer: "Em trình bày hai pha của quang hợp và so sánh với hô hấp tế bào ở phần cuối bài làm." },
  { name: "Phạm Gia Hân", at: "16/05 · 21:30", attempt: "Lần 1", status: "Đã chấm", statusTint: "#15803d", statusBg: "#f0fdf4", tint: "#22c55e", late: false,
    answer: "Bài làm đầy đủ hai pha, có sơ đồ và kết luận về vai trò của quang hợp với sự sống trên Trái Đất." },
];
export const T_PLANS = [
  { title: "Cấu tạo tế bào thực vật", sub: "Sinh học · Lớp 6 · 5 mục nội dung", status: "Đã xuất bản", statusBg: "#f0fdf4", statusColor: "#15803d", used: "Dùng trong 3 lớp" },
  { title: "Quang hợp và hô hấp tế bào", sub: "Sinh học · Lớp 8 · 7 mục nội dung", status: "Bản nháp", statusBg: "#fff5e6", statusColor: "#b45309", used: "Chưa gán lớp" },
  { title: "Vòng tuần hoàn nước trong tự nhiên", sub: "KHTN · Lớp 6 · 4 mục nội dung", status: "Đã xuất bản", statusBg: "#f0fdf4", statusColor: "#15803d", used: "Dùng trong 1 lớp" },
];
export const T_BLOCKS = [
  { kind: "Video", title: "Giới thiệu bài học", dur: "4:12", tint: "#00aaab" },
  { kind: "Mô hình 3D", title: "Mô hình tế bào thực vật", dur: "8:00", tint: "#138cd2" },
  { kind: "Bài đọc", title: "Thành tế bào và màng sinh chất", dur: "6:30", tint: "#22c55e" },
  { kind: "Trắc nghiệm", title: "Câu hỏi nhanh · 4 câu", dur: "3:00", tint: "#f59e0b" },
];
export const T_STUDENTS = [
  { name: "Nguyễn Thị Hoa", meta: "Lớp 8A1 · 12/12 bài đã nộp", score: "8.6", tint: "#00aaab" },
  { name: "Trần Quốc Bảo", meta: "Lớp 8A1 · 9/12 bài đã nộp", score: "6.4", tint: "#f59e0b" },
  { name: "Lê Minh Anh", meta: "Lớp 8A1 · 12/12 bài đã nộp", score: "9.1", tint: "#138cd2" },
  { name: "Phạm Gia Hân", meta: "Lớp 8A1 · 11/12 bài đã nộp", score: "7.8", tint: "#22c55e" },
  { name: "Đỗ Khánh Linh", meta: "Lớp 8A1 · 8/12 bài đã nộp", score: "5.9", tint: "#ef5da8" },
];
