import React from 'react';
import Grid from './Grid.js';
import generate from './generate.js';

const GRID_HEIGHT = 15;
const GRID_WIDTH = 15;
const MAX_ROOMS = 5;
const ROOM_SIZE_RANGE = [4,8];

const c = {GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE}
// const[min,max] = c.ROOM_SIZE_RANGE;



class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[]}

		this.updateLevel = this.updateLevel.bind(this)
	}
	componentDidMount(){
		var arr = generate(GRID_HEIGHT,GRID_WIDTH,MAX_ROOMS,ROOM_SIZE_RANGE);
		this.updateLevel(arr);
		// console.log(arr)
	}
	updateLevel(arr){
		var level = this.state.curLevel.slice()
		for(var x = 0;x< GRID_HEIGHT;x++){
	    var row = []
	    for(var y = 0; y<GRID_WIDTH; y++){
				if(x===12){
					row.push("▒");
				}
				if(y===1){
					row.push('0');
				}
	    }
	    level.push(row);
	  }
		this.setState({curLevel:level});
	}

  render(){
		return(
			<div>
				<div className="centerer">
				<div id="game">
				<Grid height={c.GRID_HEIGHT} width={c.GRID_WIDTH} map={this.state.curLevel}/>
				</div>
					</div>

					<div className="centerer" id="renderer-switcher">
					</div>
			</div>
        );
  }
}

export default Map;
