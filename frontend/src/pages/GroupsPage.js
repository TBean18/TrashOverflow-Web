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

  const blurBackground = () => {

      document.getElementById('background-1').style.filter = 'blur(7px)';
      document.getElementById('background-2').style.filter = 'blur(7px)';
  }

  const removeBlur = () => {

      document.getElementById('background-1').style.filter = 'blur(0px)';
      document.getElementById('background-2').style.filter = 'blur(0px)';
  }

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="groupView">
      <div id="background-1">
        <Header id="background-1" selection={2} blurBackground={blurBackground} menuOnClick={setIsOpen} />
      </div>

      <MobileSidebar isOpen={isOpen} toggle={toggle} removeBlur={removeBlur} />
      <div id="background-2" className="groupView__body">
        <GroupList />
      </div>
    </div>
  );
}

export default GroupsPage;
