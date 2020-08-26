class Ball extends GameObject {
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
