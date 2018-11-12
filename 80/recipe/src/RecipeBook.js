import React, { Component } from 'react'
import Recipe from './Recipe';
import { Link } from 'react-router-dom';
export default class RecipeBook extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentRecipe:[]
    }
  }
  

    getRecipeNames(){
      return this.props.recipeNames.map(recipe=><Recipe name={recipe.name} key={recipe.id} id={recipe.id} display={this.setDets}/>)
    }

 
    setDets=(recipe)=>{
      this.setState({currentRecipe:recipe})
    }

    render() {
    console.count('RECIPE-BOOK');
       return (<div>
        {this.getRecipeNames()}

        <span style={{border:"1px black solid"}}>
          <Link to="/recipe-form">Add Recipe</Link>
        </span>

      </div>)
      
    
  }
}
