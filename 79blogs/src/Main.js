import React, { Component } from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Home from './Home';
import './Main.css';
import Blogs from './Blogs';

export default class Main extends Component {
  state = {
    blogers: [],
  };

  async getBlogers() {
    const data = await fetch('https://jsonplaceholder.typicode.com/users');
    this.setState({ blogers: await data.json() });
  }

  componentDidMount() {
    this.getBlogers();
  }

  render() {
    return (
      <div id="main">
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Home
                {...props}
                setAppState={this.props.setAppState}
                blogers={this.state.blogers}
              />
            )}
          />
          <Route
            path="/blogs/:blogerID"
            render={props => (
              <Blogs
                {...props}
                setAppState={this.props.setAppState}
                sideBarOnclick={this.props.sideBarOnclick}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
