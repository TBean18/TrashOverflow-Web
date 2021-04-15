import React from "react";
import "./GroupChoresView.css";
import GroupChoresList from "./GroupChores/GroupChoresList";
import Header from "../../js/Header";
import { useLoggedOutRedirect } from "../../hooks/useLoggedOutRedirect";
import { GlobalContext } from "../../context/GlobalState";
import { ReactQueryDevtools } from "react-query/devtools";

function GroupChoresView() {
  useLoggedOutRedirect(GlobalContext);
  return (
    <div className="groupChoresView">
      <Header selection={1} />

      <div className="groupChoresView__body">
        <GroupChoresList />
      </div>
      <ReactQueryDevtools />
    </div>
  );
}

export default GroupChoresView;
