import { readData } from '../utils';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  const input = data[0].split('');
  for (let i = 13; i < input.length; i += 1) {
    const lastSet = [];
    for (let j = 0; j < 14; j += 1) {
      lastSet.push(input[i - j]);
    }
    const unique = new Set(lastSet);
    console.log(unique);
    if (unique.size === 14) {
      return i + 1;
    }
  }
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day6b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
