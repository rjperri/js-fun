// Simple Deck of Cards Program
class Deck {
  constructor(numDecks = 1) {
      this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
      this.cards = [];
      this.numDecks = numDecks; // Number of decks to include
      this.initializeDeck();
  }

  // Initialize the deck with the specified number of decks
  initializeDeck() {
      this.cards = [];
      for (let d = 0; d < this.numDecks; d++) {
          for (const suit of this.suits) {
              for (const rank of this.ranks) {
                  this.cards.push({ Suit: suit, Value: rank });
              }
          }
      }
  }

  // Shuffle the deck using the Fisher-Yates algorithm
  shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
  }

  // Draw a card from the deck
  draw() {
      if (this.cards.length === 0) {
          return "No cards left in the deck!";
      }
      return this.cards.pop();
  }

  // Draw a hand of cards
  drawHand(numCards) {
      if (numCards > this.cards.length) {
          return "Not enough cards left in the deck!";
      }
      const hand = [];
      for (let i = 0; i < numCards; i++) {
          hand.push(this.draw());
      }
      return hand;
  }
}

// Example usage
const deck = new Deck(6); // Create a deck with 6 decks combined
console.log("Initial deck:", deck.cards);

deck.shuffle();
console.log("Shuffled deck:", deck.cards);

const hand = deck.drawHand(5); // Draw a hand of 5 cards
console.log("Player's hand:", hand);
console.log("Remaining cards:", deck.cards);