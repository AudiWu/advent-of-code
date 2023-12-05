import { readData } from '../utils';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);

  const newData = data.map((line) => {
    const [, draw, card] = line
      .trim()
      .split(/[:|]/)
      .map((e) =>
        e
          .trim()
          .split(/ +/)
          .map((n) => +n)
      );
    return { draw, card, count: 1, wins: 0 };
  });

  
  for (let i = 0; i < newData.length; i++) {
    const { draw, card, count } = newData[i];
    
    draw.forEach((d) => card.includes(d) && (newData[i].wins += 1));
    
    for (let j = 1; j <= newData[i].wins; j++) newData[j + i].count += count;
  }
  
  console.log(newData);
  
  const sum = [0, 0];

  sum[0] = newData
    .filter((e) => e.wins)
    .reduce((acc, { wins }) => acc + 2 ** (wins - 1), 0);

  sum[1] = newData.reduce((acc, { count }) => acc + count, 0);

  return sum[1];
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day4b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
