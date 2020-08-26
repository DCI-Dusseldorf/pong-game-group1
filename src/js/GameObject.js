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
