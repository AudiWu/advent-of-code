import { readData } from '../utils';
import chalk from 'chalk';

export async function day7b(dataPath?: string) {
  const data = await readData(dataPath);
  const fileSystem = parseDirectory(data);
  console.log(fileSystem);
  const hardDriveSize = 70000000;
  const targetSize = 30000000;
  const spaceUsed = getSpaceUsed(fileSystem);
  console.log(spaceUsed);
  const targetSpace = spaceUsed - 40000000;
  const directoriesBigEnough = getDirectoriesBigEnough(fileSystem, targetSpace);
  console.log(directoriesBigEnough);
  return directoriesBigEnough.reduce(
    (acc, { size }) => (acc === -1 ? size : Math.min(acc, size)),
    -1
  );
}

function getSpaceUsed(
  fileSystem: Record<
    string,
    { dirNames: string[]; files: { name: string; size: number }[] }
  >
): number {
  return Object.values(fileSystem).reduce(
    (acc, curr) => acc + curr.files.reduce((a, b) => a + b.size, 0),
    0
  );
}

function getDirectoriesBigEnough(
  fileSystem: Record<
    string,
    { dirNames: string[]; files: { name: string; size: number }[] }
  >,
  minimumSize: number
): { dirName: string; size: number }[] {
  const result: { dirName: string; size: number }[] = [];
  for (const [dirName, { files }] of Object.entries(fileSystem)) {
    const allFiles = [...files];
    for (const otherDirName of Object.keys(fileSystem)) {
      if (otherDirName !== dirName && otherDirName.startsWith(dirName)) {
        allFiles.push(...fileSystem[otherDirName].files);
      }
    }
    const size = allFiles.map(({ size }) => size).reduce((a, b) => a + b, 0);
    if (size >= minimumSize) {
      result.push({ dirName, size });
    }
  }
  return result;
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
  day7b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
