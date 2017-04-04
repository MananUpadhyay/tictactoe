import React from 'react';
import Result from './Result.js';
import Player from './Player.js';
import ResetButton from './ResetButton.js';
import Tile from './Tile.js';
import '../styles/Board.css';

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        gameBoard: [
          [' ',' ',' '],
          [' ',' ',' '],
          [' ',' ',' ']
        ],
        winner: null,
        player: 'x',
        moves: 0
    };
  }

  restartGame = () => {
    this.setState({
        gameBoard: [
          [' ',' ',' '],
          [' ',' ',' '],
          [' ',' ',' ']
        ],
        winner: null,
        player: 'x',
        moves: 0
    });
  };

  updateGame = (posX, posY, player) => {
    if (this.state.winner !== null) {
      // make game over component visible
      console.log("Winner", this.state.winner);
      return;
    }
    if (this.state.gameBoard[posX][posY] === 'x' || this.state.gameBoard[posX][posY] === 'o') {
      // already exists : invalid move
      return;
    }

    // ensuring deep copy
    let currentGameBoard = JSON.parse(JSON.stringify(this.state.gameBoard));
    currentGameBoard[posX][posY] = this.state.player;

    let updatedMoves = this.state.moves + 1;

    let updatedState = {
      gameBoard: currentGameBoard,
      moves: updatedMoves
    };

    this.setState(updatedState, () => {
      let board = this.state.gameBoard;
      let n = this.state.gameBoard.length;

      // check Columns
      let col = board[posX][0] + board[posX][1] + board[posX][2];
      if (col.match(/xxx|ooo/)) {
        this.setState({winner: this.state.player});
        return;
      }

      // check Rows
      let row = board[0][posY] + board[1][posY] + board[2][posY];
      if (row.match(/xxx|ooo/)) {
        this.setState({winner: this.state.player});
        return;
      }

      // check diagonal
      if (posX === posY) {
        let diag = board[0][0] + board[1][1] + board[2][2];
        if (diag.match(/xxx|ooo/)) {
            this.setState({winner: this.state.player});
            return;
        }
      }

      //check other diagonal
      if (posX + posY === n - 1) {
        let otherDiag = board[0][2] + board[1][1] + board[2][0];
        if (otherDiag.match(/xxx|ooo/)) {
            this.setState({winner: this.state.player});
            return;
        }
      }

      // check draws
      if (this.state.moves === 9) {
        this.setState({winner: 'd'});
        return;
      }

      this.setState({player: (this.state.player === 'x') ? 'o' : 'x' });
    });

  }

  render() {
    let board = this.state.gameBoard.map((row, rowIndx) => {
        return row.map((tileVal, colIndx) => {
          return (
            <Tile key={rowIndx + "-" + colIndx} posX={rowIndx} posY={colIndx} value={tileVal} updateGame={this.updateGame}
              player={this.state.player}
            />
          );
        });
    });

    return (
     <div className="main-container">
        <h1> Tic Tac Toe </h1>
        <div className="top">
          <Player player={this.state.player} winner={this.state.winner} />
          <Result player={this.state.player} winner={this.state.winner} />
          <ResetButton reset={this.restartGame} />
        </div>
        <div className="board">
          {board}
        </div>
     </div>
    );
  }
}

export default Board;
