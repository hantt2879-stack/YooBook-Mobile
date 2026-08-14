import { css } from "../css.js";
import ConfirmSheet from "./ui/ConfirmSheet.jsx";
import EmptyState from "./ui/EmptyState.jsx";
import FilePicker from "./ui/FilePicker.jsx";
import StatusChip from "./ui/StatusChip.jsx";

function BackButton({ onClick }) {
  return (
    <div onClick={onClick} style={css(`width:38px;height:38px;border-radius:999px;border:1px solid #ddeaf0;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#195658" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 5L7.5 12l7 7" /></svg>
    </div>
  );
}

function Fact({ label, value }) {
  return (
    <div style={css(`flex:1;min-width:0;padding:11px 12px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
      <div style={css(`font-size:10.5px;color:#617789`)}>{label}</div>
      <div style={css(`font-size:14px;font-weight:600;color:#455771;margin-top:3px`)}>{value}</div>
    </div>
  );
}

export default function StudentWorkScreens({ v }) {
  if (!v.isAssignmentDetail && !v.isAssignmentSubmit && !v.isSubmissionResult && !v.isSubmissionHistory) return null;
  if (v.isAssignmentDetail && !v.asg) {
    return (
      <div style={css(`padding:6px 20px 40px`)}>
        <BackButton onClick={v.back} />
        <EmptyState title={v.t(`Không tìm thấy bài tập`)} desc={v.t(`Bài tập có thể đã bị gỡ khỏi lớp.`)} />
      </div>
    );
  }

  const gate = v.asgGate;

  return (
    <>
    {v.isAssignmentDetail && (
    <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
      <BackButton onClick={v.back} />

      <div style={css(`margin-top:16px;display:flex;align-items:center;gap:8px`)}>
        <StatusChip status={v.asgStatus} t={v.t} />
        <span style={css(`font-size:11px;color:#617789`)}>{v.asg.typeLabel}</span>
      </div>
      <div style={css(`margin-top:8px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.asg.className}</div>
      <div style={css(`font-size:20px;font-weight:700;color:#455771;line-height:1.32;margin-top:7px;text-wrap:pretty`)}>{v.asg.title}</div>

      <div style={css(`margin-top:14px;display:flex;gap:9px`)}>
        <Fact label={v.t(`Hạn nộp`)} value={v.asg.dueLabel} />
        <Fact label={v.t(`Điểm tối đa`)} value={v.asg.maxScore} />
        <Fact label={v.t(`Số lượt còn lại`)} value={v.asg.attemptsLeftLabel} />
      </div>
      <div style={css(`margin-top:9px;font-size:11.5px;color:#617789`)}>
        {v.t(`Mở lúc`)} {v.asg.openLabel} · {v.t(v.asg.allowLateLabel)} · {v.t(`Điểm đạt`)} {v.asg.passingScore}
      </div>

      <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Yêu cầu bài làm`)}</div>
      <div style={css(`margin-top:9px;padding:13px 14px;border:1px solid #ddeaf0;border-radius:14px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.asg.instructions}</div>
      <div style={css(`margin-top:10px;display:flex;flex-direction:column;gap:9px`)}>
        {v.asg.checklist.map((c, i) => (
          <div key={i} style={css(`display:flex;gap:11px;align-items:flex-start;padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
            <div style={css(`width:7px;height:7px;flex:none;border-radius:999px;background:#00aaab;margin-top:6px`)}></div>
            <span style={css(`font-size:13px;line-height:1.5;color:#455771`)}>{c.text}</span>
          </div>
        ))}
      </div>

      {v.asg.attachments.length > 0 && (
        <>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tệp giáo viên đính kèm`)}</div>
          <div style={css(`margin-top:9px`)}><FilePicker files={v.asg.attachments} readOnly /></div>
        </>
      )}

      {v.asg.criteria.length > 0 && (
        <>
          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
          <div style={css(`margin-top:9px;display:flex;flex-direction:column;gap:8px`)}>
            {v.asg.criteria.map((c) => (
              <div key={c.code} style={css(`display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                <span style={css(`flex:1;min-width:0;font-size:12.5px;color:#455771;line-height:1.45`)}>{c.name}</span>
                <span style={css(`flex:none;font-size:12.5px;font-weight:600;color:#00708f`)}>{c.maxPoints} đ</span>
              </div>
            ))}
          </div>
        </>
      )}

      {v.asgSubmission && (
        <div onClick={v.toSubmissionResult} style={css(`margin-top:18px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;display:flex;align-items:center;gap:11px;cursor:pointer`)}>
          <div style={css(`flex:1;min-width:0`)}>
            <div style={css(`font-size:13.5px;font-weight:600;color:#455771`)}>{v.t(`Kết quả bài làm`)}</div>
            <div style={css(`font-size:11.5px;color:#617789;margin-top:3px`)}>{v.t(`Lần nộp`)} {v.asgSubmission.attemptNumber}</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#617789" strokeWidth="2" strokeLinecap="round"><path d="M9.5 5l7 7-7 7" /></svg>
        </div>
      )}

      {gate.allowed ? (
        <div onClick={v.toAssignmentSubmit} style={css(`margin-top:20px;height:54px;border-radius:16px;background:#00aaab;color:#fff;font-size:15.5px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 10px 22px rgba(0,170,171,.28)`)}>
          {v.asgSubmission ? v.t(`Nộp lại`) : v.t(`Nộp bài`)}
        </div>
      ) : (
        <div style={css(`margin-top:20px;height:54px;border-radius:16px;background:#f1f5f7;color:#8ba0ae;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center`)}>
          {v.t(gate.reasonLabel)}
        </div>
      )}
      {gate.allowed && gate.willBeLate && (
        <div style={css(`margin-top:10px;padding:11px 13px;border:1px solid #fbe0b3;background:#fff5e6;border-radius:14px;font-size:12px;color:#b45309;line-height:1.5`)}>
          {v.t(`Bài sẽ được ghi nhận là nộp muộn.`)}
        </div>
      )}
    </div>
    )}

      {v.isAssignmentSubmit && v.asg && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#00aaab`)}>{v.asg.className}</div>
          <div style={css(`font-size:19px;font-weight:700;color:#455771;line-height:1.32;margin-top:6px;text-wrap:pretty`)}>{v.asg.title}</div>

          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Bài làm của bạn`)}</div>
          <textarea
            value={v.draftText}
            onChange={(e) => v.setDraftText(e.target.value)}
            placeholder={v.t(`Nhập bài làm của bạn...`)}
            style={css(`margin-top:10px;width:100%;box-sizing:border-box;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;min-height:150px;font-size:13px;line-height:1.6;color:#455771;font-family:inherit;resize:vertical;outline:none`)}
          />

          <div style={css(`margin-top:14px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Đính kèm tệp`)}</div>
          <div style={css(`margin-top:9px`)}>
            <FilePicker
              files={v.draftFiles}
              onAdd={v.addDraftFile}
              onRemove={v.removeDraftFile}
              addLabel={v.t(`Đính kèm tệp`)}
              addHint={v.t(`Ảnh, PDF hoặc tài liệu, tối đa 20MB`)}
            />
          </div>

          {v.draftSavedLabel && (
            <div style={css(`margin-top:12px;font-size:11.5px;color:#15803d`)}>{v.draftSavedLabel}</div>
          )}

          <div style={css(`margin-top:20px;display:flex;gap:11px`)}>
            <div onClick={v.saveDraft} style={css(`width:126px;height:52px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14.5px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Lưu nháp`)}</div>
            <div
              onClick={v.canConfirmSubmit ? v.openSubmitConfirm : undefined}
              style={css(`flex:1;height:52px;border-radius:16px;background:${v.canConfirmSubmit ? "#00aaab" : "#a9c6ce"};color:#fff;font-size:15px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:${v.canConfirmSubmit ? "pointer" : "default"}`)}
            >
              {v.t(`Nộp bài`)}
            </div>
          </div>

          <ConfirmSheet
            open={v.submitConfirmOpen}
            title={v.t(`Xác nhận nộp bài`)}
            desc={v.asgGate.willBeLate ? v.t(`Bài sẽ được ghi nhận là nộp muộn.`) : v.t(`Sau khi nộp bạn không sửa được nữa.`)}
            confirmLabel={v.t(`Nộp bài`)}
            cancelLabel={v.t(`Hủy`)}
            tone={v.asgGate.willBeLate ? "warning" : "accent"}
            onConfirm={v.confirmSubmit}
            onCancel={v.closeSubmitConfirm}
          />
        </div>
      )}

      {v.isSubmissionResult && v.resultView && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;display:flex;align-items:center;gap:8px`)}>
            <StatusChip status={v.asgStatus} t={v.t} />
            {v.resultView.isLate && <span style={css(`font-size:11px;color:#b45309`)}>{v.t(`Nộp muộn`)}</span>}
          </div>
          <div style={css(`font-size:19px;font-weight:700;color:#455771;line-height:1.32;margin-top:8px;text-wrap:pretty`)}>{v.asg.title}</div>
          <div style={css(`font-size:11.5px;color:#617789;margin-top:5px`)}>{v.t(`Lần nộp`)} {v.asgSubmission.attemptNumber} · {v.resultView.submittedLabel}</div>

          <div style={css(`margin-top:16px;padding:18px;border-radius:20px;background:${v.resultIsReturned ? "#fdeef5" : "#eaf6f8"};display:flex;align-items:center;gap:16px`)}>
            <div style={css(`font-size:38px;font-weight:700;color:${v.resultIsReturned ? "#b13a75" : "#00708f"};line-height:1`)}>{v.resultView.scoreLabel}</div>
            <div style={css(`flex:1;min-width:0`)}>
              <div style={css(`font-size:12px;color:#617789`)}>{v.t(`Điểm tối đa`)} {v.resultView.maxScoreLabel}</div>
              {v.resultView.scoreLabel !== "—" && (
                <div style={css(`margin-top:4px;font-size:13px;font-weight:600;color:${v.resultView.passed ? "#15803d" : "#b45309"}`)}>
                  {v.resultView.passed ? v.t(`Đạt`) : v.t(`Chưa đạt`)}
                </div>
              )}
            </div>
          </div>

          {v.resultIsReturned && (
            <div style={css(`margin-top:12px;padding:14px;border:1.4px solid #f3c6dd;border-radius:16px;background:#fff`)}>
              <div style={css(`font-size:13.5px;font-weight:600;color:#b13a75`)}>{v.t(`Giáo viên đã trả bài`)}</div>
              <div style={css(`font-size:12.5px;line-height:1.6;color:#455771;margin-top:6px;text-wrap:pretty`)}>{v.resultView.feedback}</div>
              <div onClick={v.toAssignmentSubmit} style={css(`margin-top:14px;height:46px;border-radius:14px;background:#00aaab;color:#fff;font-size:14px;font-weight:600;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Nộp lại`)}</div>
            </div>
          )}

          {!v.resultIsReturned && v.resultView.feedback && (
            <>
              <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Nhận xét của giáo viên`)}</div>
              <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.resultView.feedback}</div>
            </>
          )}

          {v.resultView.criteriaRows.length > 0 && (
            <>
              <div style={css(`margin-top:18px;display:flex;align-items:baseline;justify-content:space-between`)}>
                <div style={css(`font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Tiêu chí chấm điểm`)}</div>
                <div style={css(`font-size:12.5px;font-weight:600;color:#00708f`)}>{v.resultView.totalLabel}</div>
              </div>
              <div style={css(`margin-top:9px;display:flex;flex-direction:column;gap:8px`)}>
                {v.resultView.criteriaRows.map((r) => (
                  <div key={r.code} style={css(`padding:12px 13px;border:1px solid #ddeaf0;border-radius:14px;background:#fff`)}>
                    <div style={css(`display:flex;align-items:center;gap:10px`)}>
                      <span style={css(`flex:1;min-width:0;font-size:12.5px;color:#455771;line-height:1.45`)}>{r.name}</span>
                      <span style={css(`flex:none;font-size:12.5px;font-weight:600;color:#00708f`)}>{r.earned} / {r.max}</span>
                    </div>
                    <div style={css(`margin-top:8px;height:5px;border-radius:999px;background:#edf7f9;overflow:hidden`)}>
                      <div style={css(`height:100%;width:${r.max ? Math.round((r.earned / r.max) * 100) : 0}%;border-radius:999px;background:#00aaab`)}></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div style={css(`margin-top:18px;font-size:14px;font-weight:600;color:#455771`)}>{v.t(`Bài làm của bạn`)}</div>
          <div style={css(`margin-top:9px;padding:14px;border:1px solid #ddeaf0;border-radius:16px;background:#fff;font-size:13px;line-height:1.6;color:#455771;text-wrap:pretty`)}>{v.resultView.answerText}</div>
          {v.resultView.attachments.length > 0 && (
            <div style={css(`margin-top:11px`)}><FilePicker files={v.resultView.attachments} readOnly /></div>
          )}

          <div onClick={v.toSubmissionHistory} style={css(`margin-top:18px;height:48px;border-radius:16px;border:1px solid #ddeaf0;background:#fff;color:#195658;font-size:14px;font-weight:500;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>{v.t(`Lịch sử nộp bài`)}</div>
        </div>
      )}

      {v.isSubmissionHistory && (
        <div style={css(`padding:6px 20px 40px;animation:ybup .3s ease`)}>
          <BackButton onClick={v.back} />
          <div style={css(`margin-top:16px;font-size:20px;font-weight:700;color:#455771`)}>{v.t(`Lịch sử nộp bài`)}</div>
          <div style={css(`font-size:12.5px;color:#617789;margin-top:4px;text-wrap:pretty`)}>{v.asg?.title}</div>
          <div style={css(`margin-top:16px;display:flex;flex-direction:column;gap:10px`)}>
            {v.historyRows.map((r) => (
              <div key={r.attemptNumber} style={css(`display:flex;align-items:center;gap:11px;padding:13px;border:1px solid #ddeaf0;border-radius:16px;background:#fff`)}>
                <div style={css(`width:34px;height:34px;flex:none;border-radius:999px;background:#eaf6f8;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#00708f`)}>{r.attemptNumber}</div>
                <div style={css(`flex:1;min-width:0`)}>
                  <div style={css(`font-size:13px;font-weight:600;color:#455771`)}>{v.t(`Lần nộp`)} {r.attemptNumber}</div>
                  <div style={css(`font-size:11px;color:#617789;margin-top:2px`)}>{r.submittedLabel || v.t(r.statusLabel)}</div>
                </div>
                {r.scoreLabel && <div style={css(`font-size:17px;font-weight:700;color:#00708f;flex:none`)}>{r.scoreLabel}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
