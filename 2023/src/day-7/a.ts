import { readData } from '../utils';
import chalk from 'chalk';

const SIZE_LIMIT = 100000;

export async function day7a(dataPath?: string) {
  const data = await readData(dataPath);
  const fileSystem = parseDirectory(data);
  console.log(fileSystem);
  const smallEnoughDirs = getSmallEnoughDirs(fileSystem);
  const answer = getSumOfSizes(smallEnoughDirs);
  return answer;
}

function getSumOfSizes(smallEnoughDirs: { dirName: string; size: number }[]) {
  return smallEnoughDirs.map(({ size }) => size).reduce((a, b) => a + b, 0);
}

function getSmallEnoughDirs(
  fileSystem: Record<
    string,
    { dirNames: string[]; files: { name: string; size: number }[] }
  >
): { dirName: string; size: number }[] {
  const smallEnough: { dirName: string; size: number }[] = [];
  for (const [dirName, { files }] of Object.entries(fileSystem)) {
    const allFiles = [...files];
    for (const otherDirName of Object.keys(fileSystem)) {
      if (otherDirName !== dirName && otherDirName.startsWith(dirName)) {
        allFiles.push(...fileSystem[otherDirName].files);
      }
    }
    const size = allFiles.map(({ size }) => size).reduce((a, b) => a + b, 0);
    if (size < SIZE_LIMIT) {
      smallEnough.push({ dirName, size });
    }
  }
  return smallEnough;
}

interface Directory {
  files: { name: string; size: number }[];
  directories: Directory[];
}

function parseDirectory(
  input: string[]
): Record<
  string,
  { dirNames: string[]; files: { name: string; size: number }[] }
> {
  let currentPath = '/';
  let i = 0;
  const pathMap: Record<
    string,
    { dirNames: string[]; files: { name: string; size: number }[] }
  > = {};
  while (i < input.length) {
    const line = input[i];
    if (line.startsWith('$ cd')) {
      if (line.startsWith('$ cd /')) {
        currentPath = '/';
      } else if (line.startsWith('$ cd ..')) {
        currentPath = currentPath.slice(0, currentPath.lastIndexOf('/'));
      } else {
        currentPath = `${currentPath}${
          currentPath === '/' ? '' : '/'
        }${line.slice(5)}`;
      }
      i++;
    } else if (line.startsWith('$ ls')) {
      const dirNames: string[] = [];
      const files: { name: string; size: number }[] = [];
      i++;
      while (input[i] && !input[i].startsWith('$')) {
        if (input[i].startsWith('dir')) {
          dirNames.push(input[i].slice(4));
        } else {
          const [size, name] = input[i].split(' ');
          files.push({ name, size: +size });
        }
        i++;
      }
      pathMap[currentPath] = { dirNames, files };
    }
  }
  // console.log(pathMap);
  return pathMap;
  // return { files: [], directories: [] };
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day7a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
