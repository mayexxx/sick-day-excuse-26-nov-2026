import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const line = 'Hey, won\'t be in today\u2014tried to move the sectional alone and I\u2019m currently pinned against the wall in a way that suggests this is just where I live now.';

const length = Array.from(line).length;
if (length < 1 || length > 200 || /[\r\n]/.test(line)) {
  throw new Error('Invalid line');
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
mkdirSync(outputDir, { recursive: true });
writeFileSync(`${outputDir}/entry.txt`, `${line}\n`);

const written = readFileSync(`${outputDir}/entry.txt`, 'utf8');
const readBackLine = written.endsWith('\n') ? written.slice(0, -1) : written;
const readBackLength = Array.from(readBackLine).length;
if (written !== `${line}\n` || readBackLength !== length ||
    readBackLength < 1 || readBackLength > 200 || /[\r\n]/.test(readBackLine)) {
  throw new Error('Written entry failed validation');
}
