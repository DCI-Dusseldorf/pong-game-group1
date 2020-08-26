class Goalkeeper extends GameObject {
  SPEED = 20;
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
