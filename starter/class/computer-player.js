
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
  let validMoveArr=[];
  for (let i=0; i<grid.length; i++){
    for (let j=0; j<grid.length; j++){
      if (grid[i][j]===' '){
        validMoveArr.push({row:i, col:j});
      }
    }
  }
  return validMoveArr;
}

  static randomMove(grid) {
    // Your code here
    function getRandomIntInclusive(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
    }

  let validMoves = ComputerPlayer.getValidMoves(grid);
  let randomIndex = getRandomIntInclusive(0, validMoves.length - 1);
  return validMoves[randomIndex];
  }

  static getWinningMoves(grid, symbol) {
    // Your code here
    let count=0;
    let winningMove={};
    for (let i=0; i<grid.length; i++ ){
       //for diagonal cases-------------------------------------
        if ((i===0&&grid[i+1][i+1]===symbol&&grid[i][i]===grid[i+1][i+1])){
          if((grid[i+1][i+1])===' '){
            winningMove = {row:i+1, col:i+1};
            return winningMove;
          }

        }
        if ((i===1&&grid[i+1][i+1]===symbol&&grid[i][i]===grid[i+1][i+1])){
          if((grid[0][0])===' '){
            winningMove = {row:0, col:0};;
            return winningMove;
          }

        }
        if ((i===2&&grid[0][0]===symbol&&grid[i][i]===grid[0][0])){
          if((grid[i-1][i-1])===' '){
            winningMove = {row:i-1, col:i-1};
          return winningMove;
          }

        }

        if ((i===0&&grid[i][i+2]===symbol&&grid[i+2][i]===grid[i][i+2])){
          if((grid[i+1][i+1])===' '){
            winningMove = {row:i+1, col:i+1};
          return winningMove;
          }

        }
        if ((i===1&&grid[0][i+1]===symbol&&grid[i][i]===grid[0][i+1])){
          if((grid[i+1][0])===' '){
            winningMove = {row:i+1, col:0};
          return winningMove;
          }

        }
        if ((i===2&&grid[0][i]===symbol&&grid[i][0]===grid[0][i])){
          if((grid[i-1][i-1])===' '){
            winningMove = {row:i-1, col:i-1};
          return winningMove;
          }
        }

        for (let j=0; j<grid.length-1;j++){

          if (grid[i][j]!==` `){
            count+=1;
          }

          //for horizontal cases ------------------------------------
          if (j===0&&grid[i][j]===symbol&&grid[i][j+1]===symbol){
            if((grid[i][2])===' '){
              winningMove = {row:i, col:2};
            return winningMove;
            }
          }

          if (j===1&&grid[i][j]===symbol&&grid[i][j+1]===symbol){
            if((grid[i][0])===' '){
              winningMove = {row:i, col:0};
            return winningMove;
            }
          }

          if (j===2&&grid[i][0]===symbol&&grid[i][j]===symbol){
            if((grid[i][1])===' '){
              winningMove = {row:i, col:1};
            return winningMove;
            }
          }

          //for vertical cases---------------------------------------
          if (j===0&&grid[j][i]===symbol&&grid[j+1][i]===symbol){
            if((grid[2][i])===' '){
              winningMove = {row:2, col:i};
            return winningMove;
            }
          }

          if (j===1&&grid[j][i]===symbol&&grid[j+1][i]===symbol){
            if((grid[0][i])===' '){
              winningMove = {row:0, col:i};
            return winningMove;
            }
          }

          if (j===2&&grid[0][i]===symbol&&grid[j][i]===symbol){
            if((grid[1][i])===' '){
              winningMove = {row:1, col:i};
            return winningMove;
            }
          }

        }
    }
}

    static getSmartMove(grid, symbol) {
    // Your code here

     if (this.getValidMoves(grid).length!==0){
      let smartMove=this.getWinningMoves(grid, symbol);
      if(smartMove){
        return smartMove;
      }

      else if (this.getWinningMoves(grid, 'O')){
        smartMove=this.getWinningMoves(grid, 'O');
        return smartMove;
      }

      else if (grid[1][1]===' '){
          smartMove={row:1, col:1};
          return smartMove;
      }

      else {
        smartMove=this.randomMove(grid);
        return smartMove;
      }
    }
    else return;
  }
}

module.exports = ComputerPlayer;
