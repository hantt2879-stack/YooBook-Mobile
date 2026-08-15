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

// Per-subject thumbnail + tint used by both the curated seed lessons below
// and the generated catalog, so every item in a subject looks consistent.
const SUBJECT_META = {
  "Toán": { img: "/assets/thumbs/thumb-math-geometry.svg", tint: "linear-gradient(135deg,#0b6aa3,#195658)" },
  "Vật lý": { img: "/assets/thumbs/thumb-physics-newton.svg", tint: "linear-gradient(135deg,#f59e0b,#c2410c)" },
  "Hóa học": { img: "/assets/thumbs/thumb-chem-electrolysis.svg", tint: "linear-gradient(135deg,#138cd2,#195658)" },
  "Sinh học": { img: "/assets/thumbs/thumb-bio-cell.svg", tint: "linear-gradient(135deg,#00aaab,#00708f)" },
  "Lịch sử": { img: "/assets/thumbs/thumb-history-map.svg", tint: "linear-gradient(135deg,#ef5da8,#a03a6d)" },
  "Địa lý": { img: "/assets/thumbs/thumb-geo-vietnam.svg", tint: "linear-gradient(135deg,#22c55e,#15803d)" },
  "Tiếng Anh": { img: "/assets/thumbs/thumb-english-language.svg", tint: "linear-gradient(135deg,#ef5da8,#0b6aa3)" },
  "Công nghệ": { img: "/assets/thumbs/thumb-tech-circuit.svg", tint: "linear-gradient(135deg,#22c55e,#0b6aa3)" },
  "Khoa học": { img: "/assets/thumbs/thumb-science-watercycle.svg", tint: "linear-gradient(135deg,#22c55e,#00708f)" },
};

function levelOf(grade) {
  return grade <= 5 ? "Tiểu học" : grade <= 9 ? "THCS" : "THPT";
}

// 6 hand-curated seed items (kept first + at fixed ids 1-6 — other constants
// like libSets/weekActivityList in useAppLogic.js index into LESSONS[0..5]).
const CURATED_LESSONS = [
  { id: 1, title: "Cấu tạo tế bào thực vật", subject: "Sinh học", grade: "Lớp 6", type: "Mô hình 3D", dur: 32 },
  { id: 2, title: "Thí nghiệm điện phân dung dịch CuSO₄", subject: "Hóa học", grade: "Lớp 11", type: "Mô phỏng", dur: 24 },
  { id: 3, title: "Hệ Mặt Trời trong không gian 3D", subject: "Khoa học", grade: "Lớp 9", type: "VR360", dur: 41 },
  { id: 4, title: "Chiến dịch Điện Biên Phủ", subject: "Lịch sử", grade: "Lớp 12", type: "VR360", dur: 28 },
  { id: 5, title: "Ba định luật Newton", subject: "Vật lý", grade: "Lớp 10", type: "Mô phỏng", dur: 35 },
  { id: 6, title: "Địa hình Việt Nam qua bản đồ 3D", subject: "Địa lý", grade: "Lớp 8", type: "Mô hình 3D", dur: 22 },
].map((l) => ({
  ...l, meta: `${l.subject} · ${l.grade} · ${l.dur} phút`, level: levelOf(parseInt(l.grade.replace("Lớp ", ""), 10)),
  typeLabel: l.type, price: ["120", "150", "200", "Miễn phí", "130", "110"][l.id - 1],
  rating: ["4.8", "4.7", "4.9", "4.6", "4.8", "4.5"][l.id - 1], reviews: ["126", "89", "213", "154", "97", "64"][l.id - 1],
  tint: SUBJECT_META[l.subject].tint, img: SUBJECT_META[l.subject].img,
}));

