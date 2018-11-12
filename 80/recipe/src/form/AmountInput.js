import React, { Component } from 'react';

export default class AmountInput extends Component {
  state = {
    changes: 0,
  };

  handleInputChange=(event)=> {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ changes: this.state.changes + 1 });
    this.props.handleInputChange(this.props.id,target.name,value);
  }

  render() {
    return (
        <label htmlFor="">Amount:<input type="text" name="amount" value={this.props.value} onChange={this.handleInputChange} /></label>
    );
  }
}
