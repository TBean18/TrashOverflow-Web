import React from "react";
import "../css/Feed.css";
import useUserChores from "../hooks/useUserChores";
import { ReactQueryDevtools } from "react-query/devtools";
import { CircularProgress } from "@material-ui/core";
import Chore from "./Post/Chore";

function Feed({ showGroup }) {
  const { data, status } = useUserChores();

  function displayChores(chores) {
    if (!Array.isArray(chores)) return;

    // No Chores Case
    if (chores.length == 0)
      return (
        <div className="noChoresLeft">
          <h3>
            You've got no chores left, but your lazy roommates probably do.
          </h3>
        </div>
      );

    // Else, return a list of chore components
    return chores.map((chore) => (
      <Chore
        description={chore.chore_description}
        chore_name={chore.chore_name}
        points={chore.chore_point_value}
        memberPool={chore.chore_user_pool}
        showGroup={chore.group_name}
        key={chore._id}
        chore_ID={chore._id}
        chore_assigned_user_index={chore.chore_assigned_user_index}
        chore_completion_status={chore.chore_completion_status}
        chore_schedule={chore.chore_schedule}
      />
    ));
  }

  return (
    <div className="feed">
      {status === "success" ? displayChores(data.chores) : <CircularProgress />}

      <ReactQueryDevtools></ReactQueryDevtools>
    </div>
  );
}

export default Feed;
