import { readData } from '../utils';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  const arrayOfNumberArrays = turnIntoArrayOfNumberArrays(data);
  const total = getSum(arrayOfNumberArrays);
  return total;
}

export function getSum(input: number[]): number {
  return input.reduce((acc, curr) => acc + curr, 0);
}

export function turnIntoArrayOfNumberArrays(data: string[]): number[] {
  const toReturn = [];

  for (const line of data) {
    const number = parseInt(getNumberFromString(line));
    toReturn.push(number);
  }

  return toReturn;
}

export function getNumberFromString(line: string): string {
  const numbers = [];

  for (let i = 0; i < line.length; i++) {
    const character = parseInt(line.charAt(i));

    if (!isNaN(character)) {
      numbers.push(character);
    }
  }

  return `${numbers[0]}${numbers[numbers.length - 1]}`;
}





// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day1a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer Part 1:'), chalk.green(answer));
  });
}
