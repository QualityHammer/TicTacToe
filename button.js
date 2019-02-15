class Button {
  constructor(x, y, w, h, r, g, b) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  alter() {
    if (mouseX < this.x + this.w && mouseX > this.x && this.y < mouseY && this.y + this.h > mouseY) {
      return this.r, this.g, this.b;
    }
  }

  show() {
    stroke(1);
    noFill();
    if (mouseX < this.x + this.w && mouseX > this.x && this.y < mouseY && this.y + this.h > mouseY) {
      fill(this.r, this.g, this.b);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}
