import React, { Component } from 'react';
import RecipeDetails from './recipe_details';

export default class RecipeName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dets:null
    };
  }
  toggleDets = () => {
    if(!this.state.dets){
    this.setState({dets:<RecipeDetails ingredients={this.props.recipe}/>})
    }else{
      this.setState({dets:null})
    }
  };
  render() {
    return (<div>
    <div onClick={this.toggleDets} >
    <span>{this.props.name}</span>
    </div>
    {this.state.dets}
    </div>)
  }

  }

