import React, { Component } from 'react';
import Blog from './Blog';

export default class Blogs extends Component {
  state = {
    blogs: [],
    blogGroup: 0,
    amountToShow: 3,
    firstBlogToShow: 0,
  };

  async getBlogs() {
    const blogerID = this.props.match.params.blogerID;
    const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blogerID}`);
    this.setState({ blogs: await data.json(), blogGroup: 1 });
  }

  componentWillMount = async () => {
    const actions = this.props.actions;
    actions.nextBlogs = this.nextBlogs;
    actions.previousBlogs = this.previousBlogs;
    this.props.setStateAppShowing('blogs');
    await this.getBlogs();
  };

  blogsToShow=(start)=> {
    
    const blogs = this.state.blogs;
    let blogsToShow = [];
    for (
      let blog_index = start, i = 0;
      i < this.state.amountToShow && blog_index < blogs.length && blog_index >= 0;
      blog_index++, i++
    ) {
      blogsToShow.push(blogs[blog_index]);
    }
    this.props.actions.sideInfoLoaded&&this.toggleButtonCssClass();
    return blogsToShow;
  }

  toggleButtonCssClass=() =>{
    const { blogGroup, amountToShow, blogs } = this.state;
    if (blogGroup > 1) {
      this.props.actions.previousButton.classList.remove('disabled');
    }else{
      this.props.actions.previousButton.classList.add('disabled');
    }
    if (blogGroup * amountToShow >= blogs.length) {
      this.props.actions.nextButton.classList.add('disabled');
    }else{
      this.props.actions.nextButton.classList.remove('disabled');
    }
  }

  nextBlogs = () => {
    let { blogGroup, amountToShow, blogs } = this.state;
    if (blogGroup * amountToShow < blogs.length) {
      this.setState({
        blogGroup: blogGroup + 1,
        firstBlogToShow: blogGroup * amountToShow,
      });
    }
  };

  previousBlogs = () => {
    let { blogGroup, amountToShow } = this.state;
    if (blogGroup > 1) {
      this.setState({
        blogGroup: blogGroup - 1,
        firstBlogToShow: (blogGroup - 2) * amountToShow,
      });
    }
  };
  

  render() {
    return (
      <>
        {this.blogsToShow(this.state.firstBlogToShow).map(blog => (
          <Blog blogInfo={blog} firstBlogId={this.state.blogs[0].id} />
        ))}
      </>
    );
  }
}
