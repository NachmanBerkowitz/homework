import React, { Component } from 'react'
import IngredientInput from './IngredientInput';
import AmountInput from './AmountInput';

export default class IngredientAndAmount extends Component {
    removeInput=()=>{
        this.props.removeInput(this.props.id)
    }
  render() {
      console.log(this.props.id);
    return (
      <div>
          <IngredientInput id={this.props.id} handleInputChange={this.props.handleIngredientAndAmountChange}/>
          <AmountInput id={this.props.id} handleInputChange={this.props.handleIngredientAndAmountChange}/>
          <button onClick={this.removeInput} disabled={this.props.disableRemoveButton}>remove</button>
      </div>
    )
  }
}
