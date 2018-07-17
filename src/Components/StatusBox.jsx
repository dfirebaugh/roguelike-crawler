import React from "react";


const StatusBox = props => (
  <div className="status-box">
    <p>Dungeon Floor: {props.dungeonLevel}</p>
    <p>Player Health: {props.playerHealth}</p>
    <p>
      Weapon: {props.weapon.name} ---- Attack Power: {props.attackPower}
    </p>
    <p>
      Player Level: {props.playerLevel} -- xp: {props.playerXp}
    </p>
  </div>
);

export default StatusBox;
