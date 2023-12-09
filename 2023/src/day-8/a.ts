/* eslint-disable prefer-const */
import { readData } from '../utils';
import chalk from 'chalk';

type Node = {
  parent: string;
  children: {
    left: string;
    right: string;
  };
  stepValue: string;
};

export async function day8a(dataPath?: string) {
  const data = await readData(dataPath);
  const [instruction, _, ...nodes] = data;
  const instructionArray = instruction.split('');
  const transformNodesData = getNodesData(nodes);
  const steps = getSteps(instructionArray, transformNodesData);
  return steps;
}

export function getNodesData(nodes: string[]): Node[] {
  return nodes.map((node) => {
    const splitNode = node.split(' = ');
    const parent = splitNode[0];
    const children = splitNode[1].replace('(', '').replace(')', '').split(', ');
    const left = children[0];
    const right = children[1];
    return {
      parent,
      children: {
        left,
        right,
      },
      stepValue: '',
    };
  });
}

export function getSteps(instruction: string[], nodes: Node[]): number {
  let steps = 0;
  let stepValue = '';
  let instructionIndex = 0;

  while (stepValue !== 'ZZZ') {
    let currentInstruction = instruction[instructionIndex % instruction.length];

    if (stepValue === '') {
      const firstNode = nodes.find((node) => node.parent === 'AAA');
      stepValue =
        currentInstruction === 'R'
          ? firstNode.children.right
          : firstNode.children.left;
    } else {
      const getNodeByStepValue = nodes.find(
        (node) => node.parent === stepValue
      );
      stepValue =
        currentInstruction === 'R'
          ? getNodeByStepValue.children.right
          : getNodeByStepValue.children.left;
    }

    steps += 1;
    instructionIndex += 1;
  }

  return steps;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day8a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
