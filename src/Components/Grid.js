import React from 'react';
import Cell from './Cell.js';


class Grid  extends React.Component{
  constructor(){
    super();
    this.state = {size: 1,generation: 0, grid:[],toggle:false, paused:true,neighborCells:[ [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1] ]}

    this.updateCellState = this.updateCellState.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.clear = this.clear.bind(this)
  }
  componentWillMount(){
    function Cell() {
			// this.isAlive = Math.random() > .53;
			this.neighbors = 0;
		}
    let randRow = Math.floor(Math.random()* 10) + 1;
    let randCol = Math.floor(Math.random()*20) + 1;
    // console.log(randRow+ "," +randCol);
    // this.updateCellState(randRow, randCol)
    var grid = [];
		for (var i = 0; i < this.props.height; i++) {
			var row = [];
			for (var j = 0; j < this.props.width; j++) {
				row.push(new Cell());
			}
			grid.push(row);
		}
    this.setState({ grid: grid });
  }
  clear(){
    for(var v = 0;v<this.props.height;v++){
      for(var w = 0; w<this.props.width;w++){
        var cell = this.state.grid[v][w];
        cell.isAlive = false
      }
    }
    this.renderGrid()
  }
  updateCellState(row,col){
    var cell = this.state.grid[row][col];
    // (cell.isAlive ? cell.innerText = "" : cell.innerText = "▒")
  }
  isWithinGrid(row, col) {
    return row >= 0 && row < this.props.width && col >= 0 && col < this.props.height;
  }
  handleClickGen(){
    // this.generate();
  }
  updateAllCells(){
    // for(var x =0; x< this.props.size; x++){
    //   for(var y=0;y<this.props.size*2;y++){
    //     var cell = this.state.grid[x][y];
    //     if(cell.isAlive){
    //       if(cell.neighbors < 2){
    //         cell.isAlive = false;
    //       }
    //       if(cell.neighbors > 3){
    //         cell.isAlive = false;
    //       }
    //     }
    //     else{
    //       if(cell.neighbors === 3){
    //         cell.isAlive = true;
    //       }
    //     }
    //   }
    // }
  }
  generate(){
    // var gen = this.state.generation
    // this.allCells();
    // this.updateAllCells();
    // this.setState({generation: gen+1})
  }
  handleClickPause(){
    // (this.state.paused ? this.setState({paused: false}): this.setState({paused: true}))
    //
    // var loop = setInterval(function(){
    //   if(this.state.paused){
    //     clearInterval(loop)
    //   }else{
    //     this.generate()
    //   }
    //   }.bind(this),1)

  }
  getNeighbors(row,col){
    // //gets the total of alive neighbors for a cell
    // var cell = this.state.grid[row][col];
    // cell.neighbors = 0;
    // for(var x = 0; x<this.state.neighborCells.length; x++){
    //   var position = this.state.neighborCells[x]
    //   var r = row+position[0];
    //   var c = col+position[1];
    //   if(this.isWithinGrid(r,c)){
    //     if(this.state.grid[r][c].isAlive){
    //       cell.neighbors++;
    //     }
    //   }
    // }
    //
    // return cell.neighbors
  }
  allCells(){
    // //cycles through the grid
    // for(var v = 0;v<this.props.size;v++){
    //   for(var w = 0; w<this.props.size*2;w++){
    //     var cell = this.state.grid[v][w];
    //     cell.neighbors = this.getNeighbors(v,w)
    //     }
    //   }
    }

  renderGrid(){
    //this changes the state so that the grid rerenders

    if(this.state.toggle ? this.setState({toggle:true}) : this.setState({toggle:false}));
  }
  handleCellClick(row,col){
    // console.log("cellClicked: " + row + "," + col)
    this.updateCellState(row,col);
  }
  render(){

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

		var gridStyle = {
      position:'relative',
      display:'inline-block',
      margin:'0 auto',
      border:'4px solid red',
      marginTop: 30,
			WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
		};
    var rowStyle = {
      display:'flex',
      float:'left',
      clear:'both'
    };

		var cells = [];
		for (var i = 0; i < this.props.height; i++) {
			var row = [];
			for (var j = 0; j < this.props.width; j++) {
				var cell = this.state.grid[i][j];
				row.push(<Cell key={i + "," + j} isAlive={cell.isAlive} row={i} col={j} parentMethod={this.handleCellClick} />);
			}
			cells.push(<div  key={i+","+j} style={rowStyle}>{row}</div>);
		}

		return (
			<div className="container text-center">


      <div style={gridStyle}>
					{cells}
				</div>
     </div>
		);
	}
}



export default Grid;
