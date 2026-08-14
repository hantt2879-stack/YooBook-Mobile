import { css } from "../../css.js";

export default function EmptyState({ title, desc, actionLabel, onAction }) {
  return (
    <div style={css(`margin-top:28px;padding:28px 20px;border:1px dashed #bcd7e0;border-radius:20px;background:#f8fcfd;text-align:center`)}>
      <div style={css(`width:46px;height:46px;margin:0 auto;border-radius:999px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}>
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5.5h14v13H5zM8.5 10h7M8.5 14h4" /></svg>
      </div>
      <div style={css(`margin-top:12px;font-size:14.5px;font-weight:600;color:#455771`)}>{title}</div>
      {desc && <div style={css(`margin-top:6px;font-size:12.5px;line-height:1.55;color:#617789;text-wrap:pretty`)}>{desc}</div>}
      {actionLabel && (
        <div onClick={onAction} style={css(`margin:16px auto 0;height:42px;max-width:220px;border-radius:14px;background:#00aaab;color:#fff;font-size:13.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{actionLabel}</div>
      )}
    </div>
  );
}
