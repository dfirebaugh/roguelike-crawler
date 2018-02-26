import React from 'react';

class Cell extends React.Component{

  getGraphic = (type) => {
    let graphics = [
      {
        type:'wall',
        show: <div className='wall'>▒▒</div>
      },
      {
        type:'player',
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
      {
        type:'hidden',
        show:<div className='hiddenCell'></div>
      }
    ];

    let newGraphic = graphics.find(el => {
      return el.type === type;
    })

    // return (newGraphic ? newGraphic.show : this.props.show )
    return newGraphic.show
  }
  render(){
    return (
			<div onClick={this.handleClick} style={cellStyle}>{(this.props.hidden ? this.getGraphic('hidden'): this.getGraphic(this.props.type))}</div>

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
