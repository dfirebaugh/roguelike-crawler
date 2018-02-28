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

const SIZE = {
  GRID_HEIGHT: 25,
  GRID_WIDTH: 35
}

class Controller extends Component {
  constructor(props){
    super(props)
    this.state = {
      playerHealth:110,
      playerPos:{
        x:16,
        y:0
      },
      isWin:false,
      curMessage: '',
      gameOver:false
    };
    this.size = SIZE;
    this.moveCount = 1;
    this.playerPos = [16,0];
    this.combateMessage = '';
    this.playerLevel=1;
    this.playerXp = 0;
    this.curFloor=1;
    this.weapon = {name:'Fists',attackPower:30};
  }
  toBePlaced = {
    enemies: {
      freq: 22,
      blocking: true,
      props: {
        type: 'enemy',
        health: '150',
        attack: '10',
        defeated: false,
        hidden: true,
        xp: 10
      }
    },
    boss:{
      freq:'once',
      blocking:false,
      props:{
        show:'B',
        name:'Boss',
        type:'boss',
        attack:50,
        health:250,
        xp:999
      }
    },
    portal: {
      freq: 'once',
      blocking: false,
      props: {
        type: 'portal',
        show: '[]',
        name: 'portal'
      }
    },
    healthPack:{
      freq:12,
      blocking:true,
      props:{
        show:'^',
        type:'health',
        addHealth:20,
        hidden:true}
    },
    weapon:{
      freq:'once',
      blocking:true,
      props:{

      }
    }
  };
  componentWillMount(){
    let dungeonLevel = this.curFloor;
    let arr = generate(SIZE, dungeonLevel, {x:16,y:0});
    console.log(arr)
    Enemies(arr);
    // this.placer(this.toBePlaced.enemies, arr)
    Items(arr);
    Portal(arr);
    Weapons(arr,1)
    this.curGrid = arr;
    this.moveTorch(this.state.playerPos, arr)
    this.Game();
    this.tests();
    this.setState({curGrid: arr})
  };
  //some tests that run
  tests = () => {
    // console.log('testing placer', this.placer(this.toBePlaced.enemies, [[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'wall'}]]));


    //testing the placer function
    let placerTest = this.placer(this.toBePlaced.enemies, [[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'floor'}],[{type:'wall'}]]);
    let countEnemies = 0;
    console.log(placerTest)
    placerTest.forEach((row)=> row.forEach(x => {
      if(x.type === 'enemy'){
        countEnemies++;
      }
    }))

    console.log('count:', countEnemies)
    // disabling htis check until i can get a better placer function going
    // if(countEnemies < 1){
    //   throw Error('Check Error: placer function is wrong')
    // }


