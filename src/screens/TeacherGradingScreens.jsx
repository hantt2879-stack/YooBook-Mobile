import { css } from "../css.js";

function BackButton({ onClick }) {
  return (
    <div onClick={onClick} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", width }) {
  return (
    <div style={css(width ? `width:${width};flex:none` : `flex:1;min-width:0`)}>
      <div style={css(`font-size:11px;color:#617789;margin-bottom:5px`)}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={css(`width:100%;box-sizing:border-box;height:42px;padding:0 12px;border:1px solid #ddeaf0;border-radius:12px;background:#fff;font-size:13px;color:#455771;font-family:inherit;outline:none`)}
      />
    </div>
  );
}

export default function TeacherGradingScreens({ v }) {
  return (
    <>
      {v.isTRubricEditor && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px;text-wrap:pretty`)}>{v.t(`Chia điểm theo tiêu chí để chấm nhất quán giữa các bài.`)}</div>

          <div style={css(`margin-top:16px`)}>
            <Field label={v.t(`Tên bộ tiêu chí`)} value={v.rubricDraft.name} onChange={v.setRubricName} />
          </div>

          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
            {v.rubricDraft.criteria.map((c, i) => (
              <div key={i} style={css(`padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
                  <span style={css(`font-size:11.5px;font-weight:700;color:#00708f`)}>{c.code}</span>
                  <div onClick={() => v.removeCriterion(i)} style={css(`width:26px;height:26px;border-radius:999px;background:#f1f5f7;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </div>
                </div>
                <div style={css(`margin-top:9px`)}>
                  <Field label={v.t(`Nội dung tiêu chí`)} value={c.name} onChange={(val) => v.setCriterion(i, "name", val)} />
                </div>
                <div style={css(`margin-top:9px;display:flex;gap:9px`)}>
                  <Field label={v.t(`Điểm tối đa`)} type="number" value={c.maxPoints} onChange={(val) => v.setCriterion(i, "maxPoints", val)} />
                  <Field label={v.t(`Trọng số %`)} type="number" value={c.weightPercent} onChange={(val) => v.setCriterion(i, "weightPercent", val)} />
                </div>
              </div>
            ))}
          </div>

          <div onClick={v.addCriterion} style={css(`margin-top:12px;height:46px;border-radius:14px;border:1.4px dashed #bcd7e0;background:#f8fcfd;color:#00708f;font-size:13.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Thêm tiêu chí`)}</div>

          <div style={css(`margin-top:16px;padding:13px;border-radius:14px;background:${v.rubricValid ? "#f0fdf4" : "#fff5e6"};display:flex;align-items:center;justify-content:space-between`)}>
            <span style={css(`font-size:12.5px;color:${v.rubricValid ? "#15803d" : "#b45309"}`)}>
              {v.rubricValid ? v.t(`Hợp lệ`) : v.t(`Trọng số phải cộng đủ 100%`)}
            </span>
            <span style={css(`font-size:12.5px;font-weight:600;color:${v.rubricValid ? "#15803d" : "#b45309"}`)}>{v.rubricWeightTotal}% · {v.rubricMaxTotal} đ</span>
          </div>

          <div
            onClick={v.rubricValid ? v.saveRubric : undefined}
            style={css(`margin-top:18px;height:52px;border-radius:16px;background:${v.rubricValid ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.rubricValid ? "pointer" : "default"}`)}
          >
            {v.t(`Lưu bộ tiêu chí`)}
          </div>
        </div>
      )}
    </>
  );
}
