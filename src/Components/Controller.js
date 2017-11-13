import React, { Component } from 'react';
import '../App.css';
import StatusBox from './StatusBox.js';
import ToolTip from './ToolTip.js';
import Weapons from './Weapons.js';
import generate from './generate.js';
import Enemies from './Enemies.js';
import Items from './Items.js';
import Portal from './Portal.js';
import Boss from './Boss.js';
import Grid from './Grid.js';

const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {playerPos:[16,0],isWin:false,gameOver:false}
  }
  componentWillMount(){
    let arr = generate(GRID_HEIGHT,GRID_WIDTH);
    Enemies(arr);
    Items(arr);
    Portal(arr);
    Weapons(arr,1)
    arr[0][16] = {show:'@'};
    this.curLevel = arr;
    this.initVars();
    this.Game();
  }
  initVars(){
    this.moveCount = 0;
    this.nX = 16;
    this.nY=0;
    this.playerPos = [16,0];
    this.playerHealth = 100;
    this.playerLevel=1;
    this.playerXp = 0;
    this.dungeonLevel=1;
    this.playerDirection;
    this.weapon = {name:'Fists',attackPower:30};
  }


  Game(){

    document.body.addEventListener('keydown', (e) => {
      // e.preventDefault();

      if(this.playerXp > 39){
        this.playerLevel = 2;
      }
      if(this.playerXp > 79){
        this.playerLevel = 3;
      }
      if(this.playerXp > 129){
        this.playerLevel = 4;
      }
      if(this.playerXp > 199){
        this.playerLevel = 5;
      }
      if(this.playerXp > 249){
        this.playerLevel = 5
      }
      if(this.playerHealth > 0){
        if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"||e.key === "w"||e.key === "a"||e.key === "s"||e.key === "d"){
          let count = this.moveCount;
          this.moveCount +=1;

          this.playerDirection = e.key;
          let that = this;

          that.move(e.key)
        }
      }
      else{
        this.setState({gameOver:true})
      }
    })
  }
  newLevel(){
    let arr = generate(GRID_HEIGHT,GRID_WIDTH, this.playerPos)
    let curArr = this.curLevel;
    Enemies(arr);
    Items(arr);
    if(this.dungeonLevel < 2){
      Portal(arr);
    }
    else{
      Boss(arr);
    }
    Weapons(arr,this.dungeonLevel+1)

    curArr.map(function(row,i){
      return row.map(function(cell,l){
        return Object.assign(cell,arr[i][l])
      })
    })
    this.dungeonLevel += 1;
    this.curLevel = curArr;
  }
  move(dir){
    let that = this;
    let newY = this.nY;
    let newX = this.nX;
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

    this.nX = newX;
    this.nY = newY;

    function movePlayer(dir){
      if(isWithinGrid(dir.nextPos) && !isCollide(dir.nextPos)){
        if(isEnemy(dir.nextPos)){
          //attack!!!!
          attack(dir.nextPos)
        }
        else{
          if(that.curLevel[dir.nextPos[0]][dir.nextPos[1]].show === '[]'){
            that.newLevel()
          }
          if(isItem(dir.nextPos)){
            console.log('Picked Up health pack!')
            that.playerHealth += that.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth;
            console.log(that.playerHealth, that.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth)
          }
          if(that.curLevel[dir.nextPos[0]][dir.nextPos[1]].type === 'weapon'){
            console.log('Picked up ' +  that.curLevel[dir.nextPos[0]][dir.nextPos[1]].name + "!")
            that.weapon = that.curLevel[dir.nextPos[0]][dir.nextPos[1]]

          }
          newX = dir.nextPos[1];
          newY = dir.nextPos[0];
          cleanPlayerCell()
          that.playerPos = dir.nextPos;
          that.curLevel[newY][newX] = {show:'@'}
          moveTorch(that.playerPos)
          that.setState({playerPos:that.playerPos})
        }
      }
    }
    function cleanPlayerCell(){
      that.curLevel.map(function(row, y){
        return row.map(function(cell,x){
          if(cell.show === '@'){
            Object.assign(cell,{show:''})
          }
        })
      })
    }
    function moveTorch(pos){
      that.curLevel.map(function(row, y){
        return row.map(function(cell,x){
          return (isNear([y,x]) ? cell.hidden = false && console.log(y + " " + x) : cell.hidden = true)
        })
      })
    }
    function isNear(pos){
      let num = 5;
      return pos[0] - that.playerPos[0] < num && pos[1] - that.playerPos[1] < num && that.playerPos[0] - pos[0] < num && that.playerPos[1] - pos[1] < num ;
    }
    //used in conjunction with Array.prototype.find() to find the element in the array that matches the keypress
    function moveInfo(dirMap){
      return dirMap.key === dir;
    }
    function isEnemy(nextPos){ //does the next position contain an enemy?
      return that.curLevel[nextPos[0]][nextPos[1]].show === '#' && !that.curLevel[nextPos[0]][nextPos[1]].defeated || that.curLevel[nextPos[0]][nextPos[1]].show === 'B' && !that.curLevel[nextPos[0]][nextPos[1]].defeated;
    }
    function isItem(nextPos){ //does the next position contain an item?
      return that.curLevel[nextPos[0]][nextPos[1]].show === '^';
    }
    function isCollide(nextPos){ // is the next position a wall?
      return that.curLevel[nextPos[0]][nextPos[1]].show === '▒';
    }
    function isWithinGrid(nextPos){ // is the next position within the GRID?
      return nextPos[0] >= 0 && nextPos[0] < GRID_HEIGHT && nextPos[1] >= 0 && nextPos[1] < GRID_WIDTH;
    }
    function attack(nextPos){
      let nextCell = that.curLevel[nextPos[0]][nextPos[1]]
      let attackRoll = Math.floor(Math.random() * 10) + 1;
      let levelMod = parseFloat((that.playerLevel * 1.5).toFixed(2));
      let hit = that.weapon.attackPower+attackRoll + levelMod ;
      console.log("enemy health: " + nextCell.health +'\n'+ ' enemy hit for: ' + nextCell.attack +'\n'+ ' your health: ' + that.playerHealth +'\n'+ " you hit for: " + hit )
      if(nextCell.health > that.weapon.attackPower){
        nextCell.health -= hit
        that.playerHealth -= nextCell.attack;
      }
      else{
        nextCell.defeated = true;
        console.log('you beat this enemy!')
        that.playerXp += nextCell.xp;
        console.log(that.playerXp, nextCell.xp)
      }
    }
  }
  render() {
    let dungeon =
    <div id="game">
    <Grid height={GRID_HEIGHT} width={GRID_WIDTH} level={this.curLevel}/>
    </div>

    let gameOver = <h1> YOU DIED <p>GAMEOVER</p>  </h1>
    let board = (this.playerHealth > 0 ? dungeon : gameOver)
    console.log('render', this.moveCount)
    let isWin = (this.playerXp > 700 ? console.log('You Win') : board)
    let win = <h1> YOU WON <p>GAMEOVER</p>  </h1>
    let tip = <ToolTip moveCount = {this.moveCount} />

    document.body.style.background = "#333";
    document.body.style.color = "#FAFAFA";

    return (
      <div>
      <div className="App-header">
      <StatusBox playerLevel = {this.playerLevel} playerXp = {this.playerXp} playerHealth = {this.playerHealth} attackPower = {this.attackPower} dungeonLevel = {this.dungeonLevel} weapon = {this.weapon}/>
      </div>
      {(this.playerXp > 700 ? win : "")}
      {(this.moveCount === 0 ? tip : isWin)}
      </div>
    );
  }
}

export default Controller;
