/*
* enemies
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*
*/
import place from './place.js';


function Enemies(arr,gw,gh){
  var enemies = [];

  for(var x = 0; x < gh;x++){
    for(var y = 0;y< gw;y++){
      var randEn = Math.floor(Math.random()*100);
      if(arr[x][y].show === ''){
        if(randEn>95){
          enemies.push(x+","+y)
        }
      }
    }
  }
  place(enemies,arr,gw,gh,'enemies');
}


export default Enemies;
