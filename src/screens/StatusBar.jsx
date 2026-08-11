import { css } from "../css.js";

export default function StatusBar() {
  return (
    <div style={css("height:44px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 26px;font-size:14px;font-weight:600;color:#25475a;z-index:30;background:transparent")}>
      <span>9:41</span>
      <div style={css("display:flex;align-items:center;gap:6px")}>
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="4.6" y="5" width="3" height="6" rx="1" /><rect x="9.2" y="2.5" width="3" height="8.5" rx="1" /><rect x="13.8" y="0" width="3" height="11" rx="1" /></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1 3.4a10 10 0 0 1 14 0" /><path d="M3.6 6.2a6.4 6.4 0 0 1 8.8 0" /><circle cx="8" cy="9.4" r="1.1" fill="currentColor" stroke="none" /></svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none"><rect x=".5" y=".5" width="21" height="11" rx="3.2" stroke="currentColor" strokeOpacity=".38" /><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" /><path d="M23 4.2v3.6a2 2 0 0 0 0-3.6z" fill="currentColor" fillOpacity=".4" /></svg>
      </div>
    </div>
  );
}
