// Video Poker: A Simple Casino-Style Game

const prompt = require('prompt-sync')();

// Deck of cards
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

// Initialize the deck
function createDeck() {
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit });
        }
    }
    return deck;
}

// Shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Deal 5 cards
function dealHand(deck) {
    return deck.splice(0, 5);
}

// Display the hand
function displayHand(hand) {
    return hand.map(card => `${card.rank} of ${card.suit}`).join(', ');
}

// Check if the hand is a flush
function isFlush(hand) {
    const suit = hand[0].suit;
    return hand.every(card => card.suit === suit);
}

// Check if the hand is a straight
function isStraight(hand) {
    const rankValues = hand.map(card => ranks.indexOf(card.rank)).sort((a, b) => a - b);
    for (let i = 0; i < rankValues.length - 1; i++) {
        if (rankValues[i] + 1 !== rankValues[i + 1]) {
            return false;
        }
    }
    return true;
}

// Evaluate hand (extended scoring for advanced poker hands)
function evaluateHand(hand) {
    const rankCounts = {};
    for (const card of hand) {
        rankCounts[card.rank] = (rankCounts[card.rank] || 0) + 1;
    }

    const counts = Object.values(rankCounts);
    const isFlushHand = isFlush(hand);
    const isStraightHand = isStraight(hand);

    if (isFlushHand && isStraightHand && hand.some(card => card.rank === 'Ace') && hand.some(card => card.rank === '10')) {
        return 'Royal Flush';
    }
    if (isFlushHand && isStraightHand) return 'Straight Flush';
    if (counts.includes(4)) return 'Four of a Kind';
    if (counts.includes(3) && counts.includes(2)) return 'Full House';
    if (isFlushHand) return 'Flush';
    if (isStraightHand) return 'Straight';
    if (counts.includes(3)) return 'Three of a Kind';
    if (counts.filter(count => count === 2).length === 2) return 'Two Pair';
    if (counts.includes(2)) return 'One Pair';
    return 'No significant hand';
}

// Main game logic
function playVideoPoker() {
    const deck = createDeck();
    shuffleDeck(deck);

    console.log('Welcome to Video Poker!');

    // Initial deal
    let hand = dealHand(deck);
    console.log('Your hand:', displayHand(hand));

    // Allow player to choose cards to hold
    const heldCards = prompt('Enter the indices (0-4) of cards to hold, separated by commas:');
    const holdIndices = heldCards ? heldCards.split(',').map(Number) : [];

    // Replace unheld cards
    hand = hand.map((card, index) => holdIndices.includes(index) ? card : deck.shift());

    console.log('Your final hand:', displayHand(hand));

    // Evaluate and display the result
    const result = evaluateHand(hand);
    console.log('Result:', result);
}

// Start the game
playVideoPoker();
