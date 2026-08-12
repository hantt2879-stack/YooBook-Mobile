import { useRef, useState } from "react";
import { css } from "../css.js";

const DRAG_THRESHOLD = 6; // px of pointer movement before a mousedown counts as a drag, not a click

// Shared single-row horizontal scroller for tab strips, chip rows, and card
// rails. `extra` carries the row's own look (gap, margins, padding, bg) as a
// css()-style declaration string; the scroll-enabling declarations are
// appended last so they always win, guaranteeing every row that uses this
// component scrolls on one line instead of needing the fix repeated per screen.
//
// Touch keeps the browser's native swipe/momentum scrolling untouched (mouse
// events never fire for touch pointers). On top of that, desktop Chrome gets
// click-hold-drag-to-scroll: mousedown records the pointer X and the row's
// current scrollLeft, mousemove drags it, and a small movement threshold
// keeps a plain click on a chip/tab working when the pointer never dragged.
//
// Pointer capture is acquired lazily, only once the drag threshold is
// crossed — NOT on every mousedown. Per the Pointer Events spec, an element
// with an active pointer capture also becomes the target of the
// compatibility mouse events (mousedown/mouseup/click), so capturing
// unconditionally on mousedown would silently retarget every plain click
// from the chip/tab onto this row container and break selection entirely.
export default function HScroll({ children, extra = "", className = "" }) {
  const elRef = useRef(null);
  const drag = useRef({ active: false, moved: false, captured: false, pointerId: null, startX: 0, startScrollLeft: 0 });
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (e) => {
    if (e.pointerType !== "mouse") return; // touch/pen: leave native scrolling alone
    const el = elRef.current;
    if (!el) return;
    drag.current = { active: true, moved: false, captured: false, pointerId: e.pointerId, startX: e.clientX, startScrollLeft: el.scrollLeft };
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const el = elRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      drag.current.moved = true;
      setDragging(true);
      if (!drag.current.captured) {
        try { el.setPointerCapture(drag.current.pointerId); drag.current.captured = true; } catch { /* ignore */ }
      }
    }
    if (drag.current.moved) {
      el.scrollLeft = drag.current.startScrollLeft - dx;
    }
  };

  const endDrag = () => {
    if (!drag.current.active) return;
    const el = elRef.current;
    if (el && drag.current.captured) {
      try { el.releasePointerCapture(drag.current.pointerId); } catch { /* already released */ }
    }
    if (drag.current.moved) suppressClick.current = true; // swallow the click this drag-release would otherwise fire
    drag.current.active = false;
    drag.current.moved = false;
    drag.current.captured = false;
    setDragging(false);
  };

  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.stopPropagation();
      e.preventDefault();
      suppressClick.current = false;
    }
  };

  const style = css(`${extra};display:flex;flex-wrap:nowrap;overflow-x:auto`);
  // Direct scrollLeft writes during a drag must land instantly — the shared
  // .yb-scroll class sets scroll-behavior:smooth for other cases, which would
  // otherwise animate every mousemove update into a laggy chase.
  style.scrollBehavior = "auto";
  style.cursor = dragging ? "grabbing" : "grab";
  if (dragging) {
    style.userSelect = "none";
    style.WebkitUserSelect = "none";
  }

  return (
    <div
      ref={elRef}
      className={className ? `yb-scroll ${className}` : "yb-scroll"}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      onClickCapture={onClickCapture}
    >
      {children}
    </div>
  );
}
