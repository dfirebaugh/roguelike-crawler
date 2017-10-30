/*
*    Generates a random Dungeon map -- returns it as an array
*/


function generate(gh,gw,maxR,rSize){
  var arr = []
  //blank out array
  for(var x = 0; x<gh;x++){
    var row = [];
    for(var y = 0; y<gw;y++){
      row.push('▒');
    }
    arr.push(row);
  }
  // the size of the grid gets passed in
  // we want to generate some random rooms that fit in the map
  // for(var i = 0; i<=maxR;i++){
  //   var room = randRoom(gh,gw,rSize,arr);
  //   populate(arr,room,gh,gw)
  // }
  agent(arr,gw,gh);

  // start a new agent based approach

  return arr;
}

function agent(arr,gw,gh){
  //loop through the array and analyze the cell
  // left to right -- top to bottom


  //rather than looping -- i want to do a random move and place
  // for(var x = 0;x<gh;x++){
  //   var count = 0;
  //   for(var y = 0;y<gw;y++){
  //     var neighbors = getNeighbors(arr,x,y);
  //     count++;
  //     if(neighbors <= 1){
  //       arr[x][y] = '▒'
  //     }
  //   }
  // }

  // var outOfBounds = true;
  var count = 0;
  var col = 16;
  var row = 0;
  var curPos = [0,16];
  var goodDir = false;
  dig(row,col)
  // arr[0][0] = '';

  for(var i = 0;i<1024;i++){
    newDirection()
  }

  //Avoid the walls -- if the direction is still on the grid -- aka >= 0 on x and y
  // no longer need the outOfBounds check -- that's being handled in the newDirection function.
  // while(outOfBounds){
  //   newDirection();
  //
  // }
  // while(count<10){
  //   newDirection();
  // }

  function newDirection(){
    count = 0;
    //provides a random direction
    // old directions -- I'm removing the diagnol directiosn --  [[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]]
    // return curPos;
    var possible = [[-1,0],[0,-1],[1,0],[0,1]]
    var direction = possible[Math.floor(Math.random()*possible.length)];
    var nextPos = [curPos[0]+direction[0],curPos[1]+direction[1]]
    goodDir = false;

    while(!goodDir){
      getDirection();

    }
    if(goodDir){
      // console.log('curPos' + curPos)
    }
    function getDirection(){
      count++;

      if(curPos[0] < 24){

        if(count > 20){ //if this keeps looping and can't find a goodDir
        //move to bottom right and loop again
        var largest = largestCell();
        // largest = largestCell();
        goodDir= true;// TODO -- add lowest,furthest right cell function
        // console.log('largestCell ' + largest)
        curPos[0] = largest[0];
        curPos[1] = largest[1];
        // nextPos = [curPos[0]+direction[0],curPos[1]+direction[1]]

      }else{
        if(nextPos[0] >= 0 && nextPos[1] >= 0){ // if the direction results in something that is not on the map, it is a bad direction

          // if the next position results in a empty cell (i.e. not a wall) it is a bad direction
          // if(arr[nextPos[0]][nextPos[1]] == ''){
          //   goodDir = false;
          // }else{
          curPos[0] += direction[0];
          curPos[1] += direction[1];
          dig(curPos[0],curPos[1])
          goodDir = true;
          // }
        }else{
          goodDir = false;
        }
      }
    }else{
      goodDir = true;
    }

  }
}

  function largestCell(){
    var largest;
    for(var x = 0;x < gh;x++){
      for(var y = 0; y < gw;y++){
        if(arr[x][y] === ''){
          largest = [x,y]
        }
      }
    }
    return largest;
  }

  function dig(r,c){
    // console.log(r + " " + c)
    // console.log(arr);
    arr[r][c] = '';
  }

}



export default generate;
