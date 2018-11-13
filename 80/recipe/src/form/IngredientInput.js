import React, { PureComponent } from 'react';

export default class IngredientInput extends PureComponent {
  handleInputChange = event => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.handleInputChange(this.props.id, target.name, value);
  };

  render() {
    return (
      <label htmlFor="">
        Ingredient:
        <input
          className={this.props.class}
          name="ingredient"
          type="text"
          maxLength="100"
          value={this.props.value}
          onChange={this.handleInputChange}
        />
      </label>
    );
  }
}
