import { css } from "../css.js";

export default function ParentScreens({ v }) {
  return (
    <>
      {v.isPOverview && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 20px;background:linear-gradient(180deg,#eaf6f8 0%,#fcfcfc 100%)`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div><div style={css(`font-size:12px;color:#455771`)}>{v.t(`Phụ huynh`)}</div><div style={css(`font-size:17px;font-weight:700;color:#455771`)}>{v.parentName}</div></div>
              <div onClick={v.toNoti} style={css(`position:relative;width:36px;height:36px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#25475a" strokeWidth="1.7" strokeLinecap="round"><path d="M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4z"/><path d="M13.7 19.6a2 2 0 0 1-3.4 0"/></svg><div style={css(`position:absolute;top:5px;right:6px;width:7px;height:7px;border-radius:999px;background:#ef5da8;border:1.5px solid #fff`)}></div></div>
            </div>
            <div style={css(`margin-top:14px;display:flex;gap:10px`)}>
              {v.children.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`flex:1;display:flex;align-items:center;gap:10px;padding:11px;border:${c.border};background:${c.bg};border-radius:16px;cursor:pointer;transition:all .15s`)}>
                  <div style={css(`width:34px;height:34px;flex:none;border-radius:999px;background:${c.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:11.5px;font-weight:600`)}>{c.initials}</div>
                  <span style={css(`font-size:12.5px;font-weight:${c.weight};color:#455771;line-height:1.3`)}>{c.name}</span>
                </div>
              ))}
            </div>
            <div style={css(`margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:11px`)}>
              {v.childStats.map((st, i) => (
                <div key={i} style={css(`padding:14px;border-radius:18px;background:${st.bg}`)}><div style={css(`font-size:26px;font-weight:700;color:${st.color};line-height:1`)}>{st.value}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:5px`)}>{st.label}</div></div>
              ))}
            </div>
          </div>
          <div style={css(`padding:4px 20px 0`)}>
            <div style={css(`padding:16px;border:1px solid #ddeaf0;border-radius:20px;background:#fff`)}>
              <div style={css(`display:flex;align-items:center;justify-content:space-between`)}><span style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Tiến độ học tập`)}</span><span style={css(`font-size:13px;font-weight:700;color:#00708f`)}>{v.childPath}</span></div>
              <div style={css(`margin-top:11px;height:7px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${v.childPath};border-radius:999px;background:linear-gradient(90deg,#00aaab,#138cd2)`)}></div></div>
              <div style={css(`margin-top:9px;font-size:11.5px;color:#455771`)}>{v.childMissions} {v.t(`mission hoàn thành trong tuần này`)}</div>
            </div>
            <div style={css(`margin-top:14px;padding:16px;border-radius:20px;background:#195658;color:#fff;position:relative;overflow:hidden`)}>
              <div style={css(`position:absolute;right:-30px;bottom:-40px;width:130px;height:130px;border-radius:999px;background:rgba(0,170,171,.3)`)}></div>
              <div style={css(`position:relative`)}>
                <div style={css(`font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.7`)}>{v.t(`Gợi ý cho tuần tới`)}</div>
                <div style={css(`font-size:14px;line-height:1.6;margin-top:7px;text-wrap:pretty`)}>{v.nextAction}</div>
                <div onClick={v.toPReport} style={css(`margin-top:14px;height:38px;padding:0 16px;border-radius:999px;background:#fff;color:#195658;font-size:13px;font-weight:600;display:inline-flex;align-items:center;cursor:pointer`)}>{v.t(`Tạo báo cáo tuần`)}</div>
              </div>
            </div>
            <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
              <div onClick={v.toPChild} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}><div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d="M4 20V10.5M10 20V4.5M16 20v-7M21.5 20h-19"/></svg></div><div style={css(`flex:1`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Theo dõi học tập`)}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{v.t(`Kết quả theo lớp và bài tập gần đây`)}</div></div><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg></div>
              <div onClick={v.toPSafety} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}><div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3.5l7 3v5.2c0 4.3-2.9 7.6-7 8.8-4.1-1.2-7-4.5-7-8.8V6.5l7-3z"/></svg></div><div style={css(`flex:1`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Cài đặt an toàn`)}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{v.t(`Social, leaderboard, AI tutor và giới hạn thời gian`)}</div></div><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg></div>
            </div>
          </div>
        </div>
      )}

      {v.isPChild && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:13px`)}>
            <div style={css(`width:52px;height:52px;border-radius:999px;background:${v.childTint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;font-weight:600`)}>{v.childInitials}</div>
            <div><div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.childName}</div><div style={css(`font-size:12px;color:#455771;margin-top:2px`)}>{v.childMeta}</div></div>
          </div>
          <div style={css(`margin-top:20px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Kết quả theo lớp`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:11px`)}>
            {v.childClasses.map((c, i) => (
              <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between`)}><div style={css(`font-size:13.5px;font-weight:700;color:#455771;letter-spacing:.02em`)}>{c.name}</div><div style={css(`font-size:19px;font-weight:700;color:#00708f`)}>{c.score}</div></div>
                <div style={css(`font-size:11.5px;color:#455771;margin-top:4px`)}>{c.teacher} · {c.submitted}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:20px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Bài tập gần đây`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:11px`)}>
            {v.childAssignments.map((a, i) => (
              <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`font-size:13.5px;font-weight:600;color:#455771;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                <div style={css(`margin-top:8px;display:flex;align-items:center;gap:9px`)}>
                  <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${a.bg};color:${a.color};font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{a.state}</div>
                  <span style={css(`font-size:11px;color:#455771`)}>{a.cls}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={css(`margin-top:20px;font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Hoạt động gần đây`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.childActivity.map((a, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:12px;background:${a.tint}`)}></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13px;font-weight:600;color:#455771;line-height:1.35;text-wrap:pretty`)}>{v.t(a.title)}</div>
                  <div style={css(`font-size:11px;color:#455771;margin-top:2px`)}>{v.t(a.subject)} · {a.when} · {v.t(a.duration)}</div>
                </div>
                <div style={css(`height:22px;padding:0 9px;border-radius:999px;background:${a.done ? "#f0fdf4" : "#eaf6f8"};color:${a.done ? "#15803d" : "#00708f"};font-size:10px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(a.status)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isPReport && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t(`Báo cáo tuần`)}</div>
          <div style={css(`font-size:13px;color:#455771;margin-top:3px`)}>{v.reportPeriod}</div>
          <div style={css(`margin-top:16px;padding:16px;border:1px solid #ddeaf0;border-radius:20px;background:#fff`)}>
            <div style={css(`font-size:13px;line-height:1.7;color:#455771;text-wrap:pretty`)}>{v.reportSummary}</div>
            <div style={css(`margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px`)}>
              {v.reportMetrics.map((m, i) => (
                <div key={i} style={css(`padding:12px 8px;border-radius:14px;background:#edf7f9;text-align:center`)}><div style={css(`font-size:19px;font-weight:700;color:#00708f;line-height:1`)}>{m.value}</div><div style={css(`font-size:10px;color:#455771;margin-top:4px;line-height:1.3`)}>{m.label}</div></div>
              ))}
            </div>
          </div>
          <div style={css(`margin-top:18px;display:flex;align-items:center;gap:8px`)}><div style={css(`width:8px;height:8px;border-radius:999px;background:#22c55e`)}></div><div style={css(`font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Điểm mạnh`)}</div></div>
          <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
            {v.reportStrengths.map((r, i) => (
              <div key={i} style={css(`padding:13px;border:1px solid #cdecd8;border-radius:14px;background:#f6fdf8;font-size:12.5px;line-height:1.55;color:#455771;text-wrap:pretty`)}>{r.text}</div>
            ))}
          </div>
          <div style={css(`margin-top:18px;display:flex;align-items:center;gap:8px`)}><div style={css(`width:8px;height:8px;border-radius:999px;background:#f59e0b`)}></div><div style={css(`font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Cần cải thiện`)}</div></div>
          <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
            {v.reportImprovements.map((r, i) => (
              <div key={i} style={css(`padding:13px;border:1px solid #f6e2bd;border-radius:14px;background:#fffaf1;font-size:12.5px;line-height:1.55;color:#455771;text-wrap:pretty`)}>{r.text}</div>
            ))}
          </div>
          <div onClick={v.toPMessages} style={css(`margin-top:20px;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Trao đổi với giáo viên`)}</div>
        </div>
      )}

      {v.isPMessages && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t(`Liên hệ giáo viên`)}</div><div style={css(`font-size:13px;color:#455771;margin-top:3px;text-wrap:pretty`)}>{v.t(`Gửi tin nhắn cho giáo viên đang dạy con và theo dõi phản hồi tại một nơi.`)}</div></div>
          </div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
            {v.convos.map((c, i) => (
              <div key={i} onClick={c.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;gap:11px`)}>
                  <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${c.tint};display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
                  <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{c.teacher}</div><div style={css(`font-size:11px;color:#455771;margin-top:2px`)}>{c.cls}</div></div>
                  <div style={css(`display:flex;flex-direction:column;align-items:flex-end;gap:5px`)}>
                    <span style={css(`font-size:10.5px;color:#455771`)}>{c.when}</span>
                    {c.hasUnread && (<div style={css(`min-width:19px;height:19px;padding:0 5px;border-radius:999px;background:#00aaab;color:#fff;font-size:10.5px;font-weight:700;display:flex;align-items:center;justify-content:center`)}>{c.unread}</div>)}
                  </div>
                </div>
                <div style={css(`font-size:12.5px;font-weight:600;color:#00708f;margin-top:10px`)}>{c.subject}</div>
                <div style={css(`font-size:12.5px;line-height:1.55;color:#455771;margin-top:4px;text-wrap:pretty`)}>{c.preview}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:16px;display:flex;align-items:center;justify-content:center;gap:8px;height:50px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;color:#00708f;font-size:13.5px;font-weight:600;cursor:pointer`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Tin nhắn mới`)}</div>
        </div>
      )}

      {v.isPThread && (
        <div style={css(`min-height:100%;display:flex;flex-direction:column;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 14px;border-bottom:1px solid #ddeaf0;display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toPMessages} style={css(`width:36px;height:36px;flex:none;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`width:36px;height:36px;flex:none;border-radius:999px;background:#00aaab;display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
            <div><div style={css(`font-size:14.5px;font-weight:600;color:#455771`)}>{v.t(`Cô Phạm Thu Trang`)}</div><div style={css(`font-size:11px;color:#455771`)}>{v.t(`SINH HỌC 8A1 · Trao đổi học tập`)}</div></div>
          </div>
          <div style={css(`flex:1;padding:16px 20px;display:flex;flex-direction:column;gap:12px`)}>
            {v.thread.map((m, i) => (
              <div key={i} style={css(`display:flex;flex-direction:column;align-items:${m.align}`)}>
                <div style={css(`max-width:82%;padding:12px 14px;border:${m.border};background:${m.bg};color:${m.color};border-radius:18px;font-size:13px;line-height:1.6;text-wrap:pretty`)}>{m.body}</div>
                <span style={css(`font-size:10.5px;color:#455771;margin-top:5px`)}>{m.at}</span>
              </div>
            ))}
            {v.sent && (
              <div style={css(`display:flex;flex-direction:column;align-items:flex-end;animation:ybup .3s ease`)}>
                <div style={css(`max-width:82%;padding:12px 14px;border:1px solid #00aaab;background:#00aaab;color:#fff;border-radius:18px;font-size:13px;line-height:1.6`)}>{v.t(`Cảm ơn cô, tối nay em sẽ cho cháu xem lại mô hình 3D và nhắc nộp bài đúng hạn.`)}</div>
                <span style={css(`font-size:10.5px;color:#455771;margin-top:5px`)}>{v.t(`Vừa gửi · đã gửi`)}</span>
              </div>
            )}
          </div>
          <div style={css(`padding:12px 20px 26px;border-top:1px solid #ddeaf0;display:flex;align-items:center;gap:10px;background:#fcfcfc`)}>
            <div style={css(`flex:1;min-height:48px;padding:13px 15px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;color:#455771`)}>{v.t(`Nhập nội dung tin nhắn...`)}</div>
            <div onClick={v.sendMsg} style={css(`width:48px;height:48px;flex:none;border-radius:16px;background:#00aaab;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 16px rgba(0,170,171,.3)`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12l16-8-6 8 6 8-16-8z"/></svg></div>
          </div>
        </div>
      )}

      {v.isPSafety && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toPOverview} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.t(`Cài đặt an toàn`)}</div>
          </div>
          <div style={css(`margin-top:8px;font-size:12.5px;line-height:1.55;color:#455771;text-wrap:pretty`)}>{v.t(`Quản lý social, leaderboard, AI tutor và giới hạn thời gian học.`)}</div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:11px`)}>
            {v.safetyRows.map((r, i) => (
              <div key={i} onClick={r.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{r.label}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:3px;line-height:1.45`)}>{r.desc}</div></div>
                <div style={css(`width:44px;height:26px;flex:none;border-radius:999px;background:${r.trackBg};position:relative;transition:background .2s`)}><div style={css(`position:absolute;top:2px;left:${r.knobLeft};width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s`)}></div></div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:20px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Giới hạn màn hình mỗi ngày`)}</div>
          <div style={css(`margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:9px`)}>
            {v.limitChips.map((c, i) => (
              <div key={i} onClick={c.onClick} style={css(`height:44px;border:${c.border};background:${c.bg};color:${c.color};border-radius:14px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{c.label}</div>
            ))}
          </div>
          <div style={css(`margin-top:12px;padding:13px 14px;border-radius:14px;background:#edf7f9;font-size:12px;line-height:1.55;color:#455771;text-wrap:pretty`)}>{v.t(`Khi đạt giới hạn, con sẽ thấy thông báo “Hết thời gian sử dụng” và không thể tiếp tục học trong ngày.`)}</div>
          <div onClick={v.toPOverview} style={css(`margin-top:22px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Lưu cài đặt`)}</div>
        </div>
      )}
    </>
  );
}
