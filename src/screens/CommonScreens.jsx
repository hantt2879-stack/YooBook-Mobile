import { css } from "../css.js";

// Renders a profile field as a bordered input box while editing, or a
// compact label/value row otherwise — used by the profile detail screen's
// common and role-specific field lists.
function ProfileField({ v, label, value }) {
  return v.profileEditing ? (
    <div style={css(`display:flex;flex-direction:column;gap:6px`)}>
      <label style={css(`font-size:12px;font-weight:500;color:#455771`)}>{label}</label>
      <div style={css(`height:46px;padding:0 14px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;display:flex;align-items:center;font-size:13.5px;color:#455771`)}>{value}</div>
    </div>
  ) : (
    <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;border-bottom:1px solid #edf7f9`)}>
      <span style={css(`font-size:12.5px;color:#455771;flex:none`)}>{label}</span>
      <span style={css(`font-size:13px;font-weight:600;color:#455771;text-align:right`)}>{value}</span>
    </div>
  );
}

export default function CommonScreens({ v }) {
  return (
    <>
      {v.isNoti && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t(`Thông báo của bạn`)}</div><div style={css(`font-size:13px;color:#455771;margin-top:3px`)}>{v.hasUnreadNoti ? `${v.unreadNotiCount} ${v.t("thông báo chưa đọc")}` : v.t(`Bạn đã xem hết thông báo`)}</div></div>
            {v.hasUnreadNoti && (<span onClick={v.markAllRead} style={css(`font-size:12.5px;color:#00708f;font-weight:500;cursor:pointer`)}>{v.t(`Đánh dấu đã đọc`)}</span>)}
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:10px`)}>
            {v.notifications.map((n, i) => (
              <div key={i} style={css(`display:flex;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:${n.bg}`)}>
                <div style={css(`width:40px;height:40px;flex:none;border-radius:13px;background:${n.tint};display:flex;align-items:center;justify-content:center`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={n.iconPath}/></svg></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:8px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771;line-height:1.35`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#455771;white-space:nowrap;margin-top:2px`)}>{n.when}</span></div>
                  <div style={css(`font-size:12.5px;line-height:1.55;color:#455771;margin-top:4px;text-wrap:pretty`)}>{n.text}</div>
                </div>
                {n.unread && (<div style={css(`width:8px;height:8px;flex:none;border-radius:999px;background:#00aaab;margin-top:6px`)}></div>)}
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isProfile && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:14px 20px 22px;background:linear-gradient(180deg,#eaf6f8,#fcfcfc)`)}>
            <div style={css(`display:flex;align-items:center;gap:14px`)}>
              <div style={css(`width:70px;height:70px;border-radius:999px;background:linear-gradient(135deg,#00aaab,#00708f);display:flex;align-items:center;justify-content:center;color:#fff;font-size:24px;font-weight:600`)}>HN</div>
              <div style={css(`flex:1`)}>
                <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.userName}</div>
                <div style={css(`font-size:12.5px;color:#455771;margin-top:2px`)}>{v.roleLabel} · THPT Nguyễn Huệ</div>
                <div style={css(`margin-top:7px;display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 10px;border-radius:999px;background:#195658;color:#fff;font-size:11px;font-weight:600`)}>{v.t(`Gói Pro · còn 214 ngày`)}</div>
              </div>
            </div>
            <div style={css(`margin-top:16px;display:flex;gap:8px`)}>
              {v.roleSwitch.map((r, i) => (
                <div key={i} onClick={r.onClick} style={css(`flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:11px 6px;border:${r.border};background:${r.bg};border-radius:16px;cursor:pointer;transition:all .15s`)}><div style={css(`width:24px;height:24px;background-image:url(${r.icon});background-size:contain;background-position:center;background-repeat:no-repeat;opacity:${r.opacity}`)}></div><span style={css(`font-size:11.5px;font-weight:${r.weight};color:${r.color}`)}>{r.title}</span></div>
              ))}
            </div>
          </div>

          <div style={css(`padding:0 20px`)}>
            <div onClick={v.toWallet} style={css(`padding:16px;border-radius:22px;background:#195658;color:#fff;position:relative;overflow:hidden;cursor:pointer`)}>
              <div style={css(`position:absolute;right:-24px;bottom:-38px;width:120px;height:120px;border-radius:999px;background:rgba(0,170,171,.35)`)}></div>
              <div style={css(`position:relative;display:flex;align-items:center;justify-content:space-between`)}>
                <div><div style={css(`font-size:11.5px;opacity:.72`)}>{v.t(`Số dư ví YooBook`)}</div><div style={css(`font-size:26px;font-weight:700;margin-top:3px`)}>450.000<span style={css(`font-size:15px;font-weight:500`)}> đ</span></div><div style={css(`font-size:11.5px;opacity:.72;margin-top:3px`)}>1.240 điểm học tập</div></div>
                <div style={css(`height:38px;padding:0 16px;border-radius:999px;background:#fff;color:#195658;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Nạp`)}</div>
              </div>
            </div>

            <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
              {v.profileRows.map((p, i) => (
                <div key={i} onClick={p.onClick} style={css(`display:flex;align-items:center;gap:13px;padding:15px 16px;border-bottom:1px solid #edf7f9;cursor:pointer`)}>
                  <div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00aaab" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.iconPath}/></svg></div>
                  <div style={css(`flex:1`)}><div style={css(`font-size:14px;font-weight:500;color:#455771`)}>{p.label}</div></div>
                  <span style={css(`font-size:12px;color:#455771`)}>{p.value}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                </div>
              ))}
            </div>
            <div onClick={v.toLogin} style={css(`margin-top:16px;height:50px;border-radius:16px;border:1px solid #f3c9cd;background:#fff;color:#ad172b;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Đăng xuất`)}</div>
          </div>
        </div>
      )}

      {v.isProfileDetail && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
            <div style={css(`display:flex;align-items:center;gap:12px`)}>
              <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
              <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Hồ sơ cá nhân`)}</div>
            </div>
            <div onClick={v.toggleProfileEdit} style={css(`height:36px;padding:0 15px;border-radius:999px;background:${v.profileEditing ? "#00aaab" : "#fff"};border:1px solid ${v.profileEditing ? "#00aaab" : "#ddeaf0"};color:${v.profileEditing ? "#fff" : "#195658"};font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{v.profileEditing ? v.t(`Lưu thay đổi`) : v.t(`Chỉnh sửa`)}</div>
          </div>

          <div style={css(`margin-top:20px;display:flex;flex-direction:column;align-items:center;gap:10px`)}>
            <div style={css(`position:relative`)}>
              <div style={css(`width:78px;height:78px;border-radius:999px;background:${v.profileAvatarTint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;font-weight:600`)}>{v.profileInitials}</div>
              {v.profileEditing && (
                <div style={css(`position:absolute;right:-2px;bottom:-2px;width:26px;height:26px;border-radius:999px;background:#195658;border:2px solid #fcfcfc;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h1.4l1-1.7A1.5 1.5 0 0 1 9.2 4.5h5.6a1.5 1.5 0 0 1 1.3.8l1 1.7h1.4a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9z"/><circle cx="12" cy="13" r="3.2"/></svg></div>
              )}
            </div>
            <div style={css(`text-align:center`)}>
              <div style={css(`font-size:17px;font-weight:700;color:#455771`)}>{v.profileName}</div>
              <div style={css(`font-size:12.5px;color:#455771;margin-top:2px`)}>{v.roleLabel}</div>
            </div>
          </div>

          <div style={css(`margin-top:22px`)}>
            <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Thông tin cá nhân`)}</div>
            {v.profileEditing ? (
              <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:14px`)}>
                <ProfileField v={v} label={v.t(`Họ và tên`)} value={v.profileName} />
                {v.profileCommon.map((f, i) => (<ProfileField key={i} v={v} label={f.label} value={f.value} />))}
              </div>
            ) : (
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
                <ProfileField v={v} label={v.t(`Họ và tên`)} value={v.profileName} />
                {v.profileCommon.map((f, i) => (<ProfileField key={i} v={v} label={f.label} value={f.value} />))}
              </div>
            )}
            <div style={css(`margin-top:${v.profileEditing ? "14" : "10"}px;padding:13px 14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
              <div style={css(`font-size:12px;color:#455771`)}>{v.t(`Giới thiệu`)}</div>
              {v.profileEditing ? (
                <div style={css(`margin-top:7px;min-height:70px;padding:10px 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:12.5px;line-height:1.6;color:#455771`)}>{v.profileBio}</div>
              ) : (
                <div style={css(`font-size:12.5px;line-height:1.6;color:#455771;margin-top:5px;text-wrap:pretty`)}>{v.profileBio}</div>
              )}
            </div>
          </div>

          {!!v.profileRoleFields.length && (
            <div style={css(`margin-top:20px`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.profileRoleTitle}</div>
              {v.profileEditing ? (
                <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:14px`)}>
                  {v.profileRoleFields.map((f, i) => (<ProfileField key={i} v={v} label={f.label} value={f.value} />))}
                </div>
              ) : (
                <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
                  {v.profileRoleFields.map((f, i) => (<ProfileField key={i} v={v} label={f.label} value={f.value} />))}
                </div>
              )}
            </div>
          )}

          {v.isParent && (
            <div style={css(`margin-top:20px`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.profileRoleTitle}</div>
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:10px`)}>
                {v.profileChildren.map((c, i) => (
                  <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${c.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:13px`)}>{c.initials}</div>
                    <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{c.name}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{c.meta}</div></div>
                    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{c.relation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div onClick={v.toChangePassword} style={css(`margin-top:22px;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>{v.t(`Đổi mật khẩu`)}</div>
        </div>
      )}

      {v.isChangePassword && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Đổi mật khẩu`)}</div>
          </div>
          <div style={css(`margin-top:20px;display:flex;flex-direction:column;gap:16px`)}>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t(`Mật khẩu hiện tại`)}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:3px;color:#455771`)}>••••••••</span>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t(`Mật khẩu mới`)}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.newShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.newPasswordMask}</span>
                <svg onClick={v.toggleNewPassword} style={css(`cursor:pointer`)} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7">{v.newShowPassword ? <path d="M3 3l18 18M9.9 9.9a2.8 2.8 0 0 0 4.2 4.2M6.1 6.4C4 8 2.5 10.2 2.5 12c0 0 3.5 6.2 9.5 6.2 1.9 0 3.5-.5 4.8-1.3M14.4 5.9c-.8-.2-1.6-.3-2.4-.3-6 0-9.5 6.2-9.5 6.2"/> : <><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/></>}</svg>
              </div>
            </div>
            <div style={css(`display:flex;flex-direction:column;gap:7px`)}>
              <label style={css(`font-size:13px;font-weight:500;color:#455771`)}>{v.t(`Xác nhận mật khẩu mới`)}</label>
              <div style={css(`display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.7" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg>
                <span style={css(`flex:1;font-size:16px;letter-spacing:${v.newShowPassword ? "0.5px" : "3px"};color:#455771`)}>{v.newPasswordMask}</span>
              </div>
            </div>
          </div>
          <div onClick={v.toProfileDetail} style={css(`margin-top:22px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Lưu mật khẩu mới`)}</div>
        </div>
      )}

      {v.isWallet && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Nạp tiền vào ví`)}</div>
          </div>
          <div style={css(`margin-top:18px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#195658,#00708f);color:#fff`)}>
            <div style={css(`font-size:11.5px;opacity:.75`)}>{v.t(`Số dư hiện tại`)}</div>
            <div style={css(`font-size:32px;font-weight:700;margin-top:4px`)}>450.000<span style={css(`font-size:17px;font-weight:500`)}> đ</span></div>
            <div style={css(`margin-top:12px;display:flex;gap:16px;font-size:11.5px;opacity:.8`)}><span>{v.t(`Đã nạp tháng này: 200.000đ`)}</span><span>{v.t(`Đã chi: 180.000đ`)}</span></div>
          </div>
          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Chọn mệnh giá`)}</div>
          <div style={css(`margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px`)}>
            {v.topupAmounts.map((a, i) => (
              <div key={i} onClick={a.onClick} style={css(`padding:14px 8px;border:${a.border};background:${a.bg};border-radius:16px;text-align:center;cursor:pointer;transition:all .15s`)}>
                <div style={css(`font-size:15px;font-weight:700;color:${a.color}`)}>{a.label}</div>
                <div style={css(`font-size:10.5px;color:#455771;margin-top:3px`)}>{a.bonus}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Phương thức thanh toán`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.payMethods.map((m, i) => (
              <div key={i} onClick={m.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:${m.border};background:${m.bg};border-radius:16px;cursor:pointer`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:12px;background:${m.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700`)}>{m.tag}</div>
                <div style={css(`flex:1`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{m.name}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{m.desc}</div></div>
                <div style={css(`width:20px;height:20px;border-radius:999px;border:${m.dotBorder};display:flex;align-items:center;justify-content:center`)}><div style={css(`width:9px;height:9px;border-radius:999px;background:${m.dotBg}`)}></div></div>
              </div>
            ))}
          </div>
          <div onClick={v.toProfile} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Nạp`)} {v.topupLabel}</div>
        </div>
      )}

      {v.isServicePlan && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Gói dịch vụ`)}</div>
          </div>

          <div style={css(`margin-top:18px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#195658,#00708f);color:#fff`)}>
            <div style={css(`font-size:11.5px;opacity:.75`)}>{v.t(`Gói hiện tại`)}</div>
            <div style={css(`font-size:26px;font-weight:700;margin-top:4px`)}>{v.t(`Gói Pro`)}</div>
            <div style={css(`font-size:12px;opacity:.8;margin-top:4px`)}>{v.t(`Gói Pro · còn 214 ngày`)}</div>
          </div>

          <div style={css(`margin-top:20px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Quyền lợi của bạn`)}</div>
          <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
            {v.planFeatures.map((f, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <div style={css(`width:22px;height:22px;flex:none;border-radius:999px;background:#f0fdf4;display:flex;align-items:center;justify-content:center`)}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 6.5"/></svg></div>
                <span style={css(`font-size:12.5px;color:#455771;line-height:1.4`)}>{f}</span>
              </div>
            ))}
          </div>

          <div style={css(`margin-top:20px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Chọn gói`)}</div>
          <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:10px`)}>
            {v.planOptions.map((p, i) => (
              <div key={i} onClick={p.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:${p.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${p.selected ? "#eaf6f8" : "#fff"};border-radius:16px;cursor:pointer;transition:all .15s`)}>
                <div style={css(`width:20px;height:20px;flex:none;border-radius:999px;border:${p.selected ? "6px solid #00aaab" : "1.6px solid #ddeaf0"}`)}></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:700;color:#455771`)}>{p.name}</div>
                  <div style={css(`font-size:11.5px;color:#455771;margin-top:2px;line-height:1.4`)}>{p.desc}</div>
                </div>
                <span style={css(`font-size:12.5px;font-weight:600;color:#00708f;white-space:nowrap`)}>{p.price}</span>
              </div>
            ))}
          </div>

          <div onClick={v.toProfile} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Nâng cấp gói`)}</div>
        </div>
      )}

      {v.isDevices && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Thiết bị của tôi`)}</div>
          </div>
          <div style={css(`margin-top:8px;font-size:12.5px;color:#455771;line-height:1.5`)}>{v.t(`Tối đa 3 thiết bị đăng nhập cùng lúc. Đăng xuất thiết bị không dùng để bảo vệ tài khoản.`)}</div>

          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:10px`)}>
            {v.devices.map((d, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:12px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d={d.iconPath}/></svg></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{d.name}</div>
                  <div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{d.loggedOut ? v.t(`Đã đăng xuất`) : d.meta}</div>
                </div>
                {!d.current && !d.loggedOut && (<div onClick={d.onLogout} style={css(`height:30px;padding:0 12px;border-radius:999px;border:1px solid #f3c9cd;color:#ad172b;font-size:11.5px;font-weight:600;display:flex;align-items:center;flex:none;cursor:pointer`)}>{v.t(`Đăng xuất`)}</div>)}
                {d.current && (<div style={css(`height:24px;padding:0 10px;border-radius:999px;background:#f0fdf4;color:#15803d;font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(`Thiết bị này`)}</div>)}
              </div>
            ))}
          </div>
          <div style={css(`margin-top:14px;padding:13px 14px;border-radius:14px;background:#edf7f9;font-size:12px;line-height:1.55;color:#455771;text-wrap:pretty`)}>{v.t(`Thêm thiết bị mới sẽ tự động xuất hiện ở đây sau khi đăng nhập.`)}</div>
        </div>
      )}

      {v.isNotifPrefs && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Thông báo & tuỳ chọn`)}</div>
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:11px`)}>
            {v.notifPrefRows.map((r, i) => (
              <div key={i} onClick={r.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{r.label}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:3px;line-height:1.45`)}>{r.desc}</div></div>
                <div style={css(`width:44px;height:26px;flex:none;border-radius:999px;background:${r.trackBg};position:relative;transition:background .2s`)}><div style={css(`position:absolute;top:2px;left:${r.knobLeft};width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s`)}></div></div>
              </div>
            ))}
          </div>
          <div onClick={v.toProfile} style={css(`margin-top:22px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Lưu tuỳ chọn`)}</div>
        </div>
      )}

      {v.isAccountSecurity && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Tài khoản & bảo mật`)}</div>
          </div>

          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px;border-bottom:1px solid #edf7f9`)}><span style={css(`font-size:12.5px;color:#455771`)}>{v.t(`Email`)}</span><span style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.securityEmail}</span></div>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px`)}><span style={css(`font-size:12.5px;color:#455771`)}>{v.t(`Trạng thái email`)}</span><span style={css(`height:22px;padding:0 9px;border-radius:999px;background:#f0fdf4;color:#15803d;font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Đã xác thực`)}</span></div>
          </div>

          <div onClick={v.toChangePassword} style={css(`margin-top:14px;display:flex;align-items:center;gap:13px;padding:15px 16px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
            <div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><rect x="4.5" y="10.5" width="15" height="9.5" rx="2.6"/><path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7"/></svg></div>
            <div style={css(`flex:1`)}><div style={css(`font-size:14px;font-weight:500;color:#455771`)}>{v.t(`Đổi mật khẩu`)}</div></div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
          </div>

          <div style={css(`margin-top:14px;display:flex;align-items:center;gap:12px;padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
            <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Xác thực 2 lớp`)}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:3px;line-height:1.45`)}>{v.t(`Thêm một lớp bảo vệ khi đăng nhập trên thiết bị mới`)}</div></div>
            <div style={css(`width:44px;height:26px;flex:none;border-radius:999px;background:#dbe7ec;position:relative`)}><div style={css(`position:absolute;top:2px;left:2px;width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2)`)}></div></div>
          </div>

          <div onClick={v.toDevices} style={css(`margin-top:14px;display:flex;align-items:center;gap:13px;padding:15px 16px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
            <div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><rect x="7" y="3.5" width="10" height="15" rx="1.5"/></svg></div>
            <div style={css(`flex:1`)}><div style={css(`font-size:14px;font-weight:500;color:#455771`)}>{v.t(`Phiên đăng nhập & thiết bị`)}</div></div>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
          </div>

          <div style={css(`margin-top:22px;padding:14px;border:1px solid #f3c9cd;border-radius:16px;background:#fff5f5`)}>
            <div style={css(`font-size:13px;font-weight:600;color:#ad172b`)}>{v.t(`Xóa tài khoản`)}</div>
            <div style={css(`font-size:11.5px;color:#b3475a;margin-top:5px;line-height:1.5`)}>{v.t(`Toàn bộ dữ liệu học tập, lớp học và tiến độ của bạn sẽ bị xóa vĩnh viễn.`)}</div>
          </div>
        </div>
      )}

      {v.isHelpSupport && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Trợ giúp & hỗ trợ`)}</div>
          </div>

          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:10px`)}>
            <div style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
              <div style={css(`width:36px;height:36px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d="M20.5 11.6a7.9 7.9 0 0 1-11.5 7L4 20.5l1.4-4.8A7.9 7.9 0 1 1 20.5 11.6z"/></svg></div>
              <div style={css(`flex:1`)}><div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.t(`Hotline hỗ trợ`)}</div><div style={css(`font-size:12px;color:#455771;margin-top:2px`)}>1900 6868</div></div>
            </div>
            <div style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
              <div style={css(`width:36px;height:36px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6.5h16v11H4zM4 6.5l8 6 8-6"/></svg></div>
              <div style={css(`flex:1`)}><div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.t(`Email hỗ trợ`)}</div><div style={css(`font-size:12px;color:#455771;margin-top:2px`)}>support@yoobook.vn</div></div>
            </div>
          </div>

          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Câu hỏi thường gặp`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:9px`)}>
            {v.helpFaqs.map((f, i) => (
              <div key={i} onClick={f.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <span style={css(`font-size:13px;font-weight:600;color:#455771;line-height:1.4`)}>{f.q}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2.4" strokeLinecap="round" style={{ transform: f.open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}><path d="M6 9l6 6 6-6"/></svg>
                </div>
                {f.open && (<div style={css(`font-size:12.5px;line-height:1.6;color:#455771;margin-top:9px;text-wrap:pretty`)}>{f.a}</div>)}
              </div>
            ))}
          </div>

          <div style={css(`margin-top:20px;height:50px;border-radius:16px;background:#00aaab;color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><path d="M20.5 11.6a7.9 7.9 0 0 1-11.5 7L4 20.5l1.4-4.8A7.9 7.9 0 1 1 20.5 11.6z"/></svg>{v.t(`Chat với chúng tôi`)}</div>
        </div>
      )}
    </>
  );
}
