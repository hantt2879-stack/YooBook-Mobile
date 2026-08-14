import { css } from "../../css.js";

const KIND_LABEL = { pdf: "PDF", image: "IMG", doc: "DOC" };

export default function FilePicker({ files = [], onAdd, onRemove, readOnly, addLabel, addHint }) {
  return (
    <div style={css(`display:flex;flex-direction:column;gap:9px`)}>
      {files.map((f, i) => (
        <div key={i} style={css(`display:flex;align-items:center;gap:10px;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
          <div style={css(`width:30px;height:30px;flex:none;border-radius:9px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#00708f`)}>{KIND_LABEL[f.kind] ?? "FILE"}</div>
          <div style={css(`flex:1;min-width:0`)}>
            <div style={css(`font-size:12.5px;font-weight:500;color:#455771;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{f.name}</div>
            <div style={css(`font-size:10.5px;color:#617789`)}>{f.size}</div>
          </div>
          {!readOnly && (
            <div onClick={() => onRemove(i)} style={css(`width:26px;height:26px;flex:none;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </div>
          )}
        </div>
      ))}
      {!readOnly && (
        <div onClick={onAdd} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1.4px dashed #bcd7e0;border-radius:16px;background:#f8fcfd;cursor:pointer`)}>
          <div style={css(`width:34px;height:34px;border-radius:11px;background:#eaf6f8;display:flex;align-items:center;justify-content:center`)}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#00708f" strokeWidth="1.9" strokeLinecap="round"><path d="M12 16V5m0 0L7.5 9.5M12 5l4.5 4.5M4.5 19h15" /></svg>
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{addLabel}</div>
            <div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{addHint}</div>
          </div>
        </div>
      )}
    </div>
  );
}
