import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "../css/MessageSender.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function MessageSender() {
  const [input, setInput] = useState("");
  const [imgUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // DB stuff

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

export default MessageSender;
