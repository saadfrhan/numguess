#!/usr/bin/env node

import inquirer from "inquirer";

import validateVal from "./util/responseValidator";
import validateAnswer from './validateAnswer';

export default function promptQuestion(round: number = 1, lastNum: number = 5) {
  inquirer.prompt([{
    type: "input",
    name: "answer",
    message: `Round ${round}, Enter a number from 1 to ${lastNum}:`,
    validate: validateVal(Number(lastNum)),
  }]).then(({ answer }) => {
    validateAnswer(round, lastNum, answer);
  });
}



promptQuestion();