/*
*    Generates a random Dungeon map -- returns it as an array
*/


function generate(gh,gw, playerPos){
  let arr = []
  //blank out array
  for(let x = 0; x<gh;x++){
    let row = [];
    for(let y = 0; y<gw;y++){
      row.push({show:'▒',hidden:true,coords:[y,x]});
    }
    arr.push(row);
  }
  agent(arr,gw,gh,playerPos);

  return arr;
}

function agent(arr,gw,gh,playerPos){
  //loop through the array and analyze the cell
  // left to right -- top to bottom
  let count = 0;
  // let col = 16;
  // let row = 0;
  let curPos;
  (playerPos ? curPos = playerPos : curPos = [0,16])
  let goodDir = false;
  dig(curPos[0],curPos[1])
  // arr[0][0] = '';

  for(let i = 0;i<1024;i++){
    newDirection()
  }

  function newDirection(){
    count = 0;
    //provides a random direction
    // old directions -- I'm removing the diagnol directiosn --  [[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]]
    let possible = [[-1,0],[0,-1],[1,0],[0,1]]
    let direction = possible[Math.floor(Math.random()*possible.length)];
    let nextPos = [curPos[0]+direction[0],curPos[1]+direction[1]]
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
        let largest = largestCell();
        // largest = largestCell();
        goodDir= true;// TODO -- add lowest,furthest right cell function

        curPos[0] = largest[0];
        curPos[1] = largest[1];

      }else{
        if(nextPos[0] >= 0 && nextPos[1] >= 0){ // if the direction results in something that is not on the map, it is a bad direction
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
    let largest;
    for(let x = 0;x < gh;x++){
      for(let y = 0; y < gw;y++){
        if(arr[x][y].show === ''){
          largest = [x,y]
        }
      }
    }
    return largest;
  }

  function dig(r,c){
    // console.log(r + " " + c)
    // console.log(arr);
    arr[r][c] = {show:'', coords:[r,c]};
  }

}



export default generate;
