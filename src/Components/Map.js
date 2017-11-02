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

class Map extends React.Component{
	constructor(props){
		super(props)
		this.state = {curLevel:[],playerDirection:this.props.playerDirection,pX:16,pY:0,pH:100,pAtt:10}
		}
	componentDidMount(){
		var arr = generate(GRID_HEIGHT,GRID_WIDTH,MAX_ROOMS,ROOM_SIZE_RANGE);
		Enemies(arr,GRID_WIDTH,GRID_HEIGHT);
		Items(arr,GRID_WIDTH,GRID_HEIGHT);

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
		// console.log('cur: ' + newProps.nY + ' ' + newProps.nX)
		// console.log('prev: ' + a + ' ' + b)


		// var curPos = this.state.curLevel[newProps.nY][newProps.nX];
		//
		// console.log("newPropsX: " + newProps.nX + " Y:" + newProps.nY)
		// if(curPos === '▒'){
		// 	console.log('COLLIDE!');
		// 	this.props.onCollide(newProps.playerDirection, newProps.nX, newProps.nY)
		// 	}
		// else{
		// 	this.movePlayer(newProps);
		// 	if(curPos === '#'){
		// 		console.log('ENEMY!')
		// 	}
		// 	if(curPos === '^'){
		// 		console.log('ITEM!');
		// 	}
		// }
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
		// console.log(this.state.curLevel[newProps.nY][newProps.nX])
		var levelArr = this.state.curLevel.slice();
		if(levelArr.length > 1){
			this.setState({pX:newProps.nX});
			this.setState({pY:newProps.nY});
			levelArr[newProps.nY][newProps.nX] = 'P';
			this.setState({curLevel:levelArr});
		}

	}
	cleanCell(a,b){
		var levelArr = this.state.curLevel.slice();
		if(levelArr.length > 1){
			levelArr[a][b] = ' ';
			this.setState({curLevel:levelArr});
	}
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
