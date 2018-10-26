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
      return this.state.recipes.map(recipe=><RecipeName name={recipe.name} key={recipe.id} recipe={recipe.ingredients}/>)
    }
    
componentWillReceiveProps(newProps){
  this.setState({recipes :newProps.recipes})
}
    
    render() {
    return (
      <div>
        {this.getRecipeNames()}
      </div>
    )
  }
}
