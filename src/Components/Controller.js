import React, { Component } from 'react';
import '../App.css';
import Map from './Map.js';

const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {playerDirection:"!",nX:16,nY:0, playerPos:[16,0]}
    // this.collideHandler = this.collideHandler.bind(this);
    this.getMap = this.getMap.bind(this);
  }
  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {
      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"){
        this.setState({playerDirection:e.key});
        let that = this;
        let newY = this.state.nY;
        let newX = this.state.nX;
        // let l = this.state.level.length;
        // let h = this.state.level[0].length;

        //stores the next position relative to keypress
        let dirMap = [
          {key:"ArrowDown",nextPos:[newY+1,newX]},
          {key:"ArrowUp",nextPos:[newY-1,newX]},
          {key:"ArrowLeft",nextPos:[newY,newX-1]},
          {key:"ArrowRight",nextPos:[newY,newX+1]}
        ]

        movePlayer(dirMap.find(moveInfo))

        this.setState({nX:newX})
        this.setState({nY:newY})

        function movePlayer(dir){
          if(isWithinGrid(dir.nextPos) && !isCollide(dir.nextPos)){
            if(isEnemy(dir.nextPos)){
              //attack!!!!
            }
            else{
              if(isItem(dir.nextPos)){
                console.log('Picked Up Item')
              }
              newX = dir.nextPos[1];
              newY = dir.nextPos[0];
            }
          }
        }

        //used in conjunction with Array.prototype.find() to find the element in the array that matches the keypress
        function moveInfo(dirMap){
          return dirMap.key === e.key;
        }
        function isEnemy(nextPos){ //does the next position contain an enemy?
          return that.state.map[nextPos[0]][nextPos[1]].show === '#';
        }
        function isItem(nextPos){ //does the next position contain an item?
          return that.state.map[nextPos[0]][nextPos[1]].show === '^';
        }
        function isCollide(nextPos){ // is the next position a wall?
          return that.state.map[nextPos[0]][nextPos[1]].show === '▒';
        }
        function isWithinGrid(nextPos){ // is the next position within the GRID?
          return nextPos[0] >= 0 && nextPos[0] < GRID_HEIGHT && nextPos[1] >= 0 && nextPos[1] < GRID_WIDTH;
        }
      }
    })
  }

  // gets the level array from child component -- map.js
  getMap(arr){
    this.setState({map: arr})
  }

  render() {
    return (
      <div>
      <Map playerDirection={this.state.playerDirection} getMap={this.getMap} onCollide={this.collideHandler} nX={this.state.nX} nY={this.state.nY} playerPos = {this.state.playerPos}/>
      </div>
    );
  }
}

export default Controller;
