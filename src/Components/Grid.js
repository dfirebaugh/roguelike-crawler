import React from 'react';
import Cell from './Cell.js';


class Grid  extends React.Component{
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
			<div className="container text-center">
        <div style={gridStyle}>
					{this.cellComponents(this.props.level)}
				</div>
     </div>
		);
	}
}

// component styles
const gridStyle = {
  position:'relative',
  display:'inline-block',
  margin:'0 auto',
  // border:'4px solid red',
  marginTop: 30,
  WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
  MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
  boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
};
const rowStyle = {
  display:'flex',
  float:'left',
  clear:'both'
};


export default Grid;
