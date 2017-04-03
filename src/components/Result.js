import React from 'react';
import '../styles/result.css';

class Result extends React.Component {

  render(){

      let result = '';

      if(this.props.winner  === 'd') {
        result = <h1> Game Draws </h1>;
      } else {
        result = <h1>Player {this.props.winner} Wins !!!</h1>;
      }

      return(
        <div className={this.props.winner ? 'visible' : 'hidden'}>
            {result}
        </div>
      );
  }

}

export default Result;
