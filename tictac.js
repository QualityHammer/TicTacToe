class Tic {
  constructor(posX, posY, x, y) {
    this.id = "tic";
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.w = floor(width / 3 - width / 5);
    this.h = floor(height / 3 - height / 5);
    this.neighbors = [];

  }

  checkNeighbor(tic) {
    // Adds another tic if it is directlposY neposXt to
    // or diagonal from this tic.
    if (tic.id == this.id) {
      if (!(tic.x == this.x && tic.y == this.y)) {
        if (abs(this.posX - tic.posX) / 300 < 1 && abs(this.posY - tic.posY) / 300 < 1) {
          this.neighbors.push(tic);
        }
      }
    }
  }

  show() {
    strokeWeight(6);
    stroke(220, 0, 0)
    line(this.posX, this.posY, this.posX + this.w, this.posY + this.h);
    line(this.posX, this.posY, this.posX + this.w, this.posY - this.h);
    line(this.posX, this.posY, this.posX - this.w, this.posY + this.h);
    line(this.posX, this.posY, this.posX - this.w, this.posY - this.h);

  }
}


class Tac {
  constructor(posX, posY, x, y) {
    this.id = "tac";
    this.x = x;
    this.y = y;
    this.posX = posX;
    this.posY = posY;
    this.r = (floor(width / 3 - width / 5) + floor(height / 3 - height / 5)) / 2;
    this.neighbors = [];
  }

  checkNeighbor(tac) {
    // Adds another tac if it is directlposY neposXt to
    // or diagonal from this tac.
    if (tac.id == this.id) {
      if (!(tac.x == this.x && tac.y == this.y)) {
        if (abs(this.posX - tac.posX) / 300 < 1 && abs(this.posY - tac.posY) / 300 < 1) {
          this.neighbors.push(tac);
        }
      }
    }
  }

  show() {
    strokeWeight(6);
    stroke(0, 0, 220);
    noFill();
    circle(this.posX, this.posY, this.r);
  }
}
