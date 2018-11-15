import React, { Component } from 'react'
import './Home.css'
import Bloger from './Bloger';

export default class Home extends Component {


componentDidMount(){
  
  this.props.setAppState('showing',{home:true});
}

  render() {
    return (
      <div id="home">
        {this.props.blogers.map((bloger)=><Bloger bloger={bloger} key={bloger.id} showBlogs={this.props.showBlogs}/>)}
      </div>
    )
  }
}
