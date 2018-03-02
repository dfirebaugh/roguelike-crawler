import React, { Component } from 'react';


class CanvasGrid extends Component{
  constructor(){
    super();
    this.w = 560;
    this.h = 397;
    this.tileSize = 16;
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({level:this.props.level})
    this.updateCanvas();
  }
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.updateCanvas();
  }
    updateCanvas = () => {
      this.ctx.clearRect(0,0,this.w,this.h);
      // this.ctx.fillStyle="#333";
      this.props.level.forEach((row,i)=> {
        row.forEach((tile,j) => {
          if(tile.hidden){
            this.ctx.fillStyle = "rgba(0,0,0,0.6)";
          }
          else{
            if(tile.type === 'wall'){
              this.ctx.fillStyle = "#803615";
              // this.ctx.save;
              // this.ctx.fillStyle = 'black';
              // this.ctx.font = '2px'
              // this.ctx.fillText("▒▒",
              //                   tile.pos.x * this.tileSize,
              //                   tile.pos.y * this.tileSize);

            }

            if(tile.type === 'floor'){
              this.ctx.fillStyle = "#515644";
              this.ctx.strokeRect(tile.pos.x * this.tileSize,
                                  tile.pos.y * this.tileSize,
                                  this.tileSize,this.tileSize);
            }

            if(tile.type === 'enemy'){
              this.ctx.fillStyle = "darkred";

            }
            if(tile.type === 'player'){
              this.ctx.fillStyle = "#6F4D8F";
              this.ctx.strokeRect(tile.pos.x * this.tileSize,
                                  tile.pos.y * this.tileSize,
                                  this.tileSize,this.tileSize);
            }
            if(tile.type === 'weapon'){
              this.ctx.fillStyle = "#9476AB";
            }
            if(tile.type === 'health'){
              this.ctx.fillStyle = "#5E7914";
            }
            if(tile.type === 'portal'){
              this.ctx.fillStyle = "#A15089";
            }
            if(tile.type === 'boss'){
              this.ctx.fillStyle = "black";
            }
          }

          this.drawTile(j,i);

        })
      })
    }

    drawTile = (x,y) => {
      this.ctx.fillRect(
        x * this.tileSize, y * this.tileSize,
        this.tileSize, this.tileSize
      )
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
