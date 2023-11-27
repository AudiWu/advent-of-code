import { readData } from '../utils';
import chalk from 'chalk';

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const grid = parseInput(data);
  console.log(grid);
  return getVisibleCount(grid);
}

function getVisibleCount(grid: Grid): number {
  let count = 0;
  const isVisibleMap: Record<number, Record<number, boolean>> = {};
  for (let i = 0; i < grid.height; i++) {
    isVisibleMap[i] = {};
    for (let j = 0; j < grid.width; j++) {
      const isTreeVisible = isVisible(grid, j, i);
      isVisibleMap[i][j] = isTreeVisible ? true : false;
      count += isTreeVisible;
    }
  }
  console.log(isVisibleMap);
  return count;
}

function isVisible(grid: Grid, x: number, y: number): 0 | 1 {
  if (x === 0 || x === grid.width) {
    return 1;
  }
  if (y === 0 || y === grid.height) {
    return 1;
  }
  function isVisibleFromNorth() {
    for (let i = y - 1; i >= 0; i--) {
      if (grid.data[i][x] >= grid.data[y][x]) {
        return false;
      }
    }
    return true;
  }
  function isVisibleFromSouth() {
    for (let i = y + 1; i < grid.height; i++) {
      if (grid.data[i][x] >= grid.data[y][x]) {
        return false;
      }
    }
    return true;
  }
  function isVisibleFromEast() {
    for (let i = x + 1; i < grid.width; i++) {
      if (grid.data[y][i] >= grid.data[y][x]) {
        return false;
      }
    }
    return true;
  }
  function isVisibleFromWest() {
    for (let i = x - 1; i >= 0; i--) {
      if (grid.data[y][i] >= grid.data[y][x]) {
        return false;
      }
    }
    return true;
  }
  return isVisibleFromEast() ||
    isVisibleFromNorth() ||
    isVisibleFromSouth() ||
    isVisibleFromWest()
    ? 1
    : 0;
}

type Grid = {
  height: number;
  width: number;
  data: Record<number, Record<number, number>>;
};

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
  day8a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
