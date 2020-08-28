class Ball extends GameObject {
  constructor(selector) {
    super(selector);
    this.footBall = new Audio("sounds/ball-football.wav");
    this.basketBall = new Audio("sounds/ball-basketball.wav");
    this.failAudio = new Audio();
    let soundsAmount = 47;
    this.playlist = [...Array(soundsAmount)].map(
      (item, index) => "sounds/ow/" + index + ".mp3"
    );
    this.initDefaultSpeed();
  }

  ACCELERATOR = 1.04;
  SPEED = 7;

  initDefaultSpeed() {
    this.stepX = this.SPEED * (Math.round(Math.random()) * 2 - 1);
    this.stepY = this.SPEED * (Math.round(Math.random()) * 2 - 1);
  }

  resetState() {
    // 0 value to stop the ball
    this.stepX = 0;
    this.stepY = 0;
    this.top = this.elementRect.top;
    this.right = this.elementRect.right;
    this.bottom = this.elementRect.bottom;
    this.left = this.elementRect.left;
    this.playFailAudio();
    setTimeout(() => {
      this.initDefaultSpeed();
    }, 2000);
  }

  playFailAudio() {
    this.failAudio.src = this.getRandomSoundPath();
    this.failAudio.play();
  }

  getRandomSoundPath() {
    return this.playlist[Math.floor(Math.random() * this.playlist.length)];
  }

  changeDirection(leftGk, rightGk) {
    this.bounceTop();
    this.bounceBottom();
    this.bounceLeftGk(leftGk);
    this.bounceRightGk(rightGk);
  }

  bounceTop() {
    if (this.top - this.radius < 0) {
      debugger;
      this.footBall.play();
      this.stepY = Math.abs(this.stepY);
    }
  }
  bounceBottom() {
    if (this.bottom - this.radius > window.innerHeight) {
      this.footBall.play();
      this.stepY = -Math.abs(this.stepY);
    }
  }
  bounceLeftGk(leftGk) {
    if (
      leftGk.top < this.bottom - this.radius &&
      leftGk.right > this.left - this.radius &&
      leftGk.bottom > this.top - this.radius
    ) {
      this.basketBall.play();
      this.stepX = Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
    }
  }

  bounceRightGk(rightGk) {
    if (
      rightGk.left < this.right - this.radius &&
      rightGk.top < this.bottom - this.radius &&
      rightGk.bottom > this.top - this.radius
    ) {
      this.basketBall.play();
      this.stepX = -Math.abs(this.stepX);
      this.speedUp(this.ACCELERATOR);
    }
  }

  checkCollisionAndUpdateScore(score) {
    if (this.right - this.radius - this.radius > window.innerWidth) {
      score.addLeftScore();
      this.resetState();
    }

    if (this.left + this.radius < this.radius) {
      this.stepX = Math.abs(this.stepX);
      score.addRightScore();
      this.resetState();
    }
  }

  speedUp(speed) {
    this.stepX = this.stepX * speed;
    this.stepY = this.stepY * speed;
  }
}
