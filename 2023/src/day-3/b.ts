import { readData } from '../utils';
import chalk from 'chalk';

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const groups = parseInput(data);
  const sharedItems = groups.map((group) => findSharedItem(group));
  console.log(sharedItems);
  const score = sharedItems
    .map((item) => scoreMap[item])
    .reduce((acc, item) => acc + item, 0);
  return score;
}

type Group = {
  firstRucksack: string;
  secondRucksack: string;
  thirdRucksack: string;
};

function findSharedItem({
  firstRucksack,
  secondRucksack,
  thirdRucksack,
}: Group): string {
  const itemsMap = firstRucksack.split('').reduce((acc, item) => {
    acc[item] = 1;
    return acc;
  }, {});
  for (const item of secondRucksack.split('')) {
    if (itemsMap[item] === 1) {
      itemsMap[item] = 2;
    }
  }
  for (const item of thirdRucksack.split('')) {
    if (itemsMap[item] === 2) {
      return item;
    }
  }
  throw new Error('no matches');
}

function parseInput(input: string[]): Group[] {
  const groups: Group[] = [];
  for (let i = 0; i < input.length; i++) {
    if (i % 3 === 0) {
      groups.push({
        firstRucksack: input[i],
        secondRucksack: '',
        thirdRucksack: '',
      });
    }
    if (i % 3 === 1) {
      groups[groups.length - 1].secondRucksack = input[i];
    }
    if (i % 3 === 2) {
      groups[groups.length - 1].thirdRucksack = input[i];
    }
  }
  return groups;
}

const scoreMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day3b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
