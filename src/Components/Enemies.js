/*
* enemies
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*   TODO -- add a seperate placeItem.js file that can be called by enemies or items -- at the moment enemies and items are very similar
*/

function Enemies(arr,GRID_WIDTH,GRID_HEIGHT){
  var gw = GRID_WIDTH;
  var gh = GRID_HEIGHT;
  placeEnemies(arr,gw,gh)
  // console.log(arr)
  // console.log(arr.length)
}


function placeEnemies(arr,gw,gh){
  // console.log(arr);
  var enemies = [];

  for(var x = 0; x < gh;x++){
    for(var y = 0;y< gw;y++){
      var randEn = Math.floor(Math.random()*100);
      if(arr[x][y] === ''){
        if(randEn>95){
          // console.log(randEn + " " + x + "," + y)
          enemies.push(x+","+y)
        }
      }
    }
  }
  // console.log(enemies)
  renderEnemies(enemies,arr,gw,gh);
}

function renderEnemies(enemies,arr,gw,gh){
  // console.log(enemies)

  for(var e = 0; e<enemies.length;e++){
    // enemies[e] = 'E'
    var enemy = enemies[e].split(',')
    arr[enemy[0]][enemy[1]] = '#'
    // console.log(enemy[0] + ' ' + enemy[1])
  }


}

export default Enemies;
