import React, { Component } from 'react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <div className="drum-container">
            <div className="drum-pad">pad 1</div>
            <div className="drum-pad">pad 2</div>
            <div className="drum-pad">pad 3</div>
            <div className="drum-pad">pad 4</div>
            <div className="drum-pad">pad 5</div>
            <div className="drum-pad">pad 6</div>
            <div className="drum-pad">pad 7</div>
            <div className="drum-pad">pad 8</div>
            <div className="drum-pad">pad 9</div>
          </div>
          <div className="controllers">
            <div>Power</div>
            <div id="display">display</div>
            <div>Volume</div>
            <div>Bank</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
