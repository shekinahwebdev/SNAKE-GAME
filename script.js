const playBoard = document.querySelector(".play-board");
// set up snake food and snake initial position
let foodX, foodY;
let snakeX = 5,
  snakeY = 5;

let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

// Function to generate random food position
const generateRandomFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1; // Random X position between 1 and 30
  foodY = Math.floor(Math.random() * 30) + 1; // Random Y position between 1 and 30
};

// Function to handle direction change
const handleDirectionChange = (event) => {
  const key = event.key;
  if (key === "ArrowUp") {
    velocityX = -1;
    velocityY = 0;
  } else if (key === "ArrowDown") {
    velocityX = 1;
    velocityY = 0;
  } else if (key === "ArrowLeft") {
    velocityX = 0;
    velocityY = -1;
  } else if (key === "ArrowRight") {
    velocityX = 0;
    velocityY = 1;
  }
  initializeGame();
};

// Initial Game
const initializeGame = () => {
  let gameHTML = `<div class= "food" style="grid-area: ${foodX} / ${foodY}"></div>`;
  gameHTML += `<div class="snake" style="grid-area: ${snakeX} / ${snakeY}"></div>`;

  // Check if the snake has eaten the food
  if (snakeX === foodX && snakeY === foodY) {
    // Generate new food position
    generateRandomFoodPosition();
    // Increase the snake size by adding a new segment
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]; // Move each segment to the position of the previous segment
  }

  //   adding the first segment of the snake
  snakeBody[0] = [snakeX, snakeY];

  //   Update the snake position
  snakeX += velocityX;
  snakeY += velocityY;

  // Update snake body positions by a div
  for (let i = 0; i < snakeBody.length; i++) {
    gameHTML += `<div class="snake" style="grid-area: ${snakeBody[i][0]} / ${snakeBody[i][1]}"></div>`;
  }

  // Update the game board
  playBoard.innerHTML = gameHTML;
};
generateRandomFoodPosition();
initializeGame();

// Moving click continously
setInterval(initializeGame, 200);
// Function to move the snake
document.addEventListener("keydown", handleDirectionChange);
