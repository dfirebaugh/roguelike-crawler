/*
*    Generates a random Dungeon map -- returns it as an array
*    Basically, this generates a new 2D array of walls and floors
*    Player Position gets passed in so that the player should be able to navigate through the array
*/
// take in height and width and generate a new level
let generate = (size, level, playerPos) => {
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

  let Grid = populateGrid(size, Cell);
  return agent(Grid, size, playerPos);
};

//agent will move around the grid one cell at a time to dig out a path/cavern
let agent = (grid,size, playerPos) => {
  let curPos = playerPos;

  let dig = (pos, grid) => {
    grid[pos.y][pos.x].type = 'floor';
  };
  let placePlayer = (playerPos) => {
    grid[playerPos.y][playerPos.x].type = 'player';
  }


  dig(curPos, grid);

  // recursion to loop through grid
  let digLoop = (pos) => {
    let nextPos = newDirection(pos);



    if(countFloor(grid) > Math.round(size.GRID_WIDTH * size.GRID_HEIGHT / 3)){
      return;
    }
    else{
      if(!isWithinGrid(nextPos, size)){
        //TODO: get smarter about changing direction so there's less recursion
        // currently, if nextPos is out of bounds, we just back up and to the left.
        // This has a potential to fail.
        // we need a find nearest wall function
        nextPos = {x:curPos.x - 1 , y:curPos.y - 1}
      }
      else{
        dig(nextPos, grid)
      }
      digLoop(nextPos)
    }
  };

  digLoop(curPos);
  placePlayer(playerPos);

  return grid
}

let newDirection = (curPos, size) => {
  //possible directions
  let possible = [-1, 0, 1];
  //possible axis x or y
  let axis = [0, 1];
  //roll a d2
  let randAxis = axis[Math.floor(Math.random() * axis.length)];

  // roll a d3
  let randDir = possible[Math.floor(Math.random() * possible.length)];

  // add or subtract from one direction or another direction
  let newDir = [
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




let isWithinGrid = (pos, size) => {
  return (
    pos.y < size.GRID_HEIGHT &&
    pos.x < size.GRID_WIDTH &&
    pos.y >= 0 &&
    pos.x >= 0
  );
};

let populateGrid = (size, obj) => {
  let arr = Array.apply(null, Array(size.GRID_HEIGHT)).map((currY, y) =>
  Array.apply(null, Array(size.GRID_WIDTH)).map((currX, x) =>
  obj.init({ x, y })
)
);
return arr;
};

let countFloor = grid => {
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
