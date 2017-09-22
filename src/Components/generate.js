
function generate(gh,gw,maxR,rSize){
  var arr = []
  //blank out array
  for(var x = 0; x<gw;x++){
    var row = [];
    for(var y = 0; y<gh;y++){
      row.push('');
    }
    arr.push(row);
  }
  // the size of the grid gets passed in
  // we want to generate some random rooms that fit in the map
  for(var i = 0; i<=maxR;i++){
    var room = randRoom(gh,gw,rSize,arr);
    populate(arr,room,gh,gw)
  }

  return arr;
}

function populate(arr,room,gh,gw){

  for(var x = 0;x< gh;x++){
    for(var y = 0; y<gw; y++){
      if(room[x][y] === '▒'){
        arr[x][y] = room[x][y];
      }
    }
  }

  return arr;
}

function randRoom(gh,gw,rSize,arr){
  var collisionBool = false;
  // var coords = genRoom(arr);
  var newRoom = new Room();
  var coords = newRoom.coordinates()

  //loop trough to see if something is alread in the cell
    for(var p = 0;p<coords.length;p++){
      var X1 = coords[p].x;
      var Y1 = coords[p].y;
      if(arr[Y1][X1]){
        collisionBool = true;
        console.log('cell already populated');
      }
      if(X1>= 0 && X1 < gw && Y1 >= 0 && Y1 < gh){
      }else{
        console.log('out of bounds')
        collisionBool = true;
      }
    }

    console.log('startX: ' + coords[0].x + "startY: " + coords[0].y)

    // read room object and populate the array with the walls
    // if rooms collides, i want a new room
    // if room is outside of bounds, I want a new room
    if(collisionBool){
      //currently it's just not writing room to arr
      return arr;
    }else{
      for(var i = 0;i<coords.length;i++){
        var X = coords[i].x;
        var Y = coords[i].y;
        //somehow the coordinates reversed
        arr[Y][X] = '▒';
      }
      return arr;
    }
  }

  function Room(){
    this.iAm = 'a room';
  }
  Room.prototype.coordinates = function(){
    var startX = Math.floor(Math.random()*25);
    var startY = Math.floor(Math.random()*25);
    var roomWidth = Math.floor(Math.random()*4)+3;
    var roomHeight = Math.floor(Math.random()*5 + 3);

    var coords = []

    //top left corner of room
    for(var w = 0;w<roomWidth;w++){
      coords.push({x:startX+w,y:startY});
    }
    //bottom of room
    for(var z = 0;z<=roomWidth;z++){
      coords.push({x:startX+z,y:startY+roomHeight});
    }
    // left wall of room
    for(var v = 0;v<roomHeight;v++){
      coords.push({x:startX,y:startY+v});
    }
    // right side of room
    for(var u = 0;u<roomHeight;u++){
      coords.push({x:startX+roomWidth,y:startY+u});
    }
    return coords;
  }

export default generate;
