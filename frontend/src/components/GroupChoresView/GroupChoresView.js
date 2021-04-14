import React from "react";
import "./GroupChoresView.css";
import GroupChoresList from "./GroupChores/GroupChoresList";
import Header from "../../js/Header";
import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";

function GroupChoresView() {
  useLoggedOutRedirect(GlobalContext);
  return (
    <div className="groupChoresView">
      <Header selection={1} />

      <div className="groupChoresView__body">
        <GroupChoresList />
      </div>
    </div>
  );
}

export default GroupChoresView;
