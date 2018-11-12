import React, { Component } from 'react'

export default class DirectionsInput extends Component {

    state={
        changes:0
    }

    handleInputChange=(event)=>{
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({changes:this.state.changes+1});
        this.props.handleInputChange(target.name,value);
    }
    
  render() {
    return (
      <div>
          <textarea name="directions" placeholder="Recipe Directions..."cols="30" rows="10"></textarea>
      </div>
    )
  }
}
