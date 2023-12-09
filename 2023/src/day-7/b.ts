import { readData } from '../utils';
import chalk from 'chalk';
import { CardCounts, compare, lineToHand } from './a';

const RANKS = 'AKQT98765432J'.split('');

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);

  const toKinds = (counts: CardCounts) => {
    const maxCard = Object.keys(counts)
      .filter((c) => c !== 'J')
      .sort((a, b) => counts[b] - counts[a])[0];
    if (counts.J && maxCard) {
      counts[maxCard] += counts.J;
      delete counts.J;
    }
    return Object.values(counts);
  };
  
  return data
    .map(lineToHand(toKinds))
    .sort(compare(RANKS))
    .reduce((sum, { bid }, i) => sum + bid * (i + 1), 0);
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day7b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
