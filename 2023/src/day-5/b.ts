import chalk from 'chalk';
import { readFile } from 'fs/promises';

interface Mapping {
  destStart: number;
  destEnd: number;
  srcStart: number;
  srcEnd: number;
}

function parseInput(input: string): {
  seeds: number[];
  mapMatrix: Mapping[][];
} {
  const lines = input.split('\n\n');
  const seeds = lines.shift()!.split(':')[1].trim().split(' ').map(Number);

  const mapMatrix = lines.map((line) =>
    line
      .split('\n')
      .slice(1)
      .map((s) => s.split(' ').map(Number))
      .map(([destStart, srcStart, length]) => ({
        destStart,
        destEnd: destStart + length - 1,
        srcStart,
        srcEnd: srcStart + length - 1,
      }))
  );
  
  return { seeds, mapMatrix };
}

function lookupLocation(mapMatrix: Mapping[][], val: number) {
  return mapMatrix.reduce((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];

      if (curr >= m.srcStart && curr <= m.srcEnd) {
        return m.destStart + (curr - m.srcStart);
      }
    }
    return curr;
  }, val);
}

function lookupSeed(mapMatrix: Mapping[][], val: number) {
  // Backwards lookup
  return mapMatrix.reduceRight((curr, mappings) => {
    for (let i = 0; i < mappings.length; i++) {
      const m = mappings[i];

      if (curr >= m.destStart && curr <= m.destEnd) {
        return m.srcStart + (curr - m.destStart);
      }
    }
    return curr;
  }, val);
}

export async function day5b(dataPath?: string) {
  const path = dataPath ?? 'data/day-5/b.txt';
  const input = (await readFile(path)).toString();
  const { seeds, mapMatrix } = parseInput(input);

  const validSeed = (seed: number) => {
    for (let i = 0; i < seeds.length; i += 2) {
      if (seed >= seeds[i] && seed < seeds[i] + seeds[i + 1]) return true;
    }
    return false;
  };

  const candidateSeeds = mapMatrix
    .flatMap((mappings, i) =>
      mappings.map((m) => lookupSeed(mapMatrix.slice(0, i + 1), m.destStart))
    )
    .filter(validSeed);

  return Math.min(...candidateSeeds.map((s) => lookupLocation(mapMatrix, s)));
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day5b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
