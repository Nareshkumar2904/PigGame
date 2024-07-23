"use strict";

let player1 = document.querySelector(".player--0");
let player2 = document.querySelector(".player--1");
let personScore0 = document.getElementById("score--0");
let personScore1 = document.getElementById("score--1");
let currentEle1 = document.getElementById("current--0");
let currentEle2 = document.getElementById("current--1");

let displayDice = document.querySelector(".dice");

let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, player;

let init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  player = true;

  currentEle1.textContent = 0;
  currentEle2.textContent = 0;
  personScore0.textContent = 0;
  personScore1.textContent = 0;

  displayDice.classList.add("hidden");

  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
init();

let switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (player) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    displayDice.classList.remove("hidden");
    displayDice.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (player) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      player = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");

      displayDice.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
