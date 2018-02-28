import React, { Component } from 'react';
import '../App.css';



class CombatLog extends Component {
  render() {
    return (
      <div className='combatLog'>
          <p>{this.props.message}</p>
      </div>
      );
    }
  }

  export default CombatLog;
