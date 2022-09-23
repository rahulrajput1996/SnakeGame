const foodSound = new Audio("music/food.mp3");
const gameoverSound = new Audio("music/gameover.mp3");
const snakeMoveSound = new Audio("music/snakeMove.mp3");
const bgMusicSound = new Audio("music/bgMusic.mp3");
let myscore = 0;
let myhighscore = 0;
let lastPaintTime = 0;
let speed = 5;
let foodobj = {
  x: 4,
  y: 5,
};
let direction = { x: 0, y: 0 };
let snakeArr = [{ x: 10, y: 15 }];

function main(ctTime) {
  window.requestAnimationFrame(main);
  if ((ctTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctTime;
  gameplay();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // If you bump into the wall
  if (
    snake[0].x >= 20 ||
    snake[0].x <= 0 ||
    snake[0].y >= 20 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameplay() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameoverSound.play();
    bgMusicSound.pause();
    snakeMoveSound.pause();
    direction = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 10, y: 15 }];
    myscore = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === foodobj.y && snakeArr[0].x === foodobj.x) {
    foodSound.play();
    myscore += 1;
    speed += 0.1;

    if (myscore > myhighscore) {
      myhighscore = myscore;
      localStorage.setItem("HighScore", JSON.stringify(myhighscore));
      document.getElementById("highscore").innerHTML =
        "HighScore: " + myhighscore;
    }

    document.getElementById("score").innerHTML = "Score: " + myscore;

    snakeArr.unshift({
      x: snakeArr[0].x + direction.x,
      y: snakeArr[0].y + direction.y,
    });
    let a = 1;
    let b = 20;
    foodobj = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  document.getElementById("score").innerHTML = "Score: " + myscore;

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += direction.x;
  snakeArr[0].y += direction.y;

  //displaying the food
  document.getElementById("box").innerHTML = "";

  let initialfood = document.createElement("div");
  initialfood.classList.add("food");
  initialfood.style.gridRowStart = foodobj.y;
  initialfood.style.gridColumnStart = foodobj.x;
  let mybox = document.getElementById("box");
  mybox.appendChild(initialfood);

  //displaying the snake
  snakeArr.forEach((element, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index === 0) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snake");
    }
    let mybox = document.getElementById("box");
    mybox.appendChild(snakeElement);
  });
}

myhighscore = localStorage.getItem("HighScore");
if (myhighscore === null) {
  myhighscore = 0;
  localStorage.setItem("HighScore", JSON.stringify(myhighscore));
} else {
  myhighscore = JSON.parse(myhighscore);
  document.getElementById("highscore").innerHTML = "HighScore: " + myhighscore;
}

window.requestAnimationFrame(main);

document.body.addEventListener("keydown", (e) => {
  bgMusicSound.play();
  switch (e.key) {
    case "ArrowUp":
      snakeMoveSound.play();
      snakeMoveSound.loop = true;
      //reverse the sanke array
      if (direction.x == 0 && direction.y == 1) {
        snakeArr = snakeArr.reverse();
      }
      direction.x = 0;
      direction.y = -1;

      break;

    case "ArrowDown":
      snakeMoveSound.play();
      snakeMoveSound.loop = true;
      //reverse the sanke array
      if (direction.x == 0 && direction.y == -1) {
        snakeArr = snakeArr.reverse();
      }
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowLeft":
      snakeMoveSound.play();
      snakeMoveSound.loop = true;
      //reverse the sanke array
      if (direction.x == 1 && direction.y == 0) {
        snakeArr = snakeArr.reverse();
      }
      direction.x = -1;
      direction.y = 0;
      break;

    case "ArrowRight":
      snakeMoveSound.play();
      snakeMoveSound.loop = true;
      //reverse the sanke array
      if (direction.x == -1 && direction.y == 0) {
        snakeArr = snakeArr.reverse();
      }
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      break;
  }
});

document.getElementById("moveup").addEventListener("click", () => {
  snakeMoveSound.play();
  snakeMoveSound.loop = true;
  //reverse the sanke array
  if (direction.x == 0 && direction.y == 1) {
    snakeArr = snakeArr.reverse();
  }
  direction.x = 0;
  direction.y = -1;
});
document.getElementById("movedown").addEventListener("click", () => {
  snakeMoveSound.play();
  snakeMoveSound.loop = true;
  //reverse the sanke array
  if (direction.x == 0 && direction.y == -1) {
    snakeArr = snakeArr.reverse();
  }
  direction.x = 0;
  direction.y = 1;
});
document.getElementById("moveleft").addEventListener("click", () => {
  snakeMoveSound.play();
  snakeMoveSound.loop = true;
  //reverse the sanke array
  if (direction.x == 1 && direction.y == 0) {
    snakeArr = snakeArr.reverse();
  }
  direction.x = -1;
  direction.y = 0;
});
document.getElementById("moveright").addEventListener("click", () => {
  snakeMoveSound.play();
  snakeMoveSound.loop = true;
  //reverse the sanke array
  if (direction.x == -1 && direction.y == 0) {
    snakeArr = snakeArr.reverse();
  }
  direction.x = 1;
  direction.y = 0;
});

document.getElementById("speedup").addEventListener("click", () => {
  speed = speed + 1;
});
document.getElementById("speeddown").addEventListener("click", () => {
  speed = speed - 1;
  if (speed <= 3) {
    speed = 3;
  }
});
