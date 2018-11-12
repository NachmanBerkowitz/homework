import React, { Component } from 'react'

export default class IngredientInput extends Component {
  state = {
    changes: 0,
  };

  handleInputChange=(event)=> {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target);
    this.props.handleInputChange(this.props.id,target.name,value);
    this.setState({ changes: this.state.changes + 1 });
  }

  render() {
    return (
        <label htmlFor="">Ingredient:<input name="ingredient" type="text" maxLength="100" value={this.props.value} onChange={this.handleInputChange} /></label>
    );
  }
}
