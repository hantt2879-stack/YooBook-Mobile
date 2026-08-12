import { css } from "../css.js";

export default function AssignSheet({ v }) {
  if (!v.tAssignSheetOpen) return null;
  return (
    <div style={css(`position:absolute;inset:0;z-index:80;display:flex;flex-direction:column;justify-content:flex-end`)}>
      <div onClick={v.closeAssignSheet} style={css(`position:absolute;inset:0;background:rgba(15,50,52,.45)`)}></div>
      <div style={css(`position:relative;max-height:70%;background:#fcfcfc;border-radius:24px 24px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.18);display:flex;flex-direction:column;animation:ybup .25s ease`)}>
        <div style={css(`padding:16px 20px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddeaf0`)}>
          <div style={css(`font-size:16px;font-weight:700;color:#455771`)}>{v.tAssignSheetTitle}</div>
          <div onClick={v.closeAssignSheet} style={css(`width:32px;height:32px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></div>
        </div>

        <div style={css(`flex:1;overflow-y:auto;padding:14px 20px 8px;display:flex;flex-direction:column;gap:9px`)}>
          {v.tAssignSheetOptions.map((o, i) => (
            <div key={i} onClick={o.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:13px 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};border-radius:16px;cursor:pointer;transition:all .15s`)}>
              <div style={css(`width:20px;height:20px;flex:none;border-radius:999px;border:${o.selected ? "6px solid #00aaab" : "1.6px solid #ddeaf0"}`)}></div>
              <div style={css(`flex:1;min-width:0;font-size:13px;font-weight:600;color:#455771`)}>{o.label}</div>
            </div>
          ))}
        </div>

        <div style={css(`padding:14px 20px 22px;border-top:1px solid #ddeaf0;display:flex;gap:10px;background:#fcfcfc`)}>
          <div onClick={v.closeAssignSheet} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Huỷ`)}</div>
          <div onClick={v.tAssignSheetConfirmDisabled ? undefined : v.confirmAssignSheet} style={css(`flex:1.4;height:50px;border-radius:16px;background:${v.tAssignSheetConfirmDisabled ? "#a9c6ce" : "#00aaab"};color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}>{v.t(`Xác nhận`)}</div>
        </div>
      </div>
    </div>
  );
}
