import React, { Component } from 'react'
import RecipeName from './recipe_name'
import RecipeDetails from './recipe_details';
export default class RecipeNameList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       currentRecipe:[]
    }
  }
  

    getRecipeNames(){
      return this.props.recipes.map(recipe=><RecipeName name={recipe.name} key={recipe.id} recipe={recipe.ingredients} display={this.setDets}/>)
    }

 
    setDets=(recipe)=>{
      this.setState({currentRecipe:recipe})
    }
    render() {

    return (
      <div>
        {this.getRecipeNames()}
        <RecipeDetails ingredients={this.state.currentRecipe} display={this.setDets}/>
      </div>
    )
  }
}
