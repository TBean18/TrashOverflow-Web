import React, { useState } from "react";
import "../css/Main.css";

import Feed from "../js/Feed";
import Header from "../js/Header";
import MobileSidebar from "../js/MobileSidebar/MobileSidebar.js";
// import Sidebar from "../js/Sidebar/Sidebar";
// import Widgets from "../js/Widgets";

import { useLoggedOutRedirect } from "../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../context/GlobalState";
function UserChoresPage() {
  useLoggedOutRedirect(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    // BEM naming convention

    <div className="main">
      <Header selection={1} menuOnClick={setIsOpen} />
      <MobileSidebar isOpen={isOpen} toggle={toggle} />
      <div className="main__body">
        <Feed showGroup={true} />
      </div>
    </div>
  );
}

export default UserChoresPage;
