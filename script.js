'use strict';

const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);

const player0 = document.getElementById(`current--0`);
const player1 = document.getElementById(`current--1`);
const playerActive0 = document.querySelector(`.player--0`);
const playerActive1 = document.querySelector(`.player--1`);

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
// STARTING CONDITION

let playing, scores, activePlayer, currentScore

const init = () =>{
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  player0.textContent = 0;
  player1.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  diceEl.classList.add('hidden');
  playerActive0.classList.remove(`player--winner`)
  playerActive1.classList.remove(`player--winner`)
  playerActive1.classList.remove(`player--winner`)
  playerActive1.classList.remove(`player--winner`)
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove(`player--winner`);
  playerActive0.classList.add(`player--active`);
}

init();
// currentPlayer function
const currentPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer ? 0 : 1;
  playerActive0.classList.toggle(`player--active`);
  playerActive1.classList.toggle(`player--active`);
};

//Rolling dice functionality
btnRoll.addEventListener(`click`, () => {
  if (playing) {
    // Generating random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // Display generated dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // if generated dice is === 1,? add :switch to the next player
    if (dice !== 1) {
      currentScore += dice;
      // document.querySelector(`dic`)
      // player0.textContent = currentScore; // change later
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentPlayer();
    }
  }
});

btnHold.addEventListener(`click`, () => {
  if (playing) {
    // 1. Add current score to  active player's score
    // example: score[1] += currentScore

    scores[activePlayer] = scores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if the player's score pass  >= 100

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);

      // true ?if true finish the game : switch player
    } else {
      currentPlayer();
    }
  }
});

btnNew.addEventListener(`click`, init);
