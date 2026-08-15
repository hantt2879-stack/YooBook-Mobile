// Định dạng ngày giờ dùng chung cho học sinh và giáo viên.
// "2026-05-17T23:59:00" -> "17/05 · 23:59"
export function fmtDateTime(iso) {
  if (!iso) return "";
  return `${iso.slice(8, 10)}/${iso.slice(5, 7)} · ${iso.slice(11, 16)}`;
}
