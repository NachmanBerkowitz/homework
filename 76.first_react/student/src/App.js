import React, { Component } from 'react';
import './App.css';
import Student from './student';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Student name="Donald" address="The White House"/>
        <Student name="Bin Ladin" address="Six feet under"/>
      </div>
    );
  }
}

export default App;
