import generate from './generate.js';


it('generates a dungeon level without crashing', () => {
    const SIZE = {
        GRID_HEIGHT: 35,
        GRID_WIDTH: 45
    }

    const getAllFloors = (grid) => {
        let floors = []
        let floorFilter = (cell) => {
          return cell.type === 'floor';
        }
        let newGrid = grid.map(row => {
          return row.filter(floorFilter)
        })
    
        return floors.concat.apply([], newGrid);
    }

    const grid = generate(SIZE, 1, {x:16,y:0})

    const floors = getAllFloors(grid);

    // This will test that we have enough floors form the recursion
    expect(floors.length).toBeGreaterThanOrEqual(Math.round(SIZE.GRID_WIDTH * SIZE.GRID_HEIGHT / 3))
    
    // grid is a reasonable size 
    expect(grid).toHaveLength(SIZE.GRID_HEIGHT)

  });
