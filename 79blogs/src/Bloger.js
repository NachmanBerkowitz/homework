import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Bloger.css'

export default class Bloger extends Component {
    bloger={
        ...this.props.bloger
    }
    showBlogs=()=>{
        this.props.showBlogs(this.bloger.id);
    }
    render() {
    const {username:blogername,website,company} = this.bloger;
    
    return (
    <div className="bloger">
    <h3 className="bloger_name">{blogername}</h3>
    <div className="company">
        <p>Company: <span className="co_name"> {company.name}</span></p>
        <span className="bs">"{company.bs}"</span>
        <span className="cf">{company.catchPhrase}</span>
    </div>
    <span><i>{website}</i></span><br/>
    <Link to={{pathname:`/blogs`,
                search:`name=${blogername}`,
                state:{...this.bloger}}} 
                >see my blogs</Link>
    {/* <span className="link" onClick={this.showBlogs}></span> */}
</div>
    )
}
}