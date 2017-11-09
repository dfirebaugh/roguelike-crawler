import React from 'react';
import Cell from './Cell.js';
import Torch from './Torch.js';


class Grid  extends React.Component{
  constructor(){
    super();
    this.state = {size: 1,generation: 0, grid:[],toggle:false, paused:true,neighborCells:[ [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1] ]}

    this.updateCellState = this.updateCellState.bind(this)
    this.handleCellClick = this.handleCellClick.bind(this)
    this.updateAllCells = this.updateAllCells.bind(this)
    this.clear = this.clear.bind(this)
  }
  componentWillMount(){

    function Cell() {
			this.isAlive = false;//Math.random() > .53;
			this.neighbors = 0;
      this.innerText = '';
		}

    var grid = [];
		for (var i = 0; i < this.props.height; i++) {
			var row = [];
			for (var j = 0; j < this.props.width; j++) {
				row.push(new Cell());
			}
			grid.push(row);
		}
    this.setState({ grid: grid });
    // console.log(grid)
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
  updateCellState(row,col,bool){
    var cell = this.state.grid[row][col];
    var val = this.props.level[row][col];
    if(val){
      (bool ? cell.innerText = val.show : cell.innerText = "");
      // console.log(val);
    }
    // (cell.isAlive ? cell.isAlive = false : cell.isAlive = true);
  }
  isWithinGrid(row, col) {
    return row >= 0 && row < this.props.width && col >= 0 && col < this.props.height;
  }
  // handleClickGen(){
  //   this.generate();
  // }
  updateAllCells(){
    for(var x =0; x< this.props.height; x++){
      var row = []
      for(var y=0;y<this.props.width;y++){
        row.push(this.props.level[x])
        // var cell = this.state.grid[x][y];

        // on first render, the map prop is empty
        // this checks if the map prop is populated
        // this translates this.props.map array to the rendered board
        if(this.props.level.length>0){
          this.updateCellState(x,y,true);
        }
      }
    }
  }

  renderGrid(){
    //this changes the state so that the grid rerenders -- there is probably a better way to do this
    if(this.state.toggle ? this.setState({toggle:true}) : this.setState({toggle:false}));
  }
  handleCellClick(row,col){
    // console.log("cellClicked: " + row + "," + col);
    console.log(this.state.grid[row][col]);
    (this.state.grid[row][col].innerText === '▒' ? this.updateCellState(row,col,false) : this.updateCellState(row,col,true));
    this.renderGrid();
  }
  render(){
    this.updateAllCells()

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

		var gridStyle = {
      position:'relative',
      display:'inline-block',
      margin:'0 auto',
      // border:'4px solid red',
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
				row.push(<Cell key={i + "," + j} isAlive={cell.isAlive} innerText={cell.innerText} row={i} col={j} parentMethod={this.handleCellClick} />);
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
