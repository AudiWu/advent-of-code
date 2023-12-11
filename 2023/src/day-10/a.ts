import { readData } from '../utils';
import chalk from 'chalk';

export type Pos = [number, number];

export async function day10a(dataPath?: string) {
  const data = await readData(dataPath);

  let start = {
    x: 0,
    y: 0,
  };

  for (let y = 0; y < data.length; y++) {
    const line = data[y];
    for (let x = 0; x < line.length; x++) {
      if (line[x] === 'S') {
        start = { x, y };
      }
    }
  }

  let x = start.x;
  let y = start.y;
  let dir;
  const below = data[y + 1][x];

  if (below === '|' || below === 'L' || below === 'J') {
    dir = 'S';
    y++;
  }

  if (!dir) {
    const above = data[y - 1][x];
    if (above === '|' || above === 'F' || above === '7') {
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
  let steps = 1;

  while (x !== start.x || y !== start.y) {
    let deltaX = 0;
    let deltaY = 0;
    
    switch (data[y][x] + dir) {
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
        throw 'unrecognized ' + data[y][x] + dir;
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
    steps++;
    path.push({ x, y });
  }
  
  return steps / 2;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day10a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
