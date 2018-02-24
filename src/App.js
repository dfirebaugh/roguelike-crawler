import React, { Component } from 'react';
import './App.css';
import Controller from './Components/Controller.js';


class App extends Component {
  ComponentWillMount = () => {
    // document.body.style.background = "#333";
		// document.body.style.color = "#FAFAFA";
  }
  render() {
    return (
      <div className="App">
        <Controller />
      </div>
    );
  }
}

export default App;
