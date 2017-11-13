import React, { Component } from 'react';
import '../App.css';
import Map from './Map.js';
import StatusBox from './StatusBox.js';
import ToolTip from './ToolTip.js';
import Weapons from './Weapons.js';
import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';
import Portal from './Portal.js';
import Boss from './Boss.js';

const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {moveCount:0,nX:16,nY:0, playerPos:[16,0],playerHealth:100,playerLevel:1,playerXp: 0,dungeonLevel:1,weapon: {name:'Fists',attackPower:30}}

    this.getMap = this.getMap.bind(this);
  }
  componentDidMount(){
    let arr = generate(GRID_HEIGHT,GRID_WIDTH);
    document.body.addEventListener('keydown', (e) => {
      if(this.state.playerHealth > 0){
        if(this.state.playerXp > 39){
          this.setState({playerLevel:2})
        }
        if(this.state.playerXp > 79){
          this.setState({playerLevel:3})
        }
        if(this.state.playerXp > 129){
          this.setState({playerLevel:3})
        }
        if(this.state.playerXp > 199){
          this.setState({playerLevel:4})
        }
        if(this.state.playerXp > 249){
          this.setState({playerLevel:5})
        }
        if(e.key === 'x'){
          this.newLevel()
        }
      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"||e.key === "w"||e.key === "a"||e.key === "s"||e.key === "d"){
        let count = this.state.moveCount;
        this.setState({moveCount:count+=1})
        this.setState({playerDirection:e.key});
        let that = this;

        // console.log(that.state.level)
        //stores the next position relative to keypress
        that.move(e.key)
      }
    }
    })
    this.setState({curLevel:arr})
  }
  newLevel(){
    let arr = generate(GRID_HEIGHT,GRID_WIDTH, this.state.playerPos)
    let curArr = this.state.curLevel;
    Enemies(arr);
    Items(arr);
    if(this.state.dungeonLevel < 2){
      Portal(arr);
    }
    else{
      Boss(arr);
    }
    Weapons(arr,this.state.dungeonLevel+1)

    curArr.map(function(row,i){
      return row.map(function(cell,l){
        return Object.assign(cell,arr[i][l])
      })
    })
    this.setState({dungeonLevel:this.state.dungeonLevel+1})
    this.setState({curLevel:curArr})
  }
  move(dir){
    let that = this;
    let newY = this.state.nY;
    let newX = this.state.nX;
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
          if(that.state.level[dir.nextPos[0]][dir.nextPos[1]].show === '[]'){
            that.newLevel()
          }
          if(isItem(dir.nextPos)){
            console.log('Picked Up health pack!')
            that.setState({playerHealth: that.state.playerHealth+=that.state.level[dir.nextPos[0]][dir.nextPos[1]].addHealth})
          }
          if(that.state.level[dir.nextPos[0]][dir.nextPos[1]].type === 'weapon'){
            console.log('Picked up ' +  that.state.level[dir.nextPos[0]][dir.nextPos[1]].name + "!")
            that.setState({weapon:that.state.level[dir.nextPos[0]][dir.nextPos[1]]})
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
      return dirMap.key === dir;
    }
    function isEnemy(nextPos){ //does the next position contain an enemy?
      return that.state.level[nextPos[0]][nextPos[1]].show === '#' && !that.state.level[nextPos[0]][nextPos[1]].defeated || that.state.level[nextPos[0]][nextPos[1]].show === 'B' && !that.state.level[nextPos[0]][nextPos[1]].defeated;
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
      let attackRoll = Math.floor(Math.random() * 10) + 1;
      let levelMod = parseFloat((that.state.playerLevel * 1.5).toFixed(2));
      let hit = that.state.weapon.attackPower+attackRoll + that.state.playerLevel ;
      console.log("enemy health: " + nextCell.health +'\n'+ ' enemy hit for: ' + nextCell.attack +'\n'+ ' your health: ' + that.state.playerHealth +'\n'+ " you hit for: " + hit )
      if(nextCell.health > that.state.weapon.attackPower){
        nextCell.health -= hit
        that.setState({playerHealth:that.state.playerHealth -= nextCell.attack})
      }
      else{
        nextCell.defeated = true;
        console.log('you beat this enemy!')
        that.setState({playerXp:that.state.playerXp += nextCell.xp});
      }
    }
  }


  // gets the level array from child component -- map.js
  getMap(arr){
    this.setState({level: arr})
  }

  render() {
    let dungeon = <Map level= {this.state.curLevel} playerDirection={this.state.playerDirection} getMap={this.getMap} onCollide={this.collideHandler} nX={this.state.nX} nY={this.state.nY} playerPos = {this.state.playerPos}/>
    let gameOver = <h1> YOU DIED <p>GAMEOVER</p>  </h1>
    let board = (this.state.playerHealth > 0 ? dungeon : gameOver)
    let isWin = (this.state.xp > 700 ? win : board)
    let win = <h1> YOU WON <p>GAMEOVER</p>  </h1>
    let tip = <ToolTip moveCount = {this.state.moveCount} />

    document.body.style.background = "#333";
		document.body.style.color = "#FAFAFA";

    return (
      <div>
      <div className="App-header">
      <StatusBox playerLevel = {this.state.playerLevel} playerXp = {this.state.playerXp} playerHealth = {this.state.playerHealth} attackPower = {this.state.attackPower} dungeonLevel = {this.state.dungeonLevel} weapon = {this.state.weapon}/>
      </div>
        {(this.state.moveCount === 0 ? tip : isWin)}
      </div>
    );
  }
}

export default Controller;
