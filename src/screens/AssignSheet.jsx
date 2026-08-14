import { css } from "../css.js";
import Sheet from "./ui/Sheet.jsx";

export default function AssignSheet({ v }) {
  return (
    <Sheet
      open={v.tAssignSheetOpen}
      title={v.tAssignSheetTitle}
      onClose={v.closeAssignSheet}
      maxHeight="70%"
      footer={
        <>
          <div onClick={v.closeAssignSheet} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Huỷ`)}</div>
          <div onClick={v.tAssignSheetConfirmDisabled ? undefined : v.confirmAssignSheet} style={css(`flex:1.4;height:50px;border-radius:16px;background:${v.tAssignSheetConfirmDisabled ? "#a9c6ce" : "#00aaab"};color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}>{v.t(`Xác nhận`)}</div>
        </>
      }
    >
      <div style={css(`display:flex;flex-direction:column;gap:9px`)}>
        {v.tAssignSheetOptions.map((o, i) => (
          <div key={i} onClick={o.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:13px 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#eaf6f8" : "#fff"};border-radius:16px;cursor:pointer;transition:all .15s`)}>
            <div style={css(`width:20px;height:20px;flex:none;border-radius:999px;border:${o.selected ? "6px solid #00aaab" : "1.6px solid #ddeaf0"}`)}></div>
            <div style={css(`flex:1;min-width:0;font-size:13px;font-weight:600;color:#455771`)}>{o.label}</div>
          </div>
        ))}
      </div>
    </Sheet>
  );
}
