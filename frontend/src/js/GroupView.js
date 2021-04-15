import React from "react";
import "../css/GroupView.css";
import Header from "./Header";
import GroupList from "./GroupList";
import { useLoggedOutRedirect } from "../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../context/GlobalState";

function GroupView() {
  useLoggedOutRedirect(GlobalContext);

  return (
    <div className="groupView">
      <Header selection={2} />

      <div className="groupView__body">
        <GroupList />
      </div>
    </div>
  );
}

export default GroupView;
