class Ball extends GameObject {
  SPEED = 7;
  stepY = this.SPEED;
  stepX = this.SPEED;
  ACCELERATOR = 1.04;

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
    }, 2000);
  }

  changeDirection(leftGk, rightGk) {
    if (this.top + this.radius > window.innerHeight) {
      this.stepY = -Math.abs(this.stepY);
    }
    if (this.top + this.stepY < this.radius) {
      this.stepY = Math.abs(this.stepY);
    }

    if (
      leftGk.top < this.bottom - this.radius &&
      leftGk.right > this.left - this.radius &&
      leftGk.bottom > this.top - this.radius
    ) {
      this.stepX = Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
    }

    if (
      rightGk.left < this.right - this.radius &&
      rightGk.top < this.bottom - this.radius &&
      rightGk.bottom > this.top - this.radius
    ) {
      this.stepX = -Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
    }
  }

  checkCollisionAndUpdateScore(score) {
    if (this.right - this.radius - this.radius > window.innerWidth) {
      score.addLeftScore();
      this.reset();
    }

    if (this.left +this.radius < this.radius) {
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
