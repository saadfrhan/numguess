import promptQuestion from "./index.js";
import ValAnswerI from "./ts/index.js";
import { generateRandomNumber, wantContinue } from "./utils/index.js";

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
    randomInt = generateRandomNumber(1, 5);
  }
  if (answer === 'quit') {
    console.log(`Your final score is ${score}.`);
    return;
  }
  return validator(answer, round, lastNum);
}

async function validator(answer: string, round: number, lastNum: number) {

  if (parseInt(answer) === randomInt) {
    lives = 3 * (round + 1);
    score = score + round;
    console.log(`Answer is correct! 🎉, score raised to ${score} and lives raised to ${lives}.`);
    console.log('\n');
    promptQuestion(round + 1, lastNum + 5);
    randomInt = generateRandomNumber(1, lastNum + 5);
  } else {
    lives--;
    if (lives === 0) {
      console.log(`You lost all lives!, the correct answer is ${randomInt}.`);
      console.log('\n');
      wantContinue();
    }
    else {
      console.log(`You lost a live, now you have ${lives} ${lives === 1 ? 'live' : 'lives'} left.`);
      promptQuestion(round, lastNum);
    }
  }

}