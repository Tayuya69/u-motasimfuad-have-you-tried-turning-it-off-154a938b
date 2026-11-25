import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Have you tried turning it off and on again? If that doesn't work, try turning it off, counting to ten, and apologizing to it — mine only behaves when it feels respected.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Post-write read-back verification: re-read the written entry output file
// and assert it is exactly the entry line (169 characters, 171 UTF-8 bytes,
// no trailing newline). Fails loudly on any mismatch.
import { readFileSync } from "node:fs";
import { join } from "node:path";
const __verifyDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const __verifyPath = join(__verifyDir, "entry.txt");
const __expectedEntry =
  "Have you tried turning it off and on again? If that doesn't work, try turning it off, counting to ten, and apologizing to it — mine only behaves when it feels respected.";
const __back = readFileSync(__verifyPath, "utf8");
if (__back !== __expectedEntry) throw new Error("read-back mismatch: written entry.txt differs from the entry");
if (__back.length !== 169) throw new Error(`read-back mismatch: expected 169 characters, got ${__back.length}`);
if (Buffer.byteLength(__back, "utf8") !== 171) throw new Error(`read-back mismatch: expected 171 UTF-8 bytes, got ${Buffer.byteLength(__back, "utf8")}`);
if (__back.endsWith("\n")) throw new Error("read-back mismatch: trailing newline present");
console.log("read-back verification passed: entry.txt is exactly the entry (169 chars, 171 bytes, no trailing newline)");
