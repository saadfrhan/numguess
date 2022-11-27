#!/usr/bin/env node

import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';

import inquirer from "inquirer";

import validateVal, { sleep } from "./utils/index.js";
import validateAnswer from './validateAnswer.js';

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Welcome to the Numberguess game!');
  await sleep();
  console.log(`
    ${chalk.bgBlueBright('Instructions:')}
    ${chalk.blue('1.')} You will be asked to enter a number between 1 - 5.
    ${chalk.blue('2.')} If you get it right, you get a point. Lives and the range will be increased for the next level.
    ${chalk.blue('3.')} If you get it wrong, you lose a life.
    ${chalk.blue('4.')} If you lose all lives, you lose the game.
    ${chalk.blue('5.')} If you enter "quit", you quit the game.
    ${chalk.blue('6.')} Good luck!
  `);
  rainbowTitle.stop();
  await sleep(1000);
}

export default async function promptQuestion(round: number = 1, lastNum: number = 5, isNewGame = false) {
  const { answer }: {
    answer: string
  } = await inquirer.prompt([{
    type: "input",
    name: "answer",
    message: `Round ${round}, Enter a number from 1 to ${lastNum}:`,
    validate: validateVal(Number(lastNum)),
  }]);
  validateAnswer({
    round, lastNum, answer, isNewGame
  });
}

await welcome();
await promptQuestion();