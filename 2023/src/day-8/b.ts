import { readData } from '../utils';
import chalk from 'chalk';

export async function day8b(dataPath?: string) {
  const data = await readData(dataPath);
  const [instruction, _, ...nodes] = data;
  const transformNodesData = transformNodes(nodes);
  const steps = getSteps(instruction, transformNodesData);
  return steps;
}

const transformNodes = (data: string[]) => {
  const map = data.map((e) => e.split(' = '));
  const object = {};
  for (let i = 0; i < map.length; i++)
    object[map[i][0]] = map[i][1].replace(/[()]/g, '').split(', ');
  return object;
};

function getSteps(instruction: string, map) {
  let step = 0;
  const pos: any = [...Object.keys(map)].filter((e) => e[2] === 'A');

  while (pos.some((e) => typeof e !== 'number')) {
    for (let i = 0; i < pos.length; i++) {
      if (pos[i][2] === 'Z') pos[i] = step;
      if (typeof pos[i] === 'number') continue;
      pos[i] =
        map[pos[i]][instruction[step % instruction.length] === 'L' ? 0 : 1];
    }
    step++;
  }

  return pos.reduce((acc, cur) => lcm(acc, cur), 1);
}

function lcm(a: number, b: number): number {
  return (a / gcd(a, b)) * b;
}

function gcd(a: number, b: number): number {
  let t = 0;
  a < b && ((t = b), (b = a), (a = t));
  t = a % b;
  return t ? gcd(b, t) : b;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day8b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
