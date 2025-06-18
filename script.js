const playBoard = document.querySelector(".play-board");
const scorePoint = document.querySelector(".score");
const highPoint = document.querySelector(".high-score");

// set up snake food and snake initial position
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;

let gameOver = false;

let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highPoint.innerText = `High Score: ${highScore}`;

// Function to generate random food position
const generateRandomFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1; // Random X position between 1 and 30
  foodY = Math.floor(Math.random() * 30) + 1; // Random Y position between 1 and 30
};

// Function to handlegameOver
const handleGameOver = () => {
  clearInterval(setIntervalId);
  alert("Game over! Start Again");
  location.reload();
};

// Function to handle direction change
const handleDirectionChange = (event) => {
  const key = event.key;
  if (key === "ArrowUp" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (key === "ArrowDown" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (key === "ArrowLeft" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (key === "ArrowRight" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
};

// Initial Game
const initializeGame = () => {
  if (gameOver) return handleGameOver();
  let gameHTML = `<div class= "food" style="grid-area: ${foodX} / ${foodY}"></div>`;
  gameHTML += `<div class="snake" style="grid-area: ${snakeX} / ${snakeY}"></div>`;

  // Check if the snake has eaten the food
  if (snakeX === foodX && snakeY === foodY) {
    generateRandomFoodPosition(); // Generate new food position
    snakeBody.push([foodX, foodY]); // Increase the snake size by adding a new segment

    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);
    scorePoint.innerText = `Score: ${score}`;
    highPoint.innerText = `High Score: ${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]; // Move each segment to the position of the previous segment
  }

  //   adding the first segment of the snake
  snakeBody[0] = [snakeX, snakeY];

  //   Update the snake position
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    return (gameOver = true);
  }

  // Update snake body positions by a div
  for (let i = 0; i < snakeBody.length; i++) {
    gameHTML += `<div class="snake" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  // Update the game board
  playBoard.innerHTML = gameHTML;
};

generateRandomFoodPosition();
setIntervalId = setInterval(initializeGame, 250); // Moving click continously
document.addEventListener("keydown", handleDirectionChange); // Function to move the snake
