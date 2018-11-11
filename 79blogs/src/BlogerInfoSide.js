import React, { Component } from 'react';
import './BlogerInfoSide.css';


export default class BlogerInfo extends Component {
  state = {
    bloger: null,
  };

  componentWillMount = async ()=> {
    
    if (this.props.location.state) {
      this.setState({ bloger: this.props.location.state.bloger });
    } else {
      this.setState({bloger: await this.getBlogerInfo()});
    }
  }

  componentDidMount(){
    this.props.actions.previousButton = document.getElementById('previous');
    this.props.actions.nextButton = document.getElementById('next');
    this.props.actions.sideInfoLoaded = true;
  }
  

  async getBlogerInfo() {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.blogerID}`,
    );
    return await data.json();
  }

  previous = () => {
    this.props.actions.previousBlogs();
  };

  next = () => {
    this.props.actions.nextBlogs();
  };

  render() {
    if (!this.state.bloger) {
      return null;
    }
    const {
      name,
      company: { name: company },
    } = this.state.bloger;

    return (
      <div id="blogs_info">
        <p>{name}</p>
        <div>Company: {company}</div>
        <div className="get_posts">
          <h3>There's More!</h3>
          <span id="previous" className="disabled" onClick={this.previous}>
            {' '}
            previous{' '}
          </span>
          |
          <span id="next" onClick={this.next}>
            {' '}
            next{' '}
          </span>
        </div>
      </div>
    );
  }
}
