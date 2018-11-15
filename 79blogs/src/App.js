import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';

class App extends Component {

  state = {
    showing: { home: true },
    isNextBlogs:false,
    isPreviousBlogs:false,
  };

  sideBarOnclick = {
    showNextBlogs: undefined,
    showPreviousBlogs: undefined,
  };

  setAppState = (key,value) => {
    this.setState({
      [key]:value
    });
  };

  render() {
    
    return (
      <div className="App" id="grid">
        <Header />
        <Main setAppState={this.setAppState} sideBarOnclick={this.sideBarOnclick} />
        <SideBar showing={this.state.showing} sideBarOnclick={this.sideBarOnclick}
        isBlogs={{isNextBlogs:this.state.isNextBlogs,isPreviousBlogs:this.state.isPreviousBlogs}}/>
      </div>
    );
  }
}

export default App;
