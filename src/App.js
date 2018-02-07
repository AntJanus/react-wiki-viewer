import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onSearchUpdate() {

  }

  render() {
    return (
      <div className="App">
        <h1>Wikipedia Viewer</h1>
        <p>
          <input type="text" placeholder="Search wikipedia" />
        </p>
      </div>
    );
  }
}

export default App;
