import { css } from "../css.js";

export default function AuthScreens({ v }) {
  return (
    <>
      {v.isLogin && (
        <div style={css(`padding:18px 24px 40px;display:flex;flex-direction:column;min-height:760px;animation:ybup .35s ease`)}>
          <div style={css(`display:flex;justify-content:flex-end`)}><div style={css(`display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid #ddeaf0;border-radius:999px;font-size:12px;font-weight:500;color:#617789;background:#fff`)}>VI<svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div></div>
          <div style={css(`margin-top:34px;display:flex;flex-direction:column;align-items:center;gap:14px`)}>
            <img src="/assets/logo_new.svg" alt="YooBook" style={css(`height:44px;width:auto`)}/>
            <div style={css(`text-align:center`)}>
              <div style={css(`font-size:24px;font-weight:700;line-height:1.25;color:#195658`)}>Đăng nhập vào YooBook</div>
              <div style={css(`font-size:13px;color:#617789;margin-top:6px`)}>Kho học liệu số Giáo Dục 3D/Vr360/XR</div>
            </div>
          </div>
          <div style={css(`margin-top:34px;display:flex;flex-direction:column;gap:16px`)}>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#25475a`)}>Email/Số điện thoại</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="8" r="3.6"/><path d="M4.8 19.5c1.3-3.4 4-5.1 7.2-5.1s5.9 1.7 7.2 5.1"/></svg>
                <span style={css(`font-size:14px;color:#25475a`)}>hoa.nguyen@thpt-nguyenhue.edu.vn</span>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#25475a`)}>Mật khẩu</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:3px;color:#25475a`)}>••••••••</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></svg>
              </div>
            </div>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div style={css(`display:flex;align-items:center;gap:8px`)}><div style={css(`width:18px;height:18px;border-radius:6px;background:#00aaab;display:flex;align-items:center;justify-content:center`)}><svg width="11" height="9" viewBox="0 0 11 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.6L4 7.6 10 1.4"/></svg></div><span style={css(`font-size:13px;color:#617789`)}>Ghi nhớ mật khẩu</span></div>
              <span style={css(`font-size:13px;color:#00708f;font-weight:500`)}>Quên mật khẩu</span>
            </div>
            <div onClick={v.toRole} style={css(`height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>Đăng nhập</div>
            <div style={css(`display:flex;align-items:center;gap:12px`)}><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div><span style={css(`font-size:12px;color:#617789`)}>Hoặc</span><div style={css(`flex:1;height:1px;background:#ddeaf0`)}></div></div>
            <div style={css(`display:flex;gap:12px`)}>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.6z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3C3.7 21.4 7.6 24 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.6 0 3.7 2.6 1.8 6.1l3.8 3C6.5 6.7 9 4.8 12 4.8z"/></svg>Google</div>
              <div onClick={v.toRole} style={css(`flex:1;height:50px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;display:flex;align-items:center;justify-content:center;gap:8px;font-size:13px;font-weight:500;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>Facebook</div>
            </div>
          </div>
          <div style={css(`margin-top:auto;padding-top:28px;text-align:center;font-size:13px;color:#617789`)}>Chưa có tài khoản? <span style={css(`color:#00708f;font-weight:600`)}>Đăng ký</span></div>
        </div>
      )}

      {v.isRole && (
        <div style={css(`padding:12px 24px 32px;animation:ybup .35s ease`)}>
          <div style={css(`text-align:center;margin-top:12px`)}>
            <div style={css(`font-size:23px;font-weight:700;color:#195658`)}>Thiết lập YooBook</div>
            <div style={css(`font-size:13px;color:#617789;margin-top:6px;max-width:280px;margin-left:auto;margin-right:auto`)}>Chọn vai trò để cá nhân hóa trải nghiệm của bạn</div>
          </div>
          <div style={css(`margin-top:26px;display:flex;flex-direction:column;gap:14px`)}>
            {v.roles.map((r, i) => (
              <div key={i} onClick={r.onClick} style={css(`border:${r.border};background:${r.bg};border-radius:22px;padding:18px;display:flex;gap:14px;align-items:flex-start;cursor:pointer;transition:all .18s`)}>
                <div style={css(`width:52px;height:52px;flex:none;border-radius:16px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:30px;height:30px;background-image:url(${r.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                <div style={css(`flex:1`)}>
                  <div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{r.title}</div>
                  <div style={css(`font-size:12.5px;line-height:1.5;color:#617789;margin-top:4px;text-wrap:pretty`)}>{r.desc}</div>
                </div>
                <div style={css(`width:22px;height:22px;flex:none;border-radius:999px;border:${r.dot};display:flex;align-items:center;justify-content:center;margin-top:3px`)}><div style={css(`width:10px;height:10px;border-radius:999px;background:${r.dotFill}`)}></div></div>
              </div>
            ))}
          </div>
          <div onClick={v.toHome} style={css(`margin-top:26px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:16px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>Tiếp tục</div>
          <div onClick={v.toExplore} style={css(`margin-top:14px;text-align:center;font-size:13.5px;color:#00708f;font-weight:500;cursor:pointer`)}>Khám phá kho học liệu trước</div>
        </div>
      )}
    </>
  );
}
