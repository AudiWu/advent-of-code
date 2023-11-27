import { readData } from '../utils';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const input = data[0].split('');
  for (let i = 3; i < input.length; i += 1) {
    const lastFour = [input[i - 3], input[i - 2], input[i - 1], input[i]];
    const unique = new Set(lastFour);
    console.log(lastFour, unique);
    if (unique.size === 4) {
      return i + 1;
    }
  }
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day6a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
