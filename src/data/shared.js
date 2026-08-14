// Token giao diện và dữ liệu dùng chung cho mọi vai trò.
// Mọi màu mới phải khai báo ở đây, không viết hex rời trong JSX.
export const ACCENT = "#00aaab", DEEP = "#00708f", INK = "#195658", MUTED = "#617789", BORDER = "#ddeaf0";

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
