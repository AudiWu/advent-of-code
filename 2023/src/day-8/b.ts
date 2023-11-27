import { readData } from '../utils';
import chalk from 'chalk';

type Grid = {
  height: number;
  width: number;
  data: Record<number, Record<number, number>>;
};

export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);
  const grid = parseInput(data);
  const scores = getGridViewScores(grid);

  return getMax(scores);
}

function getMax(scores: Grid['data']): number {
  let max = 0;
  for (let i = 0; i < Object.keys(scores).length; i++) {
    for (let j = 0; j < Object.keys(scores[i]).length; j++) {
      if (scores[i][j] > max) {
        max = scores[i][j];
      }
    }
  }
  return max;
}

function getGridViewScores(grid: Grid): Grid['data'] {
  const scores: Grid['data'] = {};
  for (let i = 0; i < grid.height; i++) {
    scores[i] = {};
    for (let j = 0; j < grid.width; j++) {
      const score = getScore(grid, i, j);
      scores[i][j] = score;
    }
  }
  return scores;
}

function getScore(grid: Grid, y: number, x: number): number {
  const nScore = northScore(grid, y, x);
  const sScore = southScore(grid, y, x);
  const eScore = eastScore(grid, y, x);
  const wScore = westScore(grid, y, x);
  if (x === 2 && y === 2) {
    console.log(`[${x}, ${y}]`, 'nScore', nScore);
    console.log(`[${x}, ${y}]`, 'sScore', sScore);
    console.log(`[${x}, ${y}]`, 'eScore', eScore);
    console.log(`[${x}, ${y}]`, 'wScore', wScore);
  }
  return nScore * sScore * eScore * wScore;
}

function northScore(grid: Grid, y: number, x: number): number {
  let score = 0;
  for (let i = y - 1; i >= 0; i--) {
    score++;
    if (grid.data[i][x] >= grid.data[y][x]) {
      break;
    }
  }
  return score;
}

function southScore(grid: Grid, y: number, x: number): number {
  let score = 0;
  for (let i = y + 1; i < grid.height; i++) {
    score++;
    if (grid.data[i][x] >= grid.data[y][x]) {
      break;
    }
  }
  return score;
}

function eastScore(grid: Grid, y: number, x: number): number {
  let score = 0;
  for (let i = x + 1; i < grid.width; i++) {
    score++;
    if (grid.data[y][i] >= grid.data[y][x]) {
      break;
    }
  }
  return score;
}

function westScore(grid: Grid, y: number, x: number): number {
  let score = 0;
  for (let i = x - 1; i >= 0; i--) {
    score++;
    if (grid.data[y][i] >= grid.data[y][x]) {
      break;
    }
  }
  return score;
}

function parseInput(input: string[]): Grid {
  const data: Grid['data'] = {};
  for (let i = 0; i < input.length; i++) {
    data[i] = {};
    const line = input[i];
    const trees = line.split('').map((str) => +str);
    for (let j = 0; j < trees.length; j++) {
      data[i][j] = trees[j];
    }
  }
  return {
    height: Object.keys(data).length,
    width: Object.keys(data[0]).length,
    data,
  };
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day8b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