// Topic pools used to generate a large, varied catalog of additional
// realistic-looking learning resources across subjects and grades.
const TOPIC_POOL = {
  "Toán": ["Hàm số bậc nhất", "Định lý Pytago", "Hình học không gian", "Phương trình bậc hai", "Xác suất và thống kê", "Số phức và ứng dụng", "Đạo hàm và ứng dụng", "Tích phân cơ bản", "Hình học tọa độ", "Bất đẳng thức cơ bản"],
  "Vật lý": ["Định luật Ohm", "Sóng ánh sáng và giao thoa", "Điện từ trường", "Chuyển động tròn đều", "Nhiệt động lực học", "Dao động điều hòa", "Thấu kính và quang hình", "Định luật bảo toàn năng lượng", "Áp suất chất lưu", "Cảm ứng điện từ"],
  "Hóa học": ["Phản ứng oxi hóa - khử", "Bảng tuần hoàn nguyên tố", "Liên kết hóa học", "Axit - Bazơ - Muối", "Hóa học hữu cơ cơ bản", "Phản ứng trung hòa", "Cấu tạo nguyên tử", "Tốc độ phản ứng hóa học", "Kim loại và hợp kim", "Este và chất béo"],
  "Sinh học": ["Quang hợp ở thực vật", "Hệ tuần hoàn máu", "Di truyền học Mendel", "Hệ sinh thái rừng nhiệt đới", "Cấu tạo tế bào động vật", "Hô hấp tế bào", "Chuỗi và lưới thức ăn", "Hệ thần kinh người", "Sinh sản ở thực vật", "Miễn dịch và kháng thể"],
  "Lịch sử": ["Khởi nghĩa Hai Bà Trưng", "Cách mạng tháng Tám 1945", "Triều đại nhà Nguyễn", "Chiến tranh thế giới thứ hai", "Văn minh Văn Lang - Âu Lạc", "Phong trào Cần Vương", "Hiệp định Genève 1954", "Khởi nghĩa Lam Sơn", "Chiến thắng Bạch Đằng", "Cách mạng công nghiệp"],
  "Địa lý": ["Khí hậu nhiệt đới gió mùa", "Vòng tuần hoàn nước", "Các đới khí hậu trên Trái Đất", "Địa lý dân cư Việt Nam", "Tài nguyên khoáng sản", "Kiến tạo mảng và núi lửa", "Địa hình đồng bằng sông Cửu Long", "Hải lưu và đại dương", "Đô thị hóa ở Việt Nam", "Biến đổi khí hậu toàn cầu"],
  "Tiếng Anh": ["Từ vựng chủ đề gia đình", "Ngữ pháp thì hiện tại đơn", "Kỹ năng nghe hiểu cơ bản", "Phát âm chuẩn IPA", "Từ vựng chủ đề du lịch", "Ngữ pháp câu điều kiện", "Kỹ năng viết đoạn văn", "Từ vựng chủ đề môi trường", "Ngữ pháp câu bị động", "Giao tiếp tình huống hàng ngày"],
  "Công nghệ": ["Lập trình Scratch cơ bản", "Mạch điện đơn giản", "Robot giáo dục", "Thiết kế 3D với Tinkercad", "An toàn thông tin cơ bản", "Internet vạn vật (IoT)", "Lập trình Python nhập môn", "Thiết kế mạch in cơ bản"],
  "Khoa học": ["Trạng thái của nước", "Vòng tuần hoàn vật chất", "Năng lượng và các dạng năng lượng", "Đa dạng sinh học", "Hiện tượng thời tiết cơ bản", "Vật liệu quanh em"],
};
const GRADE_RANGE = {
  "Toán": [6, 12], "Vật lý": [6, 12], "Hóa học": [8, 12], "Sinh học": [6, 12],
  "Lịch sử": [6, 12], "Địa lý": [6, 12], "Tiếng Anh": [6, 12], "Công nghệ": [6, 10], "Khoa học": [6, 9],
};
const TYPE_POOL = [
  { type: "Mô hình 3D", durRange: [25, 45] }, { type: "VR360", durRange: [30, 50] },
  { type: "Mô phỏng", durRange: [20, 35] }, { type: "Thí nghiệm", durRange: [15, 30] },
  { type: "Video", durRange: [8, 20] }, { type: "Tài liệu", durRange: [10, 25] },
];

function genCatalogLessons() {
  let id = CURATED_LESSONS.length + 1;
  const out = [];
  Object.keys(TOPIC_POOL).forEach((subject) => {
    const [gMin, gMax] = GRADE_RANGE[subject];
    TOPIC_POOL[subject].forEach((title, i) => {
      const grade = gMin + (i % (gMax - gMin + 1));
      const typeInfo = TYPE_POOL[(id + i) % TYPE_POOL.length];
      const [dMin, dMax] = typeInfo.durRange;
      const dur = dMin + ((id * 3 + i * 7) % (dMax - dMin + 1));
      const rating = (4.3 + ((id + i) % 6) * 0.1).toFixed(1);
      const reviews = String(30 + ((id * 13 + i * 17) % 260));
      const price = (id + i) % 9 === 0 ? "Miễn phí" : String(80 + ((id * 5 + i * 11) % 140));
      out.push({
        id, title, subject, grade: `Lớp ${grade}`, level: levelOf(grade),
        meta: `${subject} · Lớp ${grade} · ${dur} phút`,
        type: typeInfo.type, typeLabel: typeInfo.type,
        price, rating, reviews,
        tint: SUBJECT_META[subject].tint, img: SUBJECT_META[subject].img,
      });
      id++;
    });
  });
  return out;
}

export const LESSONS = CURATED_LESSONS.concat(genCatalogLessons());
export const LESSON_TYPES = ["Mô hình 3D", "VR360", "Mô phỏng", "Thí nghiệm", "Video", "Tài liệu"];
export const LEVELS = ["Tiểu học", "THCS", "THPT"];

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
