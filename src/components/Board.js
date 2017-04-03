import React from 'react';
import Result from './Result.js';
import ResetButton from './ResetButton.js';
import Tile from './Tile.js';
import '../styles/Board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        winner: null,
        player: 'x'
    };
  }

  restartGame = () => {
    this.setState({
        gameBoard: [
          ' ',' ',' ',
          ' ',' ',' ',
          ' ',' ',' '
        ],
        winner: null,
        player: 'x'
    });
  };

  updateGame = (pos, player) => {
    console.log(this.state.winner, this.state.player, this.state.gameBoard);
    if (this.state.winner !== null) {
      //make game over component visible
      console.log("Winner", this.state.winner);
      return;
    }
    if (this.state.gameBoard[pos]=== 'x' || this.state.gameBoard[pos]=== 'o'){
      //invalid move
      return;
    }

    let currentGameBoard = JSON.parse(JSON.stringify(this.state.gameBoard));
    currentGameBoard.splice(pos, 1, this.state.player);

    this.setState({gameBoard: currentGameBoard}, () => {
      var moves = this.state.gameBoard.join('').replace(/ /g,'');
      console.log('Moves:', moves, 'Winner:', this.state.winner);

      if (moves.length === 9) {
        this.setState({winner: 'd'});
        return;
      } else {
        // check Rows
        var topRow = this.state.gameBoard[0] + this.state.gameBoard[1] + this.state.gameBoard[2];
        if (topRow.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        var middleRow = this.state.gameBoard[3] + this.state.gameBoard[4] + this.state.gameBoard[5];
        if (middleRow.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        var lastRow = this.state.gameBoard[6] + this.state.gameBoard[7] + this.state.gameBoard[8];
        if (lastRow.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }
        // check Columns
        var firstCol = this.state.gameBoard[0] + this.state.gameBoard[3] + this.state.gameBoard[6];
        if (firstCol.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        var secondCol = this.state.gameBoard[1] + this.state.gameBoard[4] + this.state.gameBoard[7];
        if (secondCol.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        var thirdCol = this.state.gameBoard[2] + this.state.gameBoard[5] + this.state.gameBoard[8];
        if (thirdCol.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }
        // check Diagonals
        var majorDiag = this.state.gameBoard[0] + this.state.gameBoard[4] + this.state.gameBoard[8];
        if (majorDiag.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        var minorDiag = this.state.gameBoard[2] + this.state.gameBoard[4] + this.state.gameBoard[6];
        if (minorDiag.match(/xxx|ooo/)){
          this.setState({winner: this.state.player});
          return;
        }

        this.setState({player: (this.state.player === 'x') ? 'o' : 'x' });
      }
    });
  }

  render() {
    return (
     <div className="main-container">
        <h1> Tic Tac Toe </h1>
        <div className="top">
          <Result player={this.state.player} winner={this.state.winner} />
          <ResetButton reset={this.restartGame} />
        </div>
        <div className="board">
          {this.state.gameBoard.map((val, indx) => {
            return (
              <Tile key={indx} pos={indx} value={val} updateGame={this.updateGame}
                player={this.state.player}
              />
            );
          })}
        </div>
     </div>);
  }
}

export default Board;
