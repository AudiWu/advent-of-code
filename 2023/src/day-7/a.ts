import { readData } from '../utils';
import chalk from 'chalk';

export type Hand = { cards: string; bid: number; kinds: number[] };
export type CardCounts = Record<string, number>;

const RANKS = 'AKQJT98765432'.split('');

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);
  const toKinds = (counts: CardCounts) => Object.values(counts);
  console.log(toKinds);
  return data
    .map(lineToHand(toKinds))
    .toSorted(compare(RANKS))
    .reduce((sum, { bid }, i) => sum + bid * (i + 1), 0);
}

export function compare(cardRanks: string[]) {
  return (h1: Hand, h2: Hand) => {
    for (let i = 0; i < 5; i++) {
      if (!h1.kinds[i] || !h2.kinds[i]) break;
      if (h1.kinds[i] > h2.kinds[i]) return 1;
      if (h1.kinds[i] < h2.kinds[i]) return -1;
    }

    for (let i = 0; i < 5; i++) {
      if (cardRanks.indexOf(h1.cards[i]) < cardRanks.indexOf(h2.cards[i]))
        return 1;
      if (cardRanks.indexOf(h1.cards[i]) > cardRanks.indexOf(h2.cards[i]))
        return -1;
    }

    return 0;
  };
}

export function lineToHand(toKinds: (arg0: CardCounts) => number[]) {
  return (line: string) => {
    const [cards, bid] = line.split(' ');
    const counts: CardCounts = {};

    for (let i = 0; i < cards.length; i++) {
      if (counts[cards[i]]) counts[cards[i]]++;
      else counts[cards[i]] = 1;
    }

    const kinds = toKinds(counts);

    kinds.sort((a, b) => b - a);
    
    return { cards, kinds, bid: Number(bid) };
  };
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day7a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
