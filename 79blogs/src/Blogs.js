import React, { Component } from 'react';
import Blog from './Blog';

export default class Blogs extends Component {
    
    state={
        blogs:[],
        // blogsShowing:[],
        blogGroup:0
    }
    amountToShow=3;
    async getBlogs(){
        const blogerID = this.props.location.state.id;
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blogerID}`);
        this.setState({blogs: await data.json()})
    }
    componentDidMount=()=>{
        this.getBlogs();
        this.props.setStateAppShowing('blogs');
    }
    nextBlogs(next=true) {
        const {blogs,blogGroup} = this.state;
        // const first_id = blogs[0].id;
        // main.empty();
        const start = next ? blogGroup * this.amountToShow : (blogGroup - 2) * this.amountToShow;
        let blogsToShow = [];
        let change = false;
        for (
            let blog_index = start, i = 0;
            i < this.amountToShow && blog_index < blogs.length && blog_index >= 0;
            blog_index++, i++
        ) {
            blogsToShow.push(blogs[blog_index]);
            change= true;
            // const blog = blogs[blog_index];
            // blogElement(blog, first_id)
            //     .appendTo(main)
            //     .on('click', '.show_comments', { id: blog.id }, showHideComments);
        }
        // next ? group_of_posts++ : group_of_posts--;
        // if (group_of_posts <= 1) {
        //     $('#previous')
        //         .addClass('disabled')
        //         .off('click.previous');
        // } else {
        //     $('#previous')
        //         .removeClass('disabled')
        //         .off('click.previous')
        //         .on('click.previous', { blogs: blogs, next: false }, three_blogs);
        // }
        // if (group_of_posts >= blogs.length / posts_to_show) {
        //     $('#next')
        //         .addClass('disabled')
        //         .off('click.next');
        // } else {
        //     $('#next')
        //         .removeClass('disabled')
        //         .off('click.next')
        //         .on('click.next', { blogs: blogs, next: true }, three_blogs);
        // }
        return change ? blogsToShow : null;
    }
  render() {
    return (
      <>
      
        {this.nextBlogs() && this.nextBlogs().map(blog=><Blog blogInfo={blog} firstBlogId={this.state.blogs[0].id}/>)}
      </>
    )
  }
}


