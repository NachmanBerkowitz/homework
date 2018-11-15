import React, { Component } from 'react'
import Comment from './Comment';

export default class Comments extends Component {
    state={
        comments:[]
    }
    componentDidMount(){
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${this.props.id}`)
        .then((data)=>data.json())
        .then((data)=>this.setState({comments:data}))
    }
    displayComments(){
        return this.state.comments.map((comment)=><Comment key={comment.id} comment={comment}/>);
    }
  render() {
    return (
      <div className="comments_div">
        {this.displayComments()}
      </div>
    )
  }
}

