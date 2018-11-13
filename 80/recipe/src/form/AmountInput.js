import React, { PureComponent } from 'react';

export default class AmountInput extends PureComponent {
  handleInputChange=(event)=> {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    this.props.handleInputChange(this.props.id,target.name,value);
  }

  render() {
    return (
        <label htmlFor="">Amount:<input className={this.props.class} type="text" maxLength="100" name="amount" value={this.props.value} onChange={this.handleInputChange} /></label>
    );
  }
}
