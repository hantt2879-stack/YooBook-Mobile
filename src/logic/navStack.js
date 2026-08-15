// Ngăn xếp điều hướng thuần cho prototype: mọi hàm nhận nav cũ, trả nav mới,
// không đột biến và không phụ thuộc React nên kiểm thử được độc lập.
// Thay cho chuỗi phẳng `state.screen` + `go()` trước đây, vốn khiến nút quay
// lại phải hardcode đích và không mang được tham số (assignmentId, classId...).

export function createNav(screen, params = {}) {
  return { stack: [{ screen, params }] };
}

export function current(nav) {
  return nav.stack[nav.stack.length - 1];
}

export function currentScreen(nav) {
  return current(nav).screen;
}

export function currentParams(nav) {
  return current(nav).params;
}

export function canPop(nav) {
  return nav.stack.length > 1;
}

export function push(nav, screen, params = {}) {
  return { stack: [...nav.stack, { screen, params }] };
}

export function replace(nav, screen, params = {}) {
  return { stack: [...nav.stack.slice(0, -1), { screen, params }] };
}

export function pop(nav) {
  return canPop(nav) ? { stack: nav.stack.slice(0, -1) } : nav;
}

export function resetTo(screen, params = {}) {
  return createNav(screen, params);
}
