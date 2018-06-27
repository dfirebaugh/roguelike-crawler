import React from 'react';
import floor from '../assets/floor.png';
import wall from '../assets/wall.png';
import enemy from '../assets/enemy.png';
import player from '../assets/player.png';
import health from '../assets/health.png';
import weapon from '../assets/weapon.png';
import portal from '../assets/portal.png';
import boss from '../assets/boss.png';
import dungeonMap from '../assets/dungeonMap.png';
// import hidden from '../assets/hidden.png';


const Cell = props => {

  const getGraphic = (type) => {
    let graphics = [
      {
        type:'wall',
        show: <img alt='wall' id={`${props.row}:${props.col}:${props.type}`} src={wall}></img>//<div className='wall'>▒▒</div>
      },
      {
        type:'player',
        show:<img alt='player' id={`${props.row}:${props.col}:${props.type}`} src={player}></img>//<div className='player'></div>
      },
      {
        type:'enemy',
        // if you beat the enemy below 0 health remove the visual --- however, this should be done in the game controller.
        show:<img alt='enemy' id={`${props.row}:${props.col}:${props.type}`} src={enemy}></img>//(props.health <= 0 ? <div className='enemy'></div> : <div className='enemy'></div>)
      },
      {
        type:'boss',
        show:<img alt='boss' id={`${props.row}:${props.col}:${props.type}`} src={boss}></img>//<div className='boss'>>D</div>
      },
      {
        type:'weapon',
        show:<img alt='weapon' id={`${props.row}:${props.col}:${props.type}`} src={weapon}></img>//<div className='weapon'>w</div>
      },
      {
        type:'floor',
        show:<img alt='floor' id={`${props.row}:${props.col}:${props.type}`} src={floor}></img>//<div className='floor'></div>
      },
      {
        type:'portal',
        show:<img alt="portal" id={`${props.row}:${props.col}:${props.type}`} src={portal}></img>//<div className='portal'>[ ]</div>
      },
      {
        type:'health',
        show:<img alt='health' id={`${props.row}:${props.col}:${props.type}`} src={health}></img>//<div className='health'></div>
      },
      {
        type:'dungeonMap',
        show:<img alt='dungeonMap' id={`${props.row}:${props.col}:${props.type}`} src={dungeonMap}></img>//<div className='health'></div>
      },
      {
        type:'hidden',
        show:''//<img id={`${props.row}:${props.col}:${props.type}`} src={hidden}></img>//<div className='health'></div>
      }
    ];

    let newGraphic = graphics.find(el => {
      return el.type === type;
    })

    // return (newGraphic ? newGraphic.show : props.show )
    return newGraphic.show
  }

  const handleClick = () => {
    console.log(props)
  }
    return (
			<div onClick={handleClick} style={cellStyle}>{(props.hidden ? getGraphic('hidden') : getGraphic(props.type))}</div>

		);
  
}

const cellStyle = {
  width: 16,
  height: 16,
  dislay: "inline-block",
  float: "left",
  background: "#333"
}

export default Cell;
