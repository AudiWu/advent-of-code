import { readData } from '../utils';
import chalk from 'chalk';
import { transformToGameData } from './a';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const games = transformToGameData(data);
  const sum = games.reduce((acc, curr) => acc + curr.total, 0);
  return sum;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
