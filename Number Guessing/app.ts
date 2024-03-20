import inquirer from "inquirer";
import chalk from "chalk";

// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;


let chances = 6;

// Function to validate user input
const validateGuess = (input:string) :boolean |string=> {
  const value = parseInt(input);
  if (isNaN(value)) {
    return "Please enter a valid number.";
  }
  if (value < 1 || value > 100) {
    return "Please enter a number between 1 and 100.";
  }
  return true;
};

// Function to ask for user input and handle the game logic
async function askForGuess() {
  const userInput = await inquirer.prompt([
    {
      type: "input",
      name: "guess",
      message: "Enter your guess between 1 & 100:",
      validate: validateGuess,
    },
  ]);

  const guess = parseInt(userInput.guess);

  if (guess === randomNumber) {
    console.log(chalk.green("Congratulations! You guessed the correct number!"));
    return;
  } else if (guess < randomNumber) {
    console.log("Your guess is lower than the actual number.");
  } else if (guess > randomNumber) {
    console.log("Your guess is higher than the actual number.");
  }

  chances--;
  console.log(`Chances remaining: ${chances}`);

  if (chances === 0) {
    console.log(chalk.red("Sorry, you've run out of chances. The correct number was:", randomNumber));
    return;
  } else {
    await askForGuess();
  }
}

// Start the game
askForGuess();
