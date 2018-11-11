import React from 'react'
import './Blog.css'

export default function Blog(props){
    const {title,body,id}=props.blogInfo;
    const blogNum = (id - props.firstBlogId) + 1;
  return (
    
    <div className="blog" id="{blog.id}">
            <h3><span> {blogNum}.</span> <i>{title}</i></h3>
            <p>{body}</p>
            <div className="show_comments"><span>show comments</span></div>
            <div className="comments_div"></div>
            <hr/>
        </div>
  )
}
