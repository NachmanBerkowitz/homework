import React, { Component } from 'react';
import './App.css';
import RecipeNameList from './recipe_name_list';


async function getRecipes(){
  const recipesFetch = await fetch('recipes.json');
  const recipes = await recipesFetch.json();
  return recipes.recipes;
}
class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      // recipes : require('./recipes.json').recipes
      recipes:[]
    }
    
   
  }
  async componentDidMount(){
    const recipes = await getRecipes()
    this.setState({recipes:recipes})
  }
  render() {

    return (
      <div className="App" id="app">
        <RecipeNameList recipes={this.state.recipes}/>
      </div>
    );

  }
}

export default App;
