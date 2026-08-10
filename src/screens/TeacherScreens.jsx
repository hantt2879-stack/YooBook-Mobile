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
                <div><div style={css(`font-size:12px;color:#617789`)}>Giáo viên</div><div style={css(`font-size:15.5px;font-weight:600;color:#195658`)}>{v.teacherName}</div></div>
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
          <div style={css(`padding:4px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>Lớp học của tôi</div><span onClick={v.toTClasses} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>Xem thêm</span></div>
            <div className="yb-scroll" style={css(`margin-top:12px;display:flex;gap:12px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 8px`)}>
              {v.tClasses.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`flex:none;width:212px;border-radius:20px;overflow:hidden;border:1px solid #ddeaf0;background:#fff;cursor:pointer`)}>
                  <div style={css(`height:78px;position:relative;background:${c.tintBg}`)}><div style={css(`position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.2) 0 8px,transparent 8px 16px)`)}></div><div style={css(`position:absolute;left:12px;bottom:10px;color:#fff;font-size:14px;font-weight:700;letter-spacing:.02em`)}>{c.name}</div></div>
                  <div style={css(`padding:12px 13px 13px`)}>
                    <div style={css(`font-size:11.5px;color:#617789`)}>{c.sub} · {c.students} học sinh</div>
                    <div style={css(`margin-top:10px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${c.progress};border-radius:999px;background:#00aaab`)}></div></div>
                    <div style={css(`font-size:11px;color:#617789;margin-top:6px`)}>Tiến độ {c.progress} · mã {c.code}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={css(`padding:18px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>Bài cần chấm</div><span onClick={v.toTGrading} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>Chấm bài</span></div>
            <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:11px`)}>
              {v.tAssignments.map((a, i) => (
                <div key={i} onClick={a.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                  <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{a.cls} · hạn {a.due}</div>
                  <div style={css(`margin-top:10px;display:flex;align-items:center;gap:9px`)}>
                    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:10.5px;font-weight:600;display:flex;align-items:center;gap:4px`)}>{a.submitted} đã nộp</div>
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
          <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#195658`)}>Lớp học của tôi</div><div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>4 lớp đang hoạt động · 128 học sinh</div></div>
            <div style={css(`width:38px;height:38px;border-radius:999px;background:#00aaab;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 16px rgba(0,170,171,.3)`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></div>
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:12px`)}>
            {v.tClasses.map((c, i) => (
              <div key={i} onClick={c.onClick} style={css(`display:flex;gap:13px;padding:13px;border:1px solid #ddeaf0;border-radius:20px;background:#fff;cursor:pointer`)}>
                <div style={css(`width:62px;height:62px;flex:none;border-radius:16px;position:relative;overflow:hidden;background:${c.tintBg}`)}><div style={css(`position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.24) 0 7px,transparent 7px 14px)`)}></div></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:14px;font-weight:700;color:#195658;letter-spacing:.02em`)}>{c.name}</div>
                  <div style={css(`font-size:11.5px;color:#617789;margin-top:3px`)}>{c.sub} · {c.students} học sinh</div>
                  <div style={css(`margin-top:9px;display:flex;align-items:center;gap:8px`)}>
                    <div style={css(`flex:1;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:${c.progress};border-radius:999px;background:#00aaab`)}></div></div>
                    <span style={css(`font-size:11px;font-weight:600;color:#00708f`)}>{c.progress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTClass && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`position:relative;padding:12px 20px 20px;background:${v.tClassTint}`)}>
            <div style={css(`position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.18) 0 9px,transparent 9px 18px)`)}></div>
            <div style={css(`position:relative`)}>
              <div onClick={v.toTClasses} style={css(`width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
              <div style={css(`margin-top:14px;color:#fff`)}>
                <div style={css(`font-size:21px;font-weight:700;letter-spacing:.02em`)}>{v.tClassName}</div>
                <div style={css(`font-size:12.5px;opacity:.85;margin-top:4px`)}>{v.tClassSub} · {v.tClassStudents} học sinh</div>
                <div style={css(`margin-top:14px;display:flex;gap:9px`)}>
                  <div style={css(`height:30px;padding:0 12px;border-radius:999px;background:rgba(255,255,255,.92);color:#195658;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:6px`)}>Mã lớp {v.tClassCode}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="8" y="8" width="12" height="12" rx="2.4"/><path d="M15.5 5H6a2 2 0 0 0-2 2v9.5"/></svg></div>
                  <div style={css(`height:30px;padding:0 12px;border-radius:999px;background:rgba(255,255,255,.18);color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;gap:4px`)}>Tiến độ {v.tClassProgress}</div>
                </div>
              </div>
            </div>
          </div>
          <div style={css(`padding:16px 20px 0`)}>
            <div style={css(`display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
              {v.tClassTabs.map((t, i) => (
                <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:12.5px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{t.label}</div>
              ))}
            </div>
            {v.tTabStudents && (
              <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
                {v.tStudents.map((st, i) => (
                  <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:12.5px;font-weight:600`)}>{st.score}</div>
                    <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{st.name}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{st.meta}</div></div>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                  </div>
                ))}
              </div>
            )}
            {v.tTabWork && (
              <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
                {v.tAssignments.map((a, i) => (
                  <div key={i} onClick={a.onClick} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                    <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.4;text-wrap:pretty`)}>{a.title}</div>
                    <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>hạn {a.due} · {a.submitted} đã nộp</div>
                  </div>
                ))}
              </div>
            )}
            {v.tTabNews && (
              <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:11px`)}>
                {v.tNews.map((n, i) => (
                  <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                    <div style={css(`display:flex;align-items:baseline;justify-content:space-between;gap:10px`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{n.title}</div><span style={css(`font-size:10.5px;color:#8ba0ae;white-space:nowrap`)}>{n.when}</span></div>
                    <div style={css(`font-size:12.5px;line-height:1.6;color:#617789;margin-top:6px;text-wrap:pretty`)}>{n.body}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {v.isTGrading && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`font-size:22px;font-weight:700;color:#195658`)}>Chấm bài</div>
          <div style={css(`font-size:13px;color:#617789;margin-top:3px;text-wrap:pretty`)}>Xem bài nộp của học sinh, phản hồi và lưu điểm cuối cùng.</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;height:48px;padding:0 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div><div style={css(`font-size:10.5px;color:#617789`)}>Lớp học</div><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>SINH HỌC 8A1</div></div><svg width="11" height="7" viewBox="0 0 10 6" fill="none" stroke="#617789" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;height:48px;padding:0 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div><div style={css(`font-size:10.5px;color:#617789`)}>Bài tập</div><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>Bài tập tuần 20: Quang hợp</div></div><svg width="11" height="7" viewBox="0 0 10 6" fill="none" stroke="#617789" strokeWidth="1.6"><path d="M1 1l4 4 4-4"/></svg></div>
          </div>
          <div style={css(`margin-top:14px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px`)}>
            {v.tGradeSummary.map((g, i) => (
              <div key={i} style={css(`padding:13px 10px;border-radius:16px;background:${g.bg};text-align:center`)}><div style={css(`font-size:22px;font-weight:700;color:${g.color};line-height:1`)}>{g.value}</div><div style={css(`font-size:10.5px;color:#617789;margin-top:5px`)}>{g.label}</div></div>
            ))}
          </div>
          <div style={css(`margin-top:18px;font-size:14.5px;font-weight:600;color:#195658`)}>Bài nộp</div>
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
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>Câu trả lời</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.65;color:#25475a;text-wrap:pretty`)}>{v.subAnswer}</div>
          <div style={css(`margin-top:14px;font-size:13.5px;font-weight:600;color:#195658`)}>Tệp đính kèm</div>
          <div style={css(`margin-top:9px;display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><div style={css(`width:30px;height:30px;border-radius:9px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00708f`)}>PDF</div><div style={css(`flex:1`)}><div style={css(`font-size:12.5px;font-weight:500;color:#25475a`)}>so-do-quang-hop.pdf</div><div style={css(`font-size:10.5px;color:#617789`)}>1,2 MB</div></div></div>
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>Điểm</div>
          <div style={css(`margin-top:10px;display:flex;align-items:center;gap:12px`)}>
            <div style={css(`width:96px;height:60px;border:1.6px solid #00aaab;border-radius:16px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:700;color:#00708f`)}>{v.gradeScore}</div>
            <div style={css(`flex:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:7px`)}>
              {v.scoreChips.map((c, i) => (
                <div key={i} onClick={c.onClick} style={css(`height:26px;border:${c.border};background:${c.bg};color:${c.color};border-radius:999px;font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{c.label}</div>
              ))}
            </div>
          </div>
          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#195658`)}>Nhận xét</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:86px;font-size:13px;line-height:1.6;color:#25475a`)}>Bài làm trình bày rõ hai pha của quang hợp. Em bổ sung thêm kết luận về vai trò của quang hợp với sự sống nhé.</div>
          {v.notGraded && (
            <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
              <div onClick={v.saveGrade} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>Lưu điểm</div>
              <div onClick={v.saveGrade} style={css(`width:118px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>Trả bài</div>
            </div>
          )}
          {v.graded && (
            <>
              <div style={css(`margin-top:20px;padding:16px;border:1.6px solid #22c55e;border-radius:18px;background:#f0fdf4;display:flex;align-items:center;gap:11px;animation:ybup .3s ease`)}><div style={css(`width:30px;height:30px;border-radius:999px;background:#22c55e;display:flex;align-items:center;justify-content:center`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 6.5"/></svg></div><div><div style={css(`font-size:14px;font-weight:600;color:#15803d`)}>Đã chấm điểm bài nộp</div><div style={css(`font-size:11.5px;color:#3f7d55;margin-top:2px`)}>Điểm {v.gradeScore} đã trả cho học sinh</div></div></div>
              <div onClick={v.toTGrading} style={css(`margin-top:14px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>Chấm bài tiếp theo</div>
            </>
          )}
        </div>
      )}

      {v.isTPlans && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:flex-start;justify-content:space-between`)}>
            <div><div style={css(`font-size:22px;font-weight:700;color:#195658`)}>Giáo án của tôi</div><div style={css(`font-size:13px;color:#617789;margin-top:3px`)}>3 giáo án · 2 đã xuất bản</div></div>
            <div onClick={v.toTPlan} style={css(`width:38px;height:38px;border-radius:999px;background:#00aaab;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 16px rgba(0,170,171,.3)`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg></div>
          </div>
          <div style={css(`margin-top:16px;padding:16px;border-radius:20px;background:#fbf5ed;border:1px solid #eddfcc`)}>
            <div style={css(`font-size:14px;font-weight:700;color:#195658`)}>Kết nối YooStudio</div>
            <div style={css(`font-size:12px;line-height:1.55;color:#7a6a55;margin-top:6px;text-wrap:pretty`)}>Tạo nội dung 3D, VR, AR chuyên sâu trên YooStudio và đưa trực tiếp vào giáo án.</div>
            <div style={css(`margin-top:12px;height:36px;padding:0 14px;border-radius:999px;background:#195658;color:#fff;font-size:12.5px;font-weight:600;display:inline-flex;align-items:center;cursor:pointer`)}>Trải nghiệm ngay!</div>
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:11px`)}>
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
          </div>
        </div>
      )}

      {v.isTPlan && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
            <div onClick={v.toTPlans} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`height:34px;padding:0 14px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:12.5px;font-weight:600;display:flex;align-items:center;cursor:pointer`)}>Lưu nháp</div>
          </div>
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#195658;line-height:1.32`)}>Cấu tạo tế bào thực vật</div>
          <div style={css(`margin-top:12px;display:flex;gap:9px;flex-wrap:wrap`)}>
            <div style={css(`height:28px;padding:0 12px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>Sinh học</div>
            <div style={css(`height:28px;padding:0 12px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>Lớp 6</div>
            <div style={css(`height:28px;padding:0 12px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>Kết nối tri thức</div>
          </div>
          <div style={css(`margin-top:20px;display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:14.5px;font-weight:600;color:#195658`)}>Nội dung giáo án</div><span style={css(`font-size:12.5px;color:#00708f`)}>4 mục</span></div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.tBlocks.map((b, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:6px;height:38px;flex:none;border-radius:999px;background:${b.tint}`)}></div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{b.title}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{b.kind} · {b.dur}</div></div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="1.9" strokeLinecap="round"><path d="M5 8h14M5 12h14M5 16h14"/></svg>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:12px;display:flex;align-items:center;justify-content:center;gap:8px;height:50px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;color:#00708f;font-size:13.5px;font-weight:600;cursor:pointer`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>Thêm mục nội dung</div>
          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.toTPlans} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>Xuất bản giáo án</div>
            <div style={css(`width:104px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>Xem thử</div>
          </div>
        </div>
      )}
    </>
  );
}
