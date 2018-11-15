import React from 'react'
import BlogerInfoSide from './BlogerInfoSide';
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
            <Route path="/blogs/:blogerID" render={(p)=><BlogerInfoSide {...p}
            sideBarOnclick={props.sideBarOnclick}
            isBlogs={props.isBlogs}/>}/>
        </div>
    </div>
  )
}
