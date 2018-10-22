import React, { Component } from 'react';
class Clock extends Component {
    constructor(props) {
        super(props);
         this.state = {
            clock: 0
        };
         setInterval(() => this.setState({
            clock: new Date().toLocaleTimeString()
        }), 1000);
    }
     render() {
        return (
            <div>
                <h2>{this.state.clock}</h2>
            </div>
        );
    }
}
 export default Clock