class Goalkeeper extends GameObject {
  SPEED = 20;
  stepY = this.SPEED
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
      this.stepY = 0;
      this.stepX = 0;

    if (stepGK !== 0) {
      var tmpTop = this.top + stepGK * this.SPEED;
      this.stepY = stepGK * this.SPEED;

      if (tmpTop < minPosition) {
        this.stepY = 1 * this.SPEED
      } else if (this.top > maxPosition) {
        this.stepY = -1 * this.SPEED
      }
  }
}
}
