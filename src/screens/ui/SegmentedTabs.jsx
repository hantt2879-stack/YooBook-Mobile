import { css } from "../../css.js";

// Thay cho đoạn tô màu tab đang lặp lại 8 lần trong các màn hiện có.
export default function SegmentedTabs({ items }) {
  return (
    <div style={css(`display:flex;gap:6px;padding:4px;background:#edf7f9;border-radius:14px`)}>
      {items.map((tab, i) => (
        <div
          key={i}
          onClick={tab.onClick}
          style={css(`flex:1;height:36px;border-radius:11px;background:${tab.active ? "#00aaab" : "transparent"};color:${tab.active ? "#fff" : "#455771"};font-size:12.5px;font-weight:${tab.active ? 600 : 400};display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap`)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}
