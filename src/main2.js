const leftGoalkeeper = document.querySelector(".left-goalkeeper");
const rightGoalkeeper = document.querySelector(".right-goalkeeper");
const ball = document.querySelector(".ball");
var leftScore = 0;
var rightScore = 0;

var leftScoreDisplay = document.querySelector(".left-score");
var rightScoreDisplay = document.querySelector(".right-score");
function updateScoreDisplay() {
  leftScoreDisplay.innerHTML = leftScore;
  rightScoreDisplay.innerHTML = rightScore;
}

class Goalkeeper {
  constructor(element) {
    this.element = element;
  }

  getCurrentUITop() {
    return document.querySelector(this.element).getBoundingClientRect().top;
  }

  getCurrentUIRight() {
    return document.querySelector(this.element).getBoundingClientRect().right;
  }

  getCurrentUILeft() {
    return document.querySelector(this.element).getBoundingClientRect().left;
  }

  getCurrentUIBottom() {
    return document.querySelector(this.element).getBoundingClientRect().bottom;
  }
}

let leftGK = new Goalkeeper(".left-goalkeeper");
let rightGK = new Goalkeeper(".right-goalkeeper");

class Ball {
  constructor(top, right, bottom, left, width) {
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.stepY = 3;
    this.stepX = 3;
    this.radius = width / 2;
  }

  reset() {}

  changeDirection(leftGk, rightGk) {
    if (this.top + this.radius > window.innerHeight) {
      this.stepY = -Math.abs(ballObj.stepY);
    }
    if (this.top + this.stepY < ballObj.radius) {
      this.stepY = Math.abs(this.stepY);
    }

    var leftGKTop = leftGk.getCurrentUITop();
    var leftGKRight = leftGk.getCurrentUIRight();
    var leftGKBottom = leftGk.getCurrentUIBottom();

    if (
      leftGKTop < this.bottom &&
      leftGKRight > this.left - this.radius &&
      leftGKBottom > this.top
    ) {
      this.stepX = Math.abs(ballObj.stepX);
    }

    var rightGKLeft = rightGk.getCurrentUILeft();
    var rightGKTop = rightGk.getCurrentUITop();
    var rightGKBottom = rightGk.getCurrentUIBottom();

    if (
      rightGKLeft < this.right - this.radius &&
      rightGKTop < this.bottom &&
      rightGKBottom > this.top
    ) {
      this.stepX = -Math.abs(ballObj.stepX);
    }
  }

  move() {
    this.top = this.top + this.stepY;
    this.left = this.left + this.stepX;
    this.bottom = this.bottom + this.stepY;
    this.right = this.right + this.stepX;
  }

  checkCollision() {
    if (this.left + this.radius > window.innerWidth) {
      this.stepX = -Math.abs(ballObj.stepX);
      leftScore += 1;
      updateScoreDisplay();
      this.reset();
    }

    if (this.left + this.stepX < this.radius) {
      this.stepX = Math.abs(this.stepX);
      rightScore += 1;
      updateScoreDisplay();
      this.reset();
    }
  }
}

let rightBallRect = ball.getBoundingClientRect();
let ballObj = new Ball(
  rightBallRect.top,
  rightBallRect.right,
  rightBallRect.bottom,
  rightBallRect.left,
  ball.offsetWidth
);

setInterval(updateBallPosition, 20);

function updateBallPosition() {
  ballObj.move();
  //
  ballObj.move();
  ballObj.changeDirection(leftGK, rightGK);
  ballObj.checkCollision();

  ball.style.top = ballObj.top + "px";
  ball.style.left = ballObj.left + "px";
  console.log(ballObj.stepX);
}

let positionLeftGK = window.innerHeight / 2;
let positionRightGK = window.innerHeight / 2;
let stepLeftGK = 0; // 0 is stop, -1 is up, 1 is down;
let stepRightGK = 0;

document.onkeydown = function (event) {
  switch (event.code) {
    case "KeyW":
      stepLeftGK = -1;
      break;
    case "KeyS":
      stepLeftGK = 1;
      break;
    case "ArrowUp":
      stepRightGK = -1;
      break;
    case "ArrowDown":
      stepRightGK = 1;
      break;
  }
};

document.onkeyup = function (event) {
  switch (event.code) {
    case "KeyW":
      stepLeftGK = 0;
      break;
    case "KeyS":
      stepLeftGK = 0;
      break;
    case "ArrowUp":
      stepRightGK = 0;
      break;
    case "ArrowDown":
      stepRightGK = 0;
      break;
  }
};

function goalkeepersPositions() {
  const minPosition = window.innerHeight * 0.15;
  const maxPosition = window.innerHeight * 0.85;

  if (stepLeftGK !== 0) {
    positionLeftGK = positionLeftGK + stepLeftGK * 5;

    if (positionLeftGK < minPosition) {
      positionLeftGK = minPosition;
    } else if (positionLeftGK > maxPosition) {
      positionLeftGK = maxPosition;
    }

    leftGoalkeeper.style.top = positionLeftGK + "px";
  }

  if (stepRightGK !== 0) {
    positionRightGK = positionRightGK + stepRightGK * 5;

    if (positionRightGK < minPosition) {
      positionRightGK = minPosition;
    } else if (positionRightGK > maxPosition) {
      positionRightGK = maxPosition;
    }

    rightGoalkeeper.style.top = positionRightGK + "px";
  }
}

setInterval(goalkeepersPositions, 1000 / 60);
