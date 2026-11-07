// 用無頭 Edge（CDP）模擬手機：開頁面 → 點漢堡按鈕 → 量選單尺寸並截圖
// 用法：node menu-test.mjs <url> <輸出png>
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, outPng] = process.argv.slice(2);
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9333;
const profile = mkdtempSync(join(tmpdir(), "edge-cdp-"));
const proc = spawn(edge, ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.some((t) => t.type === "page")) break; } catch {}
  await sleep(200);
}
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result?.result?.value;

await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await send("Page.enable");
await send("Page.navigate", { url });
await sleep(4000);

const measure = `(() => { const m = document.getElementById('mobile-menu'); const r = m.getBoundingClientRect();
  return { hidden: m.hidden, display: getComputedStyle(m).display, top: Math.round(r.top), height: Math.round(r.height), links: m.querySelectorAll('a').length }; })()`;
console.log("before:", JSON.stringify(await evaluate(measure)));

// 以真實的觸控點擊漢堡按鈕中心
const box = await evaluate(`(() => { const b = document.querySelector('button[aria-controls="mobile-menu"]'); const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, visible: r.width > 0 }; })()`);
console.log("button:", JSON.stringify(box));
for (const type of ["mousePressed", "mouseReleased"]) {
  await send("Input.dispatchMouseEvent", { type, x: box.x, y: box.y, button: "left", clickCount: 1 });
}
await sleep(800);
console.log("after :", JSON.stringify(await evaluate(measure)), "aria-expanded=" + (await evaluate(`document.querySelector('button[aria-controls="mobile-menu"]').getAttribute('aria-expanded')`)));

const shot = await send("Page.captureScreenshot", { format: "png" });
writeFileSync(outPng, Buffer.from(shot.result.data, "base64"));
ws.close();
proc.kill();
process.exit(0);
