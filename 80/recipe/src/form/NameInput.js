import React, { PureComponent } from 'react'

export default class NameInput extends PureComponent {
    state = {
        changes: 0,
      };
    
      handleInputChange=(event)=> {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ changes: this.state.changes + 1 });
        this.props.handleInputChange(target.name,value);
      }
    
      render() {
        return (
            <label htmlFor="">Name:<input type="text" name="name" maxLength="100" value={this.props.value} onChange={this.handleInputChange} /></label>
        );
      }
}
