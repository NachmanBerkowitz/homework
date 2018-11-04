import React, { Component } from 'react';

export default class ZipInput extends Component {
  state = {
    zipInput: '',
  };

  handleInputChange = event => {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(value);
    if(value && !this.validateIsDigit(value[value.length-1])){
      value = this.state.zipInput;
    }
    this.setState({
      zipInput: value
    });
  
  };

  validateIsDigit(char){
    return /[0-9]/.test(parseInt(char))
  }

  validateZip(num) {
    return num.length === 5 && num.split('').every(char=>this.validateIsDigit(char));
  }
  
  handleSubmit = event => {
    const zip = this.state.zipInput;
    if (this.validateZip(zip)) {
      this.props.updateCurrentZip(zip);
      event.preventDefault();
    }
  };

  render() {
    return (
      <div>
        <form action="">
          <label htmlFor="zipInput">Enter a Zip Code. Get the weather!</label>
          <input
            value={this.state.zipInput}
            type="text"
            placeholder="00000"
            id="zipInput"
            name="zipInput"
            minLength="5"
            maxLength="5"
            pattern="\d{5}"
            required
            onChange={this.handleInputChange}
          />
          <button type="submit" onClick={this.handleSubmit}>
            GO
          </button>
        </form>
      </div>
    );
  }
}
