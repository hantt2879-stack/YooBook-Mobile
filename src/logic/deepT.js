// Recursively runs every string in a data tree through `t`, leaving
// functions (onClick handlers), numbers, and booleans untouched. Safe to
// apply blindly: hex colors, SVG path data, and icon URLs never match a
// dictionary entry, so they just pass through unchanged.
export function deepT(x, t) {
  if (typeof x === "string") return t(x);
  if (Array.isArray(x)) return x.map((v) => deepT(v, t));
  if (x && typeof x === "object") {
    const out = {};
    for (const k in x) out[k] = deepT(x[k], t);
    return out;
  }
  return x;
}
