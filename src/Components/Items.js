/*
* items -- health boost -- attack boost
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*/

import place from './place.js';

function Items(arr,gw,gh){
  var items = [];

  for(var x = 0; x < gh;x++){
    for(var y = 0;y< gw;y++){
      var randEn = Math.floor(Math.random()*100);
      if(arr[x][y].show === ''){
        if(randEn>95){
          items.push(x+","+y)
        }
      }
    }
  }
  // console.log(enemies)
  place(items,arr,gw,gh,'items');
}

export default Items;
