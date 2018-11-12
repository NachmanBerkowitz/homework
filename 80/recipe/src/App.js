import React, { Component } from 'react';
import './App.css';
import RecipeBook from './RecipeBook';
import { Switch, Route, Redirect } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import Header from './Header';
import AddRecipeForm from './form/AddRecipeForm';

async function getRecipes(){
  const recipesFetch = await fetch('http://localhost:3000/recipes.json');
  const recipes = await recipesFetch.json();
  return recipes.recipes;
}

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      recipes:[]
       
    }
    getRecipes().then((recipes)=>{this.setState({recipes})});
  }
  recipeNamesAndIDs(){
    return this.state.recipes.map((recipe)=>({name:recipe.name,id:recipe.id}));
  }
  updateRecipes=(recipe)=>{
    const tempRecipes = [...this.state.recipes];
    recipe.id = tempRecipes.length+1;
    tempRecipes.push(recipe);
    this.setState({recipes:tempRecipes});
  }
  render() {
    console.count('APP')
    return (
      <div className="App">
      <Header/>
        <Switch>
          <Route path="/recipe-book" render={()=><RecipeBook recipeNames={this.recipeNamesAndIDs()}/>}/>
          <Route path="/recipe/:id" component={RecipeDetails}/>
          <Route path="/recipe-form" render={()=><AddRecipeForm updateRecipes={this.updateRecipes}/>}/>
          <Redirect exact from="/" to="/recipe-book"/>
        </Switch>
      </div>
    );
  }
}

export default App;
