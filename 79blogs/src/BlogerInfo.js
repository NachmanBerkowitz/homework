import React from 'react';

export default function BlogerInfo(props) {

    const {name, company:{name:company}}=props.location.state;
  return (
    <div id="blogs_info">
      <p>{name}</p>
      <div>Company: {company}</div>
      <div className="get_posts"> 
        <h3>There's More!</h3>
        <span id="previous"> previous </span>|<span id="next"> next </span>
      </div>
    </div>
  );
}
