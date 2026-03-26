// Extended JavaScript craps game with additional bets on numbers

class CrapsGame {
  constructor(startingBankroll = 100) {
      this.point = null;
      this.isGameActive = true;
      this.bankroll = startingBankroll;
      this.currentBet = 0;
      this.oddsBet = 0;
      this.numberBets = {}; // Bets on specific numbers (4, 5, 6, 8, 9, 10)
  }

  rollDice() {
      const die1 = Math.floor(Math.random() * 6) + 1;
      const die2 = Math.floor(Math.random() * 6) + 1;
      return { die1, die2, total: die1 + die2 };
  }

  placeBet(amount) {
      if (amount > this.bankroll) {
          console.log("You don't have enough money to place that bet.");
          return false;
      }
      this.currentBet = amount;
      this.bankroll -= amount;
      console.log(`Bet of $${amount} placed. Remaining bankroll: $${this.bankroll}`);
      return true;
  }

  placeOddsBet(amount) {
      if (this.point === null) {
          console.log("You can only place an odds bet after a point is established.");
          return false;
      }
      if (amount > this.bankroll) {
          console.log("You don't have enough money to place that odds bet.");
          return false;
      }
      this.oddsBet = amount;
      this.bankroll -= amount;
      console.log(`Odds bet of $${amount} placed. Remaining bankroll: $${this.bankroll}`);
      return true;
  }

  placeNumberBet(number, amount) {
      const validNumbers = [4, 5, 6, 8, 9, 10];
      if (!validNumbers.includes(number)) {
          console.log("Invalid number. You can only bet on 4, 5, 6, 8, 9, or 10.");
          return false;
      }
      if (amount > this.bankroll) {
          console.log("You don't have enough money to place that bet.");
          return false;
      }
      if (!this.numberBets[number]) {
          this.numberBets[number] = 0;
      }
      this.numberBets[number] += amount;
      this.bankroll -= amount;
      console.log(`Number bet of $${amount} placed on ${number}. Remaining bankroll: $${this.bankroll}`);
      return true;
  }

  comeOutRoll() {
      const roll = this.rollDice();
      console.log(`Come-Out Roll: ${roll.die1} + ${roll.die2} = ${roll.total}`);

      if ([7, 11].includes(roll.total)) {
          console.log("Pass Line Wins! You win!");
          this.bankroll += this.currentBet * 2;
          console.log(`You won $${this.currentBet * 2}. New bankroll: $${this.bankroll}`);
          this.resetGame();
      } else if ([2, 3, 12].includes(roll.total)) {
          console.log("Craps! Pass Line Loses.");
          this.resetGame();
      } else {
          this.point = roll.total;
          console.log(`Point is set to ${this.point}. You can now place odds bets.`);
      }
  }

  pointRoll() {
      const roll = this.rollDice();
      console.log(`Roll: ${roll.die1} + ${roll.die2} = ${roll.total}`);

      if (roll.total === this.point) {
          console.log("You hit the point! You win!");
          const oddsPayout = this.oddsBet * 2; // Standard 2x odds payout
          const totalWin = this.currentBet * 2 + oddsPayout;
          this.bankroll += totalWin;
          console.log(`You won $${totalWin} (including $${oddsPayout} from odds). New bankroll: $${this.bankroll}`);
          this.resetGame();
      } else if (roll.total === 7) {
          console.log("Seven out! You lose your bets.");
          this.resetGame();
      } else {
          console.log("Roll again!");
      }

      // Check number bets
      if (this.numberBets[roll.total]) {
          const payout = this.numberBets[roll.total] * 2; // Assuming 2x payout for simplicity
          console.log(`You win $${payout} from your bet on ${roll.total}!`);
          this.bankroll += payout;
          delete this.numberBets[roll.total]; // Clear the bet after winning
          console.log(`New bankroll: $${this.bankroll}`);
      }
  }

  play() {
      if (!this.isGameActive) return console.log("Game over. Start a new game.");

      if (this.point === null) {
          if (this.currentBet === 0) {
              console.log("You need to place a bet before rolling.");
              return;
          }
          this.comeOutRoll();
      } else {
          this.pointRoll();
      }
  }

  resetGame() {
      this.point = null;
      this.currentBet = 0;
      this.oddsBet = 0;
      this.numberBets = {}; // Reset number bets
      console.log("The game has been reset. Ready for a new come-out roll.");
  }
}

// Example usage
const game = new CrapsGame(100);

game.placeBet(10); // Place an initial bet
game.placeNumberBet(4, 5); // Place a bet on number 4

game.play(); // Start with a come-out roll
// Call game.play() repeatedly for subsequent rolls
// Optionally place odds bets with game.placeOddsBet(amount) after a point is set
