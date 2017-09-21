

function generate(gh,gw,maxR,rSize){
  var arr = []

  // the size of the grid gets passed in
  // we want to generate some random rooms that fit in the map
  var room = randRoom(gh,gw,rSize);
  var room1 = randRoom(gh,gw,rSize);

  populate(arr,room,gh,gw)
  populate(arr,room1,gh,gw)

  return arr;
}

function populate(arr,room,gh,gw){
  if(arr.length<1){
    for(var w = 0;w< gh;w++){
      var row = []
      for(var v = 0; v<gw; v++){
        row.push('');
      }
      arr.push(row);
    }
  }else{
  }
  for(var x = 0;x< gh;x++){
    for(var y = 0; y<gw; y++){
      if(room[x][y] === '▒'){
        arr[x][y] = room[x][y];
      }
    }
  }

  return arr;
}

function randRoom(gh,gw,rSize){
  var startX = Math.floor(Math.random()*25);
  var startY = Math.floor(Math.random()*25);
  var roomWidth = Math.floor(Math.random()*3)+3;
  var roomHeight = Math.floor(Math.random()*4 + 3);
  var arr = [];

  //blank out array
  for(var x = 0; x<gw;x++){
    var row = [];
    for(var y = 0; y<gh;y++){
      row.push('');
    }
    arr.push(row);
  }


  arr[0][0] = 'P';

  //need room to be an array of coordinates so we can check if the cells are empty
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

  // read room object and populate the array with the walls
  for(var i = 0;i<coords.length;i++){
    var X = coords[i].x;
    var Y = coords[i].y;

    //somehow the coordinates reversed
    arr[Y][X] = '▒'
  }
  // console.log(room)


  console.log("x:" + startX + "  y:" + startY + " width:" + roomWidth + " heigth:" + roomHeight);
  // console.log(arr)
  return arr;
}


export default generate;
