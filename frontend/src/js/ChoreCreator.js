import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "../css/MessageSender.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useChoreCreation } from "../hooks/useChoreCreation";
import { useParams } from "react-router-dom";

function ChoreCreator() {
  const { group_ID } = useParams();
  const [input, setInput] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const newChore = useChoreCreation(group_ID);

  const handleSubmit = (e) => {
    console.log(group_ID);
    e.preventDefault();

    // --------------------------------------------------------
    // Here we define the new chore to be added to the group
    // Currently we only support adding a chore by name but notice how
    // we support adding all values of the payload as well
    newChore({
      group_ID,
      chore_name: input,
      chore_assigned_user: "",
      chore_user_pool: [],
    });

    setInput("");
    setImageUrl("");
  };

  return (
    <div className="messageSender">
      <div className="messageSender__top">
        {/* <Avatar src={logo} /> */}
        <AddCircleOutlineIcon fontSize="large" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="messageSender__input"
            placeholder={`Task Name`}
          />
          <button onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChoreCreator;
