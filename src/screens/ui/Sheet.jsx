import { css } from "../../css.js";

// Khung sheet đáy dùng chung. Trước đây ba tệp FilterSheet/AssignSheet/LangSheet
// lặp lại y hệt phần nền mờ, bo góc và animation trượt lên.
export default function Sheet({ open, title, onClose, footer, children, maxHeight = "82%" }) {
  if (!open) return null;
  return (
    <div style={css(`position:absolute;inset:0;z-index:80;display:flex;flex-direction:column;justify-content:flex-end`)}>
      <div onClick={onClose} style={css(`position:absolute;inset:0;background:rgba(15,50,52,.45)`)}></div>
      <div style={css(`position:relative;max-height:${maxHeight};background:#fcfcfc;border-radius:24px 24px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.18);display:flex;flex-direction:column;animation:ybup .25s ease`)}>
        {title && (
          <div style={css(`padding:16px 20px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddeaf0`)}>
            <div style={css(`font-size:16px;font-weight:700;color:#455771`)}>{title}</div>
            <div onClick={onClose} style={css(`width:32px;height:32px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </div>
          </div>
        )}
        <div style={css(`flex:1;overflow-y:auto;padding:16px 20px 8px`)}>{children}</div>
        {footer && <div style={css(`padding:14px 20px 22px;border-top:1px solid #ddeaf0;display:flex;gap:10px;background:#fcfcfc`)}>{footer}</div>}
      </div>
    </div>
  );
}
