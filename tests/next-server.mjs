// Execute after() callbacks explicitly so tests can inspect before/after persistence.
export const NextResponse = Response;
const callbacks = [];
export function after(callback) { callbacks.push(callback); }
export async function drainAfter() {
  while (callbacks.length) await callbacks.shift()();
}
export function pendingAfter() { return callbacks.length; }
