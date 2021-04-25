import React, { useState, useContext } from "react";
import "./GroupChoresView.css";
import GroupChoresList from "./GroupChores/GroupChoresList";
import Header from "../../js/Header";
import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "../../js/Sidebar/Sidebar";
import SidebarRow from "../../js/Sidebar/SidebarRow";
import MobileSidebar from "../../js/MobileSidebar/MobileSidebar.js";
import { useMediaQuery } from "@material-ui/core";

function GroupChoresView() {
  useLoggedOutRedirect(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { user, currentGroup } = useContext(GlobalContext);

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const blurBackground = () => {

    document.getElementById('background-1').style.filter = 'blur(10px)';
    document.getElementById('background-2').style.filter = 'blur(10px)';
  }

  const removeBlur = () => {

    document.getElementById('background-1').style.filter = 'blur(0px)';
    document.getElementById('background-2').style.filter = 'blur(0px)';
  }
  const windowScreenSize = useMediaQuery("(min-width: 450px)");

  function copyLink() {
    setLinkCopied(true);
    // let link = "http://trashoverflow.tech/join/";
    let link = "localhost:3000/join/";
    if (currentGroup) {
      link += currentGroup._id;
    }
    navigator.clipboard.writeText(link);
    setTimeout(
      function () {
        setLinkCopied(false);
      }.bind(this),
      2000
    );
  }

  return (
    <div className="groupChoresView">
      <div id="background-1">
        <Header id="background-1" isGroupView={true} selection={1} blurBackground={blurBackground} menuOnClick={setIsOpen} linkCopied={linkCopied} copyLink={copyLink} />
      </div>

      <MobileSidebar isOpen={isOpen} toggle={toggle} removeBlur={removeBlur} linkCopied={linkCopied} copyLink={copyLink} />
      {windowScreenSize ? <Sidebar /> : null}
      <div id="background-2" className="groupChoresView__body">
        <GroupChoresList />
      </div>
      <ReactQueryDevtools />
    </div>
  );
}

export default GroupChoresView;
