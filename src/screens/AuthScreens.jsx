import { css } from "../css.js";

export default function AuthScreens({ v }) {
  return (
    <>
      {v.isLogin && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div style={css(`display:flex;justify-content:flex-end;position:relative`)}>
            <div onClick={v.toggleLangMenu} style={css(`display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid #ddeaf0;border-radius:999px;font-size:12px;font-weight:500;color:#617789;background:#fff;cursor:pointer`)}>{v.langLabel}<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
            {v.langOpen && (
              <div style={css(`position:absolute;top:34px;right:0;z-index:50;background:#fff;border:1px solid #ddeaf0;border-radius:14px;box-shadow:0 10px 24px rgba(25,86,88,.14);overflow:hidden;min-width:132px`)}>
                {v.langOptions.map((o) => (
                  <div key={o.code} onClick={o.onClick} style={css(`padding:10px 14px;font-size:13px;font-weight:${o.active ? 600 : 400};color:${o.active ? "#00708f" : "#455771"};background:${o.active ? "#eaf6f8" : "#fff"};cursor:pointer;white-space:nowrap`)}>{o.label}</div>
                ))}
              </div>
            )}
          </div>
          <div style={css(`margin-top:34px;display:flex;flex-direction:column;align-items:center;gap:14px`)}>
            <img src="/assets/yoobook-logo.svg" alt="YooBook" style={css(`height:44px;width:auto`)}/>
            <div style={css(`text-align:center`)}>
              <div style={css(`font-size:24px;font-weight:700;line-height:1.25;color:#455771`)}>{v.t("Đăng nhập vào YooBook")}</div>
              <div style={css(`font-size:13px;color:#455771;margin-top:6px`)}>{v.t("Kho học liệu số Giáo Dục 3D/Vr360/XR")}</div>
            </div>
          </div>
          <div style={css(`margin-top:34px;display:flex;flex-direction:column;gap:16px`)}>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Email/Số điện thoại")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 19.5c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1"/></svg>
                <span style={css(`font-size:14px;color:#455771`)}>hoa.nguyen@thpt-nguyenhue.edu.vn</span>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Mật khẩu")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.showPassword ? "0.5px" : "3px"};color:#455771`)}>{v.passwordMask}</span>
                <svg onClick={v.togglePassword} style={css(`cursor:pointer`)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7">{v.showPassword ? <path d="M3 3l18 18M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2M6.1 6.4C4 8 2.5 10.2 2.5 12c0 0 3.5 6.2 9.5 6.2 1.9 0 3.5-.5 4.8-1.3M14.4 5.9c-.8-.2-1.6-.3-2.4-.3-6 0-9.5 6.2-9.5 6.2"/> : <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>}</svg>
              </div>
            </div>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div onClick={v.toggleRemember} style={css(`display:flex;align-items:center;gap:8px;cursor:pointer`)}><div style={css(`width:18px;height:18px;border-radius:6px;background:${v.remember ? "#00aaab" : "#fff"};border:1px solid ${v.remember ? "#00aaab" : "#ddeaf0"};display:flex;align-items:center;justify-content:center`)}>{v.remember && <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.6L4 7.6 10 1.4"/></svg>}</div><span style={css(`font-size:13px;color:#455771`)}>{v.t("Ghi nhớ mật khẩu")}</span></div>
              <span onClick={v.toForgotPassword} style={css(`font-size:13px;color:#195658;font-weight:500;cursor:pointer`)}>{v.t("Quên mật khẩu")}</span>
            </div>
            <div onClick={v.toRole} style={css(`height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Đăng nhập")}</div>
            <div style={css(`display:flex;align-items:center;gap:12px`)}><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div><span style={css(`font-size:12px;color:#455771`)}>{v.t("Hoặc")}</span><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div></div>
            <div style={css(`display:flex;gap:12px`)}>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.6 24 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8z"/></svg>Google</div>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>Facebook</div>
            </div>
          </div>
          <div style={css(`margin-top:auto;padding-top:28px;text-align:center;font-size:13px;color:#455771`)}>{v.t("Chưa có tài khoản?")} <span onClick={v.toSignup} style={css(`color:#195658;font-weight:600;cursor:pointer`)}>{v.t("Đăng ký")}</span></div>
        </div>
      )}

      {v.isSignup && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div onClick={v.toLogin} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:20px;display:flex;flex-direction:column;align-items:center;gap:14px`)}>
            <img src="/assets/yoobook-logo.svg" alt="YooBook" style={css(`height:44px;width:auto`)}/>
            <div style={css(`text-align:center`)}>
              <div style={css(`font-size:24px;font-weight:700;line-height:1.25;color:#455771`)}>{v.t("Tạo tài khoản YooBook")}</div>
              <div style={css(`font-size:13px;color:#455771;margin-top:6px`)}>{v.t("Bắt đầu khám phá kho học liệu số")}</div>
            </div>
          </div>
          <div style={css(`margin-top:28px;display:flex;flex-direction:column;gap:16px`)}>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Họ và tên")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 19.5c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1"/></svg>
                <span style={css(`font-size:14px;color:#455771`)}>Nguyễn Thị Hoa</span>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Email/Số điện thoại")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="M3.5 6.5l8.5 6 8.5-6"/></svg>
                <span style={css(`font-size:14px;color:#455771`)}>hoa.nguyen@thpt-nguyenhue.edu.vn</span>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Mật khẩu")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.signupShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.signupPasswordMask}</span>
                <svg onClick={v.toggleSignupPassword} style={css(`cursor:pointer`)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7">{v.signupShowPassword ? <path d="M3 3l18 18M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2M6.1 6.4C4 8 2.5 10.2 2.5 12c0 0 3.5 6.2 9.5 6.2 1.9 0 3.5-.5 4.8-1.3M14.4 5.9c-.8-.2-1.6-.3-2.4-.3-6 0-9.5 6.2-9.5 6.2"/> : <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>}</svg>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Xác nhận mật khẩu")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.signupShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.signupPasswordMask}</span>
              </div>
            </div>
            <div onClick={v.toggleSignupAgree} style={css(`display:flex;align-items:flex-start;gap:8px;cursor:pointer`)}>
              <div style={css(`width:18px;height:18px;flex:none;margin-top:1px;border-radius:6px;background:${v.signupAgree ? "#00aaab" : "#fff"};border:1px solid ${v.signupAgree ? "#00aaab" : "#ddeaf0"};display:flex;align-items:center;justify-content:center`)}>{v.signupAgree && <svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.6L4 7.6 10 1.4"/></svg>}</div>
              <span style={css(`font-size:12.5px;line-height:1.5;color:#455771`)}>{v.t("Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của YooBook")}</span>
            </div>
            <div onClick={v.toRole} style={css(`height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Tạo tài khoản")}</div>
            <div style={css(`display:flex;align-items:center;gap:12px`)}><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div><span style={css(`font-size:12px;color:#455771`)}>{v.t("Hoặc")}</span><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div></div>
            <div style={css(`display:flex;gap:12px`)}>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.6 24 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8z"/></svg>Google</div>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>Facebook</div>
            </div>
          </div>
          <div style={css(`margin-top:auto;padding-top:28px;text-align:center;font-size:13px;color:#455771`)}>{v.t("Đã có tài khoản?")} <span onClick={v.toLogin} style={css(`color:#00708f;font-weight:600;cursor:pointer`)}>{v.t("Đăng nhập")}</span></div>
        </div>
      )}

      {v.isForgotPassword && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div onClick={v.toLogin} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:28px`)}>
            <div style={css(`font-size:23px;font-weight:700;color:#455771`)}>{v.t("Quên mật khẩu?")}</div>
            <div style={css(`font-size:13px;color:#455771;margin-top:8px;line-height:1.5`)}>{v.t("Nhập email hoặc số điện thoại đã đăng ký, chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu.")}</div>
          </div>
          <div style={css(`margin-top:28px;display:flex;flex-direction:column;gap:7px`)}>
            <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Email/Số điện thoại")}</label>
            <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7"><rect x="3" y="5" width="18" height="14" rx="2.2"/><path d="M3.5 6.5l8.5 6 8.5-6"/></svg>
              <span style={css(`font-size:14px;color:#455771`)}>hoa.nguyen@thpt-nguyenhue.edu.vn</span>
            </div>
          </div>
          <div onClick={v.toVerification} style={css(`margin-top:26px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Gửi mã xác thực")}</div>
        </div>
      )}

      {v.isVerification && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div onClick={v.toForgotPassword} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:28px`)}>
            <div style={css(`font-size:23px;font-weight:700;color:#455771`)}>{v.t("Xác thực mã")}</div>
            <div style={css(`font-size:13px;color:#455771;margin-top:8px;line-height:1.5`)}>{v.t("Mã xác thực gồm 6 số đã được gửi tới")} hoa.nguyen@thpt-nguyenhue.edu.vn</div>
          </div>
          <div style={css(`margin-top:28px;display:flex;gap:9px;justify-content:space-between`)}>
            {"248160".split("").map((d, i) => (
              <div key={i} style={css(`flex:1;height:56px;border:1.6px solid ${i === 4 ? "#00aaab" : "#ddeaf0"};border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:600;color:#455771`)}>{i < 4 ? d : ""}</div>
            ))}
          </div>
          <div style={css(`margin-top:20px;text-align:center;font-size:13px;color:#455771`)}>
            {v.canResendOtp ? (
              <span onClick={v.resendOtp} style={css(`color:#00708f;font-weight:600;cursor:pointer`)}>{v.t("Gửi lại mã")}</span>
            ) : (
              <>{v.t("Gửi lại mã sau")} <span style={css(`color:#455771;font-weight:600`)}>{v.otpClock}</span></>
            )}
          </div>
          <div onClick={v.toNewPassword} style={css(`margin-top:auto;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Tiếp tục")}</div>
        </div>
      )}

      {v.isNewPassword && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div onClick={v.toVerification} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:28px`)}>
            <div style={css(`font-size:23px;font-weight:700;color:#455771`)}>{v.t("Đặt lại mật khẩu")}</div>
            <div style={css(`font-size:13px;color:#455771;margin-top:8px;line-height:1.5`)}>{v.t("Tạo một mật khẩu mới, khác với các mật khẩu bạn đã dùng trước đó.")}</div>
          </div>
          <div style={css(`margin-top:28px;display:flex;flex-direction:column;gap:16px`)}>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Mật khẩu mới")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.newShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.newPasswordMask}</span>
                <svg onClick={v.toggleNewPassword} style={css(`cursor:pointer`)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7">{v.newShowPassword ? <path d="M3 3l18 18M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2M6.1 6.4C4 8 2.5 10.2 2.5 12c0 0 3.5 6.2 9.5 6.2 1.9 0 3.5-.5 4.8-1.3M14.4 5.9c-.8-.2-1.6-.3-2.4-.3-6 0-9.5 6.2-9.5 6.2"/> : <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>}</svg>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t("Xác nhận mật khẩu mới")}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.newShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.newPasswordMask}</span>
              </div>
            </div>
          </div>
          <div onClick={v.toSuccess} style={css(`margin-top:auto;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Đặt lại mật khẩu")}</div>
        </div>
      )}

      {v.isSuccess && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:760px;animation:ybup .35s ease`)}>
          <div style={css(`width:88px;height:88px;border-radius:999px;background:#f0fdf4;display:flex;align-items:center;justify-content:center`)}>
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5L10.5 15.5 16.5 9"/></svg>
          </div>
          <div style={css(`margin-top:26px;text-align:center`)}>
            <div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t("Đổi mật khẩu thành công")}</div>
            <div style={css(`font-size:13px;color:#455771;margin-top:8px;line-height:1.5;max-width:260px`)}>{v.t("Mật khẩu của bạn đã được cập nhật. Hãy đăng nhập lại bằng mật khẩu mới.")}</div>
          </div>
          <div onClick={v.toLogin} style={css(`margin-top:32px;width:100%;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Về trang đăng nhập")}</div>
        </div>
      )}

      {v.isRole && (
        <div style={css(`padding:12px 24px 32px;animation:ybup .35s ease`)}>
          <div style={css(`text-align:center;margin-top:12px`)}>
            <div style={css(`font-size:23px;font-weight:700;color:#455771`)}>{v.t("Thiết lập YooBook")}</div>
            <div style={css(`font-size:13px;color:#455771;margin-top:6px;max-width:280px;margin-left:auto;margin-right:auto`)}>{v.t("Chọn vai trò để cá nhân hóa trải nghiệm của bạn")}</div>
          </div>
          <div style={css(`margin-top:26px;display:flex;flex-direction:column;gap:14px`)}>
            {v.roles.map((r, i) => (
              <div key={i} onClick={r.onClick} style={css(`border:${r.border};background:${r.bg};border-radius:22px;padding:18px;display:flex;gap:14px;align-items:flex-start;cursor:pointer;transition:all .18s`)}>
                <div style={css(`width:52px;height:52px;flex:none;border-radius:16px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:30px;height:30px;background-image:url(${r.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                <div style={css(`flex:1`)}>
                  <div style={css(`font-size:16px;font-weight:600;color:#455771`)}>{r.title}</div>
                  <div style={css(`font-size:12.5px;line-height:1.5;color:#455771;margin-top:4px;text-wrap:pretty`)}>{r.desc}</div>
                </div>
                <div style={css(`width:22px;height:22px;flex:none;border-radius:999px;border:${r.dot};display:flex;align-items:center;justify-content:center;margin-top:3px`)}><div style={css(`width:10px;height:10px;border-radius:999px;background:${r.dotFill}`)}></div></div>
              </div>
            ))}
          </div>
          <div onClick={v.toHome} style={css(`margin-top:26px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t("Tiếp tục")}</div>
          <div onClick={v.toExplore} style={css(`margin-top:14px;text-align:center;font-size:13.5px;color:#00708f;font-weight:500;cursor:pointer`)}>{v.t("Khám phá kho học liệu trước")}</div>
        </div>
      )}
    </>
  );
}
