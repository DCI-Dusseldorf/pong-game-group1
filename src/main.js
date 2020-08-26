class GameObject {
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(this.selector);
    this.elementRect = this.element.getBoundingClientRect();
    this.top = this.elementRect.top;
    this.right = this.elementRect.right;
    this.bottom = this.elementRect.bottom;
    this.left = this.elementRect.left;
    this.radius = this.element.offsetWidth / 2;
  }
  SPEED = 5;
  stepY = this.SPEED;
  stepX = this.SPEED;

  updateUI() {
    this.element.style.top = this.top + "px";
    this.element.style.left = this.left + "px";
     this.element.style.right = this.right + "px";
    this.element.style.bottom = this.bottom + "px";
  }
}
class Goalkeeper extends GameObject {
  SPEED = 20;
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

  changePosition(stepGK) {
    const minPosition = this.element.offsetHeight / 2;
    const maxPosition = window.innerHeight - minPosition;

    if (stepGK !== 0) {
      this.top = this.top + stepGK * this.SPEED;
      this.bottom = this.bottom + stepGK * this.SPEED;

      if (this.top < minPosition) {
        this.top = minPosition;
        this.bottom = minPosition;
      } else if (this.top > maxPosition) {
        this.top = maxPosition;
        this.bottom = maxPosition;
      }

    }
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
    scoreElement.style.fontSize = "100px"; // The "winned" score pops-up for 1 sec
    let fontBack = () => (scoreElement.style.fontSize = "50px"); //
    setTimeout(fontBack, 1000); // and then goes back to norm.
  }
}

class Ball extends GameObject{

  SPEED = 7;
  ACCELERATOR = 1.03;

  reset() {
    // 0 value to stop the ball
    this.stepX = 0;
    this.stepY = 0;
    this.top = this.elementRect.top;
    this.right = this.elementRect.right;
    this.bottom = this.elementRect.bottom;
    this.left = this.elementRect.left;
    let audio = new Audio(
      "sounds/ow/" + Math.floor(Math.random() * 47) + ".mp3"
    );
    audio.play();
    setTimeout(() => {
      // this.SPEED is default value to make the ball move
      this.stepX = this.SPEED;
      this.stepY = this.SPEED;
    }, 1000);
  }

  changeDirection(leftGk, rightGk) {
    if (this.top + this.radius > window.innerHeight) {
      this.stepY = -Math.abs(this.stepY);
    }
    if (this.top + this.stepY < this.radius) {
      this.stepY = Math.abs(this.stepY);
    }

    if (
      leftGk.getCurrentUITop() < this.bottom - this.radius &&
      leftGk.getCurrentUIRight() > this.left - this.radius &&
      leftGk.getCurrentUIBottom() > this.top - this.radius
    ) {
      this.stepX = Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
    }

    if (
      rightGk.getCurrentUILeft() < this.right - this.radius &&
      rightGk.getCurrentUITop() < this.bottom - this.radius &&
      rightGk.getCurrentUIBottom() > this.top - this.radius
    ) {
      this.stepX = -Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
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
      score.addLeftScore();
      this.reset();
    }

    if (this.left + this.stepX < this.radius) {
      this.stepX = Math.abs(this.stepX);
      score.addRightScore();
      this.reset();
    }
  }

  speedUp(speed) {
    this.stepX = this.stepX * speed;
    this.stepY = this.stepY * speed;
  }
}

class Game {
  constructor(ballObj, scoreDisplayObj, leftGKObj, rightGKObj) {
    this.ballObj = ballObj;
    this.scoreDisplayObj = scoreDisplayObj;
    this.leftGKObj = leftGKObj;
    this.rightGKObj = rightGKObj;
  }
  intervalID;
  pauseStatus = false;
  start() {
    this.intervalID = setInterval(() => {
      this.updatePositions();
    }, 1000 / 60);
  }
  stop() {
    clearInterval(this.intervalID);
  }

  pause() {
    if (this.pauseStatus) {
      this.start();
      this.pauseStatus = false;
    } else {
      this.stop();
      this.pauseStatus = true;
    }
  }

  updatePositions() {
    this.leftGKObj.changePosition(stepLeftGK);
    this.leftGKObj.updateUI();
    this.rightGKObj.changePosition(stepRightGK);
    this.rightGKObj.updateUI();
    this.ballObj.move();
    this.ballObj.move();
    this.ballObj.changeDirection(this.leftGKObj, this.rightGKObj);
    this.ballObj.checkCollisionAndUpdateScore(this.scoreDisplayObj);
    this.ballObj.updateUI();
  }
}

const game = new Game(
  new Ball(".ball"),
  new ScoreDisplay(".left-score", ".right-score"),
  new Goalkeeper(".left-goalkeeper"),
  new Goalkeeper(".right-goalkeeper")
);

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
    case "Space":
      game.pause();
      break;
    case "Enter":
      if (game.pauseStatus == false) {
        game.stop();
        game.start();
      }
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
