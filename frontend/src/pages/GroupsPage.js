import React, { useState, useContext } from "react";
import "../css/GroupView.css";
import Header from "../js/Header";
import GroupList from "../js/GroupList";
import { useLoggedOutRedirect } from "../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../context/GlobalState";
import MobileSidebar from "../js/MobileSidebar/MobileSidebar.js";

function GroupsPage() {
  useLoggedOutRedirect(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const { user, currentGroup } = useContext(GlobalContext);

  const blurBackground = () => {

      document.getElementById('background-1').style.filter = 'blur(10px)';
      document.getElementById('background-2').style.filter = 'blur(10px)';
  }

  const removeBlur = () => {

      document.getElementById('background-1').style.filter = 'blur(0px)';
      document.getElementById('background-2').style.filter = 'blur(0px)';
  }

  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="groupView">
      <div id="background-1">
        <Header id="background-1" selection={2} blurBackground={blurBackground} menuOnClick={setIsOpen} linkCopied={linkCopied} copyLink={copyLink} />
      </div>

      <MobileSidebar isOpen={isOpen} toggle={toggle} removeBlur={removeBlur} linkCopied={linkCopied} copyLink={copyLink} />
      <div id="background-2" className="groupView__body">
        <GroupList />
      </div>
    </div>
  );
}

export default GroupsPage;
