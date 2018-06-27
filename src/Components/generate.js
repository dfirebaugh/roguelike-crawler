/*
*    Generates a random Dungeon map -- returns it as an array
*    Basically, this generates a new 2D array of walls and floors
*    Player Position gets passed in so that the player should be able to navigate through the array
*/
// take in height and width and generate a new level
const generate = (size, level, playerPos) => {
  const Cell = {
    init(pos) {
      const newCell = Object.create(this);
      newCell.type = "wall";
      newCell.hidden = true;
      newCell.pos = {
        x: pos.x,
        y: pos.y
      };

      return newCell;
    }
  };

  const Grid = populateGrid(size, Cell);
  return agent(Grid, size, playerPos);
};

//agent will move around the grid one cell at a time to dig out a path/cavern
const agent = (grid,size, playerPos) => {
  const curPos = playerPos;
  let digCount = 0;

  const dig = (pos, grid) => {
    digCount++;
    grid[pos.y][pos.x].type = 'floor';
  };
  const placePlayer = (playerPos) => {
    grid[playerPos.y][playerPos.x].type = 'player';
  }


  dig(curPos, grid);

  // recursion to loop through grid
  const digLoop = pos => {
    const nextPos = newDirection(pos);
    
    if(countFloor(grid) > Math.round(size.GRID_WIDTH * size.GRID_HEIGHT / 3)){
      return;
    }
    else{
      if(!isWithinGrid(nextPos, size)){
        //TODO: get smarter about changing direction so there's less recursion -- reduce the digCount

        //Do another dig with the next position toward the center of the grid
        digLoop(moveTowardCenter(pos));
      }
      else{
        dig(nextPos, grid);
        digLoop(nextPos);
      }

      if(Math.floor(Math.random() * 10 ) <= 1 ){
        digLoop(nextPos);
      }

    }
    
  };


  const moveTowardCenter = curPos => {
    const nextPos = {
      x: curPos.x < size.GRID_WIDTH / 2 ? curPos.x + 1 : curPos.x - 1, 
      y:  curPos.y < size.GRID_HEIGHT / 2 ? curPos.y + 1 : curPos.y - 1
    };

    return nextPos;
  }

  digLoop(curPos);
  placePlayer(playerPos);
  console.log('digCount: ', digCount)

  return grid
}

const newDirection = (curPos) => {
  //possible directions
  const possible = [-1, 0, 1];
  //possible axis x or y
  const axis = [0, 1];
  //roll a d2
  const randAxis = axis[Math.floor(Math.random() * axis.length)];

  // roll a d3
  const randDir = possible[Math.floor(Math.random() * possible.length)];

  // add or subtract from one direction or another direction
  const newDir = [
    {
      x: curPos.x,
      y: curPos.y + randDir
    },
    {
      x: curPos.x + randDir,
      y: curPos.y
    }
  ];

  return newDir[randAxis];
};




const isWithinGrid = (pos, size) => {
  return (
    pos.y < size.GRID_HEIGHT &&
    pos.x < size.GRID_WIDTH &&
    pos.y >= 0 &&
    pos.x >= 0
  );
};

const populateGrid = (size, obj) => {
  const arr = Array.apply(null, Array(size.GRID_HEIGHT)).map((currY, y) =>
  Array.apply(null, Array(size.GRID_WIDTH)).map((currX, x) =>
  obj.init({ x, y })
)
);
return arr;
};

const countFloor = grid => {
  let count = 0;
  grid.forEach(row => {
    row.forEach(cell => {
      if (cell.type === "floor") {
        count++;
      }
    });
  });

  return count;
};


export default generate;
