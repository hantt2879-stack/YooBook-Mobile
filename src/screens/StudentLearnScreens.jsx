import { css } from "../css.js";

export default function StudentLearnScreens({ v }) {
  return (
    <>
      {v.isPlayer && (
        <div style={css(`animation:ybup .3s ease;min-height:100%;display:flex;flex-direction:column`)}>
          <div style={css(`position:relative;height:222px;background:#0f3234;flex:none`)}>
            <div style={css(`position:absolute;inset:0;background:${v.stepTint}`)}></div>
            <div style={css(`position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.2) 0 9px,transparent 9px 18px)`)}></div>
            <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,50,52,.45),rgba(15,50,52,.72))`)}></div>
            <div style={css(`position:absolute;top:12px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between`)}>
              <div onClick={v.toDetail} style={css(`width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </div>
              <div style={css(`font-size:12px;color:rgba(255,255,255,.85);font-weight:500`)}>{v.t(`Bài`)} {v.stepNum}/5</div>
              <div style={css(`width:36px;height:36px;border-radius:999px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3.5 9V3.5H9M15 3.5h5.5V9M20.5 15v5.5H15M9 20.5H3.5V15" /></svg>
              </div>
            </div>
            <div onClick={v.togglePlay} style={css(`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:999px;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.25)`)}>
              {v.playing && (
                <svg width="16" height="18" viewBox="0 0 16 18" fill="#195658"><rect x="1" y="0" width="5" height="18" rx="1.6" /><rect x="10" y="0" width="5" height="18" rx="1.6" /></svg>
              )}
              {v.notPlaying && (
                <svg width="19" height="20" viewBox="0 0 11 12" fill="#195658"><path d="M0 1.1c0-.9 1-1.4 1.7-1L10.3 5c.7.4.7 1.4 0 1.8L1.7 11.9C1 12.3 0 11.8 0 11V1.1z" /></svg>
              )}
            </div>
            <div style={css(`position:absolute;left:16px;right:16px;bottom:14px`)}>
              <div style={css(`font-family:ui-monospace,Menlo,monospace;font-size:9.5px;color:rgba(255,255,255,.8);margin-bottom:8px`)}>{v.stepSlot}</div>
              <div style={css(`height:4px;border-radius:999px;background:rgba(255,255,255,.25);overflow:hidden`)}><div style={css(`height:100%;width:${v.mediaPct};background:#00aaab;border-radius:999px;transition:width .3s`)}></div></div>
              <div style={css(`display:flex;justify-content:space-between;font-size:10.5px;color:rgba(255,255,255,.75);margin-top:6px`)}><span>{v.mediaElapsed}</span><span>{v.stepDur}</span></div>
            </div>
          </div>

          <div style={css(`padding:16px 20px 0`)}>
            <div style={css(`display:flex;gap:5px`)}>
              {v.stepDots.map((d, i) => (
                <div key={i} onClick={d.onClick} style={css(`flex:1;height:5px;border-radius:999px;background:${d.bg};cursor:pointer;transition:background .2s`)}></div>
              ))}
            </div>
            <div style={css(`margin-top:16px;display:flex;align-items:center;gap:8px`)}>
              <div style={css(`height:24px;padding:0 10px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11px;font-weight:600;display:flex;align-items:center`)}>{v.stepKind}</div>
              <div style={css(`font-size:11.5px;color:#455771`)}>{v.stepDur}</div>
            </div>
            <div style={css(`font-size:19px;font-weight:700;color:#455771;line-height:1.32;margin-top:9px;text-wrap:pretty`)}>{v.stepTitle}</div>
            <div style={css(`font-size:13.5px;line-height:1.7;color:#455771;margin-top:10px;text-wrap:pretty`)}>{v.stepBody}</div>

            {v.stepHasQuiz && (
              <div style={css(`margin-top:16px;padding:16px;border:1px solid #ddeaf0;border-radius:20px;background:#fff`)}>
                <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4`)}>{v.t(`Bào quan nào thực hiện quá trình quang hợp?`)}</div>
                <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:9px`)}>
                  {v.quickOptions.map((o, i) => (
                    <div key={i} onClick={o.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:12px 13px;border:${o.border};background:${o.bg};border-radius:14px;cursor:pointer;transition:all .15s`)}>
                      <div style={css(`width:24px;height:24px;flex:none;border-radius:999px;border:${o.dotBorder};background:${o.dotBg};display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600;color:${o.dotColor}`)}>{o.letter}</div>
                      <span style={css(`font-size:13.5px;color:${o.color};font-weight:${o.weight}`)}>{o.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {v.stepHasNotes && (
              <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
                {v.stepPoints.map((p, i) => (
                  <div key={i} style={css(`display:flex;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`width:8px;height:8px;flex:none;border-radius:999px;background:#00aaab;margin-top:6px`)}></div>
                    <div><div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{p.title}</div><div style={css(`font-size:12.5px;line-height:1.6;color:#455771;margin-top:3px;text-wrap:pretty`)}>{p.text}</div></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={css(`height:110px;flex:none`)}></div>
          <div style={css(`position:absolute;left:0;right:0;bottom:0;padding:12px 20px 22px;background:rgba(252,252,252,.94);backdrop-filter:blur(12px);border-top:1px solid #ddeaf0;display:flex;align-items:center;gap:11px;z-index:25`)}>
            <div onClick={v.prevStep} style={css(`width:52px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
            </div>
            <div onClick={v.nextStep} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>
              {v.nextLabel}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7" /></svg>
            </div>
          </div>
        </div>
      )}

      {v.isComplete && (
        <div style={css(`min-height:100%;padding:24px 24px 40px;display:flex;flex-direction:column;align-items:center;background:linear-gradient(180deg,#eaf6f8,#fcfcfc 45%);animation:ybup .35s ease`)}>
          <div style={css(`margin-top:26px;width:104px;height:104px;border-radius:999px;background:#00aaab;display:flex;align-items:center;justify-content:center;box-shadow:0 16px 40px rgba(0,170,171,.32);animation:ybpop .5s cubic-bezier(.34,1.4,.5,1)`)}>
            <svg width="46" height="38" viewBox="0 0 46 38" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5L17 32 42 5" /></svg>
          </div>
          <div style={css(`margin-top:22px;font-size:24px;font-weight:700;color:#455771;text-align:center`)}>{v.t(`Hoàn thành bài học!`)}</div>
          <div style={css(`margin-top:8px;font-size:14px;color:#455771;text-align:center;max-width:290px;text-wrap:pretty`)}>{v.t(`Bạn đã hoàn thành “Cấu tạo tế bào thực vật”. Tiếp tục giữ chuỗi ngày học của mình nhé.`)}</div>
          <div style={css(`margin-top:24px;width:100%;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px`)}>
            {v.completeStats.map((s, i) => (
              <div key={i} style={css(`border:1px solid #ddeaf0;border-radius:18px;background:#fff;padding:14px 10px;text-align:center`)}>
                <div style={css(`font-size:22px;font-weight:700;color:#00708f;line-height:1`)}>{s.value}</div>
                <div style={css(`font-size:11px;color:#455771;margin-top:5px`)}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:16px;width:100%;padding:16px;border:1px solid #ddeaf0;border-radius:20px;background:#fff`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <span style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Điểm học tập nhận được`)}</span>
              <div style={css(`display:flex;align-items:center;gap:5px`)}><img src="/assets/learning-points.svg" alt="" style={css(`width:17px;height:17px`)} /><span style={css(`font-size:17px;font-weight:700;color:#00aaab`)}>+45</span></div>
            </div>
            <div style={css(`margin-top:12px;height:7px;border-radius:999px;background:#edf7f9;overflow:hidden`)}><div style={css(`height:100%;width:72%;border-radius:999px;background:linear-gradient(90deg,#00aaab,#138cd2)`)}></div></div>
            <div style={css(`margin-top:8px;font-size:11.5px;color:#455771`)}>{v.t(`Còn 155 điểm để đạt cấp Nhà khám phá`)}</div>
          </div>
          <div onClick={v.toExam} style={css(`margin-top:20px;width:100%;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Làm bài kiểm tra`)}</div>
          <div onClick={v.toHome} style={css(`margin-top:12px;width:100%;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Về trang chủ`)}</div>
        </div>
      )}

      {v.isExam && (
        <div style={css(`min-height:100%;display:flex;flex-direction:column;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 14px;border-bottom:1px solid #ddeaf0`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div onClick={v.toHome} style={css(`width:36px;height:36px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </div>
              <div style={css(`display:flex;align-items:center;gap:6px;height:34px;padding:0 13px;border-radius:999px;background:#fff5e6;border:1px solid #fbe0b3`)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5.3l3.4 2" /></svg>
                <span style={css(`font-size:13.5px;font-weight:700;color:#b45309;font-variant-numeric:tabular-nums`)}>{v.examClock}</span>
              </div>
              <div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.examPos}</div>
            </div>
            <div style={css(`margin-top:14px;display:flex;gap:5px`)}>
              {v.examDots.map((d, i) => (
                <div key={i} style={css(`flex:1;height:5px;border-radius:999px;background:${d.bg};transition:background .2s`)}></div>
              ))}
            </div>
          </div>
          <div style={css(`padding:20px 20px 0;flex:1`)}>
            <div style={css(`font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.t(`Trắc nghiệm · 1 đáp án`)}</div>
            <div style={css(`font-size:18.5px;font-weight:600;color:#455771;line-height:1.45;margin-top:9px;text-wrap:pretty`)}>{v.examQuestion}</div>
            <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:11px`)}>
              {v.examOptions.map((o, i) => (
                <div key={i} onClick={o.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:15px 14px;border:${o.border};background:${o.bg};border-radius:16px;cursor:pointer;transition:all .15s`)}>
                  <div style={css(`width:28px;height:28px;flex:none;border-radius:999px;border:${o.dotBorder};background:${o.dotBg};display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:600;color:${o.dotColor}`)}>{o.letter}</div>
                  <span style={css(`flex:1;font-size:14px;line-height:1.45;color:${o.color};font-weight:${o.weight}`)}>{o.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={css(`padding:16px 20px 26px;display:flex;gap:11px`)}>
            <div onClick={v.prevQ} style={css(`width:52px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
            </div>
            <div onClick={v.nextQ} style={css(`flex:1;height:52px;border-radius:16px;background:${v.examNextBg};color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.examNextLabel}</div>
          </div>
        </div>
      )}

      {v.isExamResult && (
        <div style={css(`min-height:100%;padding:20px 24px 40px;animation:ybup .35s ease`)}>
          <div style={css(`display:flex;flex-direction:column;align-items:center;margin-top:14px`)}>
            <div style={css(`position:relative;width:150px;height:150px`)}>
              <svg width="150" height="150" viewBox="0 0 150 150" style={css(`transform:rotate(-90deg)`)}>
                <circle cx="75" cy="75" r="64" fill="none" stroke="#edf7f9" strokeWidth="14" />
                <circle cx="75" cy="75" r="64" fill="none" stroke="#00aaab" strokeWidth="14" strokeLinecap="round" strokeDasharray="402" strokeDashoffset={v.scoreOffset} style={css(`transition:stroke-dashoffset .8s ease`)} />
              </svg>
              <div style={css(`position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center`)}>
                <div style={css(`font-size:38px;font-weight:700;color:#455771;line-height:1`)}>{v.scoreText}</div>
                <div style={css(`font-size:12px;color:#455771;margin-top:2px`)}>{v.t(`điểm`)}</div>
              </div>
            </div>
            <div style={css(`margin-top:18px;font-size:21px;font-weight:700;color:#455771`)}>{v.scoreTitle}</div>
            <div style={css(`margin-top:6px;font-size:13.5px;color:#455771;text-align:center;max-width:280px;text-wrap:pretty`)}>{v.scoreSub}</div>
          </div>
          <div style={css(`margin-top:22px;display:flex;flex-direction:column;gap:10px`)}>
            {v.examReview.map((q, i) => (
              <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;display:flex;gap:12px`)}>
                <div style={css(`width:26px;height:26px;flex:none;border-radius:999px;background:${q.markBg};display:flex;align-items:center;justify-content:center`)}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d={q.markPath} /></svg>
                </div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13px;font-weight:600;color:#455771;line-height:1.4;text-wrap:pretty`)}>{q.text}</div>
                  <div style={css(`font-size:11.5px;color:${q.ansColor};margin-top:4px`)}>{q.ansLabel}</div>
                </div>
              </div>
            ))}
          </div>
          <div onClick={v.restartExam} style={css(`margin-top:22px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>{v.t(`Làm lại bài kiểm tra`)}</div>
          <div onClick={v.toLibrary} style={css(`margin-top:12px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:15px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Về thư viện của tôi`)}</div>
        </div>
      )}
    </>
  );
}
