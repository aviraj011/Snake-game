const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const scoreDisplay = document.getElementById("score");

const box = 20; // Size of each square
let snake;
let food;
let direction;
let score;
let gameLoop;

// Start Game
startBtn.addEventListener("click", startGame);
document.addEventListener("keydown", changeDirection);

function startGame() {
  snake = [{ x: 9 * box, y: 10 * box }];
  food = randomFood();
  direction = null;
  score = 0;
  clearInterval(gameLoop);
  gameLoop = setInterval(draw, 100);
  scoreDisplay.textContent = "Score: 0";
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
  };
}

function changeDirection(e) {
  if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Food
ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 2, 0, Math.PI * 2);
ctx.fill();
ctx.closePath();

  // Move Snake
  let headX = snake[0].x;
  let headY = snake[0].y;

  if (direction === "LEFT") headX -= box;
  if (direction === "UP") headY -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "DOWN") headY += box;

  // Edge wrapping
  if (headX >= canvas.width) headX = 0;
  if (headX < 0) headX = canvas.width - box;
  if (headY >= canvas.height) headY = 0;
  if (headY < 0) headY = canvas.height - box;

  const newHead = { x: headX, y: headY };

  // Check if snake eats food
  if (headX === food.x && headY === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = randomFood();
  } else {
    snake.pop();
  }

  // Check self-collision
  for (let part of snake) {
    if (part.x === newHead.x && part.y === newHead.y) {
      clearInterval(gameLoop);
      alert("Game Over! Your Score: " + score);
      return;
    }
  }

  snake.unshift(newHead);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#6f6";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}
