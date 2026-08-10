import { css } from "../css.js";

export default function StudentLibraryWorkScreens({ v }) {
  return (
    <>
      {v.isLibrary && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Thư viện của tôi`)}</div>
          <div style={css(`font-size:13px;color:#617789;margin-top:4px`)}>{v.t(`Học liệu bạn đã lưu, đã mua và đang học`)}</div>
          <div style={css(`margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:12px`)}>
            {v.libraryCards.map((c, i) => (
              <div key={i} style={css(`border:1px solid #ddeaf0;border-radius:22px;background:#fff;padding:16px`)}>
                <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
                  <div><div style={css(`font-size:13px;font-weight:600;color:#00aaab`)}>{c.title}</div><div style={css(`font-size:32px;font-weight:700;color:#195658;line-height:1.05;margin-top:2px`)}>{c.value}</div></div>
                  <div style={css(`width:42px;height:42px;flex:none;border-radius:14px;background:#eaf6f8;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:24px;height:24px;background-image:url(${c.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                </div>
                <div style={css(`font-size:11.5px;color:#617789;margin-top:8px;line-height:1.5;text-wrap:pretty`)}>{c.hint}</div>
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
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{l.meta}</div>
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
            <div><div style={css(`font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Lớp & bài tập`)}</div><div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>{v.t(`2 lớp đang học · 3 bài cần làm`)}</div></div>
            <div onClick={v.toNoti} style={css(`position:relative;width:36px;height:36px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#25475a" strokeWidth="1.7" strokeLinecap="round"><path d="M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4z"/><path d="M13.7 19.6a2 2 0 0 1-3.4 0"/></svg><div style={css(`position:absolute;top:5px;right:6px;width:7px;height:7px;border-radius:999px;background:#ef5da8;border:1.5px solid #fff`)}></div></div>
          </div>
          <div className="yb-scroll" style={css(`margin-top:16px;display:flex;gap:12px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 8px`)}>
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
          </div>
          <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.cwTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{t.label}</div>
            ))}
          </div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
            {v.cwItems.map((a, i) => (
              <div key={i} onClick={a.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${a.tagBg};color:${a.tagColor};font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{a.tag}</div>
                  {a.hasScore && (<div style={css(`font-size:19px;font-weight:700;color:#00708f`)}>{a.score}</div>)}
                </div>
                <div style={css(`font-size:14px;font-weight:600;color:#195658;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{a.title}</div>
                <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{a.cls} · {a.due}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isClassDetail && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toClasswork} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.classDetailName}</div>
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

          <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.classDetailTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{t.label}</div>
            ))}
          </div>

          {v.classTabFeed && (
            <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
              {v.classDetailFeed.map((n, i) => (
                <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                  <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:8px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#8ba0ae;white-space:nowrap;margin-top:2px`)}>{n.when}</span></div>
                  <div style={css(`font-size:12.5px;line-height:1.55;color:#617789;margin-top:6px;text-wrap:pretty`)}>{n.body}</div>
                </div>
              ))}
            </div>
          )}

          {v.classTabStudents && (
            <div style={css(`margin-top:16px`)}>
              <div style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`width:42px;height:42px;flex:none;border-radius:999px;background:${v.classDetailTeacherTint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:14px`)}>{v.classDetailTeacherInitials}</div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:14px;font-weight:600;color:#195658`)}>{v.classDetailTeacher}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{v.classDetailTeacherMeta}</div></div>
                <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(`Giáo viên`)}</div>
              </div>
              <div style={css(`margin-top:14px;font-size:12.5px;font-weight:600;color:#617789`)}>{v.classDetailStudents} {v.t(`học sinh`)}</div>
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
                {v.classDetailRoster.map((st, i) => (
                  <div key={i} style={css(`display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:36px;height:36px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12px`)}>{st.initials}</div>
                    <div style={css(`flex:1;min-width:0;font-size:13.5px;font-weight:500;color:#25475a`)}>{st.name}</div>
                    <span style={css(`font-size:11px;color:#8ba0ae;flex:none`)}>{v.t(`Học sinh`)}</span>
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
                        <div style={css(`font-size:14px;font-weight:600;color:#195658;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{a.title}</div>
                        <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{a.due}</div>
                      </div>
                      {a.score && (<div style={css(`font-size:19px;font-weight:700;color:#00708f;flex:none`)}>{a.score}</div>)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={css(`margin-top:24px;text-align:center;font-size:13px;color:#8ba0ae`)}>{v.t(`Chưa có bài tập nào trong lớp này.`)}</div>
            )
          )}

          {v.classTabContent && (
            <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
              {v.classDetailContent.map((l, i) => (
                <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                    <div style={css(`margin-top:8px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${l.pct};border-radius:999px;background:#00aaab`)}></div></div>
                  </div>
                  <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${l.statusBg};color:${l.statusColor};font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{l.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {v.isAssignment && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div onClick={v.toClasswork} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:16px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.asgCls}</div>
          <div style={css(`font-size:20px;font-weight:700;color:#195658;line-height:1.32;margin-top:7px;text-wrap:pretty`)}>{v.asgTitle}</div>
          <div style={css(`margin-top:12px;display:flex;align-items:center;gap:8px;padding:12px 14px;border:1px solid #fbe0b3;background:#fff5e6;border-radius:14px`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/></svg><span style={css(`font-size:12.5px;font-weight:600;color:#b45309`)}>{v.asgDue}</span></div>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#195658`)}>{v.t(`Yêu cầu bài làm`)}</div>
          <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
            {v.asgChecklist.map((c, i) => (
              <div key={i} style={css(`display:flex;gap:11px;align-items:flex-start;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div style={css(`width:7px;height:7px;flex:none;border-radius:999px;background:#00aaab;margin-top:6px`)}></div><span style={css(`font-size:13px;line-height:1.5;color:#25475a`)}>{c.text}</span></div>
            ))}
          </div>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#195658`)}>{v.t(`Bài làm của bạn`)}</div>
          {v.notSubmitted && (
            <>
              <div style={css(`margin-top:10px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:118px;font-size:13px;line-height:1.6;color:#25475a`)}>{v.t(`Quang hợp diễn ra ở lục lạp, cần ánh sáng, nước và khí CO₂. Sản phẩm tạo ra là glucôzơ và khí ôxi…`)}</div>
              <div style={css(`margin-top:11px;display:flex;align-items:center;gap:11px;padding:13px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;cursor:pointer`)}><div style={css(`width:34px;height:34px;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.9" strokeLinecap="round"><path d="M12 16V5m0 0L7.5 9.5M12 5l4.5 4.5M4.5 19h15"/></svg></div><div><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{v.t(`Đính kèm tệp`)}</div><div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{v.t(`Ảnh, PDF hoặc tài liệu, tối đa 20MB`)}</div></div></div>
              <div onClick={v.submitAsg} style={css(`margin-top:20px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Nộp bài`)}</div>
            </>
          )}
          {v.submitted && (
            <>
              <div style={css(`margin-top:10px;padding:16px;border:1.6px solid #22c55e;border-radius:18px;background:#f0fdf4;animation:ybup .3s ease`)}>
                <div style={css(`display:flex;align-items:center;gap:10px`)}><div style={css(`width:30px;height:30px;border-radius:999px;background:#22c55e;display:flex;align-items:center;justify-content:center`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 6.5"/></svg></div><div><div style={css(`font-size:14px;font-weight:600;color:#15803d`)}>{v.t(`Đã nộp bài thành công`)}</div><div style={css(`font-size:11.5px;color:#3f7d55;margin-top:2px`)}>{v.t(`Lần nộp 1 · 17/05 · 20:14 · đúng hạn`)}</div></div></div>
              </div>
              <div style={css(`margin-top:12px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.6;color:#25475a`)}>{v.t(`Quang hợp diễn ra ở lục lạp, cần ánh sáng, nước và khí CO₂. Sản phẩm tạo ra là glucôzơ và khí ôxi. Em có đính kèm sơ đồ mô tả pha sáng và pha tối.`)}</div>
              <div style={css(`margin-top:11px;display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div style={css(`width:30px;height:30px;border-radius:9px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00708f`)}>PDF</div><div style={css(`flex:1`)}><div style={css(`font-size:12.5px;font-weight:500;color:#25475a`)}>so-do-quang-hop.pdf</div><div style={css(`font-size:10.5px;color:#617789`)}>1,2 MB</div></div></div>
              <div onClick={v.toClasswork} style={css(`margin-top:20px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Về danh sách bài tập`)}</div>
            </>
          )}
        </div>
      )}
    </>
  );
}
