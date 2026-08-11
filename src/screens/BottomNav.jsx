import { css } from "../css.js";

export default function BottomNav({ v }) {
  if (!v.showNav) return null;
  return (
    <div style={css("position:absolute;left:0;right:0;bottom:0;z-index:40;pointer-events:none")}>
      {v.navTabs && (
        <div style={css("pointer-events:auto;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-top:1px solid #ddeaf0;padding:9px 8px 22px;display:flex")}>
          {v.tabs.map((t, i) => (
            <div key={i} onClick={t.onClick} style={css("flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:4px 0")}>
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth={t.sw} strokeLinecap="round" strokeLinejoin="round"><path d={t.iconPath} /></svg>
              <span style={css(`font-size:10.5px;font-weight:${t.weight};color:${t.color}`)}>{t.label}</span>
            </div>
          ))}
        </div>
      )}

      {v.navFab && (
        <div style={css("pointer-events:auto;position:relative;background:rgba(255,255,255,.97);backdrop-filter:blur(14px);border-top:1px solid #ddeaf0;padding:9px 8px 22px;display:flex")}>
          {v.tabsSplitLeft.map((t, i) => (
            <div key={i} onClick={t.onClick} style={css("flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:4px 0")}>
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth={t.sw} strokeLinecap="round" strokeLinejoin="round"><path d={t.iconPath} /></svg>
              <span style={css(`font-size:10.5px;font-weight:${t.weight};color:${t.color}`)}>{t.label}</span>
            </div>
          ))}
          <div style={css("width:74px;flex:none")}></div>
          {v.tabsSplitRight.map((t, i) => (
            <div key={i} onClick={t.onClick} style={css("flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;padding:4px 0")}>
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth={t.sw} strokeLinecap="round" strokeLinejoin="round"><path d={t.iconPath} /></svg>
              <span style={css(`font-size:10.5px;font-weight:${t.weight};color:${t.color}`)}>{t.label}</span>
            </div>
          ))}
          <div onClick={v.toPlayer} style={css("position:absolute;left:50%;top:-24px;transform:translateX(-50%);width:62px;height:62px;border-radius:999px;background:#00aaab;border:4px solid #fcfcfc;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 24px rgba(0,170,171,.4)")}>
            <svg width="20" height="21" viewBox="0 0 11 12" fill="#fff"><path d="M0 1.1c0-.9 1-1.4 1.7-1L10.3 5c.7.4.7 1.4 0 1.8L1.7 11.9C1 12.3 0 11.8 0 11V1.1z" /></svg>
          </div>
        </div>
      )}

      {v.navPill && (
        <div style={css("pointer-events:auto;padding:0 18px 24px")}>
          <div style={css("height:62px;border-radius:999px;background:rgba(25,86,88,.96);backdrop-filter:blur(14px);display:flex;align-items:center;padding:0 8px;box-shadow:0 12px 30px rgba(25,86,88,.32)")}>
            {v.tabsPill.map((t, i) => (
              <div key={i} onClick={t.onClick} style={css(`flex:${t.flex};height:46px;border-radius:999px;background:${t.pillBg};display:flex;align-items:center;justify-content:center;gap:7px;cursor:pointer;transition:all .22s;overflow:hidden`)}>
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={t.pillColor} strokeWidth={t.sw} strokeLinecap="round" strokeLinejoin="round" style={css("flex:none")}><path d={t.iconPath} /></svg>
                {t.active && <span style={css("font-size:12.5px;font-weight:600;color:#195658;white-space:nowrap")}>{t.label}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
