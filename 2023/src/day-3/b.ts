import { readData } from '../utils';
import chalk from 'chalk';
import { getRatios, transformLineToArray } from './a';

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const grid = transformLineToArray(data);
  const ratios = getRatios(grid);
  const sum = ratios.reduce((acc, curr) => acc + curr, 0);
  return sum;
}
// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day3b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
