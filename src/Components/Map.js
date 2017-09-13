import React from 'react';
import Grid from './Grid.js';

const GRID_HEIGHT = 15;
const GRID_WIDTH = 15;
const MAX_ROOMS = 5;
const ROOM_SIZE_RANGE = [4,8]

const c = {GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE}

class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[]}

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
