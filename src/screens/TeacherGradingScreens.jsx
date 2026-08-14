import { css } from "../css.js";
import ConfirmSheet from "./ui/ConfirmSheet.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import FilePicker from "./ui/FilePicker.jsx";
import SegmentedTabs from "./ui/SegmentedTabs.jsx";
import StatusChip from "./ui/StatusChip.jsx";

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

      {v.isTGrading && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771;text-wrap:pretty`)}>{v.gradingAssignmentTitle}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px`)}>{v.gradingProgressLabel}</div>
          <div style={css(`margin-top:16px`)}><SegmentedTabs items={v.gradingFilterTabs} /></div>
          <div style={css(`margin-top:14px;display:flex;flex-direction:column;gap:10px`)}>
            {v.gradingRows.length === 0 && <EmptyState title={v.t(`Chưa có bài nộp nào cần chấm`)} />}
            {v.gradingRows.map((r) => (
              <div key={r.id} onClick={r.onClick} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;cursor:pointer`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${r.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12.5px`)}>{r.initials}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{r.studentName}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{r.submittedLabel} · {v.t(r.attemptLabel)}</div>
                </div>
                {r.scoreLabel
                  ? <div style={css(`font-size:17px;font-weight:700;color:#00708f;flex:none`)}>{r.scoreLabel}</div>
                  : <StatusChip status={r.status} t={v.t} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTGrade && v.gradeTarget && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;display:flex;align-items:center;gap:12px`)}>
            <div style={css(`width:46px;height:46px;flex:none;border-radius:999px;background:${v.gradeTarget.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:15px`)}>{v.gradeTarget.initials}</div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:17px;font-weight:700;color:#455771`)}>{v.gradeTarget.studentName}</div>
              <div style={css(`font-size:11.5px;color:#617789;margin-top:2px`)}>{v.gradeTarget.submittedLabel} · {v.t(`Lần nộp`)} {v.gradeTarget.attemptNumber}</div>
            </div>
            {v.gradeTarget.isLate && <span style={css(`flex:none;height:23px;padding:0 10px;border-radius:999px;background:#fff5e6;color:#b45309;font-size:10.5px;font-weight:600;display:flex;align-items:center`)}>{v.t(`Nộp muộn`)}</span>}
          </div>

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Câu trả lời`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.65;color:#455771;text-wrap:pretty`)}>{v.gradeTarget.answerText}</div>
          {v.gradeTarget.attachments.length > 0 && (
            <div style={css(`margin-top:11px`)}><FilePicker files={v.gradeTarget.attachments} readOnly /></div>
          )}

          {v.gradeCriteria.length > 0 ? (
            <>
              <div style={css(`margin-top:18px;display:flex;align-items:baseline;justify-content:space-between`)}>
                <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Chấm theo tiêu chí`)}</div>
                <div style={css(`font-size:14px;font-weight:700;color:#00708f`)}>{v.gradeTotalLabel}</div>
              </div>
              <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:10px`)}>
                {v.gradeCriteria.map((c) => (
                  <div key={c.code} style={css(`padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                    <div style={css(`font-size:12.5px;color:#455771;line-height:1.45`)}>{c.name}</div>
                    <div style={css(`margin-top:9px;display:flex;align-items:center;gap:10px`)}>
                      <input type="number" step="0.5" min="0" max={c.max} value={c.earned} onChange={(e) => c.onChange(e.target.value)}
                        style={css(`width:84px;box-sizing:border-box;height:42px;padding:0 12px;border:1.6px solid #00aaab;border-radius:12px;background:#eaf6f8;font-size:15px;font-weight:600;color:#00708f;font-family:inherit;outline:none`)} />
                      <span style={css(`font-size:12.5px;color:#617789`)}>/ {c.max} {v.t(`điểm`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Tổng điểm`)}</div>
              <div style={css(`margin-top:9px;font-size:12.5px;color:#617789`)}>{v.t(`Bài tập này không dùng tiêu chí chấm điểm.`)}</div>
            </>
          )}

          <div style={css(`margin-top:18px;font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Nhận xét`)}</div>
          <textarea value={v.gradeFeedback} onChange={(e) => v.setGradeFeedback(e.target.value)}
            style={css(`margin-top:9px;width:100%;box-sizing:border-box;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:92px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)} />

          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.saveGrade} style={css(`flex:1;height:52px;border-radius:16px;background:#00aaab;color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,170,171,.3)`)}>{v.t(`Lưu điểm`)}</div>
            <div onClick={v.openReturnConfirm} style={css(`width:132px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fdeef5;color:#b13a75;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.3;cursor:pointer`)}>{v.t(`Trả bài`)}</div>
          </div>

          <ConfirmSheet
            open={v.gradeReturnConfirmOpen}
            title={v.t(`Trả bài yêu cầu làm lại`)}
            desc={v.t(`Học sinh sẽ thấy bài quay lại mục Việc cần làm kèm nhận xét của bạn. Điểm hiện tại sẽ bị xoá.`)}
            confirmLabel={v.t(`Trả bài`)}
            cancelLabel={v.t(`Hủy`)}
            tone="warning"
            onConfirm={v.returnSubmission}
            onCancel={v.closeReturnConfirm}
          />
        </div>
      )}

      {v.isTGradebook && (
        <div style={css(`padding:6px 0 120px;animation:ybup .3s ease`)}>
          <div style={css(`padding:0 20px`)}>
            <BackButton onClick={v.back} />
            <div style={css(`margin-top:16px;display:flex;align-items:baseline;justify-content:space-between`)}>
              <div style={css(`font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Bảng điểm lớp`)}</div>
              <div style={css(`font-size:13px;font-weight:600;color:#00708f`)}>{v.t(`TB`)} {v.gradebookClassAverageLabel}</div>
            </div>
            <div style={css(`font-size:12px;color:#617789;margin-top:4px`)}>{v.t(`Chạm vào ô điểm để mở bài nộp.`)}</div>
          </div>

          <div style={css(`margin-top:16px;display:flex`)}>
            <div style={css(`flex:none;width:132px;border-right:1px solid #ddeaf0;background:#fcfcfc;z-index:2`)}>
              <div style={css(`height:48px;padding:0 12px;display:flex;align-items:center;font-size:11px;font-weight:600;color:#617789;border-bottom:1px solid #ddeaf0`)}>{v.t(`Học sinh`)}</div>
              {v.gradebookRows.map((r) => (
                <div key={r.studentId} style={css(`height:52px;padding:0 12px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #edf7f9`)}>
                  <div style={css(`width:26px;height:26px;flex:none;border-radius:999px;background:${r.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:10px`)}>{r.initials}</div>
                  <span style={css(`flex:1;min-width:0;font-size:11.5px;color:#455771;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{r.studentName}</span>
                </div>
              ))}
            </div>

            <div style={css(`flex:1;min-width:0;overflow-x:auto`)}>
              <div style={css(`display:inline-flex;flex-direction:column;min-width:100%`)}>
                <div style={css(`display:flex;height:48px;border-bottom:1px solid #ddeaf0`)}>
                  {v.gradebookColumns.map((c) => (
                    <div key={c.assignmentId} style={css(`flex:none;width:86px;padding:0 8px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10.5px;font-weight:600;color:#617789;line-height:1.3`)}>{c.shortTitle}</div>
                  ))}
                  <div style={css(`flex:none;width:64px;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:600;color:#00708f`)}>{v.t(`TB`)}</div>
                </div>
                {v.gradebookRows.map((r) => (
                  <div key={r.studentId} style={css(`display:flex;height:52px;border-bottom:1px solid #edf7f9`)}>
                    {r.cells.map((cell) => (
                      <div key={cell.assignmentId} onClick={cell.onClick} style={css(`flex:none;width:86px;padding:7px 8px;display:flex;align-items:center;justify-content:center;cursor:${cell.onClick ? "pointer" : "default"}`)}>
                        <div style={css(`width:100%;height:100%;border-radius:10px;background:${cell.bg};color:${cell.color};font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center`)}>{cell.label}</div>
                      </div>
                    ))}
                    <div style={css(`flex:none;width:64px;display:flex;align-items:center;justify-content:center;font-size:13.5px;font-weight:700;color:#00708f`)}>{r.averageLabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {v.isTAssignmentStats && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Thống kê bài tập`)}</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:11px`)}>
            {v.statsRows.length === 0 && <EmptyState title={v.t(`Chưa có bài tập nào`)} />}
            {v.statsRows.map((r) => (
              <div key={r.assignmentId} onClick={r.onClick} style={css(`padding:15px;border:1px solid #ddeaf0;border-radius:18px;background:#fff;cursor:pointer`)}>
                <div style={css(`font-size:14px;font-weight:600;color:#455771;line-height:1.4;text-wrap:pretty`)}>{r.title}</div>
                <div style={css(`margin-top:11px;height:6px;border-radius:999px;background:#edf7f9;overflow:hidden`)}>
                  <div style={css(`height:100%;width:${r.completionPct};border-radius:999px;background:#00aaab`)}></div>
                </div>
                <div style={css(`margin-top:10px;display:flex;align-items:center;gap:14px;font-size:11.5px;color:#617789`)}>
                  <span>{v.t(`Đã nộp`)} <b style={css(`color:#455771`)}>{r.submittedLabel}</b></span>
                  <span>{v.t(`Đã chấm`)} <b style={css(`color:#455771`)}>{r.gradedLabel}</b></span>
                  <span>{v.t(`TB`)} <b style={css(`color:#00708f`)}>{r.averageLabel}</b></span>
                  {r.rangeLabel && <span>{r.rangeLabel}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {v.isTClassProgress && (
        <div style={css(`padding:6px 20px 120px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Tiến độ lớp`)}</div>
          <div style={css(`margin-top:16px;display:flex;gap:9px`)}>
            {v.classProgressSummary.map((m, i) => (
              <div key={i} style={css(`flex:1;min-width:0;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;text-align:center`)}>
                <div style={css(`font-size:22px;font-weight:700;color:#00708f;line-height:1.1`)}>{m.value}</div>
                <div style={css(`font-size:10.5px;color:#617789;margin-top:4px`)}>{v.t(m.label)}</div>
              </div>
            ))}
          </div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            {v.classProgressStudents.map((st) => (
              <div key={st.studentId} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:38px;height:38px;flex:none;border-radius:999px;background:${st.tint};display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;font-size:12.5px`)}>{st.initials}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{st.name}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:3px`)}>{st.submittedLabel}</div>
                </div>
                <div style={css(`flex:none;font-size:17px;font-weight:700;color:#00708f`)}>{st.averageLabel}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
