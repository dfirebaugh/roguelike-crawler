import React from "react";
import Cell from "./Cell";
import "../App.css";

const ToolTip = () => (
  <div className="ToolTip ">
    <h3>Tip: You could probably use a weapon </h3>
    <Cell type="health" />
    <p> Pickup health packs to increase your heatlh </p>
    <Cell type="enemy" />
    <p> Fight enemies to gain experience </p>
    <Cell type="portal" />
    <p> travel through portals to get to new levels</p>
    <Cell type="boss" />
    <p> Fight the boss to win the game</p>

    <Cell type="weapon" />
    <p>
      {" "}
      There is a weapon on each dungeon floor. Picking them up will help you
      defeat the boss
    </p>

    <Cell type="dungeonMap" />
    <p> Each floor has a dungeon map that will reveal the rest of the map</p>

    <p>Use the arrow keys to light your torch and start your quest</p>
  </div>
);

export default ToolTip;
