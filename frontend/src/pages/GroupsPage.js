import React, { useState } from "react";
import "../css/GroupView.css";
import Header from "../js/Header";
import GroupList from "../js/GroupList";
import { useLoggedOutRedirect } from "../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../context/GlobalState";
import MobileSidebar from "../js/MobileSidebar/MobileSidebar.js";

function GroupsPage() {
  useLoggedOutRedirect(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="groupView">
      <Header selection={2} menuOnClick={setIsOpen} />
      <MobileSidebar isOpen={isOpen} toggle={toggle} />
      <div className="groupView__body">
        <GroupList />
      </div>
    </div>
  );
}

export default GroupsPage;
