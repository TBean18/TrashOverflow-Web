import React from "react";
import "./MobileMembersView.css";

import Feed from "../../js/Feed";
import Header from "../../js/Header";
// import Sidebar from "../js/Sidebar/Sidebar";
// import Widgets from "../js/Widgets";

import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";
import Sidebar from "../../js/Sidebar/Sidebar.js";

function MobileMembers() {
  useLoggedOutRedirect(GlobalContext);

  return (
    // BEM naming convention

    <div className="mobileMembersView">
      <Header selection={1} />
      <Sidebar />
      <div className="main__body">
        
      </div>
    </div>
  );
}

export default MobileMembers;
