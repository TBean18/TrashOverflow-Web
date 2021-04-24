import React, { useState } from "react";
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
  // toggles state from true to false, or vice versa
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const windowScreenSize = useMediaQuery("(min-width: 380px)");

  return (
    <div className="groupChoresView">
      <Header selection={1} isGroupView={true} menuOnClick={setIsOpen} />
      <MobileSidebar isOpen={isOpen} toggle={toggle} />
      {windowScreenSize ? <Sidebar /> : null}
      <div className="groupChoresView__body">
        <GroupChoresList />
      </div>
      <ReactQueryDevtools />
    </div>
  );
}

export default GroupChoresView;
