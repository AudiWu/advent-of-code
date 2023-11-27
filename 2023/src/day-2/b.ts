import { readData } from '../utils';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  const moves = parseInput(data);
  const scores = moves.map(getScore);
  const score = scores.reduce((acc, curr) => acc + curr, 0);
  return score;
}

export const DRAW_SCORE = 3;
export const WIN_SCORE = 6;

export const ROCK = 1;
export const PAPER = 2;
export const SCISSORS = 3;

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
    return score;
  }
  switch (ourMove) {
    case 'rock':
      return score + (theirMove === 'scissors' ? WIN_SCORE : 0);
    case 'paper':
      return score + (theirMove === 'rock' ? WIN_SCORE : 0);
    case 'scissors':
      return score + (theirMove === 'paper' ? WIN_SCORE : 0);
  }
}

type Choice = 'rock' | 'paper' | 'scissors';

type Move = { ourMove: Choice; theirMove: Choice };

function parseInput(input: string[]): Move[] {
  return input.map((inputStr) => {
    const [theirInput, ourInput] = inputStr.split(' ');
    const theirMove =
      theirInput === 'A' ? 'rock' : theirInput === 'B' ? 'paper' : 'scissors';
    const ourMoveMap: Record<Choice, Record<'X' | 'Y' | 'Z', Choice>> = {
      rock: {
        X: 'scissors',
        Y: 'rock',
        Z: 'paper',
      },
      paper: {
        X: 'rock',
        Y: 'paper',
        Z: 'scissors',
      },
      scissors: {
        X: 'paper',
        Y: 'scissors',
        Z: 'rock',
      },
    };
    const ourMove = ourMoveMap[theirMove][ourInput];
    return { ourMove, theirMove };
  });
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
