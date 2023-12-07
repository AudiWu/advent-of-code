import { readData } from '../utils';
import chalk from 'chalk';
import { getRecordWays } from './a';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  const times = [
    Number(
      data[0].replace(/\s+/g, '').replace('Time:', '').split(',').join('')
    ),
  ];
  const distances = [
    Number(
      data[1].replace(/\s+/g, '').replace('Distance:', '').split(',').join('')
    ),
  ];
  const record = getRecordWays(times, distances);
  const total = record.reduce((acc, curr) => acc * curr, 1);
  return total;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day6b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
