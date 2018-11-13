import React, { Component } from 'react'
import IngredientAndAmount from './IngredientAndAmount';

export default class IngredientandAmountInputsContainer extends Component {
  displayIngredientAndAmountInputs=()=> {
    const hasValid = this.props.inputs.some((input)=>input.ingredient.trim().length!==0&&input.amount.trim().length!==0); 
    return this.props.inputs.map(input => {
      return (
      <IngredientAndAmount
        removeInput={this.props.removeInput}
        key={input.id}
        id={input.id}
        disableRemoveButton={this.props.inputs.length === 1}
        handleInputChange={this.props.handleInputChange}
        ingredientValue={input.ingredient}
        ingredientHasValue={input.ingredient.trim().length!==0}
        amountValue={input.amount}
        amountHasValue={input.amount.trim().length!==0}
        hasValid={hasValid}
      />
    )
  });
  }
  render() {
    return (
      <>
        {this.displayIngredientAndAmountInputs()}
      </>
    )
  }
}

