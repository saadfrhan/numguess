import promptQuestion from ".";
import { generateRandomNumber } from "./util/randomInt";

export let score = 0;
let lives = 3;
let randomInt = generateRandomNumber(1, 5);

export default function validateAnswer(round: number, lastNum: number, answer: string) {
  if (answer === 'quit') {
    console.log(`Your final score is ${score}`);
    return;
  } else if (parseInt(answer) === randomInt) {
    console.log("Correct!");
    lives = 3 * (round + 1);
    score = score + round;
    console.log(`Lives increased to ${lives}!`);
    console.log(`Score: ${score}`);
    promptQuestion(round + 1, lastNum + 5);
    randomInt = generateRandomNumber(1, lastNum + 5);
  } else {
    lives--;
    if (lives === 0) {
      console.log("Game Over!");
    }
    else {
      console.log(`Wrong! You have ${lives} lives left.`);
      promptQuestion(round, lastNum);
    }
  }
}