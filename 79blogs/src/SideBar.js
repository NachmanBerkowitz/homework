import React from 'react'
import BlogerInfo from './BlogerInfo';
import HomeButton from './HomeButton';
import MissionStatement from './MissionStatement';
import './SideBar.css';
import HomePageSide from './HomePageSide';
import {Route} from 'react-router-dom';

export default function SideBar(props) {
  return (
    <div id="sidebar">
      {!props.showing.home && <HomeButton />}
        <MissionStatement/>
        <div id="sideInfo">
            {props.showing.home && <HomePageSide/>}
            <Route path="/blogs" component={BlogerInfo}/>
        </div>
    </div>
  )
}
