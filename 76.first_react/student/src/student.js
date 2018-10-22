import React, { Component } from 'react';
class Student extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <h2>{this.props.address}</h2>
            </div>
        );
    }
}
export default Student