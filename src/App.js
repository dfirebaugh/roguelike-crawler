import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map.js';

class App extends Component {
  constructor(props){
		super(props)
		this.state = {playerDirection:"!", nX:16,nY:0, playerPos:[16,0]}
  }
  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {

      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"){
        this.setState({playerDirection:e.key});
      }

      if(e.key === "ArrowDown"){
        this.setState({nY:this.state.nY+1});
      }
      if(e.key === "ArrowUp"){
        this.setState({nY:this.state.nY-1});
  		}
  		if(e.key === "ArrowLeft"){
        this.setState({nX:this.state.nX-1})
        }
  		if(e.key === "ArrowRight"){
        this.setState({nX:this.state.nX+1});
      }

		})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p className="App-intro">

        </p>
        <Map playerDirection={this.state.playerDirection} nX={this.state.nX} nY={this.state.nY} playerPos = {this.state.playerPos}/>
      </div>
    );
  }
}

export default App;
