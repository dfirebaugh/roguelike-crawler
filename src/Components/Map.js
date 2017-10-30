import React from 'react';
import Grid from './Grid.js';
import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';


const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;
const MAX_ROOMS = 24;
const ROOM_SIZE_RANGE = [6,24];

const c = {GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE}
// const[min,max] = c.ROOM_SIZE_RANGE;



class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[],playerDirection:this.props.playerDirection,pH:100,pAtt:10}

		this.updateLevel = this.updateLevel.bind(this);
		// this.movePlayer = this.movePlayer.bind(this);
	}
	componentDidMount(){
		var arr = generate(GRID_HEIGHT,GRID_WIDTH,MAX_ROOMS,ROOM_SIZE_RANGE);
		Enemies(arr,GRID_WIDTH,GRID_HEIGHT);
		Items(arr,GRID_WIDTH,GRID_HEIGHT);

		this.updateLevel(arr);
	}
	componentWillReceiveProps(newProps){
		console.log(newProps)
		this.setState({playerDirection:newProps.playerDirection});

		// if(this.state.curLevel[newProps.pY][newProps.pX] !== '▒'){
			this.movePlayer(newProps);
		// }
	}
	updateLevel(arr){
		var level = this.state.curLevel.slice()
		// arr[this.state.pY][this.state.pX] = "P";
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
		// update player position
		// this.state.curLevel[this.state.pY][this.state.pX] = "P";
		// this.state.curLevel[this.state.pY][this.state.pX] = '';

		this.state.curLevel[newProps.pY][newProps.pX] = 'P';
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
