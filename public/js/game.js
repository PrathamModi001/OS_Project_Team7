const gameContainer = document.querySelector(".game-container");
const scoreElement = document.querySelector("#score");
const restartGameButton = document.querySelector("#restartGameButton");
const gameOverPage = document.querySelector("#game-over");
const gameOverText = document.querySelector("#game-over-text");
const playAgain = document.querySelector("#play-again");

const directions = ["up", "right", "down", "left"];

let Key = "";

let direction;
let isReverseDirection;

let score = 0;

const progressBarElement = document.querySelector("#progress-bar");
const gameDuration = 15; // Game Duration in seconds
let progressBarWidthNumerator = gameDuration * 1000;
const progressBarWidthDenominator = gameDuration * 1000;
let progressBarInterval = setInterval(progressBarFrame, 10);

nextArrow();

document.addEventListener("keydown", (event) => {
  Key = event.key;
  handleArrowSwipe();
});

restartGameButton.addEventListener("click", restartGame);

function restartGame() {
  gameOverPage.style.opacity = 0;
  playAgain.style.marginLeft="-2000px";
  clearInterval(progressBarInterval);
  progressBarWidthNumerator = gameDuration * 1000;
  score = 0;
  scoreElement.textContent = score;
  document.querySelector(".arrow").remove();
  nextArrow();
  progressBarInterval = setInterval(progressBarFrame, 10);
}

// Auxiliary Functions

function handleArrowSwipe() {
  const result = getValidationResult();
  const arrowElement = document.querySelector(".arrow");
  if (progressBarWidthNumerator <= 0) {
    return;
  }

  if (result === "correct") {
    score += 10;
    scoreElement.textContent = score;

    scoreElement.classList.remove("pulse", "reversePulse");
    setTimeout(() => {
      scoreElement.classList.add("pulse");
    }, 0);

    arrowElement.remove();
    nextArrow();
  } else if (result === "wrong") {
    if (score > 0) {
      score = Math.max(0, score - 10); 
      scoreElement.textContent = score;

      scoreElement.classList.remove("pulse", "reversePulse");
      setTimeout(() => {
        scoreElement.classList.add("reversePulse");
      }, 0);
    }
    setTimeout(() => {
      arrowElement.classList.add("shake");
    }, 0);

    gameContainer.classList.add("wrongAnswer");
    setTimeout(function () {
      gameContainer.classList.remove("wrongAnswer");
    }, 450);
  }
  Key = 0;
}

function getValidationResult() {
  let result = "";
  if (correctDirection() === "up") {
    if (Key == "ArrowUp") result = "correct"; 
    else if (Key == "ArrowDown" || Key == "ArrowRight" || Key == "ArrowLeft") result = "wrong"; 
  } else if (correctDirection() === "right") {
    if (Key == "ArrowRight") result = "correct"; 
    else if (Key == "ArrowDown" || Key == "ArrowUp" || Key == "ArrowLeft") result = "wrong"; 
  } else if (correctDirection() === "down") {
    if (Key == "ArrowDown") result = "correct"; 
    else if (Key == "ArrowUp" || Key == "ArrowRight" || Key == "ArrowLeft") result = "wrong"; 
  } else if (correctDirection() === "left") {
    if (Key == "ArrowLeft") result = "correct"; 
    else if (Key == "ArrowDown" || Key == "ArrowRight" || Key == "ArrowUp") result = "wrong"; 
  }
  return result;
}

function correctDirection() {
  if (!isReverseDirection) return direction;
  if (direction === "up") return "down";
  if (direction === "right") return "left";
  if (direction === "down") return "up";
  if (direction === "left") return "right";
}

function nextArrow() {
  if (progressBarWidthNumerator <= 0) {
    arrowElement.remove();
    return;
  }
  direction = directions[getRandomInt(4)];
  isReverseDirection = getRandomInt(2);

  const newElement = document.createElement("i");
  newElement.classList.add(
    "fas",
    `fa-arrow-circle-${direction}`,
    "arrow",
    "animated",
    "bounceIn"
  );
  newElement.setAttribute(
    "style",
    `color: ${isReverseDirection ? "#ff6384" : "#36a2eb"};`
  );

  gameContainer.appendChild(newElement);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function gameOver() {
  gameOverPage.style.backgroundColor = "#eee";
  gameOverPage.style.opacity = 1;
  let finalScore = score;
  gameOverText.textContent = "Score: " + finalScore;
  playAgain.style.marginLeft = "0px";
}

function progressBarFrame() {
  if (progressBarWidthNumerator <= 0) {
    clearInterval(progressBarInterval);
    progressBarElement.setAttribute(
      "style",
      "width: 0%; background-color: #00cc99;"
    );
    gameOver();
  } else {
    progressBarWidthNumerator -= 10;
    const currentProgressBarWidth =
      progressBarWidthNumerator / progressBarWidthDenominator;

    if (currentProgressBarWidth <= 0.1) {
      progressBarElement.setAttribute(
        "style",
        `width: ${100 * currentProgressBarWidth}%; background-color: #ff3300;`
      );
    } else if (currentProgressBarWidth <= 0.25) {
      progressBarElement.setAttribute(
        "style",
        `width: ${100 * currentProgressBarWidth}%; background-color: #ff9f40;`
      );
    } else {
      progressBarElement.setAttribute(
        "style",
        `width: ${100 * currentProgressBarWidth}%;`
      );
    }
  }
}
