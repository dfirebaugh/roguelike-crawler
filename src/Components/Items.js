/*
* items -- health boost -- attack boost
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*/

function Items(arr){
  var obj = {show:'^',addHealth:10,hidden:false}

  arr.map(function(row, y){
      return row.map(function(cell,x){
        var randEn = Math.floor(Math.random()*100);
        if(isBlank([y,x]) && randEn>95){
          Object.assign(cell,obj)
        }
      })
    })

  function isBlank(pos){
    return arr[pos[0]][pos[1]].show === '';
  }
}

export default Items;
