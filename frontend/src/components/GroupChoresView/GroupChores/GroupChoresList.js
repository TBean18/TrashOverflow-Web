import React from "react";
import "./GroupChoresList.css";
import MessageSender from "../../../js/MessageSender";
import Post from "../../../js/Post/Post";
import useGroupChores from "../../../hooks/useGroupChores";
import { useParams } from "react-router";
import { CircularProgress } from "@material-ui/core";

function GroupChoresList() {
  const { group_ID } = useParams();
  const { data, status } = useGroupChores(group_ID);
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
    <div className="groupChoresList">
      <MessageSender />
      {status === "success" ? displayChores(data.chores) : <CircularProgress />}

      <Post
        message="Deals contact damage. Targets a random direction and moves quickly along a straight path from one side of the screen to the other, rapidly firing bullets behind it, bouncing off the walls."
        taskTitle="Take Out Trash"
      />
    </div>
  );
}

export default GroupChoresList;
