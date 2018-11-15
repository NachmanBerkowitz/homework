import React, { Component } from 'react';
import IngredientInput from './IngredientInput';
import AmountInput from './AmountInput';

export default class IngredientAndAmount extends Component {
  removeInput = () => {
    this.props.removeInput(this.props.id);
  };
  render() {
    return (
      <div>
        <IngredientInput
          id={this.props.id}
          value={this.props.ingredientValue}
          handleInputChange={this.props.handleInputChange}
          class={
            !this.props.ingredientHasValue &&
            ((!this.props.hasValid && this.props.id===0)|| this.props.amountHasValue)
              ? 'required'
              : 'unrequired'
          }
        />
        <AmountInput
          id={this.props.id}
          value={this.props.amountValue}
          handleInputChange={this.props.handleInputChange}
          class={
            !this.props.amountHasValue  &&
            ((!this.props.hasValid && this.props.id===0) || this.props.ingredientHasValue)
              ? 'required'
              : 'unrequired'
          }
        />
        <button onClick={this.removeInput} disabled={this.props.disableRemoveButton}>
          remove
        </button>
      </div>
    );
  }
}
