import React from 'react';

class Cell extends React.Component{
  render(){
    let cellStyle = {
      width: 16,
			height: 16,
			dislay: "inline-block",
			float: "left",
			// border: ".5px solid #000",
			background: "#333"
    }
    return (
			<div onClick={this.handleClick} style={cellStyle}>{(this.props.hidden ? '' : this.props.show)}</div>
		);
  }
}


export default Cell;
