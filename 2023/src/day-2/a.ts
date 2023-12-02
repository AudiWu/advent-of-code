import { readData } from '../utils';
import chalk from 'chalk';

enum Color {
  RED = 'red',
  GREEN = 'green',
  BLUE = 'blue',
}

type Cubes = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  id: number;
  isSatisfiesConfig: boolean;
  maxCubes: Cubes;
  total: number;
};

const BAG_OF_CUBES_LIMIT = {
  red: 12,
  green: 13,
  blue: 14,
};

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  const games = transformToGameData(data);
  const filterGamesByCubesLimit = games.filter(
    (game) => game.isSatisfiesConfig === true
  );
  const sum = filterGamesByCubesLimit.reduce((acc, curr) => acc + curr.id, 0);

  return sum;
}

export function transformToGameData(data: string[]): Game[] {
  const newData = [];

  for (const line of data) {
    const initialGameData: Game = {
      id: 0,
      isSatisfiesConfig: true,
      maxCubes: {
        red: 0,
        green: 0,
        blue: 0,
      },
      total: 0,
    };

    const splitByGameId = line.split(': ');
    const gameValues = splitByGameId[0].split(' ');
    const gameId = Number(gameValues[1]);
    const sets = splitByGameId[1].split('; ');

    initialGameData.id = Number(gameId);

    for (const set of sets) {
      const cubes = set.split(', ');

      for (const cube of cubes) {
        const values = cube.split(' ');
        const cubeValue = Number(values[0]);
        const cubeColor = values[1];

        if (cubeColor === Color.RED) {
          initialGameData.maxCubes.red = Math.max(
            initialGameData.maxCubes.red,
            cubeValue
          );

          if (!(cubeValue <= BAG_OF_CUBES_LIMIT.red)) {
            initialGameData.isSatisfiesConfig = false;
          }
        }

        if (cubeColor === Color.GREEN) {
          initialGameData.maxCubes.green = Math.max(
            initialGameData.maxCubes.green,
            cubeValue
          );

          if (!(cubeValue <= BAG_OF_CUBES_LIMIT.green)) {
            initialGameData.isSatisfiesConfig = false;
          }
        }

        if (cubeColor === Color.BLUE) {
          initialGameData.maxCubes.blue = Math.max(
            initialGameData.maxCubes.blue,
            cubeValue
          );

          if (!(cubeValue <= BAG_OF_CUBES_LIMIT.blue)) {
            initialGameData.isSatisfiesConfig = false;
          }
        }
      }
    }

    initialGameData.total =
      initialGameData.maxCubes.red *
      initialGameData.maxCubes.green *
      initialGameData.maxCubes.blue;

    newData.push(initialGameData);
  }

  return newData;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day2a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
