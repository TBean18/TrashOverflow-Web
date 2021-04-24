import React, { useState } from "react";
import "./MobileMembersView.css";

import Feed from "../../js/Feed";
import Header from "../../js/Header";
// import Sidebar from "../js/Sidebar/Sidebar";
// import Widgets from "../js/Widgets";

import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";
import Sidebar from "../../js/Sidebar/Sidebar.js";
import MobileSidebar from "../../js/MobileSidebar/MobileSidebar.js";

function MobileMembers() {
  useLoggedOutRedirect(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    // BEM naming convention

    <div className="mobileMembersView">
      <Header selection={1} menuOnClick={setIsOpen} />
      <MobileSidebar isOpen={isOpen} toggle={toggle} />
      <Sidebar />
      <div className="main__body"></div>
    </div>
  );
}

export default MobileMembers;
