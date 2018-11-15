import React, { Component } from 'react';
import Blog from './Blog';

export default class Blogs extends Component {
  constructor(props) {
    super(props);
    this.state={
    blogs: [],
    blogGroup: 0,
    amountToShow: 3,
    firstBlogToShow: 0,
  };
    const sideBarOnclick = this.props.sideBarOnclick;
    sideBarOnclick.showNextBlogs = this.nextBlogs;
    sideBarOnclick.showPreviousBlogs = this.previousBlogs;
    this.props.setAppState('showing', { blogs: true });
  }
  componentDidMount(){
    const blogerID = this.props.match.params.blogerID;
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blogerID}`)
      .then(data => data.json())
      .then(response => this.setState({ blogs: response}))
      .then(()=>{this.nextBlogs()});
  }
  blogsToShow = start => {
    const blogs = this.state.blogs;
    let blogsToShow = [];
    for (
      let blog_index = start, i = 0;
      i < this.state.amountToShow && blog_index < blogs.length && blog_index >= 0;
      blog_index++, i++
    ) {
      blogsToShow.push(blogs[blog_index]);
    }
    return blogsToShow;
  };

  setButtonState = (blogGroup) => {
    
    const { amountToShow, blogs } = this.state;
    const setAppState = this.props.setAppState;
    if (blogGroup > 1) {
      setAppState('isPreviousBlogs', true);
    } else {
      setAppState('isPreviousBlogs', false);
    }
    if (blogGroup * amountToShow >= blogs.length) {
      setAppState('isNextBlogs', false);
    } else {
      setAppState('isNextBlogs', true);
    }
  };

  nextBlogs = () => {
    let { blogGroup, amountToShow, blogs } = this.state;
    if (blogGroup * amountToShow < blogs.length) {
      const group = blogGroup+1;
      this.setState({
        blogGroup: group,
        firstBlogToShow: blogGroup * amountToShow,
      });
      this.setButtonState(group);
    }
  };

  previousBlogs = () => {
    let { blogGroup, amountToShow } = this.state;
    if (blogGroup > 1) {
      const group = blogGroup-1;
      this.setState({
        blogGroup: group,
        firstBlogToShow: (blogGroup - 2) * amountToShow,
      });
      this.setButtonState(group);
    }
  };

  render() {
    return (
      <>
        {this.blogsToShow(this.state.firstBlogToShow).map(blog => (
          <Blog key={blog.id} blogInfo={blog} firstBlogId={this.state.blogs[0].id} />
        ))}
      </>
    );
  }
}
