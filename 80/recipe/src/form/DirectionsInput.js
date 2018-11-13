import React, { PureComponent } from 'react'

export default class DirectionsInput extends PureComponent {

    handleInputChange=(event)=>{
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.handleInputChange(target.name,value);
    }
    backgroundColor(){
        return this.props.value.trim().length===0 ? 'required' : 'unrequired';
    }
  render() {
    return (
      <div>
          <textarea className={this.backgroundColor()} onChange={this.handleInputChange} name="directions" value={this.props.value} placeholder="Recipe Directions..."cols="100" rows="10"></textarea>
      </div>
    )
  }
}
