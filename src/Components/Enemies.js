/*
* enemies
*   loop through the array to see how many available cells there are -- drop items on a small percentage of those cells at random
*
*/

function Enemies(arr){
  let obj = {
    type:'enemy',
    // show:'#',
    health:'150',
    attack:'10',
    defeated:false,
    hidden:true,
    xp:10
  }

  arr.map(function(row, y){
      return row.forEach(function(cell,x){
        let randEn = Math.floor(Math.random()*100);
        if(isBlank([y,x]) && randEn>95){
          Object.assign(cell,obj)
        }
      })
    })

  function isBlank(pos){
    return arr[pos[0]][pos[1]].show === '';
  }
}


export default Enemies;
