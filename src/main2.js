class Goalkeeper {
  constructor(selector) {
    this.selector = selector;
  }

  getCurrentUITop() {
    return document.querySelector(this.selector).getBoundingClientRect().top;
  }

  getCurrentUIRight() {
    return document.querySelector(this.selector).getBoundingClientRect().right;
  }

  getCurrentUILeft() {
    return document.querySelector(this.selector).getBoundingClientRect().left;
  }

  getCurrentUIBottom() {
    return document.querySelector(this.selector).getBoundingClientRect().bottom;
  }
}
class ScoreDisplay {
  constructor(leftElement, rightSelector) {
    this.leftScore = leftElement;
    this.rightScore = rightSelector;
  }

  addLeftScore() {
    this.addScore(this.leftScore);
  }

  addRightScore() {
    this.addScore(this.rightScore);
  }
  addScore(selector) {
    let scoreElement = document.querySelector(selector);
    scoreElement.innerText = parseInt(scoreElement.innerText) + 1;
  }
}

class Ball {
  constructor(ballSelector) {
    this.ball = document.querySelector(ballSelector);
    this.ballRect = this.ball.getBoundingClientRect();
    this.top = this.ballRect.top;
    this.right = this.ballRect.right;
    this.bottom = this.ballRect.bottom;
    this.left = this.ballRect.left;
    this.stepY = 5;
    this.stepX = 5;
    this.radius = this.ball.offsetWidth / 2;
  }

  reset() {
    this.stepX = 5;
    this.stepY = 5;
    this.top = this.ballRect.top;
    this.right = this.ballRect.right;
    this.bottom = this.ballRect.bottom;
    this.left = this.ballRect.left;
    let audio = new Audio('sounds/ow/'+Math.floor(Math.random() * 48) +'.mp3');
    audio.play();
  }

  changeDirection(leftGk, rightGk) {
    if (this.top + this.radius > window.innerHeight) {
      this.stepY = -Math.abs(this.stepY);
    }
    if (this.top + this.stepY < this.radius) {
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
      this.stepX = Math.abs(this.stepX);
    }

    var rightGKLeft = rightGk.getCurrentUILeft();
    var rightGKTop = rightGk.getCurrentUITop();
    var rightGKBottom = rightGk.getCurrentUIBottom();

    if (
      rightGKLeft < this.right - this.radius &&
      rightGKTop < this.bottom &&
      rightGKBottom > this.top
    ) {
      this.stepX = -Math.abs(this.stepX);
    }
  }

  move() {
    this.top = this.top + this.stepY;
    this.left = this.left + this.stepX;
    this.bottom = this.bottom + this.stepY;
    this.right = this.right + this.stepX;
  }

  checkCollisionAndUpdateScore(score) {
    if (this.left + this.radius > window.innerWidth) {
      console.log(
        "LEFT ball left:" +
          this.left +
          " + ball radius:" +
          this.radius +
          " > window.innerWidth:" +
          window.innerWidth
      );
      this.stepX = -Math.abs(this.stepX);
      score.addLeftScore();
      this.reset();
    }

    if (this.left + this.stepX < this.radius) {
      console.log(
        "RIGHT ball left:" +
          this.left +
          " + ball stepX:" +
          this.stepX +
          " < ball radius:" +
          this.radius
      );
      this.stepX = Math.abs(this.stepX);
      score.addRightScore();
      this.reset();
    }
  }
  updateUI() {
    this.ball.style.top = this.top + "px";
    this.ball.style.left = this.left + "px";
    this.ball.style.right = this.right + "px";
    this.ball.style.bottom = this.bottom + "px";
  }
  speedUp(speed) {
    this.stepX = this.stepX * speed;
    this.stepY = this.stepY * speed;
  }
}

let scoreDisplay = new ScoreDisplay(".left-score", ".right-score");
let leftGKObj = new Goalkeeper(".left-goalkeeper");
let rightGKObj = new Goalkeeper(".right-goalkeeper");
let ballObj = new Ball(".ball");

function updatePositions() {
  goalkeepersPositions();
  ballObj.move();
  ballObj.changeDirection(leftGKObj, rightGKObj);
  ballObj.checkCollisionAndUpdateScore(scoreDisplay);
  ballObj.updateUI();
  ballObj.speedUp(1.0005);
}

setInterval(updatePositions, 1000 / 60);

//############################################################
const leftGoalkeeper = document.querySelector(".left-goalkeeper");
const rightGoalkeeper = document.querySelector(".right-goalkeeper");

let positionLeftGK = window.innerHeight / 2;
let positionRightGK = window.innerHeight / 2;
let stepLeftGK = 0;
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
  const minPosition = leftGoalkeeper.offsetHeight / 2;
  const maxPosition = window.innerHeight - minPosition;

  if (stepLeftGK !== 0) {
    positionLeftGK = positionLeftGK + stepLeftGK * 20;

    if (positionLeftGK < minPosition) {
      positionLeftGK = minPosition;
    } else if (positionLeftGK > maxPosition) {
      positionLeftGK = maxPosition;
    }

    leftGoalkeeper.style.top = positionLeftGK + "px";
  }

  if (stepRightGK !== 0) {
    positionRightGK = positionRightGK + stepRightGK * 20;

    if (positionRightGK < minPosition) {
      positionRightGK = minPosition;
    } else if (positionRightGK > maxPosition) {
      positionRightGK = maxPosition;
    }

    rightGoalkeeper.style.top = positionRightGK + "px";
  }
}

