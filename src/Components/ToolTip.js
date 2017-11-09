import React, { Component } from 'react';
import '../App.css';



class ToolTip extends Component {
  render() {
    return (
      <div className='ToolTip '>
        <h3>Tip: You could probably use a weapon </h3>
        
        <p>Use the arrow keys to light your torch and start your quest</p>
      </div>
      );
    }
  }

  export default ToolTip;
