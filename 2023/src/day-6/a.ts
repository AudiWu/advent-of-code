import { readData } from '../utils';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const times = data[0]
    .replace(/\s+/g, ',')
    .replace('Time:,', '')
    .split(',')
    .map((value) => Number(value));
  const distances = data[1]
    .replace(/\s+/g, ',')
    .replace('Distance:,', '')
    .split(',')
    .map((value) => Number(value));
  const record = getRecordWays(times, distances);
  const total = record.reduce((acc, curr) => acc * curr, 1);
  return total;
}

export function getRecordWays(times: number[], distances: number[]): number[] {
  const possibleRecord = [];

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distanceRecord = distances[i];
    const record = [];

    for (let j = 0; j <= time; j++) {
      const start = j;
      const end = time - start;
      const traveledDistance = start * end;

      record.push(traveledDistance);
    }

    const filterRecordByDistanceLimit = record.filter(
      (value) => value > distanceRecord
    );

    possibleRecord.push(filterRecordByDistanceLimit.length);
  }

  return possibleRecord;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day6a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
