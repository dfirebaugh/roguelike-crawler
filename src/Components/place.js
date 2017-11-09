function place(items,arr,gw,gh,type){
    for(var e = 0; e<items.length;e++){
      var item = items[e].split(',')
      if(type === 'items'){
        arr[item[0]][item[1]] = {show:'^',addHealth:10,hidden:true}
      }
      if(type === 'enemies'){
        arr[item[0]][item[1]] = {show:'#',health:'100',attack:'10',defeated:false,hidden:true,xp:10}
      }
      if(type === 'weapon'){

      }
    }
}

export default place;
