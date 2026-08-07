export const ACCENT = "#00aaab", DEEP = "#00708f", INK = "#195658", MUTED = "#617789", BORDER = "#ddeaf0";

export const CATS = [
  { label: "Toán", icon: "/assets/cat/toan.svg" },
  { label: "Vật lý", icon: "/assets/cat/vat-ly.svg" },
  { label: "Hóa học", icon: "/assets/cat/hoa-hoc.svg" },
  { label: "Sinh học", icon: "/assets/cat/sinh-hoc.svg" },
  { label: "Lịch sử", icon: "/assets/cat/lich-su.svg" },
  { label: "Địa lý", icon: "/assets/cat/dia-ly.svg" },
  { label: "Tiếng Anh", icon: "/assets/cat/english.svg" },
  { label: "Công nghệ", icon: "/assets/cat/cong-nghe.svg" },
];

export const LESSONS = [
  { id: 1, title: "Cấu tạo tế bào thực vật", meta: "Sinh học · Lớp 6 · 32 phút", typeLabel: "Mô hình 3D", price: "120", rating: "4.8", reviews: "126", tint: "linear-gradient(135deg,#00aaab,#00708f)", slot: "[ ảnh bìa · mô hình 3D tế bào ]" },
  { id: 2, title: "Thí nghiệm điện phân dung dịch CuSO₄", meta: "Hóa học · Lớp 11 · 24 phút", typeLabel: "Mô phỏng", price: "150", rating: "4.7", reviews: "89", tint: "linear-gradient(135deg,#138cd2,#195658)", slot: "[ ảnh bìa · bể điện phân ]" },
  { id: 3, title: "Hệ Mặt Trời trong không gian 3D", meta: "Khoa học · Lớp 9 · 41 phút", typeLabel: "VR360", price: "200", rating: "4.9", reviews: "213", tint: "linear-gradient(135deg,#195658,#0f3234)", slot: "[ ảnh bìa · hệ mặt trời ]" },
  { id: 4, title: "Chiến dịch Điện Biên Phủ", meta: "Lịch sử · Lớp 12 · 28 phút", typeLabel: "VR360", price: "Miễn phí", rating: "4.6", reviews: "154", tint: "linear-gradient(135deg,#ef5da8,#a03a6d)", slot: "[ ảnh bìa · bản đồ chiến dịch ]" },
  { id: 5, title: "Ba định luật Newton", meta: "Vật lý · Lớp 10 · 35 phút", typeLabel: "Mô phỏng", price: "130", rating: "4.8", reviews: "97", tint: "linear-gradient(135deg,#f59e0b,#c2410c)", slot: "[ ảnh bìa · mặt phẳng nghiêng ]" },
  { id: 6, title: "Địa hình Việt Nam qua bản đồ 3D", meta: "Địa lý · Lớp 8 · 22 phút", typeLabel: "Mô hình 3D", price: "110", rating: "4.5", reviews: "64", tint: "linear-gradient(135deg,#22c55e,#15803d)", slot: "[ ảnh bìa · bản đồ địa hình ]" },
];

