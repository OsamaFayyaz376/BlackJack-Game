// ################################################################# A Black Jack Game ##########################################

let message = document.getElementById("message");
let startButton = document.getElementById("start-game");
let newCard = document.getElementById("new-card");
let cards = document.getElementById("cards");
let total = document.getElementById("sum");
let playerChips = document.querySelector(".chips");

let sum = 0;
let cardArray = [];
let isAlive = false;
let isWon = false;

let Player = {
  fname: "Osama",
  chips: "250",
};

disableButton(newCard);

function getRandomNumber() {
  return Math.floor(Math.random() * (11 - 2) + 2);
}

function checkForBlackJack() {
  if (sum > 21) {
    message.textContent = "You lost please start again";
    Player.chips -= 30;
    isAlive = false;
  } else if (sum < 21) {
    message.textContent = "Let's pull another card";
  } else {
    message.textContent = "You've Got Blackjack!!";
    Player.chips += 50;
    isAlive = false;
  }
}

function clearGame() {
  total.textContent = "Sum:";
  cards.textContent = "Cards: ";
  cardArray = [];
  isAlive = false;
  enableButton(startButton);
  disableButton(newCard);
}

function isButtonEnablingRequire() {
  if (!isAlive) {
    clearGame();
  } else {
    enableButton(newCard);
  }
}

function getSum(cards) {
  return cards.reduce(
    (currentVal, nextVal) => (currentVal = currentVal + nextVal),
    0
  );
}

function renderChips() {
  if (Player.chips >= 30) {
    playerChips.textContent = Player.fname + ": $" + Player.chips;
  } else {
    playerChips.textContent = "Not enough chips to play";
    document.querySelector(".black-jack-container").style.backgroundColor =
      "red";
    Player.chips = 250;
    isAlive = false;
  }
}

function renderGame() {
  cardArray.forEach((card) => {
    cards.textContent += card + " ";
  });
  total.textContent = "Sum: " + sum;
  renderChips();
  checkForBlackJack();
  renderChips();
  isButtonEnablingRequire();
}

function disableButton(btn) {
  btn.disabled = true;
  btn.style.backgroundColor = "lightGrey";
}

function enableButton(button) {
  button.disabled = false;
  button.style.backgroundColor = "goldenrod";
  button.onmouseover = () => {
    button.style.backgroundColor = "yellowgreen";
  }
  button.onmouseout = () => {
    button.style.backgroundColor = "goldenrod";
  }
}

function startGame() {
  document.querySelector(".black-jack-container").style.backgroundColor =
    "rgba(38, 119, 38, 0.753)";
  isAlive = true;
  cardArray.push(getRandomNumber());
  cardArray.push(getRandomNumber());
  sum = getSum(cardArray);
  renderGame();
  disableButton(startButton);
}

function pullNewCard() {
  cardArray.push(getRandomNumber());
  sum = getSum(cardArray);
  cards.textContent = "Cards: ";
  renderGame();
}

startButton.addEventListener("click", startGame);
newCard.addEventListener("click", pullNewCard);
