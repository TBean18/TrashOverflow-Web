import React from "react";
import "../css/Main.css";

import Feed from "../js/Feed";
import Header from "../js/Header";
// import Sidebar from "../js/Sidebar/Sidebar";
// import Widgets from "../js/Widgets";

import { useLoggedOutRedirect } from "../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../context/GlobalState";
function UserChoresPage() {
  useLoggedOutRedirect(GlobalContext);

  return (
    // BEM naming convention

    <div className="main">
      <Header selection={1} />

      <div className="main__body">
        <Feed showGroup={true}/>
      </div>
    </div>
  );
}

export default UserChoresPage;
