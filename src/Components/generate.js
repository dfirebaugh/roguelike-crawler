/*
*    Generates a random Dungeon map -- returns it as an array
*/
let populateGrid = (size, obj) => {
  let arr = Array.apply(null, Array(size.GRID_HEIGHT)).map((currY, y) =>
  Array.apply(null, Array(size.GRID_WIDTH)).map((currX, x) => obj.init({x,y})
  ));
  return arr;
}

// let placePlayer = (pos, grid) => {
//   console.log(pos)
//   console.log('is this running?')
//   console.log('should be player: ', grid[pos.y][pos.x])
//   return grid[pos.x][pos.y].type = 'player'
// };

let newDirection = (curPos) => {
  //possible directions
  let possible = [
    [-1,0],[0,-1],
    [1,0],[0,1]
  ];
  // roll a d4
  let direction = possible[Math.floor(Math.random()*possible.length)];
  // console.log(direction+curPos)
  let newDir = curPos.map((n,i)=>n+direction[i])
  return newDir;
}

// increment in every direction and determine which direction has the closest wall
// let findNearestWall = (curPos, grid) => {
//   let nextPos = curPos;
//   let count = 1;
//   let increment =+ curPos[0]+count;
//
//   // console.log('inc: ', nextPos[0] + increment)
//   console.log('grid: ' , grid[curPos[0]][curPos[1]])
//
//   // while (isWithinGrid(nextPos) || isWall(nexPos)){
//   //
//   // }
//   return nextPos
// }
//

let isWithinGrid = (pos, size) => {
  return pos[0] < size.GRID_HEIGHT &&
         pos[1] < size.GRID_WIDTH &&
        pos[0] >= 0 &&
        pos[1] >= 0;
}

// //iterates through the 2d array and runs a function on each cell
// let eachCell = (grid, fn) => grid.forEach(row=>row.forEach(cell=>fn(cell, grid)));
// let isPlayer = cell => cell.show == "@";
// let isWall = (pos, grid) => {
//   return grid[pos[0]][pos[1]].type === 'wall';
// }

let countFloor = (grid) => {
  let count = 0;
  grid.forEach((row) => {
    row.forEach((cell) => {
      if (cell.show === ''){
        count++;
      }
    })
  })

  return count;
}

// take in height and width and generate a new level
let generate = (size, level, playerPos) => {
  const Cell = {
    init(pos) {
      const newCell = Object.create(this);
      newCell.type = 'wall';
      newCell.hidden = true;
      newCell.pos = {
        x: pos.x,
        y: pos.y
      };

      return newCell;
    }
  }

  let Grid = populateGrid(size, Cell);
  // (!playerPos ? '' : playerPos = {x:0,y:16})
  console.log("playerPos: ", playerPos);
  // console.log('level: ', level);


  return agent(Grid,size, playerPos);
}


//agent will move around the grid one cell at a time to dig out a path/cavern
let agent = (grid,size, playerPos) => {
  let count = 0;
  let curPos = playerPos
  let nextPos;
  if(count === 0){
    curPos = [playerPos.x, playerPos.y];
  }
  // placePlayer(playerPos, grid);
  // console.log('wall: ', findNearestWall(curPos, grid))

  let dig = (pos, grid) => {
    grid[pos[0]][pos[1]].show = '';
    grid[pos[0]][pos[1]].type = 'floor';
  }

  console.log('curPos',curPos)

  // recursion to loop through grid
  let digLoop = () => {
    nextPos = newDirection(curPos)
    let goodDir = isWithinGrid(nextPos, size)

    if(!goodDir){
      //TODO: get smarter about changing direction so there's less recursion
      nextPos = [curPos[0]-1][curPos[1]-1];
      digLoop()
    }
    dig(nextPos, grid)
    curPos = nextPos
    if(countFloor(grid) < Math.round(size.GRID_WIDTH * size.GRID_HEIGHT / 3)/1){
      // if(count < 50){
      return digLoop();
    }
    return;
  }

  digLoop()

  console.log('Floor count: ', countFloor(grid))

  return grid
}



export default generate;
