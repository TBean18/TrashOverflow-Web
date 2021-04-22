import React, { useContext } from "react";
import "./GroupChoresList.css";
import ChoreCreator from "../../../js/ChoreCreator";
import useGroupChores from "../../../hooks/useGroupChores";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { GlobalContext } from "../../../context/GlobalState";
import Chore from "../../../js/Post/Chore";

function GroupChoresList() {
  const { group_ID } = useParams();
  const { data, status } = useGroupChores(group_ID);
  const { currentGroup } = useContext(GlobalContext);
  function displayChores(chores) {
    if (!Array.isArray(chores)) return;
    return chores.map((chore) => (
      <Chore
        description={chore.chore_description}
        chore_name={chore.chore_name}
        points={chore.chore_point_value}
        memberPool={chore.chore_user_pool}
        key={chore._id}
        chore_ID={chore._id}
      />
    ));
  }

  return (
    <div className="groupChoresList">
      <ChoreCreator group={currentGroup} />
      {status === "success" ? displayChores(data.chores) : <CircularProgress />}
    </div>
  );
}

export default GroupChoresList;
