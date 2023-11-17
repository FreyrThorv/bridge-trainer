const mapRankToValue = (rank) => {
  if (rank === "14") {
    return "A";
  } else if (rank === "13") {
    return "K";
  }
  if (rank === "12") {
    return "Q";
  }
  if (rank === "11") {
    return "J";
  } else {
    return rank;
  }
};

const createDeckOfCards = () => {
  const suits = ["S", "D", "C", "H"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
  ];

  let deck = [];

  // Create the deck of cards
  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < ranks.length; x++) {
      let card = {
        rank: ranks[x],
        suit: suits[i],
        value: mapRankToValue(ranks[x]),
      };
      deck.push(card);
    }
  }

  // Shuffle the cards
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
};

const calculateHighCardPoints = (hand) => {
  let highCardPoints = 0;

  hand.forEach(({ value }) => {
    if (value === "A") {
      highCardPoints += 4;
    } else if (value === "K") {
      highCardPoints += 3;
    }
    if (value === "Q") {
      highCardPoints += 2;
    }
    if (value === "J") {
      highCardPoints += 1;
    }
  });

  return highCardPoints;
};

// Renders an image like this: <img class="card" src="cards/AS.svg" />
const renderCardsInHand = (hand) => {
  hand.forEach(({ value, suit }) => {
    var htmlCard = document.createElement("img");
    htmlCard.classList.add("card");
    htmlCard.src = "cards/" + value + suit + ".svg";
    htmlCard.appendChild(document.createTextNode("Hello this is me"));
    root.appendChild(htmlCard);
  });
};

const sortSuit = (unsortedHand, suitLetter) => {
  return unsortedHand
    .filter(({ suit }) => {
      return suit === suitLetter;
    })
    .sort((a, b) => a.rank - b.rank);
};

const generateHand = () => {
  const unsortedHand = deck.slice(0, 13);
  const hearts = sortSuit(unsortedHand, "H");
  const spades = sortSuit(unsortedHand, "S");
  const diamonds = sortSuit(unsortedHand, "D");
  const clubs = sortSuit(unsortedHand, "C");

  return [...hearts, ...spades, ...diamonds, ...clubs];
};

// Set up deck, hand & calculate HCP.
const deck = createDeckOfCards();
const hand = generateHand(deck);
const highCardPoints = calculateHighCardPoints(hand);

// Render it on the page
renderCardsInHand(hand);

// Listen to submit, checks if answer is correct or not.
document.getElementById("hcp-form").addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    const feedback = document.getElementById("feedback");

    if (document.getElementById("hcp").value == highCardPoints) {
      feedback.classList.remove("failed");
      feedback.classList.add("success");
      feedback.innerHTML = "Correct!";

      // If it's correct reload after 1 second
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      feedback.classList.add("failed");
      feedback.innerHTML = "Incorrect!";
    }
  },
  false
);
