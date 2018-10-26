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
      <Ingredient ingredient={props.ingredient}/>: <Amount amount={props.amount}/>
    </div>
  );
}
export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: this.props.ingredients
    };
  }

  getRecipe(){
      return this.state.ingredients.map(ingr=><IngredientDets key={ingr.ingredient} ingredient={ingr.ingredient} amount={ingr.amount}/>)
  }

  render() {
    return <div>{this.getRecipe()}</div>;
  }
}
