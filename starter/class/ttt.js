const Screen = require("./screen");
const Cursor = require("./cursor");
const Command = require('./command');
const ComputerPlayer=require('./computer-player')

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("w", "up", this.up.bind(this));
    Screen.addCommand("s", "down", this.down.bind(this));
    Screen.addCommand("a", "left", this.left.bind(this));
    Screen.addCommand("d", "right", this.right.bind(this));
    Screen.addCommand("e", "place move", this.placeMove.bind(this));

    Screen.render();
  }

  up() {
    // Move cursor up
    this.cursor.resetBackgroundColor();
    this.cursor.up();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  down() {
    this.cursor.resetBackgroundColor();
    this.cursor.down();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  left() {
    this.cursor.resetBackgroundColor();
    this.cursor.left();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  right() {
    this.cursor.resetBackgroundColor();
    this.cursor.right();
    this.cursor.setBackgroundColor();
    this.renderGrid();
  }

  placeMove() {
    // Check if the selected cell is empty before placing a move
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
        this.grid[this.cursor.row][this.cursor.col] = 'O';



      // Check for a win or tie after placing the move
      const winner = TTT.checkWin(this.grid);
       if (winner) {
         TTT.endGame(winner);
       } else {

        //Computer's Turn
        this.computerPlaceMove();
        this.renderGrid();

         // Update the message to show the current player's turn
         Screen.setMessage(`Player's turn`);

         // Render the updated grid
        this.renderGrid();
      }
    }
  }

  computerPlaceMove(){
    let computerMove=ComputerPlayer.getSmartMove(this.grid, 'X');
    this.grid[computerMove.row][computerMove.col] = 'X';
  }

  renderGrid() {
    // Clear the screen and redraw the grid with X and O
    Screen.clear();

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        Screen.setGrid(row, col, this.grid[row][col]);
      }
    }
    this.cursor.setBackgroundColor();
    Screen.render();
  }



  static checkWin(grid) {
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended
    let count=0;
	for (let i=0; i<grid.length; i++ ){

		//for diagonal
		if ((i===0&&grid[i+1][i+1]!==` `&&grid[i][i]===grid[i+1][i+1]&&grid[i+1][i+1]===grid[i+2][i+2])||i===0&&grid[i+1][i+1]!==` `&&grid[i][i+2]===grid[i+1][i+1]&&grid[i+1][i+1]===grid[i+2][i]){
			return grid[i+1][i+1];
		}

		for (let j=0; j<grid.length;j++){

			if (grid[i][j]!==` `){
				count+=1;
			}

			//for horizontal
			if (j===0&&grid[i][j]!==` `&&grid[i][j]===grid[i][j+1]&&grid[i][j+1]===grid[i][j+2]){
				 return grid[i][j];
			}

			//for vertical
			if (j===0&&grid[j][i]!==` `&&grid[j][i]===grid[j+1][i]&&grid[j+1][i]===grid[j+2][i]){
					return grid[j][i];
			}

			if (i===2&&j===2&&count===9){
				return "T";
			}
		}
	}
	return false;

  }
  static endGame(winner) {
    if (winner === 'O') {
      Screen.setMessage(`Player wins!`);
    } else if (winner === 'X'){
      Screen.setMessage(`Computer wins!`);
    }
    else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
