import React, { Component } from 'react';
import '../App.css';



class ToolTip extends Component {
  render() {
    return (
      <div className='ToolTip '>
        <h3 >Tip: You could probably use a weapon </h3>

        <p> <strong>^  </strong>Pickup health packs to increase your heatlh</p>
        <p> <strong>#</strong> Fight enemies to gain experience </p>
        <p> <strong>[]</strong> travel through portals to get to new levels</p>
        <p> <strong>B</strong>  Fight the boss to win the game</p>

<h4> There is a weapon on each dungeon level.  Picking them up will help you defeat the boss</h4>
        <p><strong>S</strong> sword</p>
        <p><strong>+</strong> sword +1</p>
        <p><strong>++</strong> magic sword +2</p>






        <p>Use the arrow keys to light your torch and start your quest</p>
      </div>
      );
    }
  }

  export default ToolTip;
