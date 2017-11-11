/*
*
* Places the gateway between dungeon levels on the map
*
*
*/

function Portal(arr){
  let addPortal = function(){
    var count = 0;
    arr.map(function(row, y){
      return row.map(function(cell,x){
        var randEn = Math.floor(Math.random()*100);
        if(isBlank([y,x]) && count === 0 && randEn>95){
          count++
          Object.assign(cell,{show:'[]',name:'portal'})
          console.log('placed portal', y,x)
        }
      })
    })
    if(count === 0){
      addPortal();
    }
    else{
      return
    }

  }
  addPortal()


  function isBlank(pos){
    return arr[pos[0]][pos[1]].show === '';
  }
}

export default Portal;
