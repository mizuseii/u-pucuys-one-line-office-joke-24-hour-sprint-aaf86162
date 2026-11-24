import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate requires /output/entry.txt to be UTF-8 text of 1-200 characters,
// a single line, and not only white space. This entry is 154 characters.
const MAX_CHARS = 200;

const JOKE =
  "Dave's birthday card has been going round the office for signatures since March, but Dave left in April, so now we're signing a farewell card for a ghost.";

if ([...JOKE].length < 1 || [...JOKE].length > MAX_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} characters, got ${[...JOKE].length}`,
  );
}
if (JOKE.includes("\n") || JOKE.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
