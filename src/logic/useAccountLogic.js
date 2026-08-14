import { useEffect } from "react";
import { ACCENT, DEEP, NOTI } from "../data/shared.js";
import { P_CHILDREN } from "../data/parent.js";
import { T_CLASSES } from "../data/teacher.js";

export const INITIAL_ACCOUNT = {
  topup: 1, pay: 0,
  showPassword: false, remember: true,
  signupShowPassword: false, signupAgree: true,
  newShowPassword: false, otpSecs: 60,
  profileEditing: false,
  notifPrefs: { push: true, email: true, sms: false, assignment: true, classNews: true },
  helpOpenIdx: null, planChoice: "pro", loggedOutDevices: [],
};

// Chấm dứt phiên: đặt lại toàn bộ ngăn xếp về "login" thay vì push thêm một
// mục mới, để nút quay lại không thể đưa người dùng trở lại phiên đã đăng
// xuất.
export function useAccountLogic(ctx) {
  const { s, setState, t, cardOn, go, push, resetTo, roleMeta } = ctx;

  // Bộ đếm giây gửi lại OTP: chỉ chạy khi đang ở màn "verification".
  useEffect(() => {
    if (ctx.screen !== "verification") return;
    const id = setInterval(() => {
      setState((prev) => (prev.otpSecs > 0 ? { otpSecs: prev.otpSecs - 1 } : {}));
    }, 1000);
    return () => clearInterval(id);
  }, [ctx.screen]);

  const topups = [
    { v: 50000, label: "50.000đ", bonus: "—" }, { v: 100000, label: "100.000đ", bonus: "+5.000đ" },
    { v: 200000, label: "200.000đ", bonus: "+15.000đ" }, { v: 500000, label: "500.000đ", bonus: "+50.000đ" },
    { v: 1000000, label: "1.000.000đ", bonus: "+120.000đ" }, { v: 0, label: "Khác", bonus: "Tự nhập" },
  ];
  const topupAmounts = topups.map((tp, i) => {
    const on = s.topup === i;
    return { label: tp.label, bonus: tp.bonus, ...cardOn(on), color: on ? DEEP : "#455771", onClick: () => setState({ topup: i }) };
  });
  const pays = [
    { tag: "VNP", name: "VNPAY QR", desc: "Quét mã bằng ứng dụng ngân hàng", tint: "#195658" },
    { tag: "MOMO", name: "Ví MoMo", desc: "Thanh toán qua ví điện tử MoMo", tint: "#ef5da8" },
    { tag: "ATM", name: "Thẻ nội địa / ATM", desc: "Vietcombank ···· 4821", tint: "#138cd2" },
  ];
  const payMethods = pays.map((m, i) => {
    const on = s.pay === i;
    return { ...m, ...cardOn(on), dotBorder: on ? `6px solid ${ACCENT}` : `1.6px solid #ddeaf0`, dotBg: "transparent", onClick: () => setState({ pay: i }) };
  });

  return {
    isLogin: ctx.screen === "login", isSignup: ctx.screen === "signup", isForgotPassword: ctx.screen === "forgotPassword",
    isVerification: ctx.screen === "verification", isNewPassword: ctx.screen === "newPassword",
    isSuccess: ctx.screen === "success",
    isProfile: ctx.screen === "profile",
    isProfileDetail: ctx.screen === "profileDetail", isChangePassword: ctx.screen === "changePassword",
    isWallet: ctx.screen === "wallet",
    isServicePlan: ctx.screen === "servicePlan", isDevices: ctx.screen === "devices",
    isNotifPrefs: ctx.screen === "notifPrefs", isAccountSecurity: ctx.screen === "accountSecurity",
    isHelpSupport: ctx.screen === "helpSupport",
    isNoti: ctx.screen === "noti",

    toWallet: () => go("wallet"), toProfile: () => go("profile"), toNoti: () => go("noti"),
    toLogin: () => { setState({ otpSecs: 60 }); resetTo("login"); },

    toSignup: () => go("signup"), toForgotPassword: () => go("forgotPassword"),
    toVerification: () => go("verification"), toNewPassword: () => go("newPassword"),
    toSuccess: () => go("success"),
    togglePassword: () => setState({ showPassword: !s.showPassword }),
    toggleRemember: () => setState({ remember: !s.remember }),
    toggleSignupPassword: () => setState({ signupShowPassword: !s.signupShowPassword }),
    toggleSignupAgree: () => setState({ signupAgree: !s.signupAgree }),
    toggleNewPassword: () => setState({ newShowPassword: !s.newShowPassword }),
    passwordMask: s.showPassword ? "Yootek@2026" : "••••••••",
    signupPasswordMask: s.signupShowPassword ? "Yootek@2026" : "••••••••",
    newPasswordMask: s.newShowPassword ? "Yootek@2026" : "••••••••",
    otpClock: "00:" + String(s.otpSecs).padStart(2, "0"),
    canResendOtp: s.otpSecs === 0,
    resendOtp: () => setState({ otpSecs: 60 }),
    remember: s.remember, signupAgree: s.signupAgree,

    userName: "Nguyễn Thị Hoa",
    roleLabel: roleMeta[s.role].title,

    notifications: NOTI[s.role].map((n) => ({ ...n, unread: n.unread && !s.notiRead })),
    unreadNotiCount: NOTI[s.role].filter((n) => n.unread).length,
    hasUnreadNoti: !s.notiRead && NOTI[s.role].some((n) => n.unread),
    markAllRead: () => setState({ notiRead: true }),

    profileRows: [
      { label: "Hồ sơ cá nhân", value: "", iconPath: "M12 12.4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7.2 7.1c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1", onClick: () => { setState({ profileEditing: false }); push("profileDetail"); } },
      s.role === "teacher"
        ? { label: "Lớp học của tôi", value: `${T_CLASSES.length + s.createdClasses.length} lớp`, iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("tClasses") }
        : s.role === "parent"
        ? { label: "Học sinh liên kết", value: `${P_CHILDREN.length} con`, iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("pChild") }
        : { label: "Lớp học của tôi", value: "6A2", iconPath: "M3 8.5L12 4l9 4.5-9 4.5-9-4.5zM7 11v4.6c0 .5.3 1 .8 1.2 2.7 1.3 5.7 1.3 8.4 0 .5-.2.8-.7.8-1.2V11", onClick: () => go("classwork") },
      { label: "Ví & giao dịch", value: "450.000đ", iconPath: "M3 8.5A2.5 2.5 0 0 1 5.5 6H19a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5.5A2.5 2.5 0 0 1 3 16.5v-8zM16.5 12.5h.01", onClick: () => go("wallet") },
      { label: "Gói dịch vụ", value: "Pro", iconPath: "M4 17l1.6-9L10 12l2-6 2 6 4.4-4 1.6 9H4z", onClick: () => go("servicePlan") },
      { label: "Thiết bị của tôi", value: "2/3", iconPath: "M7 3.5h10a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM11 17.5h2", onClick: () => go("devices") },
      { label: "Thông báo & tuỳ chọn", value: "", iconPath: "M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4zM13.7 19.6a2 2 0 0 1-3.4 0", onClick: () => go("notifPrefs") },
      { label: "Tài khoản & bảo mật", value: "", iconPath: "M12 3.5l7 3v5.2c0 4.3-2.9 7.6-7 8.8-4.1-1.2-7-4.5-7-8.8V6.5l7-3z", onClick: () => go("accountSecurity") },
      { label: "Ngôn ngữ", value: s.lang === "en" ? "English" : "Tiếng Việt", iconPath: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.2 12h17.6M12 3.2c4.5 5 4.5 12.6 0 17.6M12 3.2c-4.5 5-4.5 12.6 0 17.6", onClick: () => setState({ langOpen: true }) },
      { label: "Trợ giúp & hỗ trợ", value: "", iconPath: "M9.1 9a2.9 2.9 0 1 1 4.4 2.9c-.9.6-1.5 1.1-1.5 2.3M12 17.5h.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z", onClick: () => go("helpSupport") },
    ],

    planFeatures: s.role === "teacher"
      ? ["Không giới hạn học liệu 3D/XR/VR360", "Tạo và xuất bản không giới hạn giáo án", "Chấm bài hỗ trợ AI", "Ưu tiên hỗ trợ kỹ thuật"]
      : s.role === "parent"
      ? ["Theo dõi không giới hạn số học sinh liên kết", "Báo cáo tuần chi tiết", "Cài đặt an toàn nâng cao", "Ưu tiên hỗ trợ kỹ thuật"]
      : ["Không giới hạn học liệu 3D/XR/VR360", "Tải tài liệu học offline", "Không quảng cáo", "Ưu tiên hỗ trợ kỹ thuật"],
    planOptions: [
      { key: "free", name: "Free", price: "0đ / tháng", desc: "Truy cập cơ bản, giới hạn học liệu mỗi tháng" },
      { key: "pro", name: "Pro", price: "49.000đ / tháng", desc: "Không giới hạn học liệu và tính năng nâng cao" },
      { key: "proplus", name: "Pro+", price: "99.000đ / tháng", desc: "Toàn bộ tính năng Pro và hỗ trợ ưu tiên 24/7" },
    ].map((p) => ({ ...p, selected: (s.planChoice || "pro") === p.key, onClick: () => setState({ planChoice: p.key }) })),

    devices: [
      { name: "iPhone 15 Pro", meta: "Hà Nội · Đang hoạt động", current: true, iconPath: "M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5zM11 17.5h2" },
      { name: "Windows PC - Chrome", meta: "Hà Nội · 2 ngày trước", current: false, iconPath: "M3.5 5.5h17v11h-17zM8 20.5h8M12 16.5v4" },
    ].map((d, i) => ({
      ...d, loggedOut: s.loggedOutDevices.includes(i),
      onLogout: () => setState((prev) => ({ loggedOutDevices: [...prev.loggedOutDevices, i] })),
    })),

    notifPrefRows: [
      { key: "push", label: "Thông báo đẩy", desc: "Nhận thông báo trực tiếp trên điện thoại" },
      { key: "email", label: "Email", desc: "Nhận bản tóm tắt qua email" },
      { key: "sms", label: "SMS", desc: "Nhận tin nhắn nhắc hạn quan trọng" },
      { key: "assignment", label: "Nhắc bài tập", desc: "Nhắc trước khi bài tập đến hạn" },
      { key: "classNews", label: "Thông báo lớp học", desc: "Thông báo mới từ bảng tin lớp học" },
    ].map((r) => {
      const on = s.notifPrefs[r.key];
      return { ...r, trackBg: on ? ACCENT : "#dbe7ec", knobLeft: on ? "22px" : "2px", onClick: () => setState({ notifPrefs: { ...s.notifPrefs, [r.key]: !on } }) };
    }),

    securityEmail: s.role === "teacher" ? "trang.pham@thcs-cvahn.edu.vn" : s.role === "parent" ? "dung.nguyen@gmail.com" : "hoa.nguyen@thpt-nguyenhue.edu.vn",

    helpFaqs: [
      { q: "Làm sao để đổi mật khẩu?", a: "Vào Tài khoản → Tài khoản & bảo mật → Đổi mật khẩu, nhập mật khẩu hiện tại và mật khẩu mới." },
      { q: "Học liệu 3D không tải được, phải làm sao?", a: "Kiểm tra kết nối mạng và thử tải lại. Nếu vẫn lỗi, hãy liên hệ hỗ trợ qua hotline hoặc email bên dưới." },
      { q: "Làm sao để nâng cấp lên gói Pro?", a: "Vào Tài khoản → Gói dịch vụ, chọn gói phù hợp và nhấn Nâng cấp." },
      { q: "Tôi có thể đổi vai trò Học sinh / Giáo viên / Phụ huynh không?", a: "Có, bạn có thể chuyển vai trò demo ngay trong màn hình Tài khoản." },
    ].map((f, i) => ({ ...f, open: s.helpOpenIdx === i, onClick: () => setState({ helpOpenIdx: s.helpOpenIdx === i ? null : i }) })),

    toProfileDetail: () => { setState({ profileEditing: false }); push("profileDetail"); },
    toDevices: () => go("devices"),
    toggleProfileEdit: () => setState({ profileEditing: !s.profileEditing }),
    profileEditing: s.profileEditing,
    toChangePassword: () => go("changePassword"),

    profileName: s.role === "teacher" ? "Phạm Thu Trang" : s.role === "parent" ? "Nguyễn Văn Dũng" : "Nguyễn Thị Hoa",
    profileInitials: s.role === "teacher" ? "PT" : s.role === "parent" ? "ND" : "HN",
    profileAvatarTint: s.role === "teacher" ? "linear-gradient(135deg,#138cd2,#00708f)" : s.role === "parent" ? "linear-gradient(135deg,#ef5da8,#a03a6d)" : "linear-gradient(135deg,#00aaab,#00708f)",
    profileCommon: [
      s.role === "teacher"
        ? { label: "Ngày sinh", value: "03/11/1989" }
        : s.role === "parent"
        ? { label: "Ngày sinh", value: "20/02/1985" }
        : { label: "Ngày sinh", value: "12/05/2012" },
      s.role === "teacher"
        ? { label: "Email", value: "trang.pham@thcs-cvahn.edu.vn" }
        : s.role === "parent"
        ? { label: "Email", value: "dung.nguyen@gmail.com" }
        : { label: "Email", value: "hoa.nguyen@thpt-nguyenhue.edu.vn" },
      s.role === "teacher"
        ? { label: "Số điện thoại", value: "091 456 7890" }
        : s.role === "parent"
        ? { label: "Số điện thoại", value: "098 765 4321" }
        : { label: "Số điện thoại", value: "090 123 4567" },
      { label: "Địa chỉ", value: s.role === "teacher" ? "45 Nguyễn Trãi, Hà Nội" : "12 Lê Lợi, Quận 1, TP.HCM" },
    ],
    profileBio: s.role === "teacher"
      ? "Giáo viên Sinh học với 8 năm kinh nghiệm giảng dạy khối THCS."
      : s.role === "parent"
      ? "Phụ huynh luôn đồng hành cùng con trong học tập."
      : "Học sinh lớp 6A2, yêu thích Sinh học và các mô hình 3D.",
    profileRoleTitle: s.role === "teacher" ? "Thông tin giảng dạy" : s.role === "parent" ? "Học sinh liên kết" : "Thông tin học tập",
    profileRoleFields: s.role === "teacher"
      ? [
          { label: "Chức danh", value: "Giáo viên" },
          { label: "Tổ / Bộ môn", value: "Sinh học" },
          { label: "Khối lớp giảng dạy", value: [...new Set(T_CLASSES.map((c) => c.sub.split(" · ")[1]))].join(", ") },
          { label: "Trường học", value: "THCS Chu Văn An" },
        ]
      : s.role === "parent"
      ? []
      : [
          { label: "Trường", value: "THPT Nguyễn Huệ" },
          { label: "Lớp", value: "6A2" },
          { label: "Khối", value: "Lớp 6" },
          { label: "Mã học sinh", value: "HS2024-0182" },
        ],
    profileChildren: P_CHILDREN.map((c) => ({ name: c.name, meta: c.meta, initials: c.initials, tint: c.tint, relation: "Cha" })),

    topupAmounts, payMethods,
    topupLabel: topups[s.topup].v ? topups[s.topup].label : "số tiền khác",
  };
}
