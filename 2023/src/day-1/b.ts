import { readData } from '../utils';
import chalk from 'chalk';
import { getSum } from './a';

const NUMBERS = [
  { word: 'one', value: 1 },
  { word: 'two', value: 2 },
  { word: 'three', value: 3 },
  { word: 'four', value: 4 },
  { word: 'five', value: 5 },
  { word: 'six', value: 6 },
  { word: 'seven', value: 7 },
  { word: 'eight', value: 8 },
  { word: 'nine', value: 9 },
];

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  const nums = turnIntoArrayOfNumberArrays(data);
  const total = getSum(nums);
  return total;
}

export function turnIntoArrayOfNumberArrays(data: string[]): number[] {
  const toReturn = data.map((line) => {
    const matchDigits = NUMBERS.map((number) => ({
      ...number,
      matches: Array.from(
        line.matchAll(new RegExp(`${number.word}|${number.value}`, 'g'))
      ),
    }));

    const filterZeroMatchesDigits = matchDigits.filter(
      ({ matches }) => matches.length > 0
    );

    const transformDigitsIntoValueAndIndex = filterZeroMatchesDigits.flatMap(
      ({ value, matches }) => {
        return matches.map(({ index }) => ({ value, index }));
      }
    );

    const sortDigitsByIndex = transformDigitsIntoValueAndIndex.sort(
      (a, b) => a.index - b.index
    );
    
    const first = sortDigitsByIndex[0];
    const last = sortDigitsByIndex[sortDigitsByIndex.length - 1];
    const digitsValue = Number(`${first.value}${last.value}`);

    return digitsValue;
  });

  return toReturn;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day1b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer Part 2:'), chalk.green(answer));
  });
}
