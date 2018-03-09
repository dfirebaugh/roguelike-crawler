import React, { Component } from 'react';
import '../App.css';
import StatusBox from './StatusBox.js';
import ToolTip from './ToolTip.js';
import generate from './generate.js';
import Grid from './Grid.js';
import CanvasGrid from './CanvasGrid.js';
import CombatLog from './CombatLog.js';
import Cell from './Cell.js';

const SIZE = {
  GRID_HEIGHT: 35,
  GRID_WIDTH: 45
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
      gameOver:false,
      useCanvas:true
    };
    this.size = SIZE;
    this.moveCount = 1;
    this.playerPos = [16,0];
    this.combateMessage = '';
    this.playerLevel= 1;
    this.hasDungeonMap = false;

    this.playerXp = 0;
    this.curFloor= 1;
    this.weapon = {name:'Fists',attackPower:30};
    this.handleRenderToggle = this.handleRenderToggle.bind(this);
  }
  toBePlaced = {
    enemies: {
      freq: .01,
      blocking: true,
      name:'enemies',
      props: {
        type: 'enemy',
        health: 200,
        attack: 10,
        defeated: false,
        hidden: false,
        xp: 10
      }
    },
    boss:{
      freq:'once',
      blocking:false,
      name:'Boss',
      props:{
        type:'boss',
        attack:50,
        health:1450,
        xp:9999,
        hidden: false
      }
    },
    dungeonMap:{
          freq:'once',
          blocking:false,
          name:'Map',
          props:{
            type:'dungeonMap',
            hidden: false
          }
        },
    portal: {
      freq: 'once',
      blocking: false,
      name:'portal',
      props: {
        type: 'portal',
        name: 'portal',
        hidden: false
      }
    },
    healthPack:{
      freq:.01,
      blocking:true,
      name:'health',
      props:{
        type:'health',
        addHealth:15,
        hidden:false
      }
    },
    weapon:{
      freq:'once',
      blocking:true,
      name:'weapon',
      weapons:[
        {type:'weapon',show:'W',name:'Fists',attackPower:30},
        {type:'weapon',show:'s',name:'sword',level:1,attackPower:60},
        {type:'weapon',show:'+',name:'magic sword+1',level:2,attackPower:70},
        {type:'weapon',show:'++',name:'magic sword+2',level:3,attackPower:150},
        {type:'weapon',show:'++',name:'sword of destiny',level:3,attackPower:250}
      ]
    }
};
  componentWillMount(){
    let dungeonLevel = this.curFloor;
    let arr = generate(SIZE, dungeonLevel, {x:16,y:0});
    this.curGrid = arr;

    this.placer(this.toBePlaced.enemies, arr, SIZE);
    this.placer(this.toBePlaced.portal, arr, SIZE);
    this.placer(this.toBePlaced.healthPack, arr, SIZE);
    this.placer(this.toBePlaced.weapon, arr, SIZE);
    this.placer(this.toBePlaced.dungeonMap, arr, SIZE);

    this.Game();
    this.tests();
    this.moveTorch(this.state.playerPos, arr)

    this.setState({curGrid: arr})
  };

  //instantiates grid for new level and populates it accordingly
  newLevel = () => {
    this.curFloor += 1;
    this.hasDungeonMap = false;
    let arr = generate(SIZE, this.curFloor+1, this.state.playerPos)
    let curArr = this.curGrid;
    this.placer(this.toBePlaced.enemies, arr, SIZE);
    this.placer(this.toBePlaced.healthPack, arr, SIZE);
    this.placer(this.toBePlaced.weapon, arr, SIZE);
    this.placer(this.toBePlaced.dungeonMap, arr, SIZE);

    if(this.curFloor < 4){
      // Portal(arr);
      this.placer(this.toBePlaced.portal, arr, SIZE);
    }
    else{
      this.placer(this.toBePlaced.boss, arr, SIZE);
      // Boss(arr);
    }
    // Weapons(arr,this.curFloor+1)

    curArr.map(function(row,i){
      return row.map(function(cell,l){
        return Object.assign(cell,arr[i][l])
      })
    })
    this.curGrid = curArr;
  };

  // function that places objects into the grid -- should only place on available spots (i.e. floor cells)
  placer = (obj, grid, size) => {
    // takes an object and places it on the grid at a defined frequency
    let newGrid = grid;
    let count = 0;
    let freq = obj.freq === 'once' ? .01 : obj.freq;
    let floors = this.getAllFloors(grid); // get all possible floor locations
    let blocking = obj.blocking
    let cellObj = obj.name === 'weapon' ? obj.weapons[this.curFloor] : obj.props;

    //places item into grid until it reaches previously set freq
    let placeItem = (item) => {
      let randCell = Math.floor(Math.random()*floors.length);
      let cellPos = floors[randCell].pos;
      count++;

      //TODO: check randCell to see if it blocking --
      //      i.e. if a obj is placed there, will it block a pathway?
      // if cell should not be blocking, get another random cell.
      if(!blocking){
        // console.log('isBlocking: ',this.isBlocking(floors[randCell].pos, grid, size))
        // console.log('blocking: ', blocking)
        //TODO: add if condition to see if this randcell is blocking
      }
      else{
      }

      if(this.getType(cellPos,grid) === 'floor'){
        if(cellPos !== this.state.playerPos)
        this.replaceObj(item, cellPos,grid)
      }

      if(count >= size.GRID_WIDTH * size.GRID_HEIGHT * freq)
      {
        return;
      }

      if(obj.freq === 'once'){
        return;
      }
      else{
        placeItem(item);
      }
    }

    placeItem(cellObj);
    console.log(obj.name,count)


    return newGrid;

  }

  //iterates through the 2D array and runs a function on each cell
  eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));


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
      if(this.playerXp > 349){
        this.playerLevel = 6
      }
      if(this.playerXp > 449){
        this.playerLevel = 7
      }
      if(this.playerXp > 549){
        this.playerLevel = 8
      }
      if(this.playerXp > 649){
        this.playerLevel = 9
      }
      if(this.playerXp > 749){
        this.playerLevel = 10
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
    hit = this.weapon.attackPower + attackRoll + levelMod;

    console.log('attackRoll: ', attackRoll)
    if(attackRoll >= 9){
      this.combatLog(`Critical Hit!!!
                      you hit for: ${hit * 2}!!
                      enemy health is now: ${nextCell.health - hit * 2}
                      enemy hit for:  ${nextCell.attack}
                      `)

      if(nextCell.health > hit * 2){
        nextCell.health -= hit * 2
        //if you crit, the enemy doesn't get a hit in on you
        // this.setState({playerHealth:this.state.playerHealth - nextCell.attack});
      }
      else{
        nextCell.defeated = true;
        nextCell.health = 0;
        nextCell.type = 'floor';
        this.playerXp += nextCell.xp;
        this.combatLog(`Critical Hit!!!
                        you hit for ${hit * 2}
                        you beat this enemy!
                        You've gained  ${nextCell.xp} xp!`)
        }
    }
    else{
      this.setState({playerHealth:this.state.playerHealth - nextCell.attack});
      if(attackRoll > 4){
        this.combatLog(`you hit for: ${hit}
                        enemy health is now: ${nextCell.health - hit}
                        enemy hit for:  ${nextCell.attack}
          `)

          if(nextCell.health > hit){
            nextCell.health -= hit
          }
          else{
            nextCell.defeated = true;
            nextCell.health = 0;
            nextCell.type = 'floor';
            this.playerXp += nextCell.xp;
            this.combatLog(`you hit for: ${hit}
                            you beat this enemy!
                            You've gained  ${nextCell.xp} xp!`)
            }
          }
          else{
            this.combatLog(`YOU MISSED!!!!
                            enemy hit for:  ${nextCell.attack}
              `);

          }
        }
      }

  //controls player movement
  movePlayer = (dir, grid) => {
    let newGrid = grid;
    //collision detection
    if(this.isWithinGrid(dir.nextPos, SIZE) &&
       this.getType(dir.nextPos, newGrid) !== 'wall'){
      if(this.getType(dir.nextPos, newGrid)=== 'enemy' ||
         this.getType(dir.nextPos, newGrid) === 'boss'){
        //attack!!!!
        this.attack(dir.nextPos, newGrid);
      }
      else{
        if(this.getType(dir.nextPos, newGrid) === 'portal'){
          this.newLevel();
        }
        if(this.getType(dir.nextPos, newGrid) === 'dungeonMap'){
          this.unHideAll(newGrid)
          this.combatLog('Picked up dungeon map!')
        }
        if(this.getType(dir.nextPos, newGrid) === 'health'){
          this.combatLog('Picked Up health pack! \n +' + newGrid[dir.nextPos.y][dir.nextPos.x].addHealth+'hp!');
          //this.playerHealth += newGrid[dir.nextPos.y][dir.nextPos.x].addHealth;
          this.setState({playerHealth:this.state.playerHealth + newGrid[dir.nextPos.y][dir.nextPos.x].addHealth});
        }
        if(this.getType(dir.nextPos, newGrid) === 'weapon'){
          this.combatLog('Picked up ' +  newGrid[dir.nextPos.y][dir.nextPos.x].name + "!");
          this.weapon = newGrid[dir.nextPos.y][dir.nextPos.x];
          this.weapon.attackPower = newGrid[dir.nextPos.y][dir.nextPos.x].attackPower;
        }

        this.cleanPlayerCell(newGrid);
        this.moveTorch(this.state.playerPos, newGrid);
        this.setPlayerPos(dir.nextPos, newGrid);
        this.setState({playerPos:dir.nextPos})
      }
    }
    return newGrid
  }

  //does this cell have floor cells around it? can the player go around the object
  hasFloorAround = pos => {
    // return true for now
    return true;
  }

  //unhide all cells on this floor
  unHideAll(grid){
    this.eachCell(grid, (cell) => cell.hidden = false);
    this.hasDungeonMap = true;
    console.log('dungeonMap')
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
      if(this.isNear({x:cell.pos.x,y:cell.pos.y})){
        cell.hidden = false;
      }
      else{
        if(this.hasDungeonMap === false){
          cell.hidden = true;
        }
      }
    })
  }


  isNear = pos => {
    let num = 5;
    return pos.x - this.state.playerPos.x < num &&
           pos.y - this.state.playerPos.y < num &&
           this.state.playerPos.x - pos.x < num &&
           this.state.playerPos.y - pos.y < num ;
  }

  getType = (pos, grid) => grid[pos.y][pos.x].type;

  combatLog = message => this.setState({curMessage: message});

  updateGrid = grid => this.curGrid = grid;

  replaceObj = (obj, pos, grid) => Object.assign(grid[pos.y][pos.x],obj);

  isBlocking = (pos, grid, size) => {
    let possible  = [-1, 0, 1];
    let blockFlag = 0;

    possible.forEach(x => {
      if(this.isWithinGrid({x:pos.x+x, y:pos.y},size)){
        if(grid[pos.y][pos.x+x].type === 'wall'){
          blockFlag = 1;
        }
      }
    })

    possible.forEach(y => {
      if(this.isWithinGrid({x:pos.x, y:pos.y+y},size)){
        if(grid[pos.y+y][pos.x].type === 'wall'){
          blockFlag = 1;
        }
      }
    })

    return blockFlag === 1;
  }

  //get all floor cells from the grid and flatten to a 1 dimensional array
  getAllFloors = (grid) => {
    let floors = []
    let floorFilter = (cell) => {
      return cell.type === 'floor';
    }
    let newGrid = grid.map(row => {
      return row.filter(floorFilter)
    })

    return floors.concat.apply([], newGrid)
  }

  countItem = (type, grid) => {
    let items = []
    let itemFilter = (cell) => {
      return cell.type === type;
    }
    let newGrid = grid.map(row => {
      return row.filter(itemFilter)
    })

    return items.concat.apply([], newGrid).length
  }
  // is the next position within the GRID?
  isWithinGrid = (pos, size) => {
    return pos.y >= 0 &&
           pos.y < size.GRID_HEIGHT &&
           pos.x >= 0 &&
           pos.x < size.GRID_WIDTH;
  }

  //populates grid with specified objects
  populateGrid = (size, obj) => {
    let arr = Array.apply(null, Array(size.GRID_HEIGHT)).map((currY, y) =>
    Array.apply(null, Array(size.GRID_WIDTH)).map((currX, x) =>
    obj.init({ x, y })
      )
    );
    return arr;
  };

  //some tests that run
  tests = () => {
    const testSize = {
      GRID_HEIGHT: 3,
      GRID_WIDTH: 3
    }
    const testObj = {
      init(pos) {
        const newCell = Object.create(this);
        newCell.type = "floor";
        newCell.hidden = true;
        newCell.pos = {
          x: pos.x,
          y: pos.y
        };

        return newCell;
      }
    };
    let tinyArr = this.populateGrid(testSize, testObj )

    //check for populateGrid
    if(tinyArr[0][0].type !== 'floor'){
      throw Error('Check Error: populateGrid not working correctly')
    }

    //check for getAllFloors
    let floors = this.getAllFloors(tinyArr);
    if(floors[0].type !== 'floor' ||
    floors[floors.length - 1].type !== 'floor'){
      throw Error('Check Error: getAllFloors not working correctly');
    }

    //check for replaceObj
    this.replaceObj({type:'wall'}, {x:0,y:1}, tinyArr)
    if(tinyArr[1][0].type !== 'wall'){
      throw Error('Check Error: replaceObj not working correctly')
    }

    //checking placer
    this.placer(this.toBePlaced.enemies, tinyArr, testSize);
    this.placer(this.toBePlaced.boss, tinyArr, testSize);
    this.placer(this.toBePlaced.portal, tinyArr, testSize);
    this.placer(this.toBePlaced.healthPack, tinyArr, testSize);
    if(this.countItem(this.toBePlaced.enemies.props.type, tinyArr) < this.toBePlaced.enemies.freq){
      throw Error('Check Error: should be placing more enemies')
    }

    //checking newMove
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
    }, tinyArr) !== 'player' ){
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

  //toggle between rendering with the dom and rendering with Canvas
  handleRenderToggle(e){
    this.setState({useCanvas:!this.state.useCanvas})
  }
  render() {
    let useCanvas = (this.state.useCanvas ? <CanvasGrid size={SIZE} level={this.curGrid} />  : <Grid height={SIZE.GRID_HEIGHT} width={SIZE.GRID_WIDTH} level={this.curGrid}/> )
    let dungeon =
    <div>
      <div id="game">
        <CombatLog  message={this.state.curMessage}/>
        {useCanvas}
        <div className='combatLog dungeonKey'>
          <ul>
            <li>
              <Cell row='key' col='key' type='player'></Cell>
              player
            </li>
            <li>
              <Cell row='key' col='key' type='health'></Cell>
              health
            </li>
            <li>
              <Cell row='key' col='key' type='enemy'></Cell>
              enemy
            </li>
            <li>
              <Cell row='key' col='key' type='weapon'></Cell>
              weapon
            </li>
            <li>
              <Cell row='key' col='key' type='boss'></Cell>
              boss
            </li>
            <li>
              <Cell row='key' col='key'  type='portal'></Cell>
              portal
            </li>
            <li>
              <Cell row='key' col='key' type='floor'></Cell>
              floor
            </li>
            <li>
              <Cell row='key' col='key' type='wall'></Cell>
              wall
            </li>
            <li>
              <Cell  row='key' col='key' type='dungeonMap'></Cell>
              dungeon map
            </li>
          </ul>
        </div>
      </div>
      <p>{this.state.useCanvas ? 'Currently rendering with Canvas' : 'Currently rendering with DOM' }</p>
      <button onClick={this.handleRenderToggle}>
        {this.state.useCanvas ? 'Switch DOM Rendering' : 'Switch to Canvas' }
      </button>
    </div>

    let gameOver = <h1> YOU DIED <p>GAMEOVER</p>  </h1>
    let board = (this.state.playerHealth > 0 ? dungeon : gameOver)

    let isWin = (this.playerXp > 3000 ? console.log('You Win') : board)
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
            attackPower = {this.weapon.attackPower + parseFloat((this.playerLevel * 5).toFixed(2))}
            dungeonLevel = {this.curFloor}
            weapon = {this.weapon}
            />
        </div>
        {(this.playerXp > 3000 ? win : "")}
        {(this.moveCount === 0 ? tip : isWin)}

      </div>
    );
  }
}


export default Controller;
