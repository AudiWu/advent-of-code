import chalk from 'chalk';
import { readData } from '../utils';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const seedArray = data[0].split(': ')[1].split(/\s+/).map(Number);

  const startingLines = {
    Seed: 0,
    Soil: 0,
    Fertilizer: 0,
    Water: 0,
    Light: 0,
    Temp: 0,
    Humidity: 0,
  };

  for (let i = 1; i < data.length; i++) {
    switch (data[i]) {
      case 'seed-to-soil map:':
        startingLines['Seed'] = i;
        break;
      case 'soil-to-fertilizer map:':
        startingLines['Soil'] = i;
        break;
      case 'fertilizer-to-water map:':
        startingLines['Fertilizer'] = i;
        break;
      case 'water-to-light map:':
        startingLines['Water'] = i;
        break;
      case 'light-to-temperature map:':
        startingLines['Light'] = i;
        break;
      case 'temperature-to-humidity map:':
        startingLines['Temp'] = i;
        break;
      case 'humidity-to-location map:':
        startingLines['Humidity'] = i;
        break;
    }
  }

  let minLocation = Number.MAX_SAFE_INTEGER;

  for (const seed of seedArray) {
    let currentLoc = seed;

    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Seed'] + 1,
      startingLines['Soil'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Soil'] + 1,
      startingLines['Fertilizer'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Fertilizer'] + 1,
      startingLines['Water'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Water'] + 1,
      startingLines['Light'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Light'] + 1,
      startingLines['Temp'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Temp'] + 1,
      startingLines['Humidity'] - 1,
      data
    );
    currentLoc = getNextDestination(
      currentLoc,
      startingLines['Humidity'] + 1,
      data.length,
      data
    );

    minLocation = Math.min(minLocation, currentLoc);
  }

  return minLocation;
}

const getNextDestination = (
  id: number,
  startingLine: number,
  endingLine: number,
  lines: string[]
) => {
  for (let lineNum = startingLine; lineNum < endingLine; lineNum++) {
    const [destStart, sourceStart, span] = lines[lineNum]
      .split(/\s+/, 3)
      .map(Number);

    if (id >= sourceStart && id < sourceStart + span) {
      return destStart + (id - sourceStart);
    }
  }
  return id;
};

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day5a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
