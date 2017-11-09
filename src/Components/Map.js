import React from 'react';
import Grid from './Grid.js';
import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';


const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;
const MAX_ROOMS = 24;
const ROOM_SIZE_RANGE = [6,24];
const item = {show:'#',health:'100',attack:'10',defeated:false,hidden:false,xp:10};
const enemy = {show:'#',health:'100',attack:'10',defeated:false,hidden:false,xp:10};

const c = {GRID_HEIGHT, GRID_WIDTH, MAX_ROOMS, ROOM_SIZE_RANGE}

class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[],playerDirection:this.props.playerDirection,pX:16,pY:0,pH:100,pAtt:10}
		}
	componentDidMount(){
		var arr = generate(GRID_HEIGHT,GRID_WIDTH,MAX_ROOMS,ROOM_SIZE_RANGE);

		Enemies(arr);
		Items(arr);

		this.props.getMap(arr);
		this.updateLevel(arr);
	}
	componentWillReceiveProps(newProps){
		// console.log(newProps)
		this.movePlayer(newProps);

		var b = this.state.pX;
		var a = this.state.pY;
		if(a === newProps.nY && b === newProps.nX){
		}else{
			this.cleanCell(a,b);
		}
	}
	// populate(arr){
	// 	// if(arr.length > 1){
	// 	let that = this;
	// 		console.log(arr.map(function(row, y){
	// 			return row.map(function(cell,x){
	// 				console.log(arr[y][x].show)
	// 				return isBlank([y,x],arr)
	// 			})
	// 		}))
	// 		// console.log(this.state.curLevel)
	// 		// console.loog(this.state.curLevel)
	// 		// }
	// 		function isBlank(cell){
	// 			return arr[cell[0]][cell[1]].show === '';
	// 		}
  //
	// }
	updateLevel(arr){
		var level = this.state.curLevel.slice();
		arr[0][16] = {show:'@'};

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
		// console.log(this.state.curLevel[newProps.nY][newProps.nX])
		var levelArr = this.state.curLevel.slice();
		if(levelArr.length > 1){
			this.setState({pX:newProps.nX});
			this.setState({pY:newProps.nY});
			levelArr[newProps.nY][newProps.nX] = {show:'@'};
			this.setState({curLevel:levelArr});
		}
	}
	cleanCell(a,b){
		var levelArr = this.state.curLevel.slice();
		if(levelArr.length > 1){
			levelArr[a][b] = {show:' '};
			this.setState({curLevel:levelArr});
	}
}
	render(){
		return(
			<div>
				<div className="centerer">
					<div id="game">
						<Grid height={c.GRID_HEIGHT} width={c.GRID_WIDTH} level={this.state.curLevel}/>
					</div>
				</div>

				<div className="centerer" id="renderer-switcher">
				</div>
			</div>
		);
	}
}

export default Map;
