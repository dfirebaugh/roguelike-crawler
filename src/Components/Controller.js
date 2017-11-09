import React, { Component } from 'react';
import '../App.css';
import Map from './Map.js';
import StatusBox from './StatusBox.js';
import ToolTip from './ToolTip.js';


const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {moveCount:0,nX:16,nY:0, playerPos:[16,0],playerHealth:100,playerLevel:1,playerXp: 0,currentLevel:1,weapon: {name:'Fists',attackPower:30}}

    this.getMap = this.getMap.bind(this);
  }
  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {
      if(this.state.playerHealth > 0){
      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"||e.key === "w"||e.key === "a"||e.key === "s"||e.key === "d"){
        let count = this.state.moveCount;
        this.setState({moveCount:count+=1})
        this.setState({playerDirection:e.key});
        let that = this;
        let newY = this.state.nY;
        let newX = this.state.nX;
        // console.log(that.state.level)
        //stores the next position relative to keypress
        let dirMap = [
          {key:"ArrowDown",nextPos:[newY+1,newX]},
          {key:"ArrowUp",nextPos:[newY-1,newX]},
          {key:"ArrowLeft",nextPos:[newY,newX-1]},
          {key:"ArrowRight",nextPos:[newY,newX+1]},
          {key:"s",nextPos:[newY+1,newX]},
          {key:"w",nextPos:[newY-1,newX]},
          {key:"a",nextPos:[newY,newX-1]},
          {key:"d",nextPos:[newY,newX+1]}
        ]

        movePlayer(dirMap.find(moveInfo))

        this.setState({nX:newX})
        this.setState({nY:newY})

        function movePlayer(dir){
          if(isWithinGrid(dir.nextPos) && !isCollide(dir.nextPos)){
            if(isEnemy(dir.nextPos)){
              //attack!!!!
              attack(dir.nextPos)
            }
            else{
              if(isItem(dir.nextPos)){
                console.log('Picked Up health pack!')
                that.setState({playerHealth: that.state.playerHealth+=that.state.level[dir.nextPos[0]][dir.nextPos[1]].addHealth})
              }
              newX = dir.nextPos[1];
              newY = dir.nextPos[0];
              that.setState({playerPos: dir.nextPos})
              moveTorch(that.state.playerPos)
            }
          }
        }
        function moveTorch(pos){
          that.state.level.map(function(row, y){
            return row.map(function(cell,x){
              return (isNear([y,x]) ? cell.hidden = false && console.log(y + " " + x) : cell.hidden = true)
            })
          })
        }
        function isNear(pos){
          let num = 5;
          return pos[0] - that.state.playerPos[0] < num && pos[1] - that.state.playerPos[1] < num && that.state.playerPos[0] - pos[0] < num && that.state.playerPos[1] - pos[1] < num ;
        }
        //used in conjunction with Array.prototype.find() to find the element in the array that matches the keypress
        function moveInfo(dirMap){
          return dirMap.key === e.key;
        }
        function isEnemy(nextPos){ //does the next position contain an enemy?
          return that.state.level[nextPos[0]][nextPos[1]].show === '#' && !that.state.level[nextPos[0]][nextPos[1]].defeated;
        }
        function isItem(nextPos){ //does the next position contain an item?
          return that.state.level[nextPos[0]][nextPos[1]].show === '^';
        }
        function isCollide(nextPos){ // is the next position a wall?
          return that.state.level[nextPos[0]][nextPos[1]].show === '▒';
        }
        function isWithinGrid(nextPos){ // is the next position within the GRID?
          return nextPos[0] >= 0 && nextPos[0] < GRID_HEIGHT && nextPos[1] >= 0 && nextPos[1] < GRID_WIDTH;
        }
        function attack(nextPos){
          let nextCell = that.state.level[nextPos[0]][nextPos[1]]

          // console.log("enemy health: " + nextCell.health +'\n'+ ' enemy hit for: ' + nextCell.attack +'\n'+ ' your health: ' + that.state.playerHealth +'\n'+ " you hit for: " + that.state.weapon.attackPower )

          if(nextCell.health > that.state.weapon.attackPower){
            nextCell.health -= that.state.weapon.attackPower
            that.setState({playerHealth:that.state.playerHealth -= nextCell.attack})
          }
          else{
            nextCell.defeated = true;
            console.log('you beat this enemy!')
            that.setState({playerXp:that.state.playerXp += nextCell.xp});
          }
        }

      }
    }
    })
  }


  // gets the level array from child component -- map.js
  getMap(arr){
    this.setState({level: arr})
  }

  render() {
    let dungeon = <Map playerDirection={this.state.playerDirection} getMap={this.getMap} onCollide={this.collideHandler} nX={this.state.nX} nY={this.state.nY} playerPos = {this.state.playerPos}/>
    let gameOver = <h1> YOU DIED <p>GAMEOVER</p>  </h1>
    let board = (this.state.playerHealth > 0 ? dungeon : gameOver)
    let tip = <ToolTip moveCount = {this.state.moveCount} />

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

    return (
      <div>
      <div className="App-header">
      <StatusBox playerLevel = {this.state.playerLevel} playerXp = {this.state.playerXp} playerHealth = {this.state.playerHealth} attackPower = {this.state.attackPower} currentLevel = {this.state.currentLevel} weapon = {this.state.weapon}/>
      </div>
        {(this.state.moveCount === 0 ? tip : board)}
      </div>
    );
  }
}

export default Controller;
