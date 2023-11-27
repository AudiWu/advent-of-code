import { readData } from '../utils';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const arrayOfNumberArrays = turnIntoArrayOfNumberArrays(data);
  const maxSum = arrayOfNumberArrays.map(getSum).reduce(max, 0);
  return maxSum;
}

function max(accumulator: number, currentValue: number): number {
  return Math.max(accumulator, currentValue);
}

export function getSum(input: number[]): number {
  return input.reduce((acc, curr) => acc + curr, 0);
}

export function turnIntoArrayOfNumberArrays(data: string[]): number[][] {
  const toReturn = [[]];
  for (const line of data) {
    if (line === '') {
      toReturn.push([]);
    } else {
      toReturn[toReturn.length - 1].push(+line);
    }
  }
  return toReturn;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day1a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
