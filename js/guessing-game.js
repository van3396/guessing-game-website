/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

function generateWinningNumber() {
    return Math.floor(Math.random() * Math.floor(100)) + 1 ;
  };
  
  //copied from fisher-yates
  function shuffle(array) {
      let lengthOfArr = array.length;
      let tempHolder;
      let random;
  
      // While there remain elements to shuffle…
      while (lengthOfArr) {
        // random number is chosen and .length is decremented
        random = Math.floor(Math.random() * lengthOfArr--);
  
        // tempHolder set to last value in current arr now that it has decremented
        tempHolder = array[lengthOfArr];
  
        // last value in the 'shortened' array is set to a random number
        array[lengthOfArr] = array[random];
  
  
        array[random] = tempHolder; //change arr
      }
  
      return array;
    }
  
  class Game {
    // don't need to pass playersGuess in constructor
    constructor() {
      this.playersGuess = null;
      this.pastGuesses = [];
      this.winningNumber = generateWinningNumber();
    }
  
    difference() {
      return Math.abs(this.winningNumber - this.playersGuess)
    }
  
    isLower() {
      return this.playersGuess < this.winningNumber;
    }
  
    // playersGuessSubmission(num) {
    //   // The game checks for numbers between 1-100
    //   // ie, num < 1 is what we should be checking for
  
    //   // User input from the UI would return as a string
    //   // ie; typeof num === 'string'
    //   if(num < 0 || isNaN(num) || num > 100) {
    //     throw (`That is an invalid guess.`);
    //     // you don't need this return statement
    //     // throwing an error will immediately pause execution
    //     // until it is handled
    //   } else this.playersGuess = num;
    //   return checkGuess(this.playersGuess);
    // }
  
    playersGuessSubmission(num) {
      if (num < 1 || num > 100 || isNaN(num)) {
          throw 'That is an invalid guess.';
      } else this.playersGuess = num;
      return String(this.checkGuess(this.playersGuess));
    }
  
    checkGuess() {
      // Check if player guess is winning number
      // Check if player guess is valid (not in the pastGuesses)
      // Check if player lost (pastGuesses length === 4 && playerGuess !== winningnumber)
      // Otherwise, check guess range and then push guess into pastGuesses
  
      if (this.playersGuess === this.winningNumber) {
        return 'You Win!';
      } else if (this.pastGuesses.includes(this.playersGuess)) {
        return 'You have already guessed that number.'
      } else if (this.playersGuess !== this.winningNumber && !this.pastGuesses.includes(this.playersGuess)) {
        this.pastGuesses.push(this.playersGuess);
      }
  
      if (this.pastGuesses.length === 5) {
        return 'You Lose.'
      }
  
      if (this.difference() < 10) {
        return "You're burning up!"
      } else if (this.difference() < 25) {
        return "You're lukewarm."
      } else if (this.difference() < 50) {
        return "You're a bit chilly."
      } else {
        return "You're ice cold!";
      }
    }
  
    provideHint() {
      return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
    }
  }
  
  function newGame() {
    return new Game;
  }