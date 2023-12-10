import { readData } from '../utils';
import chalk from 'chalk';
import { getExtrapolateNumbers } from './a';

export async function day9b(dataPath?: string) {
  const data = await readData(dataPath);
  const numberArray = data.map((line) =>
    line
      .split(' ')
      .map((value) => Number(value))
      .reverse()
  );
  const extrapolateNumbers = getExtrapolateNumbers(numberArray);
  return extrapolateNumbers.reduce((acc, curr) => acc + curr, 0);
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day9b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
