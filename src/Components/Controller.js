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
    this.state = {playerHealth:110,playerPos:{x:16,y:0},isWin:false,gameOver:false}

    this.moveCount = 1;
    this.playerPos = [16,0];
    this.m1 = '';
    this.m2 = '';
    this.m3 = '';
    this.playerLevel=1;
    this.playerXp = 0;
    this.curFloor=1;
    this.weapon = {name:'Fists',attackPower:30};
  }
  componentWillMount(){
    let dungeonLevel = this.curFloor;
    let arr = generate({GRID_HEIGHT,GRID_WIDTH}, dungeonLevel, {x:16,y:0});
    console.log(arr)
    Enemies(arr);
    Items(arr);
    Portal(arr);
    Weapons(arr,1)
    this.curGrid = arr;
    if(this.curFloor===1){
      this.curGrid[this.state.playerPos.y][this.state.playerPos.x].type = 'player'
    }
    this.moveTorch(this.state.playerPos)
    this.Game();
  }
  //iterates through the 2D array and runs a function on each cell
  eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));
  newLevel = () => {
    this.curFloor += 1;
    console.log('playerPos' , this.state.playerPos)
    console.log(this.curGrid)

    // let pPos = {this.curGrid[this.state.playerPos.y][this.state.playerPos.x].pos};
    

    let arr = generate({GRID_HEIGHT,GRID_WIDTH}, this.curFloor+1, this.state.playerPos)
    let curArr = this.curGrid;
    Enemies(arr);
    Items(arr);
    if(this.curFloor < 2){
      Portal(arr);
    }
    else{
      Boss(arr);
    }
    Weapons(arr,this.curFloor+1)

    curArr.map(function(row,i){
      return row.map(function(cell,l){
        return Object.assign(cell,arr[i][l])
      })
    })
    this.curGrid = curArr;
  }

  //this listens for player input and moves based on keypress and ends game if player dies
  Game = () => {
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
  // mapping keypress to direction
  newMove = key => {
    let newDir = [this.state.playerPos.x,this.state.playerPos.y];
    let moveInfo = (dirMap) => dirMap.key === key;

    let dirMap = [
      {
        key:"ArrowDown",
        nextPos:{
          x:newDir[0],
          y:newDir[1]+1
        }
      },//[newDir[1]+1,newDir[0]]},
      {
        key:"ArrowUp",
        nextPos:{
          x:newDir[0],
          y:newDir[1]-1
        }
      },//[newDir[1]-1,newDir[0]]},
      {key:"ArrowLeft",nextPos:{x:newDir[0]-1,y:newDir[1]}},//[newDir[1],newDir[0]-1]},
      {key:"ArrowRight",nextPos:{x:newDir[0]+1,y:newDir[1]}},//[newDir[1],newDir[0]+1]},
      {key:"s",nextPos:{x:newDir[0],y:newDir[1]+1}},//[newDir[1]+1,newDir[0]]},
      {key:"w",nextPos:{x:newDir[0],y:newDir[1]-1}},//[newDir[1]-1,newDir[0]]},
      {key:"a",nextPos:{x:newDir[0]-1,y:newDir[1]}},//[newDir[1],newDir[0]-1]},
      {key:"d",nextPos:{x:newDir[0]+1,y:newDir[1]}},//[newDir[1],newDir[0]+1]}
    ];

    return dirMap.find(moveInfo);
  }

  attack = nextPos => {
    let nextCell = this.curGrid[nextPos.y][nextPos.x]
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
  //controls player movement
  movePlayer = dir => {
    //collision detection
    if(this.isWithinGrid(dir.nextPos) && !this.isWall(dir.nextPos)){
      if(this.isEnemy(dir.nextPos)){
        //attack!!!!
        this.attack(dir.nextPos)
      }
      else{
        if(this.curGrid[dir.nextPos.y][dir.nextPos.x].type === 'portal'){
          this.newLevel()
        }
        if(this.isItem(dir.nextPos)){
          console.log('Picked Up health pack!')
          this.m1 = 'Picked Up health pack! \n +' + this.curGrid[dir.nextPos.y][dir.nextPos.x].addHealth+'hp!' ;
          this.m2 = ''
          this.m3 = ''

          //this.playerHealth += this.curGrid[dir.nextPos.y][dir.nextPos.x].addHealth;
          this.setState({playerHealth:this.state.playerHealth + this.curGrid[dir.nextPos.y][dir.nextPos.x].addHealth})
          console.log(this.state.playerHealth, this.curGrid[dir.nextPos.y][dir.nextPos.x].addHealth)
        }
        if(this.curGrid[dir.nextPos.y][dir.nextPos.x].type === 'weapon'){
          console.log('Picked up ' +  this.curGrid[dir.nextPos.y][dir.nextPos.x].name + "!")
          this.m1 = 'Picked up ' +  this.curGrid[dir.nextPos.y][dir.nextPos.x].name + "!"
          this.weapon = this.curGrid[dir.nextPos.y][dir.nextPos.x]

        }
        
        this.cleanPlayerCell()
        this.moveTorch(this.state.playerPos)
        this.curGrid[dir.nextPos.y][dir.nextPos.x].type = 'player';

        // console.log('dir.NextPos: ',dir.nextPos)
        // console.log('playerPos: ',this.state.playerPos)
        this.setState({playerPos:dir.nextPos})
      }
    }
  }



  //cleans up after player
  cleanPlayerCell = () => {
    this.eachCell(this.curGrid,(cell) => {
      if(cell.type === 'player'){
        return cell.type = 'floor'
      }
    })
  }
  moveTorch = pos => {
    this.eachCell(this.curGrid, (cell) =>{
      if(this.isNear([cell.pos.x,cell.pos.y])){
        cell.hidden = false;
      }
      else{
        cell.hidden = true;
      }
    })
  }
  isNear = pos => {
    let num = 5;
    return pos[0] - this.state.playerPos.x < num &&
    pos[1] - this.state.playerPos.y < num &&
    this.state.playerPos.x - pos[0] < num &&
    this.state.playerPos.y - pos[1] < num ;
  }
  isEnemy = nextPos => { //does the next position contain an enemy?
    if(this.curGrid[nextPos.y][nextPos.x].type === 'boss' &&
    !this.curGrid[nextPos.y][nextPos.x].defeated){
      return true;
    }
    if(this.curGrid[nextPos.y][nextPos.x].type === 'enemy' &&
    !this.curGrid[nextPos.y][nextPos.x].defeated){
      return true;
    }
  }
  //does the next position contain an item?
  isItem = nextPos => this.curGrid[nextPos.y][nextPos.x].type === 'health';
  // is the next position a wall?
  isWall = nextPos => this.curGrid[nextPos.y][nextPos.x].type === 'wall';
  // is the next position within the GRID?
  isWithinGrid = pos => {
    return pos.y >= 0 &&
    pos.y < GRID_HEIGHT &&
    pos.x >= 0 &&
    pos.x < GRID_WIDTH;
  }
  //does this cell have floor cells around it? can the player go around the object
  hasFloorAround = pos => {
    // return true for now
    return true;
  }

  placer = (obj, freq, arr, blocker) => {
  }

  render() {

    let dungeon =
    <div id="game">
    <CombatLog  m1={this.m1} m2={this.m2} m3={this.m3} />
      <Grid height={GRID_HEIGHT} width={GRID_WIDTH} level={this.curGrid}/>
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
            dungeonLevel = {this.curFloor}
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
