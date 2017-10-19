/*
* items -- health boost -- attack boost
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*/

function Items(arr,GRID_WIDTH,GRID_HEIGHT){
  var gw = GRID_WIDTH;
  var gh = GRID_HEIGHT;
  placeItems(arr,gw,gh)
  // console.log(arr)
  // console.log(arr.length)
}


function placeItems(arr,gw,gh){
  // console.log(arr);
  var items = [];

  for(var x = 0; x < gh;x++){
    for(var y = 0;y< gw;y++){
      var randEn = Math.floor(Math.random()*100);
      if(arr[x][y] === ''){
        if(randEn>95){
          // console.log(randEn + " " + x + "," + y)
          items.push(x+","+y)
        }
      }
    }
  }
  // console.log(enemies)
  renderItems(items,arr,gw,gh);
}

function renderItems(items,arr,gw,gh){
  // console.log(enemies)

  for(var e = 0; e<items.length;e++){
    // enemies[e] = 'E'
    var item = items[e].split(',')
    arr[item[0]][item[1]] = '^'
    // console.log(enemy[0] + ' ' + enemy[1])
  }


}

export default Items;
