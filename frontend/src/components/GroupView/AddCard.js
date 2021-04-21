import React, { useState, useContext } from "react";

import AddIcon from "@material-ui/icons/Add";
import { IconButton } from "@material-ui/core";
import "./AddCard.css";
import AddCardFrontButton from "./AddCardFrontButton";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useForm } from "../../hooks/useForm";
import { GlobalContext } from "../../context/GlobalState";
import { useGroupCreation } from "../../hooks/useGroupCreation";

function AddCard() {
  const initialState = {
    groupName: "",
    groupDescription: "",
  };
  //Define State
  const [adding, setAdding] = useState(false);
  const [values, setValues, resetValues] = useForm(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const newGroup = useGroupCreation(GlobalContext);
  function toggleAdding() {
    setAdding(!adding);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    //reset the state values
    resetValues(initialState);

    //Flip the card
    setAdding(!adding);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newGroup(values.groupName, values.groupDescription);

    //Close the input boxes
    setAdding(!adding);
  };

  return (
    <div
      className={`row ${adding ? "addCard" : "addCard__initial"}`}
      onClick={!adding ? toggleAdding : null}
    >
      <IconButton>
        <AddIcon />
      </IconButton>

      <div className="addCard__front">
        <form>
          <div className="addCardFront__groupName">
            <input
              type="text"
              name="groupName"
              placeholder="Group Name"
              onChange={(e) => setValues(e)}
              value={values.groupName}
            />
          </div>
          <div className="addCardFront__groupDescription">
            <textarea
              type="text"
              rows="5"
              name="groupDescription"
              placeholder="Description"
              onChange={(e) => setValues(e)}
              value={values.groupDescription}
            />
          </div>
          <div className="addCardFront__groupImage">
            <input
              type="text"
              name="groupImage"
              placeholder="Image URL"
              onChange={(e) => setValues(e)}
              
            />
          </div>
          <button className="hiddenSubmit" onClick={handleSubmit} type="submit">
            Hidden submit
          </button>
        </form>
      </div>

      <div className="addCard__options">
        <div className="addCard__option" onClick={handleSubmit}>
          <AddCardFrontButton
            Icon={SaveOutlinedIcon}
            title="Save"
            color="grey"
          />
        </div>
        <div className="addCard__option" onClick={handleCancel}>
          <AddCardFrontButton
            Icon={CancelOutlinedIcon}
            title="Cancel"
            color="grey"
          />
        </div>
      </div>
    </div>
  );
}

// Group name
// Description
export default AddCard;
