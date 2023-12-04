import { readData } from '../utils';
import chalk from 'chalk';

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const grid = transformLineToArray(data);
  const parts = getSymbolAdjacentNumbers(grid);
  const sum = parts.reduce((acc, curr) => acc + curr, 0);
  return sum;
}

const isDigit = (char: string) => /[0-9]/.test(char);

const isSymbol = (char: string) => char !== '.' && !isDigit(char);

const isGear = (char: string) => char === '*';

export function transformLineToArray(data: string[]): string[][] {
  const array = [];

  for (const line of data) {
    const splitLine = line.split('');

    array.push(splitLine);
  }

  return array;
}

export function getSymbolAdjacentNumbers(grid: string[][]): number[] {
  const result = [];

  eachMatrix(grid, (char, coords) => {
    if (isSymbol(char)) {
      eachSurrounding(grid, coords, (adj, adjCoords) => {
        if (isDigit(adj)) {
          result.push(extractNumber(grid, adjCoords));
        }
      });
    }
  });

  return result;
}

export function getRatios(grid: string[][]): number[] {
  const ratios = [];

  eachMatrix(grid, (char, coords) => {
    if (isGear(char)) {
      const parts = [];

      eachSurrounding(grid, coords, (adj, adjCoords) => {
        if (isDigit(adj)) {
          parts.push(extractNumber(grid, adjCoords));
        }
      });

      if (parts.length === 2) {
        ratios.push(parts[0] * parts[1]);
      }
    }
  });

  return ratios;
}

export function extractNumber(
  grid: string[][],
  [x, y]: [number, number]
): number {
  let number = '';
  let pos = x;

  while (isDigit(grid[y][pos])) {
    pos -= 1;
  }

  pos += 1;

  while (isDigit(grid[y][pos])) {
    number += grid[y][pos];
    grid[y][pos] = 'X';
    pos += 1;
  }

  return Number(number);
}

export function eachMatrix(matrix: string[][], callbackFn: (...any) => void) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      callbackFn(matrix[y][x], [x, y], matrix);
    }
  }
}

export function hasProp(val, prop) {
  if (val == null) {
    return false;
  }

  return Object.hasOwnProperty.call(val, prop);
}

export function callAtCoords(matrix, coords, callFn) {
  const [x, y] = coords;

  if (hasProp(matrix, y) && hasProp(matrix[y], x)) {
    callFn(matrix[y][x], coords, matrix);
  }
}

export function eachSurrounding(matrix, [x, y], eachFn) {
  callAtCoords(matrix, [x, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y - 1], eachFn);
  callAtCoords(matrix, [x + 1, y], eachFn);
  callAtCoords(matrix, [x + 1, y + 1], eachFn);
  callAtCoords(matrix, [x, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y + 1], eachFn);
  callAtCoords(matrix, [x - 1, y], eachFn);
  callAtCoords(matrix, [x - 1, y - 1], eachFn);
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day3a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
