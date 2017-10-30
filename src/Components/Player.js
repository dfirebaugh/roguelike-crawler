import React from 'react';
// var Player = { xPos:16, yPos:0,health:100,attackPower:10 }


class Player extends React.Component{
  constructor(props){
    super(props)
    this.state = {curLevel:[],playerDirection:this.props.playerDirection,pH:100,pAtt:10}

    this.updateLevel = this.updateLevel.bind(this);
    // this.movePlayer = this.movePlayer.bind(this);
  }
  componentWillReceiveProps(newProps){
		console.log(newProps)
		this.setState({playerDirection:newProps.playerDirection});

		// if(this.state.curLevel[newProps.pY][newProps.pX] !== '▒'){
			this.movePlayer(newProps);
		// }
	}
  movePlayer(newProps){
		// update player position
		// this.state.curLevel[this.state.pY][this.state.pX] = "P";
		// this.state.curLevel[this.state.pY][this.state.pX] = '';
    console.log(newProps)
		// this.state.curLevel[newProps.pY][newProps.pX] = 'P';
	}


}

export default Player;
