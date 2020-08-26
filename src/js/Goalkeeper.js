class Goalkeeper extends GameObject {
  SPEED = 20;
  stepY = 0;
  stepX = 0;
  minPosition = 0;
  maxPosition = window.innerHeight - this.element.offsetHeight;
  changePosition(stepGK) {
    this.stepY = 0;
    this.stepX = 0;

    if (stepGK !== 0) {
      var tmpTop = this.top + stepGK * this.SPEED;

      if (
        (tmpTop > this.maxPosition && stepGK > 0) ||
        (tmpTop < this.minPosition && stepGK < 0)
      ) {
        this.stepY = 0;
      } else {
        this.stepY = stepGK * this.SPEED;
      }
    }
  }
}
