import { css } from "../css.js";

export default function TeacherScreens({ v }) {
  return (
    <>
      {v.isTOverview && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 20px;background:linear-gradient(180deg,#eaf6f8 0%,#fcfcfc 100%)`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div style={css(`display:flex;align-items:center;gap:11px`)}>
                <div style={css(`width:44px;height:44px;border-radius:999px;background:linear-gradient(135deg,#138cd2,#00708f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:15px`)}>PT</div>
                <div><div style={css(`font-size:12px;color:#617789`)}>{v.t(`Giáo viên`)}</div><div style={css(`font-size:15.5px;font-weight:600;color:#195658`)}>{v.teacherName}</div></div>
              </div>
              <div onClick={v.toNoti} style={css(`position:relative;width:36px;height:36px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#25475a" strokeWidth="1.7" strokeLinecap="round"><path d="M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4z"/><path d="M13.7 19.6a2 2 0 0 1-3.4 0"/></svg><div style={css(`position:absolute;top:5px;right:6px;width:7px;height:7px;border-radius:999px;background:#ef5da8;border:1.5px solid #fff`)}></div></div>
            </div>
            <div style={css(`margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:11px`)}>
              {v.tMetrics.map((m, i) => (
                <div key={i} style={css(`border:1px solid #ddeaf0;border-radius:20px;background:#fff;padding:14px`)}>
                  <div style={css(`display:flex;align-items:center;justify-content:space-between`)}><span style={css(`font-size:12.5px;font-weight:600;color:${m.color}`)}>{m.label}</span><div style={css(`width:9px;height:9px;border-radius:999px;background:${m.color}`)}></div></div>
                  <div style={css(`font-size:30px;font-weight:700;color:#195658;line-height:1;margin-top:8px`)}>{m.value}</div>
                  <div style={css(`font-size:10.5px;color:#617789;margin-top:5px;line-height:1.4`)}>{m.hint}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={css(`padding:16px 20px 0;display:flex;gap:10px`)}>
            {v.tQuickActions.map((q, i) => (
              <div key={i} onClick={q.onClick} style={css(`flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;padding:13px 6px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer;transition:all .15s`)}>
                <div style={css(`width:38px;height:38px;border-radius:12px;background:${q.bg};display:flex;align-items:center;justify-content:center`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={q.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={q.iconPath}/></svg></div>
                <span style={css(`font-size:11px;font-weight:600;color:#195658;text-align:center;line-height:1.3`)}>{q.label}</span>
              </div>
            ))}
          </div>
          <div style={css(`padding:18px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{v.t(`Lớp học của tôi`)}</div><span onClick={v.toTClasses} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>{v.t(`Xem thêm`)}</span></div>
            <div className="yb-scroll" style={css(`margin-top:12px;display:flex;gap:12px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 8px`)}>
              {v.tClasses.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`flex:none;width:212px;border-radius:20px;overflow:hidden;border:1px solid #ddeaf0;background:#fff;cursor:pointer`)}>
                  <div style={css(`height:78px;position:relative;background:${c.tintBg}`)}><img src={c.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/><div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(15,50,52,.65) 100%)`)}></div><div style={css(`position:absolute;left:12px;bottom:10px;color:#fff;font-size:14px;font-weight:700;letter-spacing:.02em`)}>{c.name}</div></div>
                  <div style={css(`padding:12px 13px 13px`)}>
                    <div style={css(`font-size:11.5px;color:#617789`)}>{c.sub} · {c.students} {v.t(`học sinh`)}</div>
                    <div style={css(`margin-top:10px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${c.progress};border-radius:999px;background:#00aaab`)}></div></div>
                    <div style={css(`font-size:11px;color:#617789;margin-top:6px`)}>{v.t(`Tiến độ`)} {c.progress} · {v.t(`mã`)} {c.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={css(`padding:18px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{v.t(`Bài cần chấm`)}</div><span onClick={v.toTGrading} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>{v.t(`Chấm bài`)}</span></div>
            <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:11px`)}>
              {v.tAssignments.map((a, i) => (
                <div key={i} onClick={a.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                  <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{a.cls} · {v.t(`hạn`)} {a.due}</div>
                  <div style={css(`margin-top:10px;display:flex;align-items:center;gap:9px`)}>
                    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;gap:4px`)}>{a.submitted} {v.t(`đã nộp`)}</div>
                    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#fff5e6;color:#b45309;font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{a.pending}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {v.isTClasses && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Lớp học của tôi`)}</div>
          <div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>{v.tClassesCountLabel}</div>

          <div className="yb-scroll" style={css(`margin-top:16px;display:flex;gap:12px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 8px`)}>
            {v.tClasses.map((c, i) => (
              <div key={i} onClick={c.onClick} style={css(`flex:none;width:206px;padding:14px;border-radius:20px;background:${c.tintBg};color:#fff;position:relative;overflow:hidden;cursor:pointer`)}>
                <img src={c.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
                <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,50,52,.55) 0%,rgba(15,50,52,.25) 38%,rgba(15,50,52,.72) 100%)`)}></div>
                <div style={css(`position:relative`)}>
                  {c.isNew && (<div style={css(`position:absolute;right:0;top:0;height:20px;padding:0 8px;border-radius:999px;background:#f59e0b;color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center`)}>{v.t(`Mới tạo`)}</div>)}
                  <div style={css(`font-size:14.5px;font-weight:700;letter-spacing:.02em`)}>{c.name}</div>
                  <div style={css(`font-size:11.5px;opacity:.82;margin-top:3px`)}>{c.sub} · {c.students} {v.t(`học sinh`)}</div>
                  <div style={css(`margin-top:12px;height:5px;border-radius:999px;background:rgba(255,255,255,.25);overflow:hidden`)}><div style={css(`height:100%;width:${c.progress};border-radius:999px;background:#fff`)}></div></div>
                  <div style={css(`font-size:11px;opacity:.85;margin-top:7px`)}>{v.t(`Tiến độ`)} {c.progress}</div>
                </div>
              </div>
            ))}
            <div onClick={v.toTCreateClass} style={css(`flex:none;width:130px;padding:14px;border-radius:20px;border:1.4px dashed #bcd7e0;background:#f8fcfd;color:#00708f;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;cursor:pointer;text-align:center`)}>
              <div style={css(`width:34px;height:34px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></div>
              <span style={css(`font-size:12px;font-weight:600;line-height:1.3`)}>{v.t(`Tạo lớp học`)}</span>
            </div>
          </div>

          <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.tClassesTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{t.label}</div>
            ))}
          </div>

          {v.tcTabSubmitted && (
            <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
              {v.tSubmissions.map((x, i) => (
                <div key={i} onClick={x.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                  <div style={css(`width:34px;height:34px;flex:none;border-radius:999px;background:${x.tint};display:flex;align-items:center;justify-content:center`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
                  <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{x.name}</div><div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{x.at} · {x.attempt}</div></div>
                  <div style={css(`height:22px;padding:0 9px;border-radius:999px;background:${x.statusBg};color:${x.statusTint};font-size:10px;font-weight:600;display:flex;align-items:center;flex:none`)}>{x.status}</div>
                </div>
              ))}
            </div>
          )}

          {v.tcTabGrading && (
            <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
              {v.tAssignments.map((a, i) => (
                <div key={i} onClick={a.onClick} style={css(`padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                  <div style={css(`font-size:13px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:4px`)}>{a.cls} · {v.t(`hạn`)} {a.due}</div>
                  <div style={css(`margin-top:9px;display:flex;align-items:center;gap:8px`)}>
                    <div style={css(`height:21px;padding:0 9px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10px;font-weight:600;display:flex;align-items:center;gap:4px`)}>{a.submitted} {v.t(`đã nộp`)}</div>
                    <div style={css(`height:21px;padding:0 9px;border-radius:999px;background:#fff5e6;color:#b45309;font-size:10px;font-weight:600;display:flex;align-items:center`)}>{a.pending}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {v.tcTabUpcoming && (
            <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
              {v.tUpcoming.map((a, i) => (
                <div key={i} onClick={a.onClick} style={css(`display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/></svg>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`font-size:13px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                    <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{a.cls} · {v.t(`hạn`)} {a.due}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {v.isTCreateClass && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toTClasses} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Tạo lớp học`)}</div>
          </div>

          <div style={css(`margin-top:20px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Môn học`)}</div>
          <div style={css(`margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:9px`)}>
            {v.ccSubjects.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:46px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:14px;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Khối lớp`)}</div>
          <div style={css(`margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:8px`)}>
            {v.ccGrades.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:44px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:14px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Tên lớp`)}</div>
          <div style={css(`margin-top:10px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#f8fcfd`)}>
            <div style={css(`font-size:11.5px;color:#617789`)}>{v.t(`Tên lớp sẽ được tạo tự động`)}</div>
            <div style={css(`font-size:17px;font-weight:700;color:#195658;margin-top:5px;letter-spacing:.02em`)}>{v.ccPreviewName}</div>
          </div>

          <div onClick={v.createClass} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Tạo lớp`)}</div>
        </div>
      )}

      {v.isTCreateAssignment && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toTOverview} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Tạo bài tập`)}</div>
          </div>

          <div style={css(`margin-top:20px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Lớp học`)}</div>
          <div className="yb-scroll" style={css(`margin-top:10px;display:flex;gap:8px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 4px`)}>
            {v.caClasses.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`flex:none;height:40px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:12px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Hạn nộp`)}</div>
          <div style={css(`margin-top:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px`)}>
            {v.caDueOptions.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:44px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:14px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Bài tập`)}</div>
          <div style={css(`margin-top:10px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#f8fcfd`)}>
            <div style={css(`font-size:11.5px;color:#617789`)}>{v.t(`Tiêu đề sẽ được tạo tự động`)}</div>
            <div style={css(`font-size:15px;font-weight:700;color:#195658;margin-top:5px`)}>{v.caPreviewTitle}</div>
          </div>

          <div onClick={v.createAssignment} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Tạo bài tập`)}</div>
        </div>
      )}

      {v.isTCreateLecture && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toTOverview} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Tạo bài giảng`)}</div>
          </div>

          <div style={css(`margin-top:20px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Lớp học`)}</div>
          <div className="yb-scroll" style={css(`margin-top:10px;display:flex;gap:8px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 4px`)}>
            {v.clClasses.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`flex:none;height:40px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:12px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Loại bài giảng`)}</div>
          <div style={css(`margin-top:10px;display:grid;grid-template-columns:1fr 1fr;gap:9px`)}>
            {v.clKinds.map((o, i) => (
              <div key={i} onClick={o.onClick} style={css(`height:44px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};color:${o.selected ? "#00708f" : "#25475a"};border-radius:14px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{o.label}</div>
            ))}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Nội dung giáo án`)}</div>
          <div style={css(`margin-top:10px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#f8fcfd`)}>
            <div style={css(`font-size:11.5px;color:#617789`)}>{v.t(`Tiêu đề sẽ được tạo tự động`)}</div>
            <div style={css(`font-size:15px;font-weight:700;color:#195658;margin-top:5px`)}>{v.clPreviewTitle}</div>
          </div>

          <div onClick={v.createLecture} style={css(`margin-top:24px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Tạo bài giảng`)}</div>
        </div>
      )}

      {v.isTExplore && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 0`)}>
            <div style={css(`font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Khám phá học liệu`)}</div>
            <div style={css(`font-size:13px;color:#617789;margin-top:3px;text-wrap:pretty`)}>{v.t(`Mô hình 3D/XR, thí nghiệm, video và tài nguyên bài giảng cho lớp học của bạn`)}</div>
          </div>

          <div style={css(`position:sticky;top:0;z-index:20;background:#fcfcfc;padding:14px 20px 12px;margin-top:6px;border-bottom:1px solid #ddeaf0`)}>
            <div style={css(`display:flex;align-items:center;gap:10px`)}>
              <div style={css(`flex:1;display:flex;align-items:center;gap:9px;height:46px;padding:0 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.2 16.2L21 21"/></svg><span style={css(`font-size:14px;color:#8ba0ae`)}>{v.t(`Tìm kiếm học liệu`)}</span></div>
              <div onClick={v.openFilter} style={css(`position:relative;width:46px;height:46px;border-radius:14px;background:#195658;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M6.5 12h11M10 18h4"/></svg>
                {v.hasActiveFilters && (<div style={css(`position:absolute;top:-3px;right:-3px;min-width:18px;height:18px;padding:0 3px;border-radius:999px;background:#f59e0b;border:2px solid #fcfcfc;color:#fff;font-size:9.5px;font-weight:700;display:flex;align-items:center;justify-content:center`)}>{v.activeFilterCount}</div>)}
              </div>
            </div>
            <div className="yb-scroll" style={css(`margin-top:12px;display:flex;gap:8px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 10px`)}>
              {v.chips.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`flex:none;display:flex;align-items:center;gap:6px;height:36px;padding:0 13px;border-radius:999px;border:${c.border};background:${c.bg};color:${c.color};font-size:13px;font-weight:500;cursor:pointer;transition:all .15s`)}><div style={css(`width:17px;height:17px;background-image:url(${c.icon});background-size:contain;background-position:center;background-repeat:no-repeat;opacity:${c.iconOpacity};flex:none`)}></div>{c.label}</div>
              ))}
            </div>
          </div>

          <div style={css(`padding:14px 20px 0;display:flex;align-items:center;justify-content:space-between`)}>
            <div style={css(`font-size:13px;color:#617789`)}><span style={css(`font-weight:600;color:#195658`)}>{v.resultCount}</span> {v.t(`học liệu`)}</div>
            <div style={css(`display:flex;align-items:center;gap:8px`)}>
              <div onClick={v.toggleExploreSort} style={css(`display:flex;align-items:center;gap:5px;height:32px;padding:0 11px;border:1px solid #ddeaf0;border-radius:999px;background:#fff;font-size:12.5px;color:#25475a;cursor:pointer`)}>{v.exploreSortLabel}<svg width="9" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
              <div onClick={v.toggleTExploreView} style={css(`display:flex;height:32px;border:1px solid #ddeaf0;border-radius:999px;background:#fff;overflow:hidden;cursor:pointer`)}>
                <div style={css(`width:32px;display:flex;align-items:center;justify-content:center;background:${v.tGridBg}`)}><svg width="14" height="14" viewBox="0 0 24 24" fill={v.tGridFg}><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg></div>
                <div style={css(`width:32px;display:flex;align-items:center;justify-content:center;background:${v.tListBg}`)}><svg width="14" height="14" viewBox="0 0 24 24" fill={v.tListFg}><rect x="3" y="4" width="18" height="4" rx="2"/><rect x="3" y="10" width="18" height="4" rx="2"/><rect x="3" y="16" width="18" height="4" rx="2"/></svg></div>
              </div>
            </div>
          </div>

          {!v.tExploreItems.length && (
            <div style={css(`margin:24px 20px 0;padding:28px 20px;border:1.4px dashed #ddeaf0;border-radius:20px;background:#f8fcfd;text-align:center`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Chưa có học liệu phù hợp`)}</div>
              <div style={css(`font-size:12px;color:#617789;margin-top:5px;line-height:1.5`)}>{v.t(`Thử chọn một chủ đề khác hoặc chọn lại "Tất cả".`)}</div>
            </div>
          )}
          <div style={css(`padding:14px 20px 0;display:grid;grid-template-columns:${v.tExploreGridCols};gap:12px`)}>
            {v.tExploreItems.map((l, i) => (
              <div key={i} style={css(`border:1px solid #ddeaf0;border-radius:18px;background:#fff;overflow:hidden;box-shadow:0 3px 12px rgba(25,86,88,.045)`)}>
                <div style={css(`height:88px;position:relative;background:${l.tintBg}`)}>
                  <img src={l.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
                  <div style={css(`position:absolute;left:8px;top:8px;height:21px;padding:0 8px;border-radius:999px;background:rgba(255,255,255,.92);font-size:9.5px;font-weight:600;color:#195658;display:flex;align-items:center`)}>{l.typeLabel}</div>
                </div>
                <div style={css(`padding:10px 11px 11px`)}>
                  <div style={css(`font-size:12.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                  <div style={css(`font-size:10.5px;color:#617789;margin-top:4px`)}>{l.meta}</div>
                  <div onClick={l.onPreview} style={css(`margin-top:8px;height:30px;border-radius:10px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Xem trước`)}</div>
                  <div style={css(`margin-top:6px;display:flex;gap:6px`)}>
                    <div onClick={l.onSave} style={css(`width:30px;height:30px;flex:none;border-radius:10px;border:1px solid ${l.isSaved ? "#00aaab" : "#ddeaf0"};background:${l.isSaved ? "#eaf6f8" : "#fff"};display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill={l.isSaved ? "#00aaab" : "none"} stroke={l.isSaved ? "#00aaab" : "#617789"} strokeWidth="1.8" strokeLinejoin="round"><path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.2-7 4.2v-16a1 1 0 0 1 1-1z"/></svg></div>
                    <div onClick={l.onAdd} style={css(`flex:1;min-height:30px;padding:4px 5px;border-radius:10px;background:${l.isAdded ? "#eaf6f8" : "#00aaab"};color:${l.isAdded ? "#00708f" : "#fff"};border:${l.isAdded ? "1px solid #00aaab" : "none"};font-size:9.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:3px;cursor:pointer;text-align:center;line-height:1.15`)}>{l.isAdded ? <><svg width="10" height="8" viewBox="0 0 11 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.6L4 7.6 10 1.4"/></svg>{v.t(`Đã thêm`)}</> : v.t(`Thêm vào giáo án`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTClass && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`position:relative;padding:12px 20px 20px;background:${v.tClassTint};overflow:hidden`)}>
            <img src={v.tClassImg} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
            <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,50,52,.5) 0%,rgba(15,50,52,.35) 40%,rgba(15,50,52,.72) 100%)`)}></div>
            <div style={css(`position:relative`)}>
              <div onClick={v.toTClasses} style={css(`width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
              <div style={css(`margin-top:14px;color:#fff`)}>
                <div style={css(`font-size:21px;font-weight:700;letter-spacing:.02em`)}>{v.tClassName}</div>
                <div style={css(`font-size:12.5px;opacity:.85;margin-top:4px`)}>{v.tClassSub} · {v.tClassStudents} {v.t(`học sinh`)}</div>
                <div style={css(`margin-top:14px;display:flex;gap:9px`)}>
                  <div style={css(`height:30px;padding:0 12px;border-radius:999px;background:rgba(255,255,255,.92);color:#195658;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:6px`)}>{v.t(`Mã lớp`)} {v.tClassCode}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2.4"/><path d="M15.5 5H6a2 2 0 0 0-2 2v9.5"/></svg></div>
                  <div style={css(`height:30px;padding:0 12px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:4px`)}>{v.t(`Tiến độ`)} {v.tClassProgress}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={css(`padding:16px 20px 0`)}>
            <div className="yb-scroll" style={css(`display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px;overflow-x:auto;margin-left:-4px;margin-right:-4px`)}>
              {v.tClassTabs.map((t, i) => (
                <div key={i} onClick={t.onClick} style={css(`flex:none;height:36px;padding:0 14px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{t.label}</div>
              ))}
            </div>

            {v.tTabFeed && (
              <div style={css(`margin-top:14px`)}>
                <div style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                  <div style={css(`height:42px;border:1px solid #ddeaf0;border-radius:12px;display:flex;align-items:center;padding:0 13px;font-size:13px;color:#8ba0ae`)}>{v.t(`Nhập tiêu đề để thông báo`)}</div>
                  <div style={css(`margin-top:9px;height:66px;border:1px solid #ddeaf0;border-radius:12px;padding:11px 13px;font-size:12.5px;color:#8ba0ae`)}>{v.t(`Bạn muốn thông báo điều gì cho lớp?`)}</div>
                  <div style={css(`margin-top:11px;display:flex;justify-content:flex-end`)}><div style={css(`height:34px;padding:0 16px;border-radius:999px;background:#00aaab;color:#fff;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{v.t(`Đăng`)}</div></div>
                </div>
                <div style={css(`margin-top:11px;display:flex;flex-direction:column;gap:11px`)}>
                  {v.tNews.map((n, i) => (
                    <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                      <div style={css(`display:flex;align-items:baseline;justify-content:space-between;gap:10px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#8ba0ae;white-space:nowrap`)}>{n.when}</span></div>
                      <div style={css(`font-size:12.5px;line-height:1.6;color:#617789;margin-top:6px;text-wrap:pretty`)}>{n.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.tTabStudents && (
              <div style={css(`margin-top:14px`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <span style={css(`font-size:12.5px;color:#617789`)}>{v.tClassStudents} {v.t(`học sinh`)}</span>
                  <div style={css(`height:32px;padding:0 13px;border-radius:999px;border:1px solid #00aaab;color:#00aaab;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Thêm học sinh`)}</div>
                </div>
                <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
                  {v.tStudents.map((st, i) => (
                    <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                      <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:12.5px;font-weight:600`)}>{st.score}</div>
                      <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{st.name}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{st.meta}</div></div>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.tTabWork && (
              <div style={css(`margin-top:14px`)}>
                <div style={css(`display:flex;justify-content:flex-end`)}><div onClick={v.toTCreateAssignmentForClass} style={css(`height:32px;padding:0 14px;border-radius:999px;background:#195658;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Tạo bài tập`)}</div></div>
                <div style={css(`margin-top:11px;display:flex;flex-direction:column;gap:11px`)}>
                  {v.tClassAssignments.map((a, i) => (
                    <div key={i} onClick={a.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                      <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                      <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{v.t(`hạn`)} {a.due} · {a.submitted} {v.t(`đã nộp`)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.tTabGrading && (
              <div style={css(`margin-top:14px`)}>
                <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><span style={css(`font-size:13px;color:#617789`)}>{v.t(`Bài cần chấm trong lớp này`)}</span><span onClick={v.toTGrading} style={css(`font-size:12.5px;color:#00708f;font-weight:500;cursor:pointer`)}>{v.t(`Xem tất cả`)}</span></div>
                <div style={css(`margin-top:12px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px`)}>
                  {v.tGradeSummary.map((g, i) => (
                    <div key={i} style={css(`padding:12px 8px;border-radius:16px;background:${g.bg};text-align:center`)}><div style={css(`font-size:20px;font-weight:700;color:${g.color};line-height:1`)}>{g.value}</div><div style={css(`font-size:10px;color:#617789;margin-top:4px`)}>{g.label}</div></div>
                  ))}
                </div>
                <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
                  {v.tSubmissions.map((x, i) => (
                    <div key={i} onClick={x.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                      <div style={css(`width:36px;height:36px;flex:none;border-radius:999px;background:${x.tint};display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
                      <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{x.name}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{x.at} · {x.attempt}</div></div>
                      <div style={css(`height:24px;padding:0 10px;border-radius:999px;background:${x.statusBg};color:${x.statusTint};font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{x.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.tTabContent && (
              <div style={css(`margin-top:14px`)}>
                <div style={css(`display:flex;justify-content:flex-end`)}><div onClick={v.toTPlan} style={css(`height:32px;padding:0 14px;border-radius:999px;background:#195658;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Thêm bài học`)}</div></div>
                <div style={css(`margin-top:11px;display:flex;flex-direction:column;gap:10px`)}>
                  {v.tBlocks.map((b, i) => (
                    <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                      <div style={css(`width:6px;height:38px;flex:none;border-radius:999px;background:${b.tint}`)}></div>
                      <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{b.title}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{b.kind} · {b.dur}</div></div>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.tTabSettings && (
              <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:18px`)}>
                <div>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Thông tin lớp học`)}</div>
                  <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
                    {v.tClassInfo.map((r, i) => (
                      <div key={i} style={css(`display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #edf7f9;gap:10px`)}>
                        <span style={css(`font-size:12.5px;color:#617789;flex:none`)}>{r.label}</span>
                        <span style={css(`font-size:13px;font-weight:600;color:#195658;text-align:right`)}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={css(`margin-top:10px;padding:13px 14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`font-size:11.5px;color:#617789`)}>{v.t(`Mô tả lớp`)}</div>
                    <div style={css(`font-size:12.5px;line-height:1.6;color:#25475a;margin-top:5px;text-wrap:pretty`)}>{v.tClassDesc}</div>
                  </div>
                </div>

                <div>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Quyền tham gia lớp`)}</div>
                  <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
                    {v.tClassAccessOptions.map((o, i) => (
                      <div key={i} onClick={o.onClick} style={css(`display:flex;align-items:flex-start;gap:11px;padding:13px 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};border-radius:16px;cursor:pointer;transition:all .15s`)}>
                        <div style={css(`width:20px;height:20px;flex:none;margin-top:1px;border-radius:999px;border:${o.selected ? "6px solid #00aaab" : "1.6px solid #ddeaf0"};display:flex;align-items:center;justify-content:center`)}></div>
                        <div style={css(`flex:1;min-width:0`)}>
                          <div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{o.title}</div>
                          <div style={css(`font-size:11.5px;color:#617789;margin-top:3px;line-height:1.45;text-wrap:pretty`)}>{o.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Giáo viên phụ trách`)}</div>
                  <div style={css(`margin-top:10px;display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${v.tClassMainTeacher.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:13px`)}>{v.tClassMainTeacher.initials}</div>
                    <div style={css(`flex:1;min-width:0;font-size:13.5px;font-weight:600;color:#195658`)}>{v.tClassMainTeacher.name}</div>
                    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(`Chủ lớp`)}</div>
                  </div>

                  <div style={css(`margin-top:14px;display:flex;align-items:center;justify-content:space-between`)}>
                    <span style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Giáo viên khác`)}</span>
                    <div style={css(`height:30px;padding:0 12px;border-radius:999px;background:#195658;color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:5px;cursor:pointer`)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Thêm giáo viên`)}</div>
                  </div>
                  <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
                    {v.tClassCoTeachers.map((c, i) => (
                      <div key={i} style={css(`display:flex;align-items:center;gap:11px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                        <div style={css(`width:34px;height:34px;flex:none;border-radius:999px;background:${c.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12px`)}>{c.initials}</div>
                        <div style={css(`flex:1;min-width:0`)}>
                          <div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{c.name}</div>
                          <div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{v.t(`Giáo viên`)} · {c.addedOn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Quyền truy cập của học sinh`)}</div>
                  <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:2px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden`)}>
                    {v.tClassPermRows.map((r, i) => (
                      <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid #edf7f9`)}>
                        <div style={css(`flex:1;font-size:12.5px;color:#25475a;line-height:1.4`)}>{r.label}</div>
                        <div onClick={r.onClick} style={css(`width:44px;height:26px;flex:none;border-radius:999px;background:${r.trackBg};position:relative;transition:background .2s;cursor:pointer`)}><div style={css(`position:absolute;top:2px;left:${r.knobLeft};width:22px;height:22px;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:left .2s`)}></div></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={css(`display:flex;flex-direction:column;gap:10px`)}>
                  <div style={css(`height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}>{v.t(`Lưu cập nhật`)}</div>
                  <div style={css(`display:flex;gap:10px`)}>
                    <div onClick={v.resetClassSettings} style={css(`flex:1;height:48px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:13.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Hủy thay đổi`)}</div>
                    <div style={css(`flex:1;height:48px;border-radius:16px;border:1px solid #f3c9cd;background:#fff;color:#ad172b;font-size:13.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Xóa lớp`)}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {v.isTGrading && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div onClick={v.toTOverview} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:16px;font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Chấm bài`)}</div>
          <div style={css(`font-size:13px;color:#617789;margin-top:3px;text-wrap:pretty`)}>{v.t(`Xem bài nộp của học sinh, phản hồi và lưu điểm cuối cùng.`)}</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;height:48px;padding:0 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div><div style={css(`font-size:10.5px;color:#617789`)}>{v.t(`Lớp học`)}</div><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{v.t(`SINH HỌC 8A1`)}</div></div><svg width="11" height="7" viewBox="0 0 10 6" fill="none" stroke="#617789" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;height:48px;padding:0 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div><div style={css(`font-size:10.5px;color:#617789`)}>{v.t(`Bài tập`)}</div><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{v.t(`Bài tập tuần 20: Quang hợp`)}</div></div><svg width="11" height="7" viewBox="0 0 10 6" fill="none" stroke="#617789" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
          </div>
          <div style={css(`margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px`)}>
            {v.tGradeSummary.map((g, i) => (
              <div key={i} style={css(`padding:13px 10px;border-radius:16px;background:${g.bg};text-align:center`)}><div style={css(`font-size:22px;font-weight:700;color:${g.color};line-height:1`)}>{g.value}</div><div style={css(`font-size:10.5px;color:#617789;margin-top:5px`)}>{g.label}</div></div>
            ))}
          </div>
          <div style={css(`margin-top:18px;font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`Bài nộp`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.tSubmissions.map((x, i) => (
              <div key={i} onClick={x.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${x.tint};display:flex;align-items:center;justify-content:center`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{x.name}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{x.at} · {x.attempt}</div></div>
                <div style={css(`height:24px;padding:0 10px;border-radius:999px;background:${x.statusBg};color:${x.statusTint};font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{x.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTGrade && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div onClick={v.toTGrading} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
          <div style={css(`margin-top:16px;display:flex;align-items:center;gap:12px`)}>
            <div style={css(`width:46px;height:46px;flex:none;border-radius:999px;background:${v.subTint};display:flex;align-items:center;justify-content:center`)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinecap="round"><circle cx="12" cy="8" r="3.4"/><path d="M5 19.4c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg></div>
            <div><div style={css(`font-size:17px;font-weight:700;color:#195658`)}>{v.subName}</div><div style={css(`font-size:12px;color:#617789;margin-top:2px`)}>{v.subAt} · {v.subAttempt}</div></div>
          </div>
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Câu trả lời`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.65;color:#25475a;text-wrap:pretty`)}>{v.subAnswer}</div>
          <div style={css(`margin-top:14px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Tệp đính kèm`)}</div>
          <div style={css(`margin-top:9px;display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div style={css(`width:30px;height:30px;border-radius:9px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00708f`)}>PDF</div><div style={css(`flex:1`)}><div style={css(`font-size:12.5px;font-weight:500;color:#25475a`)}>{v.t(`so-do-quang-hop.pdf`)}</div><div style={css(`font-size:10.5px;color:#617789`)}>{v.t(`1,2 MB`)}</div></div></div>
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Điểm`)}</div>
          <div style={css(`margin-top:10px;display:flex;align-items:center;gap:12px`)}>
            <div style={css(`width:96px;height:60px;border:1.6px solid #00aaab;border-radius:16px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#00708f`)}>{v.gradeScore}</div>
            <div style={css(`flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px`)}>
              {v.scoreChips.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`height:26px;border:${c.border};background:${c.bg};color:${c.color};border-radius:999px;font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{c.label}</div>
              ))}
            </div>
          </div>
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Nhận xét`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:86px;font-size:13px;line-height:1.6;color:#25475a`)}>{v.t(`Bài làm trình bày rõ hai pha của quang hợp. Em bổ sung thêm kết luận về vai trò của quang hợp với sự sống nhé.`)}</div>
          {v.notGraded && (
            <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
              <div onClick={v.saveGrade} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Lưu điểm`)}</div>
              <div onClick={v.saveGrade} style={css(`width:118px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Trả bài`)}</div>
            </div>
          )}
          {v.graded && (
            <>
              <div style={css(`margin-top:20px;padding:16px;border:1.6px solid #22c55e;border-radius:18px;background:#f0fdf4;display:flex;align-items:center;gap:11px;animation:ybup .3s ease`)}><div style={css(`width:30px;height:30px;border-radius:999px;background:#22c55e;display:flex;align-items:center;justify-content:center`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 6.5"/></svg></div><div><div style={css(`font-size:14px;font-weight:600;color:#15803d`)}>{v.t(`Đã chấm điểm bài nộp`)}</div><div style={css(`font-size:11.5px;color:#3f7d55;margin-top:2px`)}>{v.t(`Điểm`)} {v.gradeScore} {v.t(`đã trả cho học sinh`)}</div></div></div>
              <div onClick={v.toTGrading} style={css(`margin-top:14px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Chấm bài tiếp theo`)}</div>
            </>
          )}
        </div>
      )}

      {v.isTPlans && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#195658`)}>{v.t(`Giáo án của tôi`)}</div>
          <div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>{v.t(`3 giáo án · 2 đã xuất bản`)}</div>
          <div onClick={v.toTPlan} style={css(`margin-top:14px;height:50px;border-radius:16px;background:#00aaab;color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Tạo kế hoạch mới`)}</div>
          <div style={css(`margin-top:16px;padding:16px;border-radius:20px;background:#fbf5ed;border:1px solid #eddfcc`)}>
            <div style={css(`font-size:14px;font-weight:700;color:#195658`)}>{v.t(`Kết nối YooStudio`)}</div>
            <div style={css(`font-size:12px;line-height:1.55;color:#7a6a55;margin-top:6px;text-wrap:pretty`)}>{v.t(`Tạo nội dung 3D, VR, AR chuyên sâu trên YooStudio và đưa trực tiếp vào giáo án.`)}</div>
            <div style={css(`margin-top:12px;height:36px;padding:0 14px;border-radius:999px;background:#195658;color:#fff;font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;cursor:pointer`)}>{v.t(`Trải nghiệm ngay!`)}</div>
          </div>
          <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
            {v.planTabs.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{t.label}</div>
            ))}
          </div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
            {v.tPlans.map((p, i) => (
              <div key={i} onClick={p.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;gap:10px`)}>
                  <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${p.statusBg};color:${p.statusColor};font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{p.status}</div>
                  <span style={css(`font-size:11px;color:#8ba0ae`)}>{p.used}</span>
                </div>
                <div style={css(`font-size:14px;font-weight:600;color:#195658;line-height:1.4;margin-top:9px;text-wrap:pretty`)}>{p.title}</div>
                <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{p.sub}</div>
              </div>
            ))}
            {!v.tPlans.length && (
              <div style={css(`margin-top:10px;text-align:center;font-size:13px;color:#8ba0ae`)}>{v.t(`Không có giáo án nào ở đây.`)}</div>
            )}
          </div>
        </div>
      )}

      {v.isTPlan && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
            <div onClick={v.toTPlans} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`height:34px;padding:0 14px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>{v.t(`Lưu nháp`)}</div>
          </div>
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#195658;line-height:1.32`)}>{v.tPlanTitle}</div>
          <div style={css(`margin-top:12px;display:flex;gap:9px;flex-wrap:wrap`)}>
            <div style={css(`height:28px;padding:0 12px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>{v.tPlanSub}</div>
            <div style={css(`height:28px;padding:0 12px;border-radius:999px;background:${v.tPlanStatus === "Đã xuất bản" ? "#f0fdf4" : "#fff5e6"};color:${v.tPlanStatus === "Đã xuất bản" ? "#15803d" : "#b45309"};font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>{v.tPlanStatus}</div>
          </div>
          <div style={css(`margin-top:20px;display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`Nội dung giáo án`)}</div><span style={css(`font-size:12.5px;color:#00708f`)}>{v.t(`4 mục`)}</span></div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.tBlocks.map((b, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:6px;height:38px;flex:none;border-radius:999px;background:${b.tint}`)}></div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{b.title}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{b.kind} · {b.dur}</div></div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="1.9" strokeLinecap="round"><path d="M5 8h14M5 12h14M5 16h14"/></svg>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:12px;display:flex;align-items:center;justify-content:center;gap:8px;height:50px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;color:#00708f;font-size:13.5px;font-weight:600;cursor:pointer`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>{v.t(`Thêm mục nội dung`)}</div>
          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.toTPlans} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Xuất bản giáo án`)}</div>
            <div style={css(`width:104px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Xem thử`)}</div>
          </div>
        </div>
      )}
    </>
  );
}
