import React from 'react'
import './HomeButton.css';
import Link from 'react-router-dom/Link';


export default function HomeButton(props) {
    
  return (
    <Link to="/"id="homeButton" >
    MAIN PAGE
    </Link>
  )
}
