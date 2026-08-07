// Parses a CSS declaration-list string ("width:10px;color:red") into a React
// style object, so template markup ported from the original design can keep
// its inline CSS strings verbatim instead of being hand-converted to JS objects.
export function css(str) {
  if (!str) return undefined;
  const out = {};
  for (const decl of str.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    const value = decl.slice(i + 1).trim();
    if (!prop || !value) continue;
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = value;
  }
  return out;
}
