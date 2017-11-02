import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map.js';

class App extends Component {
  constructor(props){
		super(props)
		this.state = {playerDirection:"!",collide:false,nX:16,nY:0, playerPos:[16,0]}
    this.collideHandler = this.collideHandler.bind(this);
    this.getMap = this.getMap.bind(this);
  }
  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {
      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"){
        this.setState({playerDirection:e.key});
      }
      var newY = this.state.nY;
      var newX = this.state.nX;
      var l = this.state.map.length;
      var h = this.state.map[0].length;

      if(e.key === "ArrowDown" && isWithinGrid(newX,newY+1)){
        // if(this.state.map[this.state.nY+1][this.state.nX] !== '▒' ){
        if(this.state.map[newY+1][newX] !== '▒'){
          console.log(isWithinGrid(newX,newY+1))
          newY+=1;
        }
      }

      if(e.key === "ArrowUp" &&  isWithinGrid(newX,newY-1)){
        if(this.state.map[newY-1][newX] !== '▒'){
          newY-=1;
        }
      }
      if(e.key === "ArrowLeft" && isWithinGrid(newX-1,newY)){
        if(this.state.map[newY][newX-1] !== '▒'){
          newX-=1;
        }
      }
      if(e.key === "ArrowRight" && isWithinGrid(newX+1,newY)){
        if(this.state.map[newY][newX+1] !== '▒'){
          newX+=1;
        }
      }

      this.setState({nX:newX})
      this.setState({nY:newY})

      function isWithinGrid(x,y){
        return y >= 0 && y < l && x >= 0 && x < h;
      }


		})
  }
  collideHandler(direction,nX,nY){
    this.setState({collide:true})
    var collideY = nY;
    var collideX = nX;

    if(direction=== "ArrowDown"){
      collideY -= 1;
      // this.setState({nY:this.state.nY-1});
    }
    if(direction=== "ArrowUp"){
      collideY +=1;
      // this.setState({nY:this.state.nY+1});
    }
    if(direction=== "ArrowLeft"){
      collideX +=1;
      // this.setState({nX:this.state.nX+1})
    }
    if(direction=== "ArrowRight"){
      collideX -= 1;
      // this.setState({nX:this.state.nX-1});
    }
    this.setState({nX:collideX});
    this.setState({nY:collideY});
    this.setState({collide:false})
  }
  getMap(arr){
    this.setState({map: arr})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">

        </p>
        <Map playerDirection={this.state.playerDirection} getMap={this.getMap} onCollide={this.collideHandler} nX={this.state.nX} nY={this.state.nY} playerPos = {this.state.playerPos}/>
      </div>
    );
  }
}

export default App;
