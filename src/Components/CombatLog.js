import React, { Component } from 'react';
import '../App.css';



class CombatLog extends Component {
  render() {
    return (
      <div className='combatLog'>
          <p>{this.props.m1}</p>
          <p>{this.props.m2}</p>
          <p>{this.props.m3}</p>
      </div>
      );
    }
  }

  export default CombatLog;
