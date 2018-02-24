import React from 'react';

class Cell extends React.Component{

  getGraphic = () => {
    let graphics = [
      {
        type:'wall',
        show: <div className='wall'>▒▒</div>
      },
      {
        type:'player',
        // show:'@'
        show:<div className='player'></div>
      },
      {
        type:'enemy',
        // show:'#'
        show:<div className='enemy'></div>
      },
      {
        type:'boss',
        show:<div className='boss'>:(</div>
      },
      {
        type:'weapon',
        // show:'w'
        show:<div className='weapon'>w</div>
      },
      {
        type:'floor',
        show:<div className='floor'></div>
      },
      {
        type:'portal',
        show:<div className='portal'>[ ]</div>
      },
      {
        type:'health',
        show:<div className='health'></div>
      },
    ];

    let newGraphic = graphics.find(el => {
      return el.type === this.props.type;
    })

    return (newGraphic ? newGraphic.show : this.props.show )
    // return newGraphic.show
  }
  render(){
    return (
			<div onClick={this.handleClick} style={cellStyle}>{(this.props.hidden ? this.getGraphic(this.props.type) : this.getGraphic(this.props.type))}</div>

		);
  }
}

const cellStyle = {
  width: 16,
  height: 16,
  dislay: "inline-block",
  float: "left",
  background: "#333"
}
// (this.props.hidden ? '' : this.props.show)
// (this.props.hidden ? '': this.getGraphic(this.props.type))

export default Cell;
