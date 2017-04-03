import React from 'react';
import '../styles/reset.css';

class ResetButton extends React.Component {

  render(){
    return (
      <button className="flat-button" onClick={this.props.reset}>Restart</button>
    )
  }
}

export default ResetButton;
