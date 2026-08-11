import { css } from "../css.js";

// Global language picker, opened from the Account screen's "Ngôn ngữ" row.
// Rendered as a sibling of the phone-frame content (like FilterSheet) so it
// overlays whichever screen is active. The Login screen has its own inline
// dropdown for the same langOpen/langOptions state, so this stays hidden there.
export default function LangSheet({ v }) {
  if (!v.langOpen || v.isLogin) return null;
  return (
    <div style={css(`position:absolute;inset:0;z-index:85;display:flex;align-items:center;justify-content:center;padding:20px`)}>
      <div onClick={v.closeLangMenu} style={css(`position:absolute;inset:0;background:rgba(15,50,52,.45)`)}></div>
      <div style={css(`position:relative;width:100%;max-width:280px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.25);animation:ybup .2s ease`)}>
        <div style={css(`padding:16px 18px;border-bottom:1px solid #edf7f9;font-size:14.5px;font-weight:700;color:#455771`)}>{v.t(`Ngôn ngữ`)}</div>
        {v.langOptions.map((o) => (
          <div key={o.code} onClick={o.onClick} style={css(`padding:14px 18px;font-size:14px;font-weight:${o.active ? 600 : 400};color:${o.active ? "#00aaab" : "#25475a"};background:${o.active ? "#eaf6f8" : "#fff"};cursor:pointer;display:flex;align-items:center;justify-content:space-between`)}>
            {o.label}
            {o.active && (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00aaab" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5 19 6.5"/></svg>)}
          </div>
        ))}
      </div>
    </div>
  );
}
