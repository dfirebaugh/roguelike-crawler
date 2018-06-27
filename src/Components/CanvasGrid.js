import React, { Component } from 'react';

class CanvasGrid extends Component{
  loadImgs = () => {
    let playerImg = document.getElementById('key:key:player');
    let enemyImg = document.getElementById('key:key:enemy');
    let wallImg = document.getElementById('key:key:wall');
    let floorImg = document.getElementById('key:key:floor');
    let weaponImg = document.getElementById('key:key:weapon');
    let portalImg = document.getElementById('key:key:portal');
    let healthImg = document.getElementById('key:key:health');
    let dungeonMapImg = document.getElementById('key:key:dungeonMap');
    let bossImg = document.getElementById('key:key:boss');
    let hiddenImg = document.getElementById('key:key:hidden');


    this.hiddenImg = hiddenImg;
    this.enemyImg = enemyImg;
    this.wallImg = wallImg;
    this.floorImg = floorImg;
    this.weaponImg = weaponImg;
    this.portalImg = portalImg;
    this.healthImg = healthImg;
    this.playerImg = playerImg;
    this.bossImg = bossImg;
    this.dungeonMapImg = dungeonMapImg;
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({level:this.props.level})
    this.updateCanvas();
  }
  componentWillMount(){
    this.tileSize = 11;
    this.w = this.props.size.GRID_WIDTH * this.tileSize;
    this.h = this.props.size.GRID_HEIGHT * this.tileSize;
  }

  componentDidMount() {
    this.loadImgs();
    this.ctx = this.refs.canvas.getContext('2d');
    this.updateCanvas();
  }

  updateCanvas = () => {
    this.ctx.clearRect(0,0,this.w,this.h);
    this.ctx.fillStyle="#333";
    this.props.level.forEach((row,i)=> {
      row.forEach((tile,j) => {
        if(!tile.hidden){
          this.drawImg(this.getGraphic(tile.type),{x:j,y:i})
        }
      })
    })
  }

  drawImg = (img, pos) => {
    this.ctx.drawImage(
      img,
      pos.x * this.tileSize, pos.y * this.tileSize,
      this.tileSize, this.tileSize
    )
  }

  getGraphic = (type) => {
    let graphics = [
      {
        type:'wall',
        img:this.wallImg
      },
      {
        type:'player',
        img:this.playerImg
      },
      {
        type:'enemy',
        img:this.enemyImg
      },

      {
        type:'boss',
        img:this.bossImg
      },
      {
        type:'weapon',
        img:this.weaponImg
      },
      {
        type:'floor',
        img:this.floorImg
      },
      {
        type:'portal',
        img:this.portalImg
      },
      {
        type:'health',
        img:this.healthImg
      },
      {
        type:'dungeonMap',
        img:this.dungeonMapImg
      }
    ];

    let newGraphic = graphics.find(el => {
      return el.type === type;
    })

    return newGraphic.img
  }
  render(){
    return (
      <div className="container gameBox">
        <canvas ref="canvas" width={this.w} height={this.h}/>
      </div>
		);
	}
}

export default CanvasGrid;
