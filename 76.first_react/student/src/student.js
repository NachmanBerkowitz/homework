import React, { Component } from 'react';
const newLocal = <div>hi</div>;
const newLocal2 = <div>bi</div>;
const arr = [newLocal,newLocal2]
class Student extends Component {
    render() {
        return (
            <div>
                {arr}
                {newLocal}
                <h2>{this.props.name}</h2>
                <h2>{this.props.address}</h2>
            </div>
        );
    }
}
export default Student