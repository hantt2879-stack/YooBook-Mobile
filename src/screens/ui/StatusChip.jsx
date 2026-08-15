import { css } from "../../css.js";
import { SUBMISSION_LABEL, SUBMISSION_TINT } from "../../logic/submissionState.js";

export default function StatusChip({ status, t }) {
  const tint = SUBMISSION_TINT[status] ?? SUBMISSION_TINT[0];
  const label = SUBMISSION_LABEL[status] ?? SUBMISSION_LABEL[0];
  return (
    <div style={css(`height:23px;padding:0 10px;border-radius:999px;background:${tint.bg};color:${tint.color};font-size:10.5px;font-weight:600;display:inline-flex;align-items:center;flex:none`)}>
      {t ? t(label) : label}
    </div>
  );
}
