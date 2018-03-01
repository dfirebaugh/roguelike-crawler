import React, { Component } from 'react';
import '../App.css';



class StatusBox extends Component {
  render() {
    return (
      <div className='status-box'>
      <p>Dungeon Floor: {this.props.dungeonLevel}</p>
        <p>Player Health: {this.props.playerHealth}</p>
        <p>Weapon: {this.props.weapon.name} ---- Attack Power: {this.props.attackPower}</p>
        <p>Player Level: {this.props.playerLevel} -- xp: {this.props.playerXp}</p>
      </div>
      );
    }
  }

  export default StatusBox;
