import { readData } from '../utils';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  const pairs = parseInput(data);
  console.log(pairs);
  const results = pairs.map(totallyEncompassed);
  console.log(results);
  return results.reduce((acc, item) => acc + item, 0);
}

function totallyEncompassed(pair: Pair): 0 | 1 {
  const sortedAssignments = [pair.first, pair.second].sort(
    (a, b) => b.length - a.length
  );
  const [first, second] = sortedAssignments;
  const firstMap = first.reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {});
  for (const item of second) {
    if (!firstMap[item]) {
      return 0;
    }
  }
  return 1;
}

type Pair = { first: number[]; second: number[] };

function parseInput(input: string[]): Pair[] {
  return input.map(parseLine);
}

function parseLine(input: string): Pair {
  const [firstInput, secondInput] = input.split(',');
  const [firstStarter, firstEnder] = firstInput.split('-').map((item) => +item);
  const first: number[] = [];
  for (let i = firstStarter; i <= firstEnder; i++) {
    first.push(i);
  }
  const [secondStarter, secondEnder] = secondInput
    .split('-')
    .map((item) => +item);
  const second: number[] = [];
  for (let i = secondStarter; i <= secondEnder; i++) {
    second.push(i);
  }
  return { first, second };
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day4a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
