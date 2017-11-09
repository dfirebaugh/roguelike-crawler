import React from 'react';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {isAlive:null, innerText: props.innerText, isWall: false}

    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){
    this.setState({isAlive: this.props.isAlive});
  }
  componentWillReceiveProps(nextProps){
    this.setState({isAlive:nextProps.isAlive});
  }
  handleClick(){
    // (this.state.innerText === "" ? this.setState({innerText:"▒"}): this.setState({innerText:""}))
    this.props.parentMethod(this.props.row, this.props.col);
    // console.log(this.props.innerText)
  }
  render(){
    var cellStyle = {
      width: 16,
			height: 16,
			dislay: "inline-block",
			float: "left",
			// border: ".5px solid #000",
			background: /*this.state.isAlive ? "#FFF" :*/ "#333"
    }
//shows the cell number when placed inside of div
// {(this.props.col === 0 ? this.props.row : this.props.col)}
    return (
			<div onClick={this.handleClick} style={cellStyle}>{this.props.innerText}</div>
		);
  }
}


export default Cell;
