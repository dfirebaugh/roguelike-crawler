import React from 'react';
import Cell from './Cell.js';


class Grid  extends React.Component{
  render(){
    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

		let gridStyle = {
      position:'relative',
      display:'inline-block',
      margin:'0 auto',
      // border:'4px solid red',
      marginTop: 30,
			WebKitBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			MozBoxShadow: "0 0 5px rgba(0, 0, 0, 1)",
			boxShadow: "0 0 5px rgba(0, 0, 0, 1)"
		};
    let rowStyle = {
      display:'flex',
      float:'left',
      clear:'both'
    };

		let cells = [];
		for (let i = 0; i < this.props.height; i++) {
			let row = [];
			for (let j = 0; j < this.props.width; j++) {
				row.push(<Cell key={i + "," + j} show={this.props.level[i][j].show} hidden={this.props.level[i][j].hidden} row={i} col={j} />);
			}
			cells.push(<div  key={i} style={rowStyle}>{row}</div>);
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