export const STEPS = [
  { num: "1", title: "Giới thiệu bài học", kind: "Video", dur: "4:12", tint: "linear-gradient(135deg,#00aaab,#00708f)", slot: "[ video giảng · cô Phạm Thu Trang ]",
    body: "Tổng quan về tế bào — đơn vị cơ bản của sự sống. Bài học đặt câu hỏi: điều gì khiến tế bào thực vật khác tế bào động vật?" },
  { num: "2", title: "Mô hình 3D tế bào thực vật", kind: "Tương tác 3D", dur: "8:00", tint: "linear-gradient(135deg,#138cd2,#195658)", slot: "[ mô hình 3D · xoay, tách lớp, phóng to ]",
    body: "Xoay mô hình để quan sát từng bào quan. Chạm vào một bào quan để tách lớp và đọc chú thích chi tiết.",
    points: [
      { title: "Thành tế bào", text: "Lớp ngoài cùng bằng xenlulôzơ, giữ hình dạng cố định cho tế bào." },
      { title: "Lục lạp", text: "Chứa diệp lục, nơi diễn ra quá trình quang hợp." },
      { title: "Không bào trung tâm", text: "Chiếm tới 90% thể tích, dự trữ nước và duy trì áp suất trương." },
    ] },
  { num: "3", title: "Thành tế bào và màng sinh chất", kind: "Bài đọc", dur: "6:30", tint: "linear-gradient(135deg,#22c55e,#15803d)", slot: "[ hình minh họa · lát cắt thành tế bào ]",
    body: "Thành tế bào nằm ngoài màng sinh chất, được cấu tạo chủ yếu từ xenlulôzơ. Màng sinh chất kiểm soát các chất ra vào tế bào theo cơ chế chọn lọc." },
  { num: "4", title: "Câu hỏi nhanh", kind: "Kiểm tra", dur: "3:00", tint: "linear-gradient(135deg,#f59e0b,#c2410c)", slot: "[ nền câu hỏi nhanh ]",
    body: "Trả lời để kiểm tra hiểu biết trước khi sang phần tổng kết.", quiz: true },
  { num: "5", title: "Tổng kết bài học", kind: "Video", dur: "2:05", tint: "linear-gradient(135deg,#195658,#0f3234)", slot: "[ video tổng kết ]",
    body: "Nhắc lại năm cấu trúc đặc trưng của tế bào thực vật và mối liên hệ giữa chúng với chức năng sống của cây." },
];

export const QUICK = ["Ti thể", "Lục lạp", "Ribôxôm", "Không bào"];
export const QUICK_CORRECT = 1;

export const EXAM = [
  { q: "Bào quan nào thực hiện quá trình quang hợp ở tế bào thực vật?", opts: ["Ti thể", "Lục lạp", "Ribôxôm", "Bộ máy Gôngi"], correct: 1 },
  { q: "Thành tế bào thực vật được cấu tạo chủ yếu từ chất nào?", opts: ["Xenlulôzơ", "Kitin", "Peptiđôglican", "Lipit"], correct: 0 },
  { q: "Chức năng chính của không bào trung tâm là gì?", opts: ["Tổng hợp prôtêin", "Phân giải chất thải", "Dự trữ nước và duy trì áp suất trương", "Vận chuyển nội bào"], correct: 2 },
];

