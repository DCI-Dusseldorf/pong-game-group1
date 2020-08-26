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
