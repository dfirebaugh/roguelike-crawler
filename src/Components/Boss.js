function Boss(arr){
  let addBoss = function(){
  let obj = {show:'B',name:'Boss',attack:50, health:200,xp:999};

  let count = 0;
  arr.map(function(row, y){
    return row.map(function(cell,x){
      let randEn = Math.floor(Math.random()*100);
      if(isBlank([y,x]) && count === 0 && randEn>95 && x < 35 && x !== 16){
        count++
        Object.assign(cell,obj)
        console.log('Boss placed', y,x, obj)
      }
    })
  })
  if(count === 0){
    addBoss();
  }
  else{
    return
  }

}
addBoss()

function isBlank(pos){
  return arr[pos[0]][pos[1]].show === '';
}
}

export default Boss;
