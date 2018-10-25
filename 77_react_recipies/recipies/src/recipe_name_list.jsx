import React, { Component } from 'react'
import RecipeName from './recipe_name'

export default class RecipeNameList extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         recipes : this.props.recipes
      }
    }

    getRecipeNames(){
      console.log(this.state.recipes);
      return this.state.recipes.map(recipe=><RecipeName name={recipe.name} key={recipe.id} recipe={recipe.ingredients}/>)
    }
    
    render() {
    return (
      <div>
        {this.getRecipeNames()}
      </div>
    )
  }
}
