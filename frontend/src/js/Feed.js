import React from "react";
import "../css/Feed.css";
import useUserChores from "../hooks/useUserChores";
import Post from "./Post/Post";
import { ReactQueryDevtools } from "react-query/devtools";
import { CircularProgress } from "@material-ui/core";

function Feed() {
  const { data, status } = useUserChores();

  function displayChores(chores) {
    if (!Array.isArray(chores)) return;
    return chores.map((chore) => (
      <Post
        message={chore.chore_description}
        taskTitle={chore.chore_name}
        points={chore.chore_point_value}
        members={chore.chore_user_pool}
      />
    ));
  }

  return (
    <div className="feed">
      {status === "success" ? displayChores(data.chores) : <CircularProgress />}

      <Post
        message="Deals contact damage. Targets a random direction and moves quickly along a straight path from one side of the screen to the other, rapidly firing bullets behind it, bouncing off the walls."
        taskTitle="Take Out Trash"
        points={79}
      />
      <ReactQueryDevtools></ReactQueryDevtools>
    </div>
  );
}

export default Feed;
