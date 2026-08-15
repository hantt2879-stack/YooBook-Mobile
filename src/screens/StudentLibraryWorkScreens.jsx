import { css } from "../css.js";
import HScroll from "./HScroll.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import StatusChip from "./ui/StatusChip.jsx";

export default function StudentLibraryWorkScreens({ v }) {
  return (
    <>
      {v.isLibrary && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t(`Thư viện của tôi`)}</div>
          <div style={css(`font-size:13px;color:#455771;margin-top:4px`)}>{v.t(`Học liệu bạn đã lưu, đã mua và đang học`)}</div>
          <div style={css(`margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:12px`)}>
            {v.libraryCards.map((c, i) => (
              <div key={i} onClick={c.onClick} className="yb-press" style={css(`border:1px solid #ddeaf0;border-radius:22px;background:#fff;padding:16px;cursor:pointer;transition:all .15s`)}>
                <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
                  <div><div style={css(`font-size:13px;font-weight:600;color:#00aaab`)}>{c.title}</div><div style={css(`font-size:32px;font-weight:700;color:#455771;line-height:1.05;margin-top:2px`)}>{c.value}</div></div>
                  <div style={css(`width:42px;height:42px;flex:none;border-radius:14px;background:#eaf6f8;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:24px;height:24px;background-image:url(${c.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                </div>
                <div style={css(`font-size:11.5px;color:#455771;margin-top:8px;line-height:1.5;text-wrap:pretty`)}>{c.hint}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:24px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.libTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{t.label}</div>
            ))}
          </div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:12px`)}>
            {v.libraryItems.map((l, i) => (
              <div key={i} onClick={l.onClick} style={css(`display:flex;gap:12px;padding:12px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`width:82px;height:66px;flex:none;border-radius:13px;position:relative;overflow:hidden;background:${l.tintBg}`)}><img src={l.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                  <div style={css(`font-size:11px;color:#455771;margin-top:3px`)}>{l.meta}</div>
                  <div style={css(`margin-top:9px;display:flex;align-items:center;gap:8px`)}>
                    <div style={css(`flex:1;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${l.pct};border-radius:999px;background:${l.barColor}`)}></div></div>
                    <span style={css(`font-size:11px;font-weight:600;color:${l.barColor}`)}>{l.pct}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isClasswork && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#455771`)}>{v.t(`Lớp & bài tập`)}</div><div style={css(`font-size:13px;color:#455771;margin-top:3px`)}>{v.t(`2 lớp đang học · 3 bài cần làm`)}</div></div>
            <div onClick={v.toNoti} style={css(`position:relative;width:36px;height:36px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#25475a" strokeWidth="1.7" strokeLinecap="round"><path d="M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4z"/><path d="M13.7 19.6a2 2 0 0 1-3.4 0"/></svg><div style={css(`position:absolute;top:5px;right:6px;width:7px;height:7px;border-radius:999px;background:#ef5da8;border:1.5px solid #fff`)}></div></div>
          </div>
          <HScroll extra="margin-top:16px;gap:12px;margin-left:-20px;margin-right:-20px;padding:0 20px 8px">
            {v.myClasses.map((c, i) => (
              <div key={i} onClick={c.onClick} className="yb-press-dark" style={css(`flex:none;width:206px;padding:14px;border-radius:20px;background:${c.tintBg};color:#fff;position:relative;overflow:hidden;cursor:pointer;transition:all .15s`)}>
                <img src={c.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
                <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,50,52,.55) 0%,rgba(15,50,52,.25) 38%,rgba(15,50,52,.72) 100%)`)}></div>
                <div style={css(`position:relative`)}>
                  <div style={css(`font-size:14.5px;font-weight:700;letter-spacing:.02em`)}>{c.name}</div>
                  <div style={css(`font-size:11.5px;opacity:.82;margin-top:3px`)}>{c.sub}</div>
                  <div style={css(`margin-top:12px;height:5px;border-radius:999px;background:rgba(255,255,255,.25);overflow:hidden`)}><div style={css(`height:100%;width:${c.progress};border-radius:999px;background:#fff`)}></div></div>
                  <div style={css(`font-size:11px;opacity:.85;margin-top:7px`)}>{v.t(`Tiến độ`)} {c.progress}</div>
                </div>
              </div>
            ))}
          </HScroll>
          <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.cwTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{t.label}</div>
            ))}
          </div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
            {v.cwItems.length === 0 && (
              <EmptyState title={v.t(`Chưa có bài tập nào`)} desc={v.t(`Bài tập giáo viên giao sẽ hiện ở đây.`)} />
            )}
            {v.cwItems.map((a) => (
              <div key={a.id} onClick={a.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <div style={css(`display:flex;align-items:center;gap:7px`)}>
                    <StatusChip status={a.status} t={v.t} />
                    <span style={css(`font-size:10.5px;color:#617789`)}>{a.typeLabel}</span>
                  </div>
                  {a.scoreLabel && <div style={css(`font-size:19px;font-weight:700;color:#00708f`)}>{a.scoreLabel}</div>}
                </div>
                <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{a.title}</div>
                <div style={css(`font-size:11.5px;color:#455771;margin-top:5px`)}>{a.className} · {a.dueLabel}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isClassDetail && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#455771`)}>{v.classDetailName}</div>
          </div>

          <div style={css(`margin-top:18px;padding:16px;border-radius:20px;background:${v.classDetailTint};color:#fff;position:relative;overflow:hidden`)}>
            <img src={v.classDetailImg} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
            <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,50,52,.55) 0%,rgba(15,50,52,.4) 45%,rgba(15,50,52,.7) 100%)`)}></div>
            <div style={css(`position:relative`)}>
              <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
                <span style={css(`font-size:12px;opacity:.85`)}>{v.classDetailSub}</span>
                <span style={css(`font-size:10.5px;opacity:.85;height:20px;padding:0 9px;border-radius:999px;background:rgba(255,255,255,.18);display:flex;align-items:center`)}>{v.classDetailCode}</span>
              </div>
              <div style={css(`margin-top:10px;height:6px;border-radius:999px;background:rgba(255,255,255,.25);overflow:hidden`)}><div style={css(`height:100%;width:${v.classDetailProgress};border-radius:999px;background:#fff`)}></div></div>
              <div style={css(`margin-top:8px;display:flex;align-items:center;justify-content:space-between;font-size:11.5px;opacity:.9`)}><span>{v.t(`Tiến độ`)} {v.classDetailProgress}</span><span>{v.classDetailStudents} {v.t(`học sinh`)}</span></div>
            </div>
          </div>

          <HScroll extra="margin-top:18px;gap:6px;padding:4px;background:#edf7f9;border-radius:14px;margin-left:-4px;margin-right:-4px">
            {v.classDetailTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:none;height:36px;padding:0 14px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{t.label}</div>
            ))}
          </HScroll>

          {v.classTabFeed && (
            <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
              {v.classDetailFeed.map((n, i) => (
                <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                  <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:8px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#455771;line-height:1.35`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#455771;white-space:nowrap;margin-top:2px`)}>{n.when}</span></div>
                  <div style={css(`font-size:12.5px;line-height:1.55;color:#455771;margin-top:6px;text-wrap:pretty`)}>{n.body}</div>
                </div>
              ))}
            </div>
          )}

          {v.classTabStudents && (
            <div style={css(`margin-top:16px`)}>
              <div style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`width:42px;height:42px;flex:none;border-radius:999px;background:${v.classDetailTeacherTint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:14px`)}>{v.classDetailTeacherInitials}</div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:14px;font-weight:600;color:#455771`)}>{v.classDetailTeacher}</div><div style={css(`font-size:11.5px;color:#455771;margin-top:2px`)}>{v.classDetailTeacherMeta}</div></div>
                <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(`Giáo viên`)}</div>
              </div>
              <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#455771`)}>{v.classDetailStudents} {v.t(`học sinh`)}</div>
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
                {v.classDetailRoster.map((st, i) => (
                  <div key={i} style={css(`display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:36px;height:36px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12px`)}>{st.initials}</div>
                    <div style={css(`flex:1;min-width:0;font-size:13.5px;font-weight:500;color:#455771`)}>{st.name}</div>
                    <span style={css(`font-size:11px;color:#455771;flex:none`)}>{v.t(`Học sinh`)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {v.classTabAssignments && (
            v.classDetailAssignments.length ? (
              <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
                {v.classDetailAssignments.map((a, i) => (
                  <div key={i} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                    <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:10px`)}>
                      <div style={css(`flex:1;min-width:0`)}>
                        <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${a.tagBg};color:${a.tagColor};font-size:10.5px;font-weight:600;display:inline-flex;align-items:center`)}>{a.tag}</div>
                        <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{a.title}</div>
                        <div style={css(`font-size:11.5px;color:#455771;margin-top:5px`)}>{a.due}</div>
                      </div>
                      {a.score && (<div style={css(`font-size:19px;font-weight:700;color:#00708f;flex:none`)}>{a.score}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={css(`margin-top:24px;text-align:center;font-size:13px;color:#455771`)}>{v.t(`Chưa có bài tập nào trong lớp này.`)}</div>
            )
          )}

          {v.classTabContent && (
            <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
              {v.classDetailContent.map((l, i) => (
                <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`font-size:13.5px;font-weight:600;color:#455771;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                    <div style={css(`margin-top:8px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${l.pct};border-radius:999px;background:#00aaab`)}></div></div>
                  </div>
                  <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${l.statusBg};color:${l.statusColor};font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{l.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </>
  );
}
