import React, { Component } from 'react';
import './BlogerInfoSide.css';


export default class BlogerInfo extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       bloger: null
    }

    if (this.props.location.state) {
      this.state={ bloger: this.props.location.state.bloger };
    } else {
      this.getBlogerInfo().then((data)=>{this.state={bloger:data}})
    }
  }
  
  async getBlogerInfo() {
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.blogerID}`,
    );
    return await data.json();
  }

  previous = () => {
    this.props.sideBarOnclick.showPreviousBlogs();
  };

  next = () => {
    this.props.sideBarOnclick.showNextBlogs();
  };

  render() {
    if (!this.state.bloger) {
      return null;
    }
    const {
      name,
      company: { name: company },
    } = this.state.bloger;
    const {isPreviousBlogs,isNextBlogs} = this.props.isBlogs;
    return (
      <div id="blogs_info">
        <p>{name}</p>
        <div>Company: {company}</div>
        {(isPreviousBlogs||isNextBlogs)&&<div className="get_posts">
          <h3>There's More!</h3>
          <span id="previous" className={isPreviousBlogs?null:'disabled'} onClick={isPreviousBlogs?this.previous:null}>
            {' '}
            previous{' '}
          </span>
          |
          <span id="next" className={isNextBlogs?null:'disabled'} onClick={isNextBlogs?this.next:null}>
            {' '}
            next{' '}
          </span>
        </div>}
      </div>
    );
  }
}
