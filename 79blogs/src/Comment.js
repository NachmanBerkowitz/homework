import React from 'react';

export default function Comment(props) {
  const comment = props.comment;
  return (
    <div className="comment">
      <p>{comment.body}</p>
      <cite>from: {comment.name} </cite>
      <kbd>
        <em>{comment.email}</em>
      </kbd>
    </div>
  );
}
