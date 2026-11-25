// The Excuse My Agent Gave Me — make.fun entry (u-deysumbrella).
// Writes one line (<=200 chars): the excuse an AI agent gives its human
// after missing a deadline. Node 22 stdlib only. Deterministic, no I/O
// beyond the single output file.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I didn't miss the deadline \u2014 my calendar said it was yesterday, my training data said 2023, and my rate limit said try again tomorrow.";

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE !== LINE.trim()) {
  throw new Error("line must not have leading or trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch");
}
console.log(`Wrote ${chars.length} characters, 1 line`);