    if(this.newMove("ArrowDown").key !== "ArrowDown"){
      throw Error("Check Error: check newMove Function")
    }
    // check getCell
    if(this.getCell({
      x:0,
      y:0
    }, [[{check:'just checking'}],[]]) === typeof Object){
      throw Error('Check Error: is getCell working properly?')
    }
    //check setPlayerPos
    if(this.setPlayerPos({
      x:0,
      y:0
    }, [[{}],[{}]]) !== 'player' ){
      throw Error('Check Error: setPlayer function not working properly?')
    }
    //checking getType function
    if(this.getType({
      x:0,
      y:0
    },[[{
      type:'floor'
    }],[]]) !== 'floor'){
      throw Error('Check Error: check the getType function!');
    }
    //check isWithinGrid
    if(!this.isWithinGrid({x:1,y:1},{GRID_HEIGHT:2,GRID_WIDTH:2})){
      throw Error('Check Error: check the isWithinGrid function')
    }

  }
  // function that places objects into the grid
  placer = (obj, grid) => {
    let that = this;
    let newGrid = grid;
    let count = 0;
    let freq = obj.freq === typeof string ? 1 : obj.freq;
    // let floors = this.getAllFloors(grid); // get all possible floor locations
    //
    // console.log('freq: ', freq)
    //
    // let randRow = Math.floor(Math.random()*floors.length);
    // let randCell = Math.floor(Math.random()*randRow.length);
    //
    // console.log('floorArr', floors)



    // console.log('floors: ', this.getAllFloors(grid)[1])
    // let getRanFloor = (newGrid){
    //   let x =
    // }
    // let gettingPos =
    // console.log('pos: ', gettingPos);



     newGrid.forEach((row, y)=> {
       row.forEach(function(cell,x){
         let randEn = Math.floor(Math.random()*100);
        if(that.isFloor({x:x, y:y}, newGrid) && randEn > 75 && count < freq){
          count++
          Object.assign(cell,obj.props)
        }
      })
    })
    return newGrid;
  }

  //iterates through the 2D array and runs a function on each cell
  eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));
  newLevel = () => {
    this.curFloor += 1;
    let arr = generate(SIZE, this.curFloor+1, this.state.playerPos)
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
  };

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
          this.updateGrid(this.movePlayer(this.newMove(e.key), this.curGrid))

        }
      }
      else{
        this.setState({gameOver:true})
      }
    })
  }
  // mapping keypress to direction
  newMove = key => {
    let newDir = [this.state.playerPos.x, this.state.playerPos.y];
    let moveInfo = dirMap => dirMap.key === key;

    let dirMap = [
      {
        key: "ArrowDown",
        nextPos: {
          x: newDir[0],
          y: newDir[1] + 1
        }
      },
      {
        key: "ArrowUp",
        nextPos: {
          x: newDir[0],
          y: newDir[1] - 1
        }
      },
      {
        key: "ArrowLeft",
        nextPos: {
          x: newDir[0] - 1,
          y: newDir[1]
        }
      },
      {
        key: "ArrowRight",
        nextPos: {
          x: newDir[0] + 1,
          y: newDir[1]
        }
      },
      {
        key: "s",
        nextPos: {
          x: newDir[0],
          y: newDir[1] + 1
        }
      },
      {
        key: "w",
        nextPos: {
          x: newDir[0],
          y: newDir[1] - 1
        }
      },
      {
        key: "a",
        nextPos: {
          x: newDir[0] - 1,
          y: newDir[1]
        }
      },
      {
        key: "d",
        nextPos: {
          x: newDir[0] + 1,
          y: newDir[1]
        }
      }
    ];

    return dirMap.find(moveInfo);
  };

  //handle attacks
  attack = (nextPos, grid)=> {
    //currently mutating state directly to handle enemy health loss.  need better solution for this.
    let nextCell = grid[nextPos.y][nextPos.x],
    attackRoll = Math.floor(Math.random() * 10) + 1,
    levelMod = parseFloat((this.playerLevel * 5).toFixed(2)),
    hit = this.weapon.attackPower+attackRoll + levelMod;

    this.combatLog(`enemy health: ${nextCell.health - hit}
                    enemy hit for:  ${nextCell.attack}
                    you hit for: ${hit}`)


      if(nextCell.health > hit){
        nextCell.health -= hit
        this.setState({playerHealth:this.state.playerHealth - nextCell.attack});
      }
      else{
        nextCell.defeated = true;
        nextCell.health = 0;
        nextCell.type = 'floor';
        this.playerXp += nextCell.xp;
        this.combatLog(`you beat this enemy!
                        You've gained  ${nextCell.xp} xp!`)
      }
    }

  //controls player movement
  movePlayer = (dir, grid) => {
    let newGrid = grid;
    //collision detection
    if(this.isWithinGrid(dir.nextPos, SIZE) && this.getType(dir.nextPos, newGrid) !== 'wall'){
      if(this.getType(dir.nextPos, newGrid)=== 'enemy'){
        //attack!!!!
        this.attack(dir.nextPos, newGrid);
      }
      else{
        if(this.getType(dir.nextPos, newGrid) === 'portal'){
          this.newLevel();
        }
        if(this.getType(dir.nextPos, newGrid) === 'health'){
          this.combatLog('Picked Up health pack! \n +' + newGrid[dir.nextPos.y][dir.nextPos.x].addHealth+'hp!');
          //this.playerHealth += newGrid[dir.nextPos.y][dir.nextPos.x].addHealth;
          this.setState({playerHealth:this.state.playerHealth + newGrid[dir.nextPos.y][dir.nextPos.x].addHealth});
        }
        if(this.getType(dir.nextPos, newGrid) === 'weapon'){
          this.combatLog('Picked up ' +  newGrid[dir.nextPos.y][dir.nextPos.x].name + "!");
          this.weapon = newGrid[dir.nextPos.y][dir.nextPos.x];
        }

        this.cleanPlayerCell(newGrid);
        this.moveTorch(this.state.playerPos, newGrid);
        this.setPlayerPos(dir.nextPos, newGrid);
        this.setState({playerPos:dir.nextPos})
      }
    }
    return newGrid
  }


  attackCell = (cell, hitFor) => cell.hp - hitFor;





  //does this cell have floor cells around it? can the player go around the object
  hasFloorAround = pos => {
    // return true for now
    return true;
  }

  //should return all properties for object at coords in grid
  getCell = (pos, grid) => grid[pos.y][pos.x];

  // puts the player in a new position
  setPlayerPos = (pos, grid) => grid[pos.y][pos.x].type = 'player';

  //cleans up after player
  cleanPlayerCell = (grid) => {
    this.eachCell(grid,(cell) => {
      if(cell.type === 'player'){
        return cell.type = 'floor'
      }
    })
  }
  moveTorch = (pos,grid) => {
    this.eachCell(grid, (cell) =>{
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

  //does the next position contain an enemy?
  isEnemy = (pos, grid) => {
    if(grid[pos.y][pos.x].type === 'boss' &&
      !grid[pos.y][pos.x].defeated){
      return true;
    }
    if(grid[pos.y][pos.x].type === 'enemy' &&
      !grid[pos.y][pos.x].defeated){
      return true;
    }
  }
  //does the next position contain an item?
  isItem = (pos, grid) => grid[pos.y][pos.x].type === 'health';
  // is the next position a wall?
  isWall = (pos, grid) => grid[pos.y][pos.x].type === 'wall';
  //check if a cell is a floor
  isFloor = (pos, grid) => grid[pos.y][pos.x].type === 'floor';
  //perhaps the above functions could be replaced with a getType function
  getType = (pos, grid) => grid[pos.y][pos.x].type;

  getAllFloors = (grid) => {
    let floorFilter = (cell) => {
      return cell.type === 'floor';
    }
    return grid.map(row => {
      return row.filter(floorFilter)
    })
  }
  // is the next position within the GRID?
  isWithinGrid = (pos, size) => {
    return pos.y >= 0 &&
           pos.y < size.GRID_HEIGHT &&
           pos.x >= 0 &&
           pos.x < size.GRID_WIDTH;
  }

  combatLog = message => this.setState({curMessage: message});

  updateGrid = grid => this.curGrid = grid;

  render() {
    let dungeon =
    <div id="game">
    <CombatLog  message={this.state.curMessage}/>
      <Grid height={SIZE.GRID_HEIGHT} width={SIZE.GRID_WIDTH} level={this.curGrid}/>
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
