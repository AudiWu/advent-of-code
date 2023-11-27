import { readData } from '../utils';
import chalk from 'chalk';

export const DRAW_SCORE = 3;
export const WIN_SCORE = 6;

export const ROCK = 1;
export const PAPER = 2;
export const SCISSORS = 3;

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const moves = parseInput(data);
  const score = moves.map(getScore).reduce((acc, curr) => acc + curr, 0);
  return score;
}

function getScore({ ourMove, theirMove }: Move): number {
  let score = 0;
  if (ourMove === 'rock') {
    score += 1;
  } else if (ourMove === 'paper') {
    score += 2;
  } else if (ourMove === 'scissors') {
    score += 3;
  }
  if (ourMove === theirMove) {
    score += DRAW_SCORE;
  }
  switch (ourMove) {
    case 'rock':
      score += theirMove === 'scissors' ? WIN_SCORE : 0;
      break;
    case 'paper':
      score += theirMove === 'rock' ? WIN_SCORE : 0;
      break;
    case 'scissors':
      score += theirMove === 'paper' ? WIN_SCORE : 0;
      break;
  }
  return score;
}

type Choice = 'rock' | 'paper' | 'scissors';

type Move = { ourMove: Choice; theirMove: Choice };

function parseInput(input: string[]): Move[] {
  return input.map((inputStr) => {
    const [theirInput, ourInput] = inputStr.split(' ');
    const [ourMove, theirMove] = [ourInput, theirInput].map((input) => {
      switch (input) {
        case 'A':
        case 'X':
          return 'rock' as const;
        case 'B':
        case 'Y':
          return 'paper' as const;
        case 'C':
        case 'Z':
          return 'scissors' as const;
      }
    });
    return { ourMove, theirMove };
  });
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
