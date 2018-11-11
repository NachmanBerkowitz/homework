import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';

class App extends Component {

  state = {
    showing: { home: true },
  };

  actions = {
    nextBlogs: undefined,
    previousBlogs: undefined,
    previousButton: undefined,
    nextButton: undefined,
    sideInfoLoaded:undefined
  };

  setStateAppShowing = page => {
    this.setState({
      showing: {
        [`${page}`]: true,
      },
    });
  };

  render() {
    
    return (
      <div className="App" id="grid">
        <Header />
        <Main setStateAppShowing={this.setStateAppShowing} actions={this.actions} />
        <SideBar showing={this.state.showing} actions={this.actions} />
      </div>
    );
  }
}

export default App;
