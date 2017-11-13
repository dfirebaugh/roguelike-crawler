import React from 'react';
import Grid from './Grid.js';
// import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';
import Portal from './Portal.js';
import Weapons from './Weapons.js';




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
		let arr = this.props.level
		Enemies(arr);
    Items(arr);
		Portal(arr);
		Weapons(arr,1)


		this.props.getMap(arr);
		this.updateLevel(arr);
	}
	componentWillReceiveProps(newProps){
		// console.log(newProps)
		this.movePlayer(newProps);

		let b = this.state.pX;
		let a = this.state.pY;
		if(a === newProps.nY && b === newProps.nX){
		}else{
			this.cleanCell(a,b);
		}
	}
	updateLevel(arr){
		let level = this.state.curLevel.slice();
		arr[0][16] = {show:'@'};

		for(let x = 0;x< GRID_HEIGHT;x++){
			let row = []
			for(let y = 0; y<GRID_WIDTH; y++){
				if(arr){
					row.push(arr[x][y])
				}
			}
			level.push(row);
		}
		this.setState({curLevel:arr});
	}
	movePlayer(newProps){
		let levelArr = this.state.curLevel.slice();
		if(levelArr.length > 1){
			this.setState({pX:newProps.nX});
			this.setState({pY:newProps.nY});
			levelArr[newProps.nY][newProps.nX] = {show:'@'};
			this.setState({curLevel:levelArr});
		}
	}
	cleanCell(a,b){
		let levelArr = this.state.curLevel.slice();
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
