import React from 'react';
import Grid from './Grid.js';
import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';
import update from 'react-addons-update';


const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;
const MAX_ROOMS = 24;
const ROOM_SIZE_RANGE = [6,24];

const c = {GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE}

class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[],playerDirection:this.props.playerDirection,pX:16,pY:0,pH:100,pAtt:10}
	}
	componentDidMount(){
		var arr = generate(GRID_HEIGHT,GRID_WIDTH,MAX_ROOMS,ROOM_SIZE_RANGE);
		Enemies(arr,GRID_WIDTH,GRID_HEIGHT);
		Items(arr,GRID_WIDTH,GRID_HEIGHT);

		this.updateLevel(arr);
	}
	componentWillReceiveProps(newProps){
		this.setState({playerDirection:newProps.playerDirection});
		this.movePlayer(newProps);
		}
	updateLevel(arr){
		var level = this.state.curLevel.slice();
		arr[0][16] = 'P';

		for(var x = 0;x< GRID_HEIGHT;x++){
			var row = []
			for(var y = 0; y<GRID_WIDTH; y++){
				if(arr){
					row.push(arr[x][y])
				}
			}
			level.push(row);
		}
		this.setState({curLevel:arr});
	}
	movePlayer(newProps){
		var b = this.state.pX;
		var a = this.state.pY;
		this.setState({pX:newProps.nX});
		this.setState({pY:newProps.nY});

		var levelArr = this.state.curLevel.slice();
		levelArr[newProps.nY][newProps.nX] = 'P';
		this.setState({curLevel:levelArr});
		this.cleanCell(a,b)
	}
	cleanCell(a,b){
		var levelArr = this.state.curLevel.slice();
		levelArr[a][b] = ' ';
		this.setState({curLevel:levelArr});
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
