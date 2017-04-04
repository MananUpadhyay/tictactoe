import React from 'react';
import '../styles/result.css';

class Player extends React.Component {

  render() {
      return(
        <h2 className={this.props.winner ? 'hidden' : 'visible'}>
            Player {this.props.player} turn
        </h2>
      );
  }

}

export default Player;
