import React, { Component } from 'react';
import Cell from './Cell.js';


class Grid extends Component{
  cellComponents = (grid) => {
    let cells = grid.map((currRow,i)=>{
      let row = currRow.map((currCell, j) => {
        return <Cell key={i + "," + j}
                     type={this.props.level[i][j].type}
                     show={this.props.level[i][j].show}
                     hidden={this.props.level[i][j].hidden}
                     row={i}
                     col={j}
                  />
      })
      return <div  key={i} style={rowStyle}>{row}</div>
    })

    return cells;
  }
  render(){
    return (
      <div className="container gameBox text-center">
        <div>
          {this.cellComponents(this.props.level)}
        </div>
      </div>
		);
	}
}

// component styles
const rowStyle = {
  display:'flex',
  float:'left',
  clear:'both'
};


export default Grid;
