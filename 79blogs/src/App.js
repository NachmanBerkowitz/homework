import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import SideBar from './SideBar';
import Main from './Main';

class App extends Component {

  state={
    showing:{home:true}
  }
showBlogs=(blogerID)=>{
  this.setState({
    showing:{
      blogs:true,
    },
    blogerID
  })
}
setStateAppShowing = (page)=>{
  this.setState({showing:{
    [`${page}`]:true
  }})
}
  render() {
    return (
      <div className="App" id="grid">
        <Header/>
        <Main setStateAppShowing={this.setStateAppShowing}/>
        <SideBar showing={this.state.showing} />
      </div>
    );
  }
}

export default App;
