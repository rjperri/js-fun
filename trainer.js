const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ACTIONS = {
    H: "Hit",
    S: "Stand",
    D: "Double",
    P: "Split",
    R: "Surrender"
};

let correct = 0;
let total = 0;

const MODES = {
  ALL: "ALL",
  PAIRS: "PAIRS",
  SOFT: "SOFT",
  HARD: "HARD"
};

let currentMode = MODES.ALL;

const mistakeQueue = [];

function weightedHardScenario() {

  const toughHands = [
      [10,6], // 16
      [9,7],  // 16
      [10,5], // 15
      [9,6],  // 15
      [10,2], // 12
      [8,4],  // 12
      [7,5],  // 12
      [10,3], // 13
      [9,5],  // 14
  ];

  const pair = toughHands[Math.floor(Math.random() * toughHands.length)];
  const dealer = drawCard();

  const eval = evaluateHand(pair[0], pair[1]);

  return {
      card1: pair[0],
      card2: pair[1],
      dealer,
      ...eval
  };
}

/* ---------------- Card Logic ---------------- */

function selectMode(callback) {
  console.clear();
  console.log("Select training mode:");
  console.log("1) All Hands");
  console.log("2) Splits Only");
  console.log("3) Soft Hands Only");
  console.log("4) Hard Hands Only");
  console.log("");

  rl.question("> ", (answer) => {
      switch (answer.trim()) {
          case "2":
              currentMode = MODES.PAIRS;
              break;
          case "3":
              currentMode = MODES.SOFT;
              break;
          case "4":
              currentMode = MODES.HARD;
              break;
          default:
              currentMode = MODES.ALL;
      }

      callback();
  });
}

function drawCard() {
    const cards = [2,3,4,5,6,7,8,9,10,10,10,10,11];
    return cards[Math.floor(Math.random() * cards.length)];
}

function formatCard(card) {
    return card === 11 ? "A" : card;
}

function evaluateHand(card1, card2) {
    let total = card1 + card2;
    let isSoft = false;

    if ((card1 === 11 || card2 === 11) && total <= 21) {
        isSoft = true;
    }

    if (total === 22) {
        total = 12;
        isSoft = true;
    }

    return {
        total,
        isSoft,
        isPair: card1 === card2
    };
}

function randomScenarioFiltered() {

  // 30% chance pull from mistakes
  if (mistakeQueue.length && Math.random() < 0.30) {
      return mistakeQueue.shift();
  }

  while (true) {

      let s;

      if (currentMode === MODES.HARD && Math.random() < 0.6) {
          s = weightedHardScenario();
      } else {
          s = randomScenario();
      }

      if (currentMode === MODES.ALL) return s;
      if (currentMode === MODES.PAIRS && s.isPair) return s;
      if (currentMode === MODES.SOFT && s.isSoft && !s.isPair) return s;
      if (currentMode === MODES.HARD && !s.isSoft && !s.isPair) return s;
  }
}

function randomScenario() {
    const card1 = drawCard();
    const card2 = drawCard();
    const dealer = drawCard();

    return {
        card1,
        card2,
        dealer,
        ...evaluateHand(card1, card2)
    };
}

/* ---------------- FULL BASIC STRATEGY ---------------- */

function basicStrategy(s) {

    const dealer = s.dealer;

    /* ----- PAIRS ----- */
    if (s.isPair) {
        switch (s.card1) {
            case 11: return "P"; // A,A
            case 8: return "P";

            case 10: return "S";
            case 5: break;

            case 9:
                if ([2,3,4,5,6,8,9].includes(dealer)) return "P";
                return "S";

            case 7:
                if (dealer <= 7) return "P";
                return "H";

            case 6:
                if (dealer <= 6) return "P";
                return "H";

            case 4:
                if ([5,6].includes(dealer)) return "P";
                return "H";

            case 3:
            case 2:
                if (dealer <= 7) return "P";
                return "H";
        }
    }

    /* ----- SOFT TOTALS ----- */
    if (s.isSoft) {

        switch (s.total) {
            case 20:
            case 19:
                return "S";

            case 18:
                if ([3,4,5,6].includes(dealer)) return "D";
                if ([2,7,8].includes(dealer)) return "S";
                return "H";

            case 17:
                if ([3,4,5,6].includes(dealer)) return "D";
                return "H";

            case 16:
            case 15:
                if ([4,5,6].includes(dealer)) return "D";
                return "H";

            case 14:
            case 13:
                if ([5,6].includes(dealer)) return "D";
                return "H";
        }
    }

    /* ----- HARD TOTALS ----- */

    if (s.total >= 17) return "S";

    if (s.total === 16) {
        if ([9,10,11].includes(dealer)) return "R";
        if (dealer <= 6) return "S";
        return "H";
    }

    if (s.total === 15) {
        if (dealer === 10) return "R";
        if (dealer <= 6) return "S";
        return "H";
    }

    if (s.total === 14 || s.total === 13) {
        if (dealer <= 6) return "S";
        return "H";
    }

    if (s.total === 12) {
        if ([4,5,6].includes(dealer)) return "S";
        return "H";
    }

    if (s.total === 11) return "D";

    if (s.total === 10) {
        if (dealer <= 9) return "D";
        return "H";
    }

    if (s.total === 9) {
        if ([3,4,5,6].includes(dealer)) return "D";
        return "H";
    }

    return "H";
}

/* ---------------- GAME LOOP ---------------- */

function ask() {

    const s = randomScenarioFiltered();

    console.clear();
    console.log("=========== BLACKJACK BASIC STRATEGY TRAINER ===========");
    console.log("");
    console.log(`Player: ${formatCard(s.card1)}, ${formatCard(s.card2)} (${s.total}${s.isSoft ? " soft" : ""}${s.isPair ? " pair" : ""})`);
    console.log(`Dealer: ${formatCard(s.dealer)}`);
    console.log("");
    console.log("H=Hit  S=Stand  D=Double  P=Split  R=Surrender");
    console.log("========================================================");

    rl.question("> ", (answer) => {

        const user = answer.trim().toUpperCase();
        const correctAction = basicStrategy(s);

        total++;

        if (user === correctAction) {
          correct++;
          console.log("Correct ✔");
      } else {
          console.log(`Wrong ❌  Correct: ${ACTIONS[correctAction]}`);
      
          // push mistake for retry
          mistakeQueue.push(s);
      }

        console.log(`Score: ${correct}/${total}  (${Math.round((correct/total)*100)}%)`);
        console.log(`Review Queue: ${mistakeQueue.length}`);

        setTimeout(ask, 1200);
    });
}

selectMode(ask);