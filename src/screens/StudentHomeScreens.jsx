import { css } from "../css.js";

export default function StudentHomeScreens({ v }) {
  return (
    <>
      {v.isHome && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:6px 20px 20px;background:linear-gradient(180deg,#eaf6f8 0%,#fcfcfc 100%)`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
              <div style={css(`display:flex;align-items:center;gap:11px`)}>
                <div style={css(`width:44px;height:44px;border-radius:999px;background:linear-gradient(135deg,#00aaab,#00708f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:15px`)}>HN</div>
                <div><div style={css(`font-size:12px;color:#617789`)}>{v.t(`Chào buổi sáng`)}</div><div style={css(`font-size:15.5px;font-weight:600;color:#195658`)}>{v.userName}</div></div>
              </div>
              <div style={css(`display:flex;align-items:center;gap:9px`)}>
                <div style={css(`display:flex;align-items:center;gap:5px;height:34px;padding:0 11px;border-radius:999px;background:#fff;border:1px solid #ddeaf0`)}><img src="/assets/learning-points.svg" alt="" style={css(`width:16px;height:16px`)}/><span style={css(`font-size:13px;font-weight:600;color:#195658`)}>1.240</span></div>
                <div onClick={v.toNoti} style={css(`position:relative;width:34px;height:34px;border-radius:999px;background:#fff;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#25475a" strokeWidth="1.7" strokeLinecap="round"><path d="M18 8.4a6 6 0 0 0-12 0c0 6-2.4 7.6-2.4 7.6h16.8S18 14.4 18 8.4z"/><path d="M13.7 19.6a2 2 0 0 1-3.4 0"/></svg><div style={css(`position:absolute;top:5px;right:6px;width:7px;height:7px;border-radius:999px;background:#ef5da8;border:1.5px solid #fff`)}></div></div>
              </div>
            </div>

            <div style={css(`margin-top:18px;background:#195658;border-radius:24px;padding:18px;color:#fff;position:relative;overflow:hidden`)}>
              <div style={css(`position:absolute;right:-30px;top:-30px;width:130px;height:130px;border-radius:999px;background:rgba(0,170,171,.35)`)}></div>
              <div style={css(`position:relative`)}>
                <div style={css(`font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;opacity:.7`)}>{v.t(`Đang học`)}</div>
                <div style={css(`font-size:17px;font-weight:600;margin-top:5px;line-height:1.35`)}>{v.t(`Cấu tạo tế bào thực vật`)}</div>
                <div style={css(`font-size:12px;opacity:.75;margin-top:3px`)}>{v.t(`Sinh học · Lớp 6 · Bài 3/5`)}</div>
                <div style={css(`margin-top:14px;height:6px;border-radius:999px;background:rgba(255,255,255,.2);overflow:hidden`)}><div style={css(`height:100%;width:${v.resumePct};border-radius:999px;background:#00aaab`)}></div></div>
                <div style={css(`margin-top:14px;display:flex;align-items:center;justify-content:space-between`)}>
                  <span style={css(`font-size:12.5px;opacity:.8`)}>{v.resumePct} {v.t(`hoàn thành`)}</span>
                  <div onClick={v.toPlayer} style={css(`height:38px;padding:0 18px;border-radius:999px;background:#fff;color:#195658;font-size:13.5px;font-weight:600;display:flex;align-items:center;gap:7px;cursor:pointer`)}><svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor"><path d="M0 1.1c0-.9 1-1.4 1.7-1L10.3 5c.7.4.7 1.4 0 1.8L1.7 11.9C1 12.3 0 11.8 0 11V1.1z"/></svg>{v.t(`Học tiếp`)}</div>
                </div>
              </div>
            </div>
          </div>

          <div style={css(`padding:4px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{v.t(`Môn học`)}</div><span onClick={v.toExplore} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>{v.t(`Xem thêm`)}</span></div>
            <div className="yb-scroll" style={css(`margin-top:12px;display:flex;gap:10px;overflow-x:auto;padding-bottom:14px;margin-left:-20px;margin-right:-20px;padding-left:20px;padding-right:20px`)}>
              {v.categories.map((c, i) => (
                <div key={i} onClick={v.toExplore} style={css(`flex:none;width:78px;display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer`)}>
                  <div style={css(`width:64px;height:64px;border-radius:20px;background:#eaf6f8;border:1px solid #ddeaf0;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:32px;height:32px;background-image:url(${c.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                  <span style={css(`font-size:11.5px;color:#25475a;text-align:center;line-height:1.25`)}>{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={css(`padding:22px 20px 0`)}>
            <div style={css(`display:flex;align-items:baseline;justify-content:space-between`)}><div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{v.t(`Đề xuất cho bạn`)}</div><span onClick={v.toExplore} style={css(`font-size:13px;color:#00708f;cursor:pointer`)}>{v.t(`Xem thêm`)}</span></div>
            <div className="yb-scroll" style={css(`margin-top:12px;display:flex;gap:14px;overflow-x:auto;padding-bottom:6px;margin-left:-20px;margin-right:-20px;padding-left:20px;padding-right:20px`)}>
              {v.featured.map((l, i) => (
                <div key={i} onClick={l.onClick} style={css(`flex:none;width:236px;border:1px solid #ddeaf0;border-radius:22px;background:#fff;overflow:hidden;cursor:pointer;box-shadow:0 4px 14px rgba(25,86,88,.05)`)}>
                  <div style={css(`height:126px;position:relative;background:${l.tintBg}`)}>
                    <img src={l.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
                    <div style={css(`position:absolute;left:10px;top:10px;height:24px;padding:0 10px;border-radius:999px;background:rgba(255,255,255,.92);font-size:10.5px;font-weight:600;color:#195658;display:flex;align-items:center`)}>{l.typeLabel}</div>
                  </div>
                  <div style={css(`padding:12px 14px 14px`)}>
                    <div style={css(`font-size:14.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{l.title}</div>
                    <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{l.meta}</div>
                    <div style={css(`margin-top:10px;display:flex;align-items:center;justify-content:space-between`)}>
                      <div style={css(`display:flex;align-items:center;gap:4px`)}><img src="/assets/lesson/star.svg" alt="" style={css(`width:13px;height:13px`)}/><span style={css(`font-size:12px;font-weight:600;color:#25475a`)}>{l.rating}</span><span style={css(`font-size:11.5px;color:#617789`)}>({l.reviews})</span></div>
                      <div style={css(`display:flex;align-items:center;gap:4px`)}><img src="/assets/lesson/token.svg" alt="" style={css(`width:14px;height:14px`)}/><span style={css(`font-size:13px;font-weight:700;color:#00708f`)}>{l.price}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={css(`padding:22px 20px 0`)}>
            <div style={css(`font-size:16px;font-weight:600;color:#195658`)}>{v.t(`Tuần này của bạn`)}</div>
            <div style={css(`margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:12px`)}>
              {v.stats.map((s, i) => (
                <div key={i} onClick={s.onClick} className="yb-press" style={css(`border:1px solid #ddeaf0;border-radius:20px;background:#fff;padding:14px;cursor:pointer;transition:all .15s`)}>
                  <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
                    <div style={css(`width:36px;height:36px;border-radius:12px;background:${s.bg};display:flex;align-items:center;justify-content:center`)}><div style={css(`width:20px;height:20px;background-image:url(${s.icon});background-size:contain;background-position:center;background-repeat:no-repeat`)}></div></div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c3d3da" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                  </div>
                  <div style={css(`font-size:24px;font-weight:700;color:#195658;margin-top:10px;line-height:1`)}>{s.value}</div>
                  <div style={css(`font-size:12px;color:#617789;margin-top:4px`)}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {v.isExplore && (
        <div style={css(`padding-bottom:120px;animation:ybup .3s ease`)}>
          <div style={css(`position:sticky;top:0;z-index:20;background:#fcfcfc;padding:6px 20px 12px;border-bottom:1px solid #ddeaf0`)}>
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
              <div onClick={v.toggleView} style={css(`display:flex;height:32px;border:1px solid #ddeaf0;border-radius:999px;background:#fff;overflow:hidden;cursor:pointer`)}>
                <div style={css(`width:32px;display:flex;align-items:center;justify-content:center;background:${v.gridBg}`)}><svg width="14" height="14" viewBox="0 0 24 24" fill={v.gridFg}><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="8" rx="2"/><rect x="3" y="13" width="8" height="8" rx="2"/><rect x="13" y="13" width="8" height="8" rx="2"/></svg></div>
                <div style={css(`width:32px;display:flex;align-items:center;justify-content:center;background:${v.listBg}`)}><svg width="14" height="14" viewBox="0 0 24 24" fill={v.listFg}><rect x="3" y="4" width="18" height="4" rx="2"/><rect x="3" y="10" width="18" height="4" rx="2"/><rect x="3" y="16" width="18" height="4" rx="2"/></svg></div>
              </div>
            </div>
          </div>

          {!v.lessons.length && (
            <div style={css(`margin:32px 20px 0;padding:28px 20px;border:1.4px dashed #ddeaf0;border-radius:20px;background:#f8fcfd;text-align:center`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{v.t(`Chưa có học liệu phù hợp`)}</div>
              <div style={css(`font-size:12px;color:#617789;margin-top:5px;line-height:1.5`)}>{v.t(`Thử chọn một chủ đề khác hoặc chọn lại "Tất cả".`)}</div>
            </div>
          )}
          <div style={css(`padding:14px 20px 0;display:grid;grid-template-columns:${v.gridCols};gap:14px`)}>
            {v.lessons.map((l, i) => (
              <div key={i} style={css(`border:1px solid #ddeaf0;border-radius:20px;background:#fff;overflow:hidden;display:flex;flex-direction:${v.cardDir};box-shadow:0 3px 12px rgba(25,86,88,.045)`)}>
                <div onClick={l.onView} style={css(`position:relative;background:${l.tintBg};height:${v.mediaH};width:${v.mediaW};flex:none;cursor:pointer`)}>
                  <img src={l.img} alt="" style={css(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover`)}/>
                  <div style={css(`position:absolute;left:8px;top:8px;height:21px;padding:0 8px;border-radius:999px;background:rgba(255,255,255,.92);font-size:9.5px;font-weight:600;color:#195658;display:flex;align-items:center`)}>{l.typeLabel}</div>
                </div>
                <div style={css(`padding:11px 12px 12px;flex:1;min-width:0`)}>
                  <div onClick={l.onView} style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty;cursor:pointer`)}>{l.title}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:4px`)}>{l.meta}</div>
                  <div style={css(`margin-top:9px;display:flex;align-items:center;justify-content:space-between`)}>
                    <div style={css(`display:flex;align-items:center;gap:3px`)}><img src="/assets/lesson/star.svg" alt="" style={css(`width:12px;height:12px`)}/><span style={css(`font-size:11.5px;font-weight:600`)}>{l.rating}</span></div>
                    <div style={css(`display:flex;align-items:center;gap:3px`)}><img src="/assets/lesson/token.svg" alt="" style={css(`width:13px;height:13px`)}/><span style={css(`font-size:12.5px;font-weight:700;color:#00708f`)}>{l.price}</span></div>
                  </div>
                  <div onClick={l.onView} style={css(`margin-top:9px;height:30px;border-radius:10px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Xem`)}</div>
                  <div style={css(`margin-top:6px;display:flex;gap:6px`)}>
                    <div onClick={l.onSave} style={css(`width:30px;height:30px;flex:none;border-radius:10px;border:1px solid ${l.isSaved ? "#00aaab" : "#ddeaf0"};background:${l.isSaved ? "#eaf6f8" : "#fff"};display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill={l.isSaved ? "#00aaab" : "none"} stroke={l.isSaved ? "#00aaab" : "#617789"} strokeWidth="1.8" strokeLinejoin="round"><path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.2-7 4.2v-16a1 1 0 0 1 1-1z"/></svg></div>
                    <div onClick={l.onLearnNow} style={css(`flex:1;min-height:30px;padding:4px 5px;border-radius:10px;background:#00aaab;color:#fff;font-size:10.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Học ngay`)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isDetail && (
        <>
          <div style={css(`padding-bottom:110px;animation:ybup .3s ease`)}>
            <div style={css(`position:relative;height:236px;background:linear-gradient(135deg,#00aaab,#00708f)`)}>
              <div style={css(`position:absolute;inset:0;background-image:repeating-linear-gradient(135deg,rgba(255,255,255,.22) 0 10px,transparent 10px 20px)`)}></div>
              <div style={css(`position:absolute;inset:0;background:linear-gradient(180deg,rgba(25,86,88,.35),rgba(25,86,88,.75))`)}></div>
              <div style={css(`position:absolute;top:12px;left:16px;right:16px;display:flex;justify-content:space-between`)}>
                <div onClick={v.back} style={css(`width:38px;height:38px;border-radius:999px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
                <div style={css(`display:flex;gap:9px`)}>
                  <div onClick={v.toggleSave} style={css(`width:38px;height:38px;border-radius:999px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill={v.savedFill} stroke="#195658" strokeWidth="1.8" strokeLinejoin="round"><path d="M6 3.5h12a1 1 0 0 1 1 1v16l-7-4.2-7 4.2v-16a1 1 0 0 1 1-1z"/></svg></div>
                  <div style={css(`width:38px;height:38px;border-radius:999px;background:rgba(255,255,255,.9);display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5.5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="18.5" r="2.6"/><path d="M8.4 10.7l7.2-3.9M8.4 13.3l7.2 3.9"/></svg></div>
                </div>
              </div>
              <div onClick={v.toPlayer} style={css(`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:999px;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 26px rgba(0,0,0,.22)`)}><svg width="20" height="22" viewBox="0 0 11 12" fill="#195658"><path d="M0 1.1c0-.9 1-1.4 1.7-1L10.3 5c.7.4.7 1.4 0 1.8L1.7 11.9C1 12.3 0 11.8 0 11V1.1z"/></svg></div>
              <div style={css(`position:absolute;left:16px;bottom:12px;font-family:ui-monospace,Menlo,monospace;font-size:10px;color:rgba(255,255,255,.85)`)}>{v.t(`[ mô hình 3D tế bào thực vật · xem thử 60s ]`)}</div>
            </div>

            <div style={css(`padding:18px 20px 0`)}>
              <div style={css(`display:flex;gap:7px;flex-wrap:wrap`)}>
                <div style={css(`height:26px;padding:0 11px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Bài giảng mẫu`)}</div>
                <div style={css(`height:26px;padding:0 11px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Sinh học`)}</div>
                <div style={css(`height:26px;padding:0 11px;border-radius:999px;background:#eaf6f8;color:#00708f;font-size:11.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Lớp 6`)}</div>
              </div>
              <div style={css(`font-size:21px;font-weight:700;color:#195658;line-height:1.3;margin-top:12px;text-wrap:pretty`)}>{v.t(`Cấu tạo tế bào thực vật`)}</div>
              <div style={css(`margin-top:10px;display:flex;align-items:center;gap:14px;font-size:12.5px;color:#617789`)}>
                <div style={css(`display:flex;align-items:center;gap:4px`)}><img src="/assets/lesson/star.svg" alt="" style={css(`width:14px;height:14px`)}/><span style={css(`font-weight:600;color:#25475a`)}>4.8</span>(126)</div>
                <div style={css(`display:flex;align-items:center;gap:5px`)}><img src="/assets/lesson/eye.svg" alt="" style={css(`width:15px;height:15px`)}/>8.420</div>
                <div style={css(`display:flex;align-items:center;gap:5px`)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.3l3.4 2"/></svg>{v.t(`32 phút`)}</div>
              </div>

              <div style={css(`margin-top:16px;display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`width:42px;height:42px;border-radius:999px;background:linear-gradient(135deg,#138cd2,#00708f);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:14px`)}>PT</div>
                <div style={css(`flex:1`)}><div style={css(`font-size:14px;font-weight:600;color:#195658`)}>{v.t(`Cô Phạm Thu Trang`)}</div><div style={css(`font-size:11.5px;color:#617789`)}>{v.t(`THCS Chu Văn An · 24 học liệu`)}</div></div>
                <div style={css(`height:32px;padding:0 14px;border-radius:999px;border:1px solid #00aaab;color:#00aaab;font-size:12.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Theo dõi`)}</div>
              </div>

              <div style={css(`margin-top:18px;display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
                {v.detailTabs.map((t, i) => (
                  <div key={i} onClick={t.onClick} style={css(`flex:1;height:36px;border-radius:11px;background:${t.bg};color:${t.color};font-size:13px;font-weight:${t.weight};display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .15s`)}>{t.label}</div>
                ))}
              </div>

              {v.detailTabOverview && (
                <div style={css(`margin-top:16px`)}>
                  <div style={css(`font-size:13.5px;line-height:1.65;color:#25475a;text-wrap:pretty`)}>{v.t(`Bài giảng mô phỏng 3D toàn bộ cấu trúc tế bào thực vật: thành tế bào, màng sinh chất, lục lạp, không bào trung tâm và nhân. Học sinh có thể xoay, tách lớp và phóng to từng bào quan để quan sát chi tiết.`)}</div>
                  <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:9px`)}>
                    {v.detailFacts.map((f, i) => (
                      <div key={i} style={css(`display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}><span style={css(`font-size:12.5px;color:#617789`)}>{f.k}</span><span style={css(`font-size:13px;font-weight:600;color:#195658`)}>{f.v}</span></div>
                    ))}
                  </div>
                </div>
              )}

              {v.detailTabContent && (
                <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:9px`)}>
                  {v.steps.map((s, i) => (
                    <div key={i} onClick={s.onClick} style={css(`display:flex;align-items:center;gap:12px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                      <div style={css(`width:34px;height:34px;flex:none;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#00708f`)}>{s.num}</div>
                      <div style={css(`flex:1;min-width:0`)}><div style={css(`font-size:13.5px;font-weight:600;color:#195658`)}>{s.title}</div><div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{s.kind} · {s.dur}</div></div>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8ba0ae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 5l7 7-7 7"/></svg>
                    </div>
                  ))}
                </div>
              )}

              {v.detailTabReviews && (
                <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:12px`)}>
                  {v.reviews.map((r, i) => (
                    <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                      <div style={css(`display:flex;align-items:center;gap:10px`)}>
                        <div style={css(`width:34px;height:34px;border-radius:999px;background:${r.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:600`)}>{r.initials}</div>
                        <div style={css(`flex:1`)}><div style={css(`font-size:13px;font-weight:600;color:#195658`)}>{r.name}</div><div style={css(`font-size:11px;color:#617789`)}>{r.when}</div></div>
                        <div style={css(`display:flex;align-items:center;gap:3px`)}><img src="/assets/lesson/star.svg" alt="" style={css(`width:12px;height:12px`)}/><span style={css(`font-size:12px;font-weight:600`)}>{r.stars}</span></div>
                      </div>
                      <div style={css(`font-size:12.5px;line-height:1.6;color:#25475a;margin-top:9px;text-wrap:pretty`)}>{r.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div style={css(`position:absolute;left:0;right:0;bottom:0;padding:12px 20px 22px;background:rgba(252,252,252,.94);backdrop-filter:blur(12px);border-top:1px solid #ddeaf0;display:flex;align-items:center;gap:12px;z-index:25`)}>
            <div><div style={css(`font-size:11px;color:#617789`)}>{v.t(`Giá học liệu`)}</div><div style={css(`display:flex;align-items:center;gap:5px`)}><img src="/assets/lesson/token.svg" alt="" style={css(`width:17px;height:17px`)}/><span style={css(`font-size:19px;font-weight:700;color:#00708f`)}>120</span></div></div>
            <div onClick={v.toPlayer} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Bắt đầu học`)}</div>
          </div>
        </>
      )}

      {v.isLearningActivity && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toHome} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Bài đã học`)}</div>
          </div>
          <div style={css(`margin-top:18px;padding:16px;border-radius:20px;background:#eaf6f8`)}>
            <div style={css(`font-size:11.5px;color:#00708f`)}>{v.t(`Tuần này`)}</div>
            <div style={css(`font-size:28px;font-weight:700;color:#195658;margin-top:3px`)}>{v.weekActivity.length} <span style={css(`font-size:14px;font-weight:500;color:#617789`)}>{v.t(`bài học`)}</span></div>
          </div>
          <div style={css(`margin-top:18px;display:flex;flex-direction:column;gap:10px`)}>
            {v.weekActivity.map((a, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`width:44px;height:44px;flex:none;border-radius:14px;background:${a.tint}`)}></div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{v.t(a.title)}</div>
                  <div style={css(`font-size:11.5px;color:#617789;margin-top:3px`)}>{v.t(a.subject)} · {a.when} · {v.t(a.duration)}</div>
                </div>
                <div style={css(`height:24px;padding:0 10px;border-radius:999px;background:${a.done ? "#f0fdf4" : "#eaf6f8"};color:${a.done ? "#15803d" : "#00708f"};font-size:11px;font-weight:600;display:flex;align-items:center;flex:none`)}>{v.t(a.status)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isStudyTime && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toHome} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Thời gian học`)}</div>
          </div>
          <div style={css(`margin-top:18px;padding:16px;border-radius:20px;background:linear-gradient(135deg,#195658,#00708f);color:#fff`)}>
            <div style={css(`font-size:11.5px;opacity:.75`)}>{v.t(`Tổng thời gian học tuần này`)}</div>
            <div style={css(`font-size:30px;font-weight:700;margin-top:4px`)}>2h 15p</div>
          </div>

          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`Phân bổ theo ngày`)}</div>
          <div style={css(`margin-top:14px;display:flex;align-items:flex-end;gap:8px;height:110px;padding:0 4px`)}>
            {v.dailyStudy.map((d, i) => (
              <div key={i} style={css(`flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end`)}>
                <div style={css(`width:100%;max-width:26px;border-radius:8px 8px 3px 3px;background:${d.minutes ? "#00aaab" : "#edf7f9"};height:${Math.max(d.barPct, 6)}%`)}></div>
                <span style={css(`font-size:10.5px;color:#8ba0ae`)}>{d.day}</span>
              </div>
            ))}
          </div>

          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`Theo môn học`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.subjectStudy.map((s, i) => (
              <div key={i} style={css(`display:flex;align-items:center;gap:12px;padding:13px 14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:10px;height:10px;flex:none;border-radius:999px;background:${s.tint}`)}></div>
                <div style={css(`flex:1;font-size:13.5px;font-weight:500;color:#25475a`)}>{v.t(s.subject)}</div>
                <span style={css(`font-size:13px;font-weight:600;color:#195658`)}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isLearningStreak && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toHome} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Ngày liên tiếp`)}</div>
          </div>
          <div style={css(`margin-top:18px;padding:20px;border-radius:20px;background:linear-gradient(135deg,#f59e0b,#c2410c);color:#fff;text-align:center`)}>
            <div style={css(`font-size:11.5px;opacity:.85`)}>{v.t(`Chuỗi ngày học hiện tại`)}</div>
            <div style={css(`font-size:38px;font-weight:700;margin-top:4px`)}>7 <span style={css(`font-size:15px;font-weight:500`)}>{v.t(`ngày`)}</span></div>
          </div>

          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`7 ngày gần nhất`)}</div>
          <div style={css(`margin-top:12px;display:flex;justify-content:space-between;gap:8px`)}>
            {v.streakDays.map((d, i) => (
              <div key={i} style={css(`flex:1;display:flex;flex-direction:column;align-items:center;gap:6px`)}>
                <div style={css(`width:34px;height:34px;border-radius:11px;background:${d.done ? "#00aaab" : "#edf7f9"};display:flex;align-items:center;justify-content:center`)}>{d.done && <svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 6.2L5.3 10.5 14 1.5"/></svg>}</div>
                <span style={css(`font-size:10.5px;color:#8ba0ae`)}>{d.day}</span>
              </div>
            ))}
          </div>

          <div style={css(`margin-top:18px;display:flex;align-items:center;justify-content:space-between;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
            <span style={css(`font-size:13px;color:#617789`)}>{v.t(`Kỷ lục dài nhất`)}</span>
            <span style={css(`font-size:14px;font-weight:700;color:#195658`)}>{v.bestStreak} {v.t(`ngày`)}</span>
          </div>

          <div style={css(`margin-top:14px;padding:14px;border-radius:16px;background:#eaf6f8;font-size:12.5px;line-height:1.6;color:#00708f;text-wrap:pretty`)}>{v.t(v.streakMessage)}</div>
        </div>
      )}

      {v.isAverageScore && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <div style={css(`display:flex;align-items:center;gap:12px`)}>
            <div onClick={v.toHome} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7"/></svg></div>
            <div style={css(`font-size:18px;font-weight:700;color:#195658`)}>{v.t(`Điểm trung bình`)}</div>
          </div>
          <div style={css(`margin-top:18px;padding:18px;border-radius:20px;background:#fdeef5;text-align:center`)}>
            <div style={css(`font-size:11.5px;color:#b13a75`)}>{v.t(`Điểm trung bình tuần này`)}</div>
            <div style={css(`display:flex;align-items:center;justify-content:center;gap:6px;margin-top:4px`)}><img src="/assets/lesson/star.svg" alt="" style={css(`width:22px;height:22px`)}/><span style={css(`font-size:32px;font-weight:700;color:#195658`)}>8.4</span></div>
          </div>

          <div style={css(`margin-top:22px;font-size:14.5px;font-weight:600;color:#195658`)}>{v.t(`Kết quả gần đây`)}</div>
          <div style={css(`margin-top:12px;display:flex;flex-direction:column;gap:10px`)}>
            {v.recentScores.map((r, i) => (
              <div key={i} style={css(`padding:14px;border:1px solid #ddeaf0;border-radius:18px;background:#fff`)}>
                <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;gap:10px`)}>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`font-size:13.5px;font-weight:600;color:#195658;line-height:1.35;text-wrap:pretty`)}>{v.t(r.title)}</div>
                    <div style={css(`font-size:11.5px;color:#617789;margin-top:3px`)}>{v.t(r.subject)} · {r.when}</div>
                  </div>
                  <div style={css(`font-size:18px;font-weight:700;color:#195658;flex:none`)}>{r.score}</div>
                </div>
                <div style={css(`margin-top:9px;display:inline-flex;height:22px;padding:0 10px;border-radius:999px;background:${r.bg};color:${r.color};font-size:10.5px;font-weight:600;align-items:center`)}>{v.t(r.label)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
