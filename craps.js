// Simple JavaScript craps game

class CrapsGame {
  constructor() {
      this.point = null;
      this.isGameActive = true;
  }

  rollDice() {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      return { die1, die2, total: die1 + die2 };
  }

  comeOutRoll() {
      const roll = this.rollDice();
      console.log(`Come-Out Roll: ${roll.die1} + ${roll.die2} = ${roll.total}`);

      if ([7, 11].includes(roll.total)) {
          console.log("Pass Line Wins! You win!");
          this.resetGame();
      } else if ([2, 3, 12].includes(roll.total)) {
          console.log("Craps! Pass Line Loses.");
          this.resetGame();
      } else {
          this.point = roll.total;
          console.log(`Point is set to ${this.point}. Keep rolling to make the point!`);
      }
  }

  pointRoll() {
      const roll = this.rollDice();
      console.log(`Roll: ${roll.die1} + ${roll.die2} = ${roll.total}`);

      if (roll.total === this.point) {
          console.log("You hit the point! You win!");
          this.resetGame();
      } else if (roll.total === 7) {
          console.log("Seven out! You lose.");
          this.resetGame();
      } else {
          console.log("Roll again!");
      }
  }

  play() {
      if (!this.isGameActive) return console.log("Game over. Start a new game.");

      if (this.point === null) {
          this.comeOutRoll();
      } else {
          this.pointRoll();
      }
  }

  resetGame() {
      this.point = null;
      console.log("The game has been reset. Ready for a new come-out roll.");
  }
}

// Example usage
const game = new CrapsGame();

game.play(); // Start with a come-out roll
// Call game.play() repeatedly for subsequent rolls