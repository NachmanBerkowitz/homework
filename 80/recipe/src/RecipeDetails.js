import React, { Component } from 'react';

function Ingredient(props) {
  return <span>{props.ingredient}</span>;
}
function Amount(props) {
  return <span>{props.amount}</span>;
}
function IngredientDets(props) {
  return (
    <div className="ingredient">
      <Ingredient ingredient={props.ingredient} />: <Amount amount={props.amount} />
    </div>
  );
}
export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: undefined,
    };

    fetch('/recipes.json')
      .then(data => data.json())
      .then(recipes => {
        const recipe = recipes.recipes.find(recipe => recipe.id === parseInt(this.props.match.params.id));
        this.setState({ recipe });
      });
  }

  getRecipe() {
    const ingredients = this.state.recipe.ingredients;
    return ingredients.map(ingr => (
      <IngredientDets key={ingr.ingredient} ingredient={ingr.ingredient} amount={ingr.amount} />
    ));
  }

  render() {
    return (
      this.state.recipe ?
      <div>
        <p>{this.state.recipe.name}</p>
        {this.getRecipe()}
        <p>{this.state.recipe.directions}</p>
      </div>
      :null
    )
  }
}
