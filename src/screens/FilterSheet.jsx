import { css } from "../css.js";
import HScroll from "./HScroll.jsx";
import Sheet from "./ui/Sheet.jsx";

function ChipRow({ items, scroll }) {
  const chips = items.map((o, i) => (
    <div key={i} onClick={o.onClick} style={css(`flex:none;height:38px;padding:0 14px;border:${o.selected ? "1.6px solid #00aaab" : "1px solid #ddeaf0"};background:${o.selected ? "#00aaab" : "#fff"};color:${o.selected ? "#fff" : "#455771"};border-radius:999px;font-size:12.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;white-space:nowrap;transition:all .15s`)}>{o.label}</div>
  ));
  if (scroll) return <HScroll extra="gap:8px;margin-left:-20px;margin-right:-20px;padding:0 20px 4px">{chips}</HScroll>;
  return <div style={css(`display:flex;flex-wrap:wrap;gap:8px`)}>{chips}</div>;
}

export default function FilterSheet({ v }) {
  return (
    <Sheet
      open={v.filterOpen}
      title={v.t(`Bộ lọc`)}
      onClose={v.closeFilter}
      footer={
        <>
          <div onClick={v.resetFilters} style={css(`flex:1;height:50px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Đặt lại`)}</div>
          <div onClick={v.applyFilterSheet} style={css(`flex:1.4;height:50px;border-radius:16px;background:#00aaab;color:#fff;font-size:14.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.28)`)}>{v.t(`Áp dụng`)} ({v.resultCount})</div>
        </>
      }
    >
      <div style={css(`display:flex;flex-direction:column;gap:18px`)}>
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
    </Sheet>
  );
}
