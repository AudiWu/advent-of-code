import { readData } from '../utils';
import chalk from 'chalk';

export async function day10b(dataPath?: string) {
  const lines = await readData(dataPath);
  let start = {
    x: 0,
    y: 0,
  };
  const isLoop = [];

  for (let y = 0; y < lines.length; y++) {
    isLoop[y] = [];
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 'S') {
        start = { x, y };
      }
    }
  }

  let x = start.x;
  let y = start.y;
  let dir;
  const below = lines[y + 1][x];
  if (below === '|' || below === 'L' || below === 'J') {
    // S could be |, F, or 7. Don't really care which
    dir = 'S';
    y++;
  }
  if (!dir) {
    const above = lines[y - 1][x];
    if (above === '|' || above === 'F' || above === '7') {
      // S could be L or J (or | but that was caught earlier). Don't really care which
      dir = 'N';
      y--;
    }
  }
  if (!dir) {
    //only possible starting shape left is -, pick E or W arbitrarily
    dir = 'E';
    x++;
  }
  const path = [start, { x, y }];
  isLoop[start.y][start.x] = true;
  isLoop[y][x] = true;

  while (x !== start.x || y !== start.y) {
    let deltaX = 0;
    let deltaY = 0;
    switch (lines[y][x] + dir) {
      case '|S':
        deltaY = 1;
        break;
      case '|N':
        deltaY = -1;
        break;
      case '-E':
        deltaX = 1;
        break;
      case '-W':
        deltaX = -1;
        break;
      case 'LS':
        deltaX = 1;
        break;
      case 'LW':
        deltaY = -1;
        break;
      case 'JS':
        deltaX = -1;
        break;
      case 'JE':
        deltaY = -1;
        break;
      case '7N':
        deltaX = -1;
        break;
      case '7E':
        deltaY = 1;
        break;
      case 'FN':
        deltaX = 1;
        break;
      case 'FW':
        deltaY = 1;
        break;
      default:
        throw 'unrecognized ' + lines[y][x] + dir;
    }
    if (deltaY === 1) {
      dir = 'S';
    } else if (deltaY === -1) {
      dir = 'N';
    } else if (deltaX === -1) {
      dir = 'W';
    } else {
      dir = 'E';
    }
    x += deltaX;
    y += deltaY;
    isLoop[y] = isLoop[y] || [];
    isLoop[y][x] = true;
    path.push({ x, y });
  }

  let count = 0;
  for (let yy = 0; yy < lines.length; yy++) {
    let crosses = 0;
    const line = lines[yy];
    let corner: boolean | string = false;
    for (let xx = 0; xx < line.length; xx++) {
      if (isLoop[yy][xx]) {
        const current = lines[yy][xx];
        if (current === '|') {
          crosses++;
        } else if (current !== '-') {
          if (corner) {
            if (corner === 'L' && current === '7') {
              crosses++;
            } else if (corner === 'F' && current === 'J') {
              crosses++;
            }
            corner = false;
          } else {
            corner = current;
          }
        }
      } else if (crosses % 2 === 1) {
        count++;
      }
    }
  }
  console.log(count);
  return count;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day10b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer B:'), chalk.green(answer));
  });
}
