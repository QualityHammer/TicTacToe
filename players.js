class Player {
  constructor() {
    this.id = ceil(random(2));
  }
}


class Opponent {
  constructor(difficulty, player) {
    this.difficulty = difficulty;
    if (player.id == 1) {
      this.id = 2;
    } else {
      this.id = 1;
    }
    this.turn = false;
  }

  checkSurrounding(x, y, grid) {
    // Returns a list of every surrounding spot and the tictac id
    let allSurround = [];
    for (i = -1; i < 2; i++) {
      for (j = -1; j < 2; j++) {
        if (i !=0 || j != 0) {
          if (validPos(x + i, y + j)) {
            allSurround.push([x + i, y + j, grid[y + j - 1][x + i - 1]]);
          }
        }
      }
    }
    return allSurround;
  }

  chooseMove(grid) {
    if (this.difficulty == 0) {
      this.easyMove(grid);
    } else {
      this.hardMove(grid);
    }
  }

  easyMove(grid) {
    var j = floor(random(3));
    var i = floor(random(3));
    if (grid[j][i] == 0) {
      this.place(i + 1, j + 1);
    } else {
      this.easyMove(grid);
    }
  }

  hardMove(grid) {
    // Move with difficulty
    var hasTicTac = false;
    // Checks if there is already a spot filled on the grid
    for (j = 0; j < grid.length; j++) {
      for (i = 0; i < grid[j].length; i++) {
        if (grid[j][i] == this.id) {
          hasTicTac = true;
        }
      }
    }if (!hasTicTac) {
      // Places first tictac on a random spot
      var x = floor(random(3));
      var y = floor(random(3));
      if (grid[y - 1][x - 1] == 0) {
        this.place(x, y);
      } else {
        this.hardMove(grid);
      }
    } else {
      var allSurround = this.checkSurrounding();
      var randomSurround = shuffle(allSurround);
      for (let spot of randomSurround) {
        if (spot[2] == 0) {
          this.place(spot[spot[0]][spot[1]]);
        }
      }
    }
  }

  place(x, y) {
    var posX;
    var posY;
    if (x == 1) {
      posX = floor(width / 6);
    } else if (x == 2) {
      posX = floor(width / 2);
    } else {
      posX = floor(width * 5 / 6)
    }
    if (y == 1) {
      posY = floor(height / 6);
    } else if (y == 2) {
      posY = floor(height / 2);
    } else {
      posY = floor(height * 5 / 6)
    }
    if (this.id == 1) {
      t = new Tic(posX, posY, x, y);
      tics.push(t);
      for (let tic of tics) {
				tic.checkNeighbor(t);
				t.checkNeighbor(tic);
			}
      grid[y - 1][x -  1] = 1;
    } else {
      t = new Tac(posX, posY, x, y);
      tacs.push(t);
      for (let tac of tacs) {
				tac.checkNeighbor(t);
				t.checkNeighbor(tac);
			}
      grid[y - 1][x -  1] = 2;
    }
    this.turn = false;
  }
}
