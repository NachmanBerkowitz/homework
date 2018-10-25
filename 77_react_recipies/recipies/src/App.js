import React, { Component } from 'react';
import './App.css';
import RecipeNameList from './recipe_name_list';



class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      recipes : require('./recipes.json').recipes
      
    }
  }
  
  render() {
    console.log(this.state.recipes);
    return (
      <div className="App">
        <RecipeNameList recipes={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
