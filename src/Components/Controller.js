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
import CombatLog from './CombatLog.js';
import Cell from './Cell.js';

const GRID_HEIGHT = 25;
const GRID_WIDTH = 35;

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {playerHealth:100,playerPos:[0,16],isWin:false,gameOver:false}

    this.moveCount = 1;
    this.playerPos = [16,0];
    this.m1 = '';
    this.m2 = '';
    this.m3 = '';
    this.playerLevel=1;
    this.playerXp = 0;
    this.dungeonLevel=1;
    this.weapon = {name:'Fists',attackPower:30};
  }
  componentWillMount(){
    let dungeonLevel = this.dungeonLevel;
    let arr = generate({GRID_HEIGHT,GRID_WIDTH}, dungeonLevel, {x:0,y:16});
    console.log(arr)
    Enemies(arr);
    Items(arr);
    Portal(arr);
    Weapons(arr,1)
    this.curLevel = arr;
    if(this.dungeonLevel===1){
      this.curLevel[this.state.playerPos[0]][this.state.playerPos[1]].type = 'player'
    }

    this.Game();
  }
  //iterates through the 2d array and runs a function on each cell
  eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));

  newLevel = () => {
    this.dungeonLevel += 1;
    let pPos = this.curLevel[this.state.playerPos[1]][this.state.playerPos[0]].pos;
    let arr = generate({GRID_HEIGHT,GRID_WIDTH}, this.dungeonLevel+1, pPos)
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
    this.curLevel = curArr;
  }
  Game = () => {//this listens for player input and moves based on keypress
    document.body.addEventListener('keydown', (e) => {

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
      if(this.state.playerHealth > 0){
        if(
           e.key === "ArrowDown"||
           e.key === "ArrowUp"||
           e.key === "ArrowLeft"||
           e.key === "ArrowRight"||
           e.key === "w"||
           e.key === "a"||
           e.key === "s"||
           e.key === "d"
         ){
          // let count = this.moveCount;
          this.moveCount +=1;

          this.playerDirection = e.key;

          // console.log(that.newMove(e.key))
          this.movePlayer(this.newMove(e.key))

        }
      }
      else{
        this.setState({gameOver:true})
      }
    })
  }
  newMove = key => { // mapping keypress to direction
    let newDir = [this.state.playerPos[1],this.state.playerPos[0]];
    let moveInfo = (dirMap) => dirMap.key === key;

    let dirMap = [
      {key:"ArrowDown",nextPos:[newDir[1]+1,newDir[0]]},
      {key:"ArrowUp",nextPos:[newDir[1]-1,newDir[0]]},
      {key:"ArrowLeft",nextPos:[newDir[1],newDir[0]-1]},
      {key:"ArrowRight",nextPos:[newDir[1],newDir[0]+1]},
      {key:"s",nextPos:[newDir[1]+1,newDir[0]]},
      {key:"w",nextPos:[newDir[1]-1,newDir[0]]},
      {key:"a",nextPos:[newDir[1],newDir[0]-1]},
      {key:"d",nextPos:[newDir[1],newDir[0]+1]}
    ];

    return dirMap.find(moveInfo);
  }

  movePlayer = dir => { //controls player movement
    if(this.isWithinGrid(dir.nextPos) && !this.isCollide(dir.nextPos)){
      if(this.isEnemy(dir.nextPos)){
        //attack!!!!
        this.attack(dir.nextPos)
      }
      else{
        if(this.curLevel[dir.nextPos[0]][dir.nextPos[1]].type === 'portal'){
          this.newLevel()
        }
        if(this.isItem(dir.nextPos)){
          console.log('Picked Up health pack!')
          this.m1 = 'Picked Up health pack! \n +' + this.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth+'hp!' ;
          this.m2 = ''
          this.m3 = ''

          //this.playerHealth += this.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth;
          this.setState({playerHealth:this.state.playerHealth + this.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth})
          console.log(this.state.playerHealth, this.curLevel[dir.nextPos[0]][dir.nextPos[1]].addHealth)
        }
        if(this.curLevel[dir.nextPos[0]][dir.nextPos[1]].type === 'weapon'){
          console.log('Picked up ' +  this.curLevel[dir.nextPos[0]][dir.nextPos[1]].name + "!")
          this.m1 = 'Picked up ' +  this.curLevel[dir.nextPos[0]][dir.nextPos[1]].name + "!"
          this.weapon = this.curLevel[dir.nextPos[0]][dir.nextPos[1]]

        }
        this.cleanPlayerCell()

        this.curLevel[dir.nextPos[0]][dir.nextPos[1]] = {type:'player'}
        // moveTorch(this.state.playerPos)
        this.setState({playerPos:dir.nextPos})
      }
    }
  }
  cleanPlayerCell = () => { //cleans up after player
    this.eachCell(this.curLevel,(cell) => {
      if(cell.type === 'player'){
        return cell.type = 'floor'
      }
    })
  }
  moveTorch = pos => {
    this.curLevel.map(function(row, y){
      return row.map(function(cell,x){
        return (this.isNear([y,x]) ? cell.hidden = false && console.log(y + " " + x) : cell.hidden = true)
      })
    })
  }
  isNear = pos => {
    let num = 5;
    return pos[0] - this.playerPos[0] < num && pos[1] - this.playerPos[1] < num && this.playerPos[0] - pos[0] < num && this.playerPos[1] - pos[1] < num ;
  }

  isEnemy = nextPos => { //does the next position contain an enemy?
    if(this.curLevel[nextPos[0]][nextPos[1]].type === 'boss' &&
    !this.curLevel[nextPos[0]][nextPos[1]].defeated){
      return true;
    }
    if(this.curLevel[nextPos[0]][nextPos[1]].type === 'enemy' &&
    !this.curLevel[nextPos[0]][nextPos[1]].defeated){
      return true;
    }
  }
  //does the next position contain an item?
  isItem = nextPos => this.curLevel[nextPos[0]][nextPos[1]].type === '^';
  // is the next position a wall?
  isCollide = nextPos => this.curLevel[nextPos[0]][nextPos[1]].type === 'wall';
  isWithinGrid = nextPos => { // is the next position within the GRID?
    return nextPos[0] >= 0 &&
           nextPos[0] < GRID_HEIGHT &&
           nextPos[1] >= 0 &&
           nextPos[1] < GRID_WIDTH;
  }
  attack = nextPos => {
    let nextCell = this.curLevel[nextPos[0]][nextPos[1]]
    let attackRoll = Math.floor(Math.random() * 10) + 1;
    let levelMod = parseFloat((this.playerLevel * 5).toFixed(2));
    let hit = this.weapon.attackPower+attackRoll + levelMod ;
    console.log(`\t\t   enemy health: ${nextCell.health}
                 enemy hit for: ${nextCell.attack}
                 your health:  ${this.state.playerHealth}
                 you hit for: ${hit}`)

    this.m1 = `enemy health: ${nextCell.health}`;
    this.m2 = `enemy hit for:  ${nextCell.attack}`;
    this.m3 =   `you hit for: ${hit}` ;
    if(nextCell.health > this.weapon.attackPower){
      nextCell.health -= hit
      this.setState({playerHealth:this.state.playerHealth - nextCell.attack});
    }
    else{
      nextCell.defeated = true;
      console.log('you beat this enemy!')
      this.m1 = 'you beat this enemy!'
      this.playerXp += nextCell.xp;
      console.log(this.playerXp, nextCell.xp)
      this.m2 = "You've gained " + nextCell.xp + "xp!"

    }
    // this.forceUpdate();
  }

  render() {
    // console.log('playerPos: ' , this.playerPos)
    let dungeon =
    <div id="game">
    <CombatLog  m1={this.m1} m2={this.m2} m3={this.m3} />
      <Grid height={GRID_HEIGHT} width={GRID_WIDTH} level={this.curLevel}/>
      <div className='combatLog dungeonKey'>
        <ul>
          <li>
            <Cell type='player'></Cell>
            player
          </li>
          <li>
            <Cell type='health'></Cell>
            health
          </li>
          <li>
            <Cell type='enemy'></Cell>
            enemy
          </li>
          <li>
            <Cell type='weapon'></Cell>
            weapon
          </li>
          <li>
            <Cell type='boss'></Cell>
            boss
          </li>
          <li>
            <Cell type='portal'></Cell>
            portal
          </li>
          <li>
            <Cell type='floor'></Cell>
            floor
          </li>
          <li>
            <Cell type='wall'></Cell>
            wall
          </li>
        </ul>
      </div>
    </div>

    let gameOver = <h1> YOU DIED <p>GAMEOVER</p>  </h1>
    let board = (this.state.playerHealth > 0 ? dungeon : gameOver)
    // console.log('render', this.moveCount)
    let isWin = (this.playerXp > 700 ? console.log('You Win') : board)
    let win = <h1> YOU WON!!!  </h1>
    let tip = <ToolTip moveCount = {this.moveCount} />

    document.body.style.background = "#333";
    document.body.style.color = "#FAFAFA";

    return (
      <div>
        <div className="App-header">
          <StatusBox playerLevel = {this.playerLevel}
            playerXp = {this.playerXp}
            playerHealth = {this.state.playerHealth}
            attackPower = {this.attackPower}
            dungeonLevel = {this.dungeonLevel}
            weapon = {this.weapon}
            />
        </div>
        {(this.playerXp > 700 ? win : "")}
        {(this.moveCount === 0 ? tip : isWin)}
      </div>
    );
  }
}

export default Controller;
