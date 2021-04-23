import React from "react";
import "./GroupChoresView.css";
import GroupChoresList from "./GroupChores/GroupChoresList";
import Header from "../../js/Header";
import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";
import { ReactQueryDevtools } from "react-query/devtools";
import Sidebar from "../../js/Sidebar/Sidebar";
import SidebarRow from "../../js/Sidebar/SidebarRow";

function GroupChoresView() {
  useLoggedOutRedirect(GlobalContext);
  return (
    <div className="groupChoresView">
      <Header selection={1} isGroupView={true} />

      {
        window.screen.width > 380 ?
        (
          <Sidebar />
        )
        :
        null
      }
      <div className="groupChoresView__body">
        <GroupChoresList />
      </div>
      <ReactQueryDevtools />
    </div>
  );
}

export default GroupChoresView;
