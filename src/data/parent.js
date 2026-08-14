export const P_CHILDREN = [
  { name: "Nguyễn Thị Hoa", meta: "Lớp 6A2 · THPT Nguyễn Huệ", initials: "HN", tint: "linear-gradient(135deg,#00aaab,#00708f)",
    xp: "2.480", level: "7", streak: "7", minutes: "185", missions: "12", path: "68%",
    classes: [
      { name: "SINH HỌC 8A1", teacher: "Cô Phạm Thu Trang", submitted: "12 / 12 bài đã nộp", score: "8.6" },
      { name: "KHTN 6A2", teacher: "Thầy Vũ Đình Nam", submitted: "9 / 11 bài đã nộp", score: "7.9" },
    ],
    assignments: [
      { title: "Bài tập tuần 20: Quang hợp của thực vật", cls: "SINH HỌC 8A1", state: "Chưa nộp · hạn 17/05", color: "#b45309", bg: "#fff5e6" },
      { title: "Bài tập tuần 19: Hô hấp tế bào", cls: "SINH HỌC 8A1", state: "Đã chấm · 8.5 điểm", color: "#15803d", bg: "#f0fdf4" },
      { title: "Kiểm tra 15 phút: Mô phân sinh", cls: "SINH HỌC 8A1", state: "Nộp muộn · 6.0 điểm", color: "#b13a75", bg: "#fdeef5" },
    ] },
  { name: "Nguyễn Minh Khôi", meta: "Lớp 4B · Tiểu học Kim Đồng", initials: "MK", tint: "linear-gradient(135deg,#138cd2,#195658)",
    xp: "1.150", level: "4", streak: "3", minutes: "92", missions: "6", path: "41%",
    classes: [{ name: "TIẾNG VIỆT 4B", teacher: "Cô Lê Thanh Mai", submitted: "7 / 9 bài đã nộp", score: "8.0" }],
    assignments: [
      { title: "Luyện đọc hiểu tuần 20", cls: "TIẾNG VIỆT 4B", state: "Chưa nộp · hạn 18/05", color: "#b45309", bg: "#fff5e6" },
      { title: "Chính tả tuần 19", cls: "TIẾNG VIỆT 4B", state: "Đã chấm · 9.0 điểm", color: "#15803d", bg: "#f0fdf4" },
    ] },
];
export const P_CONVOS = [
  { teacher: "Cô Phạm Thu Trang", cls: "SINH HỌC 8A1", subject: "Trao đổi về tiến độ tuần này", preview: "Hoa làm bài rất chắc phần lý thuyết, chị nhắc em nộp bài tuần 20 trước 17/05 nhé.", when: "2 giờ", unread: "2", tint: "#00aaab" },
  { teacher: "Thầy Vũ Đình Nam", cls: "KHTN 6A2", subject: "Dự án nhóm vòng tuần hoàn nước", preview: "Nhóm của Hoa cần bổ sung phần kết luận, hạn cuối là 22/05.", when: "1 ngày", unread: "", tint: "#138cd2" },
];
export const P_THREAD = [
  { who: "teacher", name: "Cô Phạm Thu Trang", at: "08:12", body: "Chào anh/chị. Tuần này Hoa tham gia rất tích cực, phần lý thuyết quang hợp em nắm tốt." },
  { who: "parent", name: "Bạn", at: "08:30", body: "Cảm ơn cô. Ở nhà cháu có nói phần pha tối khó hiểu, cô có tài liệu nào thêm không ạ?" },
  { who: "teacher", name: "Cô Phạm Thu Trang", at: "09:05", body: "Em cho Hoa xem lại mô hình 3D trong bài “Cấu tạo tế bào thực vật” phần lục lạp, có chú thích từng bước ạ." },
  { who: "teacher", name: "Cô Phạm Thu Trang", at: "09:06", body: "Anh/chị nhắc em nộp bài tuần 20 trước 17/05 giúp cô nhé." },
];
export const P_REPORT = {
  period: "Tuần 20 · 11/05 – 17/05/2026",
  summary: "Hoa duy trì chuỗi học 7 ngày liên tiếp và hoàn thành 12 mission. Kết quả lớp Sinh học ổn định ở mức 8.6, riêng phần bài tập về pha tối của quang hợp còn chậm.",
  metrics: [
    { label: "Mission hoàn thành", value: "12" },
    { label: "XP trong báo cáo", value: "640" },
    { label: "Phút học", value: "185" },
  ],
  strengths: ["Giữ nhịp học đều mỗi ngày, không bỏ buổi nào trong tuần.", "Trả lời đúng 92% câu hỏi nhanh trong bài giảng 3D.", "Chủ động ôn lại bài trước khi làm kiểm tra."],
  improvements: ["Còn 1 bài tập chưa nộp, hạn 17/05.", "Phần pha tối của quang hợp cần ôn thêm.", "Thời gian học buổi tối thường sau 21:30."],
};