export const T_METRICS = [
  { label: "Lớp đang dạy", value: "5", hint: "Tổng số lớp đang hoạt động", bg: "#eaf6f8", color: "#00aaab" },
  { label: "Bài cần chấm", value: "12", hint: "Bài tập cần chấm điểm", bg: "#e7f2fb", color: "#138cd2" },
  { label: "Sắp đến hạn", value: "3", hint: "Trong 3 ngày tới", bg: "#fff5e6", color: "#f59e0b" },
  { label: "Học sinh", value: "128", hint: "Cần theo dõi và hỗ trợ", bg: "#fdeef5", color: "#ef5da8" },
];
export const T_CLASSES = [
  { name: "SINH HỌC 8A1", sub: "Sinh học · Lớp 8", code: "SH8A1-24", students: "32", progress: "60%", tint: "linear-gradient(135deg,#00aaab,#00708f)" },
  { name: "SINH HỌC 8A2", sub: "Sinh học · Lớp 8", code: "SH8A2-24", students: "30", progress: "45%", tint: "linear-gradient(135deg,#138cd2,#195658)" },
  { name: "KHTN 6A2", sub: "Khoa học tự nhiên · Lớp 6", code: "KH6A2-24", students: "34", progress: "72%", tint: "linear-gradient(135deg,#22c55e,#15803d)" },
  { name: "SINH HỌC 9A1", sub: "Sinh học · Lớp 9", code: "SH9A1-24", students: "32", progress: "28%", tint: "linear-gradient(135deg,#ef5da8,#a03a6d)" },
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
export const S_ASSIGNMENTS = {
  todo: [
    { title: "Bài tập tuần 20: Quang hợp của thực vật", cls: "SINH HỌC 8A1", due: "hạn 17/05 · còn 2 ngày", tag: "Bài tập", tagBg: "#eaf6f8", tagColor: "#00708f", score: "" },
    { title: "Trắc nghiệm: Cấu tạo tế bào thực vật", cls: "SINH HỌC 8A1", due: "hạn 18/05 · còn 3 ngày", tag: "Trắc nghiệm", tagBg: "#e7f2fb", tagColor: "#0b6aa3", score: "" },
    { title: "Dự án nhóm: Vòng tuần hoàn nước", cls: "KHTN 6A2", due: "hạn 22/05 · còn 1 tuần", tag: "Dự án", tagBg: "#fdeef5", tagColor: "#b13a75", score: "" },
  ],
  done: [
    { title: "Bài tập tuần 19: Hô hấp tế bào", cls: "SINH HỌC 8A1", due: "nộp 10/05 · đúng hạn", tag: "Đã nộp", tagBg: "#f0fdf4", tagColor: "#15803d", score: "" },
    { title: "Kiểm tra 15 phút: Mô phân sinh", cls: "SINH HỌC 8A1", due: "nộp 08/05 · nộp muộn", tag: "Đã nộp", tagBg: "#fff5e6", tagColor: "#b45309", score: "" },
  ],
  grades: [
    { title: "Bài tập tuần 19: Hô hấp tế bào", cls: "SINH HỌC 8A1", due: "Nhận xét: Trình bày rõ, thiếu kết luận", tag: "Đã chấm", tagBg: "#f0fdf4", tagColor: "#15803d", score: "8.5" },
    { title: "Kiểm tra 15 phút: Mô phân sinh", cls: "SINH HỌC 8A1", due: "Nhận xét: Cần ôn lại phần mô dẫn", tag: "Đã chấm", tagBg: "#f0fdf4", tagColor: "#15803d", score: "6.0" },
  ],
};
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
export const TAB_ICONS = {
  cls: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11",
  chart: "M4 20V10.5M10 20V4.5M16 20v-7M21.5 20h-19",
  check: "M8.5 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1.5M8.5 5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM9 14l2.2 2.2L15.5 12",
  book: "M4.5 5.4A1.9 1.9 0 0 1 6.4 3.5H17a1.9 1.9 0 0 1 1.9 1.9v13.2H6.4a1.9 1.9 0 0 0-1.9 1.9V5.4zM8.5 8h6.5M8.5 11.5h6.5",
  doc: "M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5zM14 3.5V8h4.5M8.5 13h7M8.5 16.5h4",
  msg: "M20.5 11.6a7.9 7.9 0 0 1-11.5 7L4 20.5l1.4-4.8A7.9 7.9 0 1 1 20.5 11.6z",
  child: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1",
  home: "M3.5 10.4L12 3.6l8.5 6.8V20a1 1 0 0 1-1 1h-4.6v-6.2H9.1V21H4.5a1 1 0 0 1-1-1v-9.6z",
  explore: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm3.6 5.4l-2 4.2-4.2 2 2-4.2 4.2-2z",
  library: "M4 5.2A1.6 1.6 0 0 1 5.6 3.6h4.1a2.3 2.3 0 0 1 2.3 2.3V20a2 2 0 0 0-2-2H4V5.2zm16 0A1.6 1.6 0 0 0 18.4 3.6h-4.1A2.3 2.3 0 0 0 12 5.9V20a2 2 0 0 1 2-2h6V5.2z",
  noti: "M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4zM13.7 19.6a2 2 0 0 1-3.4 0",
  profile: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1",
};

export const NOTI = {
  student: [
    { title: "Bài kiểm tra mới được giao", when: "5 phút", text: "Cô Phạm Thu Trang vừa giao bài kiểm tra “Cấu tạo tế bào thực vật” cho lớp 6A2.", tint: "#00aaab", bg: "#f4fbfc", unread: true, iconPath: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2" },
    { title: "Bạn đạt chuỗi 7 ngày học", when: "2 giờ", text: "Giữ chuỗi thêm 3 ngày để nhận 100 điểm học tập thưởng.", tint: "#f59e0b", bg: "#f4fbfc", unread: true, iconPath: "M13 2L4.5 13.5H11l-1 8.5 8.5-11.5H12l1-8.5z" },
    { title: "Bài tập tuần 20 sắp đến hạn", when: "5 giờ", text: "Còn 2 ngày để nộp bài tập tuần 20 của lớp SINH HỌC 8A1.", tint: "#138cd2", bg: "#f4fbfc", unread: true, iconPath: "M12 8v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
    { title: "Nạp tiền thành công", when: "3 ngày", text: "Ví YooBook của bạn đã được cộng 200.000đ.", tint: "#22c55e", bg: "#fff", unread: false, iconPath: "M5 12.5L10 17.5 19 6.5" },
  ],
  teacher: [
    { title: "12 bài nộp đang chờ chấm", when: "10 phút", text: "Bài tập tuần 20 của SINH HỌC 8A1 đã có 28/32 bài nộp.", tint: "#00aaab", bg: "#f4fbfc", unread: true, iconPath: "M9 14l2.2 2.2L15.5 12M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5z" },
    { title: "Phụ huynh gửi tin nhắn", when: "1 giờ", text: "Anh Nguyễn Văn Dũng hỏi về tiến độ của Nguyễn Thị Hoa.", tint: "#ef5da8", bg: "#f4fbfc", unread: true, iconPath: "M20.5 11.6a7.9 7.9 0 0 1-11.5 7L4 20.5l1.4-4.8A7.9 7.9 0 1 1 20.5 11.6z" },
    { title: "Giáo án đã được xuất bản", when: "4 giờ", text: "“Cấu tạo tế bào thực vật” đã sẵn sàng để gán cho lớp học.", tint: "#22c55e", bg: "#f4fbfc", unread: true, iconPath: "M5 12.5L10 17.5 19 6.5" },
    { title: "Kiểm tra giữa kỳ sắp diễn ra", when: "2 ngày", text: "Đề thi giữa kỳ lớp 8A2 diễn ra tiết 2 ngày 19/05.", tint: "#f59e0b", bg: "#fff", unread: false, iconPath: "M12 8v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
  ],
  parent: [
    { title: "Báo cáo tuần 20 đã sẵn sàng", when: "30 phút", text: "Báo cáo học tập của Nguyễn Thị Hoa tuần 11/05 – 17/05 đã được tạo.", tint: "#00aaab", bg: "#f4fbfc", unread: true, iconPath: "M14 3.5H7A1.5 1.5 0 0 0 5.5 5v14A1.5 1.5 0 0 0 7 20.5h10a1.5 1.5 0 0 0 1.5-1.5V8L14 3.5z" },
    { title: "Cô Phạm Thu Trang phản hồi", when: "2 giờ", text: "Hoa làm bài rất chắc phần lý thuyết, nhắc em nộp bài tuần 20 trước 17/05.", tint: "#ef5da8", bg: "#f4fbfc", unread: true, iconPath: "M20.5 11.6a7.9 7.9 0 0 1-11.5 7L4 20.5l1.4-4.8A7.9 7.9 0 1 1 20.5 11.6z" },
    { title: "Con sắp đạt giới hạn màn hình", when: "6 giờ", text: "Hôm nay Hoa đã học 52 phút trên giới hạn 60 phút.", tint: "#f59e0b", bg: "#f4fbfc", unread: true, iconPath: "M12 8v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
    { title: "Bài tập chưa nộp", when: "1 ngày", text: "Bài tập tuần 20 của lớp SINH HỌC 8A1 còn 2 ngày đến hạn.", tint: "#138cd2", bg: "#fff", unread: false, iconPath: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" },
  ],
};
