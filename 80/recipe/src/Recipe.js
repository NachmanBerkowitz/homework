import React, { Component } from 'react';
import RecipeDetails from './RecipeDetails';
import { Link } from 'react-router-dom';

export default class Recipe extends Component {
  
  
  toggleDets = () => {
    if(!this.state.dets){
    this.setState({dets:<RecipeDetails ingredients={this.props.recipe}/>});
    this.props.display(this.props.recipe);
    }else{
      this.setState({dets:null});
    }
  };

  render() {
    return (<div>
        <Link to={`/recipe/${this.props.id}`}> {this.props.name} </Link>
    </div> )
  }

  }

