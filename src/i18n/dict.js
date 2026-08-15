import core from "./shards/core.js";
import auth from "./shards/auth.js";
import studentHome from "./shards/studentHome.js";
import studentLearn from "./shards/studentLearn.js";
import studentLibraryWork from "./shards/studentLibraryWork.js";
import common from "./shards/common.js";
import teacher from "./shards/teacher.js";
import parent from "./shards/parent.js";
import account from "./shards/account.js";
import grading from "./shards/grading.js";

const EN = {
  ...core,
  ...auth,
  ...studentHome,
  ...studentLearn,
  ...studentLibraryWork,
  ...common,
  ...teacher,
  ...parent,
  ...account,
  ...grading,
};

// Looks up `str` (the Vietnamese source text) in the EN dictionary when
// lang === "en"; any string not yet translated just passes through unchanged,
// so partial dictionary coverage never breaks the UI.
export function translate(lang, str) {
  if (lang !== "en" || typeof str !== "string") return str;
  return EN[str] ?? str;
}
