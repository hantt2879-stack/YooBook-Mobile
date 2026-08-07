import { css } from "../css.js";

export default function CommonScreens({ v }) {
  return (
    <>
      {v.isNoti && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#195658`)}>Thông báo của bạn</div><div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>3 thông báo chưa đọc</div></div>
            <span style={css(`font-size:12.5px;color:#00708f;font-weight:500;cursor:pointer`)}>Đánh dấu đã đọc</span>
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:10px`)}>
            {v.notifications.map((n, i) => (
              <div key={i} style={css(`display:flex;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:${n.bg}`)}>
                <div style={css(`width:40px;height:40px;flex:none;border-radius:13px;background:${n.tint};display:flex;align-items:center;justify-content:center`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={n.iconPath}/></svg></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:8px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#8ba0ae;white-space:nowrap;margin-top:2px`)}>{n.when}</span></div>
                  <div style={css(`font-size:12.5px;line-height:1.55;color:#617789;margin-top:4px;text-wrap:pretty`)}>{n.text}</div>
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
                <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.userName}</div>
                <div style={css(`font-size:12.5px;color:#617789;margin-top:2px`)}>{v.roleLabel} · THPT Nguyễn Huệ</div>
                <div style={css(`margin-top:7px;display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 10px;border-radius:999px;background:#195658;color:#fff;font-size:11px;font-weight:600`)}>Gói Pro · còn 214 ngày</div>
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
                <div><div style={css(`font-size:11.5px;opacity:.72`)}>Số dư ví YooBook</div><div style={css(`font-size:26px;font-weight:700;margin-top:3px`)}>450.000<span style={css(`font-size:15px;font-weight:500`)}> đ</span></div><div style={css(`font-size:11.5px;opacity:.72;margin-top:3px`)}>1.240 điểm học tập</div></div>
                <div style={css(`height:38px;padding:0 16px;border-radius:999px;background:#fff;color:#195658;font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>Nạp</div>
              </div>
            </div>

            <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
              {v.profileRows.map((p, i) => (
                <div key={i} onClick={p.onClick} style={css(`display:flex;align-items:center;gap:13px;padding:15px 16px;border-bottom:1px solid #edf7f9;cursor:pointer`)}>
                  <div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={p.iconPath}/></svg></div>
                  <div style={css(`flex:1`)}><div style={css(`font-size:14px;font-weight:500;color:#25475a`)}>{p.label}</div></div>
                  <span style={css(`font-size:12px;color:#8ba0ae`)}>{p.value}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                </div>
              ))}
            </div>
            <div onClick={v.toLogin} style={css(`margin-top:16px;height:50px;border-radius:16px;border:1px solid #f3c9cd;background:#fff;color:#ad172b;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>Đăng xuất</div>
          </div>
        </div>
      )}

      {v.isWallet && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toProfile} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>Nạp tiền vào ví</div>
          </div>
          <div style={css(`margin-top:18px;padding:18px;border-radius:22px;background:linear-gradient(135deg,#195658,#00708f);color:#fff`)}>
            <div style={css(`font-size:11.5px;opacity:.75`)}>Số dư hiện tại</div>
            <div style={css(`font-size:32px;font-weight:700;margin-top:4px`)}>450.000<span style={css(`font-size:17px;font-weight:500`)}> đ</span></div>
            <div style={css(`margin-top:12px;display:flex;gap:16px;font-size:11.5px;opacity:.8`)}><span>Đã nạp tháng này: 200.000đ</span><span>Đã chi: 180.000đ</span></div>
          </div>
          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>Chọn mệnh giá</div>
          <div style={css(`margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px`)}>
            {v.topupAmounts.map((a, i) => (
              <div key={i} onClick={a.onClick} style={css(`padding:14px 8px;border:${a.border};background:${a.bg};border-radius:16px;text-align:center;cursor:pointer;transition:all .15s`)}>
                <div style={css(`font-size:15px;font-weight:700;color:${a.color}`)}>{a.label}</div>
                <div style={css(`font-size:10.5px;color:#617789;margin-top:3px`)}>{a.bonus}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>Phương thức thanh toán</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.payMethods.map((m, i) => (
              <div key={i} onClick={m.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:${m.border};background:${m.bg};border-radius:16px;cursor:pointer`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:12px;background:${m.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:11px;font-weight:700`)}>{m.tag}</div>
                <div style={css(`flex:1`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{m.name}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{m.desc}</div></div>
                <div style={css(`width:20px;height:20px;border-radius:999px;border:${m.dotBorder};display:flex;align-items:center;justify-content:center`)}><div style={css(`width:9px;height:9px;border-radius:999px;background:${m.dotBg}`)}></div></div>
              </div>
            ))}
          </div>
          <div onClick={v.toProfile} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>Nạp {v.topupLabel}</div>
        </div>
      )}
    </>
  );
}
