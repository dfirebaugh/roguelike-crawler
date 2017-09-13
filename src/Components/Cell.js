import React from 'react';

class Cell extends React.Component{
  constructor(props){
    super(props);
    this.state = {isAlive:null, innerText: "", isWall: false}

    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){
    this.setState({isAlive: this.props.isAlive});
  }
  componentWillReceiveProps(nextProps){
    this.setState({isAlive:nextProps.isAlive});
  }
  handleClick(){
    // this.setState({isAlive:!this.state.isAlive});
    // this.setState({innerText})
    (this.state.innerText === "" ? this.setState({innerText:"▒", isWall: true}): this.setState({innerText:"", isWall: false}))
    this.props.parentMethod(this.props.row, this.props.col);
    // console.log(this.state.isWall);
  }
  render(){
    var cellStyle = {
      width: 20,
			height: 20,
			dislay: "inline-block",
			float: "left",
			// border: ".5px solid #000",
			background: this.state.isAlive ? "#FFF" : "#333"
    }

    return (
			<div onClick={this.handleClick} style={cellStyle}>{this.state.innerText}{(this.props.col === 0 ? this.props.row : this.props.col)}</div>
		);
  }
}


export default Cell;
