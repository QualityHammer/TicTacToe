let tics = [];
let tacs = [];

let player;
let opp;

let grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

var opponent = true;
var turn = true;
var winner = null;

function setup() {
	createCanvas(800, 800);
	player = new Player();
	opp = new Opponent(1, player);
}

function draw() {
	background(200);
	// Draws vertical lines
	for (i = 0; i < width; i += floor(width / 3)) {
		strokeWeight(4);
		stroke(1);
		line(i, 0, i, height);
	}
	// Draws horizontal lines
	for (j = 0; j < height; j += floor(height / 3)) {
		line(0, j, width, j);
	}

	if (opponent && !winner) {
		if (opp.turn) {
			opp.chooseMove(grid);
			if (opp.id == 1) {
				if (checkWin(tics)) {
					 winner = "Tic";
				}
			} else {
				if (checkWin(tacs)) {
					winner = "Tac";
				}
			}
		}
	}

	// Shows all tics
	for (let tic of tics) {
		tic.show();
	}

	// Shows all tacs
	for (let tac of tacs) {
		tac.show();
	}

	// Displays win screen if there is a winner
	if (winner) {
		textSize(200);
		fill(1);
		textAlign(CENTER);
		if (winner == "Tic") {
			stroke(220, 0, 0);
		}
		text(winner + " wins!", width / 2, height / 2);
	}

}

function mousePressed() {
	// Is called on every mouse click
	if (opponent) {
		if (!winner) {
			if (!opp.turn) {
				if (player.id == 1) {
					if (clickTic()) {
						opp.turn = true;
					}
				} else {
					if (clickTac()) {
						opp.turn = true;
					}
				}
			}
		}
	} else {
		localPlayers();
	}

}

function localPlayers() {
	// Is called every mouse click if ther is no CPU opponent
	// If there is a winner then nothing happens
	if (!winner) {
		if (turn) {
			if (clickTic()) {
				turn = !turn;
			}
		} else {
			if (clickTac()) {
				turn = !turn;
			}
		}
	}
}

function clickTic() {
	// Adds a new tic and checks winner if the spot that has been
	// clicked is not already filled
	var cx = checkX();
	var cy = checkY();
	if (checkAllPos(transX(cx), transY(cy))) {
		return false;
	}
	// Creates a new tic if spot is blank
	t = new Tic(cx, cy, transX(cx), transY(cy));
	grid[t.y - 1][t.x - 1] = 1;
	// Checks all neighbors for new tic
	for (let tic of tics) {
		tic.checkNeighbor(t);
		t.checkNeighbor(tic);
	}
	// Adds new tic to tics
	tics.push(t);
	// Checks if tics has won
	if (checkWin(tics)) {
		 winner = "Tic";
	}
	return true;
}

function clickTac() {
	// Adds a new tac and checks winner if the spot that has been
	// clicked is not already filled
	var cx = checkX();
	var cy = checkY();
	if (checkAllPos(transX(cx), transY(cy))) {
		return false;
	}
	// Creates a new tac if spot is blank
	t = new Tac(cx, cy, transX(cx), transY(cy));
	grid[t.y - 1][t.x - 1] = 2;
	// Checks all neighbors for new tac
	for (let tac of tacs) {
		tac.checkNeighbor(t);
		t.checkNeighbor(tac);
	}
	// Adds new tac to tacs
	tacs.push(t);
	// Checks if tacs has won
	if (checkWin(tacs)) {
		winner = "Tac";
	}
	return true;
}

function checkWin(tictacs) {
	// Checks if either tics or tacs has won
	for (let tictac of tictacs) {
		if (tictac.neighbors.length == 2) {
			// "Simple" check
			if (tictac.neighbors[0].x == tictac.x && tictac.neighbors[1].x == tictac.x) {
				return true;
			} else if (tictac.neighbors[0].y == tictac.y && tictac.neighbors[1].y == tictac.y) {
				return true;
			} else if (abs(tictac.neighbors[0].x - tictac.neighbors[1].x) == tictac.x
			&& abs(tictac.neighbors[0].y - tictac.neighbors[1].y) == tictac.y
			&& tictac.neighbors[0].x != tictac.x && tictac.neighbors[0].y != tictac.y
			&& tictac.neighbors[1].x != tictac.x && tictac.neighbors[1].y != tictac.y) {
				return true;
			}
		} else if (tictac.neighbors.length > 2) {
			// Full neighbor check, saved for only when the "simple" check won't work
			for (i = 0; i < tictac.neighbors.length; i++) {
				for (j = i + 1; j < tictac.neighbors.length; j++) {
					if (tictac.neighbors[i].x == tictac.x && tictac.neighbors[j].x == tictac.x) {
						return true;
					} else if (tictac.neighbors[i].y == tictac.y && tictac.neighbors[j].y == tictac.y) {
						return true;
					} else if (abs(tictac.neighbors[i].x - tictac.neighbors[j].x) == tictac.x
					&& abs(tictac.neighbors[i].y - tictac.neighbors[j].y) == tictac.y
					&& tictac.neighbors[i].x != tictac.x && tictac.neighbors[i].y != tictac.y
					&& tictac.neighbors[j].x != tictac.x && tictac.neighbors[j].y != tictac.y) {
						return true;
					}
				}
			}
		}
	}
	return false;
}

function checkAllPos(posX, posY) {
	// Checks to see if there is already a tictac on the
	// spot where the mouse is clicked
	if (posX < 1 || posX > 3 || posY < 1 || posY > 3) {
		return false;
	}
	return (grid[posY - 1][posX - 1] != 0);
}

function validPos(posX, posY) {
	// Returns true if the position is in the grid
	return (posX > 0 && posX < 4 && posY > 0 && posY < 4);
}

function transX(posX) {
	// Translates a posX from checkX to a numbeer from 1-3
	return round(map(posX, 0, width, 1, 3));
}

function transY(posY) {
	// Translates a posY from checkY to a numbeer from 1-3
	return round(map(posY, 0, height, 1, 3));
}

function checkX() {
	// Returns the x value of the column that the mouse is in
	if (mouseX < width && mouseX > width * 2 / 3) {
		return floor(width * 5 / 6);
	} else if (mouseX < width * 2 / 3 && mouseX > width / 3) {
		return floor(width / 2);
	} else if (mouseX > 0 && mouseX < width / 3) {
		return floor(width / 6);
	}
}

function checkY() {
	// Returns the y value of the row that the mouse is in
	if (mouseY < height && mouseY > height * 2 / 3) {
		return floor(width * 5 / 6);
	} else if (mouseY < height * 2 / 3 && mouseY > height / 3) {
		return floor(width / 2);
	} else if (mouseY > 0 && mouseY < height / 3) {
		return floor(height / 6);
	}
}
