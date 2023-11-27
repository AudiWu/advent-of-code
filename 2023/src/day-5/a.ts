import { readData } from '../utils';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const { stacks, instructions } = parseData(data);
  let currentStacks = stacks;
  for (const instruction of instructions) {
    for (let i = 0; i < instruction.count; i++) {
      currentStacks = performInstructions(currentStacks, instruction);
    }
  }
  return getAnswer(currentStacks);
}

function getAnswer(stacks: Data['stacks']): string {
  const answerArr: string[] = [];
  for (const key in stacks) {
    answerArr.push(stacks[key][stacks[key].length - 1]);
  }
  return answerArr.join('');
}

function performInstructions(
  stack: Data['stacks'],
  { removeFrom, addTo }: { removeFrom: number; addTo: number }
): Data['stacks'] {
  const copy = {};
  for (const key in stack) {
    copy[key] = [...stack[key]];
  }
  const removed = copy[removeFrom].pop();
  copy[addTo].push(removed);
  return copy;
}

type Data = {
  stacks: Record<number, string[]>;
  instructions: { removeFrom: number; count: number; addTo: number }[];
};

function parseData(data: string[]): Data {
  const stacksArr = [];
  const instructions = [];
  let emptyLineEncountered = false;
  for (const line of data) {
    if (line === '') {
      emptyLineEncountered = true;
      continue;
    }
    if (!emptyLineEncountered) {
      stacksArr.push(line.split(' '));
    } else {
      const [count, removeFrom, addTo] = line.split(' ').map((str) => +str);
      instructions.push({ count, removeFrom, addTo });
    }
  }
  const stacks: Record<number, string[]> = {};
  for (let i = 0; i < stacksArr.length; i++) {
    stacks[i + 1] = stacksArr[i];
  }
  return { stacks, instructions };
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day5a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
