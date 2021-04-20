import React from "react";
import "../css/Feed.css";
import useUserChores from "../hooks/useUserChores";
import { ReactQueryDevtools } from "react-query/devtools";
import { CircularProgress } from "@material-ui/core";
import Chore from "./Post/Chore";

function Feed() {
  const { data, status } = useUserChores();

  function displayChores(chores) {
    if (!Array.isArray(chores)) return;
    return chores.map((chore) => (
      <Chore
        description={chore.chore_description}
        chore_name={chore.chore_name}
        points={chore.chore_point_value}
        memberPool={chore.chore_user_pool}
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
