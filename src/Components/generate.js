

function generate(gh,gw,maxR,minR,rSize){
  var arr =[];
  // var neighbors;
  //randRoom
  // var randRoom = Math.floor(Math.random()*4)+1;
  // console.log(randRoom)

//loop through the array
  for(var x = 0;x< gh;x++){
    var row = []
    for(var y = 0; y<gw; y++){
      row.push("▒");
    }
    arr.push(row);
  }

  return arr;
}


export default generate;
