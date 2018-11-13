import React, { PureComponent } from 'react'

export default class NameInput extends PureComponent {
    handleInputChange=(event)=> {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.props.handleInputChange(target.name,value);
      }
      backgroundColor(){
        return this.props.value.trim().length===0 ? 'required' : 'unrequired';
    }
      render() {
        return (
            <label htmlFor="">Name:<input className={this.backgroundColor()} type="text" name="name" maxLength="100" value={this.props.value} onChange={this.handleInputChange} /></label>
        );
      }
}
