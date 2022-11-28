import promptQuestion from "./index.js";
import ValAnswerI from "./ts/index.js";
import { generateRandomNumber, sleep, wantContinue } from "./utils/index.js";
import { createSpinner } from 'nanospinner';

let score = 0;
let lives = 3;
let randomInt = generateRandomNumber(1, 5);

export default function validateAnswer({
  round,
  lastNum,
  answer,
  isNewGame = false,
}: ValAnswerI) {
  if (isNewGame) {
    lives = 3;
  }
  if (answer === 'quit') {
    console.log(`Your final score is ${score}.\n`);
    return;
  }
  return validator(answer, round, lastNum);
}

async function validator(answer: string, round: number, lastNum: number) {

  const spinner = createSpinner('Checking answer...').start();
  await sleep(200);

  if (parseInt(answer) === randomInt) {
    lives = 3 * (round + 1);
    score = score + round;
    spinner.success({ text: `Answer is correct! 🎉, score raised to ${score} and lives raised to ${lives}.\n` });
    promptQuestion(round + 1, lastNum + 5);
    randomInt = generateRandomNumber(1, lastNum + 5);
  } else {
    lives--;
    if (lives === 0) {
      spinner.error({ text: `You lost all lives!, the correct answer is ${randomInt}.\n` });
      wantContinue();
    }
    else {
      spinner.error({ text: `You lost a live, now you have ${lives} ${lives === 1 ? 'live' : 'lives'} left.\n` });
      promptQuestion(round, lastNum);
    }
  }

}