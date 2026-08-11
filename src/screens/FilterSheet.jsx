import { css } from "../css.js";

function ChipRow({ items, scroll }) {
  return (
    <div className={scroll ? "yb-scroll" : ""} style={css(scroll
      ? `display:flex;gap:8px;overflow-x:auto;margin-left:-20px;margin-right:-20px;padding:0 20px 4px`
      : `display:flex;flex-wrap:wrap;gap:8px`)}>
      {items.map((o, i) => (
        <div key={i} onClick={o.onClick} style={css(`flex:none;height:38px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#00aaab" : "#fff"};color:${o.selected ? "#fff" : "#455771"};border-radius:999px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{o.label}</div>
      ))}
    </div>
  );
}

export default function FilterSheet({ v }) {
  if (!v.filterOpen) return null;
  return (
    <div style={css(`position:absolute;inset:0;z-index:80;display:flex;flex-direction:column;justify-content:flex-end`)}>
      <div onClick={v.closeFilter} style={css(`position:absolute;inset:0;background:rgba(15,50,52,.45)`)}></div>
      <div style={css(`position:relative;max-height:82%;background:#fcfcfc;border-radius:24px 24px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.18);display:flex;flex-direction:column;animation:ybup .25s ease`)}>
        <div style={css(`padding:16px 20px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #ddeaf0`)}>
          <div style={css(`font-size:16px;font-weight:700;color:#455771`)}>{v.t(`Bộ lọc`)}</div>
          <div onClick={v.closeFilter} style={css(`width:32px;height:32px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></div>
        </div>

        <div style={css(`flex:1;overflow-y:auto;padding:16px 20px 8px;display:flex;flex-direction:column;gap:18px`)}>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Môn học`)}</div>
            <ChipRow items={v.filterSubjects} scroll />
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Cấp học`)}</div>
            <ChipRow items={v.filterLevels} />
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Khối lớp`)}</div>
            <ChipRow items={v.filterGrades} scroll />
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Loại học liệu`)}</div>
            <ChipRow items={v.filterTypes} />
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Bài / chủ đề`)}</div>
            <ChipRow items={v.filterTopics} scroll />
          </div>
          <div>
            <div style={css(`font-size:13px;font-weight:600;color:#455771;margin-bottom:9px`)}>{v.t(`Sắp xếp`)}</div>
            <ChipRow items={v.filterSorts} />
          </div>
        </div>

        <div style={css(`padding:14px 20px 22px;border-top:1px solid #ddeaf0;display:flex;gap:10px;background:#fcfcfc`)}>
          <div onClick={v.resetFilters} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Đặt lại`)}</div>
          <div onClick={v.applyFilterSheet} style={css(`flex:1.4;height:50px;border-radius:16px;background:#00aaab;color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}>{v.t(`Áp dụng`)} ({v.resultCount})</div>
        </div>
      </div>
    </div>
  );
}
