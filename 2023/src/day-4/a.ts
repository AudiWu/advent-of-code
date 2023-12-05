import { readData } from '../utils';
import chalk from 'chalk';

type CardData = {
  owned: number[];
  point: number;
};

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  const transformedData = transformToScratchcardsData(data);
  console.log(transformedData);
  const sum = transformedData.reduce((acc, curr) => acc + curr.point, 0);
  return sum;
}

export function transformToScratchcardsData(data: string[]) {
  const cardDatas: CardData[] = [];

  for (const line of data) {
    {
      const cardData: CardData = {
        owned: [],
        point: 0,
      };
      const ownedData = [];

      const splitById = line.split(': ');
      const getCardData = splitById[1].split(' | ');
      const matches = getCardData[0].split(' ');
      const owned = getCardData[1].split(' ');

      for (const own of owned) {
        if (matches.includes(own)) {
          ownedData.push(Number(own));
        }
      }

      const filterOwnedData = ownedData.filter((data) => data !== 0);

      cardData.owned = filterOwnedData;
      cardData.point = 2 ** (cardData.owned.length - 1);
      cardDatas.push(cardData);
    }
  }

  const filterCardDatas = cardDatas.filter((data) => data.owned.length !== 0);

  return filterCardDatas;
}



// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day4a().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
