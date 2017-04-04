import React from 'react';
import '../styles/tile.css'

class Tile extends React.Component {

  tileClick = (props) => {
    props.updateGame(props.posX, props.posY, props.player);
  }

  render() {
     return (
       <div className="game-tile" onClick={() => this.tileClick(this.props)}>
         <p>{this.props.value}</p>
       </div>
     );
  }
}


export default Tile;
