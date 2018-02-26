function weapons(arr,dungeonLevel){
  let addWeapon = function(){
  let obj = [
    {type:'weapon',show:'W',name:'Fists',attackPower:30},
    {type:'weapon',show:'s',name:'sword',level:1,attackPower:60},
    {type:'weapon',show:'+',name:'sword+1',level:2,attackPower:70},
    {type:'weapon',show:'++',name:'magic sword',level:3,attackPower:100}
  ];

  let count = 0;
  arr.map(function(row, y){
    return row.forEach(function(cell,x){
      let randEn = Math.floor(Math.random()*100);
      if(isBlank([y,x]) && count === 0 && randEn>95 && x < 35 && x !== 16){
        count++
        Object.assign(cell,obj[dungeonLevel])
        cell.pos.x = x;
        cell.pos.y = y;
        console.log('placed weapon', y,x, obj[dungeonLevel])
      }
    })
  })
  if(count === 0){
    addWeapon();
  }
  else{
    return
  }

}
addWeapon()

function isBlank(pos){
  return arr[pos[0]][pos[1]].type === 'floor';
}
}

export default weapons;
