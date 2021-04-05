import React from "react";
import '../css/Main.css';

import Feed from "./Feed";
import Header from './Header';
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function Main() {
  return (
    // BEM naming convention

    <div className="main">
      <Header selection={1}/>
      
      <div className="main__body">
        <Feed />
      </div>
    </div>
  );
}

export default Main;
