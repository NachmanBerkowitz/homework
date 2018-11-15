import React, {Component} from 'react'
import './Blog.css'
import Comments from './Comments';

export default class Blogs extends Component{
  state={
    showComments:false
  }
  toggleComments=()=>{
    const showing = this.state.showComments;
    this.setState({showComments:showing?false:true})
  }
  render(){
    const {title,body,id}=this.props.blogInfo;
    const blogNum = (id - this.props.firstBlogId) + 1;
  return (
    <div className="blog" >
            <h3><span> {blogNum}.</span> <i>{title}</i></h3>
            <p>{body}</p>
            <div className="show_comments"><span onClick={this.toggleComments}>{this.state.showComments?'hide comments':'show comments'}</span></div>
            {this.state.showComments&&<Comments id={id}/>}
            <hr/>
        </div>
  )
}
}
