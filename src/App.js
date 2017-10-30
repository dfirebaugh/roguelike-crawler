import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map.js';

class App extends Component {
  constructor(props){
		super(props)
		this.state = {playerDirection:"!", pX:16,pY:0}
  }
  componentDidMount(){
    document.body.addEventListener('keydown', (e) => {

      if(e.key === "ArrowDown"||e.key === "ArrowUp"||e.key === "ArrowLeft"||e.key === "ArrowRight"){
        this.setState({playerDirection:e.key});
        // this.forceUpdate();
      }

      if(e.key === "ArrowDown"){
        this.setState({pY:this.state.pY+1});
        // this.setState({pX:this.state.pX});
      }
      if(e.key === "ArrowUp"){
        this.setState({pY:this.state.pY-1});
        // this.setState({pX:this.state.pX});
  		}
  		if(e.key === "ArrowLeft"){
        // this.setState({pX:this.state.pY});
        this.setState({pX:this.state.pX-1})
        }
  		if(e.key === "ArrowRight"){
        this.setState({pX:this.state.pX+1});
        // this.setState({pX:this.state.pY});
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
        <Map playerDirection={this.state.playerDirection} pX={this.state.pX} pY={this.state.pY} />
      </div>
    );
  }
}

export default App;
