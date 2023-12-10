import { readData } from '../utils';
import chalk from 'chalk';

export async function day9a(dataPath?: string) {
  const data = await readData(dataPath);
  const numberArray = data.map((line) =>
    line.split(' ').map((value) => Number(value))
  );
  const extrapolateNumbers = getExtrapolateNumbers(numberArray);
  return extrapolateNumbers.reduce((acc, curr) => acc + curr, 0);
}

export function getExtrapolateNumbers(arrays: number[][]): number[] {
  const result = [];

  for (const array of arrays) {
    const extrapolateNumber = calculateExtrapolateNumber(array);
    result.push(extrapolateNumber);
  }

  return result;
}

export function calculateExtrapolateNumber(
  numbers: number[],
  lastNumbers = []
): number {
  const lastNumber = numbers[numbers.length - 1];
  const sequences = [];
  let diff = 0;

  lastNumbers.push(lastNumber);

  for (let i = 0; i < numbers.length - 1; i++) {
    const firstNumber = numbers[i];
    const secondNumber = numbers[i + 1];
    diff = secondNumber - firstNumber;
    sequences.push(diff);
  }

  if (isSequence(sequences)) {
    lastNumbers.push(diff);
    return lastNumbers.reduce((acc, curr) => acc + curr, 0);
  }

  return calculateExtrapolateNumber(sequences, lastNumbers);
}

export function isSequence(sequences: number[]) {
  const target = sequences[0];

  for (const sequence of sequences) {
    if (sequence !== target) {
      return false;
    }
  }

  return true;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day9a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
