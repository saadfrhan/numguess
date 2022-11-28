import chalk from "chalk";
import inquirer from "inquirer";
import promptQuestion from "../index.js";

export default function validateVal(lastNum: number) {
  return (val: string): string | true => {
    if (val === 'quit') {
      return true;
    }
    else if (isNaN(parseInt(val))) {
      return "Please enter a number";
    } else if (parseInt(val) < 1 || parseInt(val) > lastNum) {
      return `Please enter a number from 1 to ${lastNum}`;
    }
    else {
      return true
    };
  }
}

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const sleep = (ms: number = 2000) => new Promise(resolve => setTimeout(resolve, ms));

export const wantContinue = async (): Promise<void | undefined> => {
  const { wantContinue } = await inquirer.prompt({
    type: 'confirm',
    name: 'wantContinue',
    message: 'Would you like to play again?',
    default: true
  });
  if (wantContinue) {
    console.log('\n');
    return promptQuestion(1, 5, true);
  }
  console.log(chalk.green('Maybe next time!'));
  return;
}