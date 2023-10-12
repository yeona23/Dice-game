const player1 = document.querySelector(".box-player_1");
const player2 = document.querySelector(".box-player_2");
const score1 = document.querySelector(".text-total-score_1");
const score2 = document.querySelector(".text-total-score_2");
const current1 = document.querySelector(".text-current-score_1");
const current2 = document.querySelector(".text-current-score_2");

const dice = document.querySelector(".img-dice");
const btnRollDice = document.querySelector(".btn-rolldice");
const btnHold = document.querySelector(".btn-hold");
const btnNewGame = document.querySelector(".btn-newgame");

let scores, playing, activePlayer, currentScore;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  current1.textContent = 0;
  current2.textContent = 0;

  dice.classList.add("hidden");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer + 1}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

btnRollDice.addEventListener("click", function () {
  if (playing) {
    const diceSpot = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove("hidden");
    dice.src = `./image/dice0${diceSpot}.png`;

    if (2 < diceSpot) {
      currentScore += diceSpot;
      document.getElementById(`current--${activePlayer + 1}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer + 1}`).textContent =
      scores[activePlayer];
  }

  if (scores[activePlayer] >= 50) {
    playing = false;

    document
      .querySelector(`.box-player_${activePlayer + 1}`)
      .classList.add("player--winner");
    document
      .querySelector(`.box-player_${activePlayer + 1}`)
      .classList.remove("player--active");
  } else {
    switchPlayer();
  }
});

btnNewGame.addEventListener("click", init);
