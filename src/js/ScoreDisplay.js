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
