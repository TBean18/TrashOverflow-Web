import React from "react";
import '../css/App.css';

import Feed from "./Feed";
import Header from './Header';
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";

function App() {
  return (
    // BEM naming convention

    <div className="app">
      <Header />
      <Sidebar />
      
      <div className="app__body">
        <Feed />
        <Widgets />
      </div>
    </div>
  );
}

export default App;
