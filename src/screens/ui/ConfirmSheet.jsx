import { css } from "../../css.js";
import Sheet from "./Sheet.jsx";

export default function ConfirmSheet({ open, title, desc, confirmLabel, cancelLabel, tone = "accent", onConfirm, onCancel }) {
  const bg = tone === "warning" ? "#f59e0b" : "#00aaab";
  const shadow = tone === "warning" ? "rgba(245,158,11,.3)" : "rgba(0,170,171,.28)";
  return (
    <Sheet
      open={open}
      title={title}
      onClose={onCancel}
      maxHeight="52%"
      footer={
        <>
          <div onClick={onCancel} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{cancelLabel}</div>
          <div onClick={onConfirm} style={css(`flex:1.4;height:50px;border-radius:16px;background:${bg};color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px ${shadow}`)}>{confirmLabel}</div>
        </>
      }
    >
      <div style={css(`font-size:13.5px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{desc}</div>
    </Sheet>
  );
}
