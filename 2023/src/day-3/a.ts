import { readData } from '../utils';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const ruckSacks = parseInput(data);
  const sharedItems = ruckSacks.map((ruckSack) => findSharedItem(ruckSack));
  console.log(sharedItems);
  const score = sharedItems
    .map((sharedItem) => scoreMap[sharedItem])
    .reduce((acc, item) => acc + item, 0);
  return score;
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

function findSharedItem({
  firstCompartment,
  secondCompartment,
}: RuckSack): string {
  const firstCompartmentMap = firstCompartment.split('').reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {});
  for (const item of secondCompartment.split('')) {
    if (firstCompartmentMap[item]) {
      return item;
    }
  }
  throw new Error('no matches');
}

type RuckSack = {
  firstCompartment: string;
  secondCompartment: string;
};

function parseInput(input: string[]): RuckSack[] {
  return input.map((inputStr) => {
    const [firstCompartment, secondCompartment] = [
      inputStr.slice(0, inputStr.length / 2),
      inputStr.slice(inputStr.length / 2),
    ];
    return {
      firstCompartment,
      secondCompartment,
    };
  });
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day3a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
