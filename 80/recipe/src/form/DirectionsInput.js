import React, { PureComponent } from 'react'

export default class DirectionsInput extends PureComponent {

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
          <textarea onChange={this.handleInputChange} name="directions" value={this.props.value} placeholder="Recipe Directions..."cols="100" rows="10"></textarea>
      </div>
    )
  }
}
