import React, { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm";
import "../../css/GroupCardBack.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { GlobalContext } from "../../context/GlobalState";
import "react-awesome-button/dist/themes/theme-blue.css";
import GroupCardMember from "../../components/GroupView/GroupCardMember";
import PostOption from "../Post/PostOption";
import { NavLink } from "react-router-dom";
import useGroupEdit from "../../hooks/useGroupEdit";

function GroupCardBack({ curGroup, handleClick }) {
  const initialState = {
    group_name: curGroup.group_name,
    group_description: curGroup.group_description,
  };
  const { selectGroup } = useContext(GlobalContext);
  const groupChoresURL = `/groupchores/${curGroup._id}`;
  function displayMembers(group) {
    let members = group.group_members;
    if (!Array.isArray(members)) return;
    return members.map((member) => (
      <GroupCardMember name={member.user_name} points={member.point_balance} />
    ));
  }

  //Define State
  const [values, setValues, resetValues] = useForm(initialState);
  const [editing, setEditing] = useState(false);

  //API Hooks
  const editGroup = useGroupEdit();

  /*
  const handleCancel = (e) => {
    e.preventDefault();
    //reset the state values
    resetValues(initialState);

    //Flip the card
    setAdding(!adding);
  };
  */

  function editGroupCard() {
    setEditing(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    //newGroup(values.groupName, values.groupDescription);

    //Close the input boxes
    //setAdding(!adding);
  };

  const handleSave = (e) => {
    setEditing(false);

    // DB/API shit idk
    editGroup(curGroup._id, values.group_name, values.group_description);
  };

  const handleCancel = (e) => {
    setEditing(false);
    resetValues(initialState);
  };

  return (
    <div className="groupCardBack">
      <div
        className="groupCardBackNotButtons"
        onClick={!editing ? handleClick : null}
      >
        {!editing ? (
          <div className="groupCardBack__body">
            <h4>{curGroup.group_name}</h4>

            <div
              className="groupCardBack__bodyDescription"
              onClick={handleClick}
            >
              <p>{curGroup.group_description}</p>
            </div>
          </div>
        ) : (
          <div className="groupCardBack__body-editing">
            <form>
              <div className="groupCardBack__bodyEditGroupName">
                <input
                  type="text"
                  name="group_name"
                  placeholder={curGroup.group_name}
                  onChange={(e) => setValues(e)}
                  value={values.group_name}
                />
              </div>

              <div className="groupCardBack__bodyEditGroupDescription">
                <textarea
                  type="text"
                  rows="3"
                  name="group_description"
                  placeholder={curGroup.group_description}
                  onChange={(e) => setValues(e)}
                  value={values.group_description}
                />
              </div>

              <div className="groupCardBack__bodyEditGroupImage">
                <input
                  type="text"
                  name="groupImage"
                  placeholder="Image URL"
                  onChange={(e) => setValues(e)}
                  value="Image URL"
                />
              </div>

              <button onClick={handleSubmit} type="submit">
                Hidden submit
              </button>
            </form>
          </div>
        )}
        {!editing ? (
          <div className="groupCardBack__bottom" onClick={handleClick}>
            <h4>Members</h4>
            <div className="groupCardBack__bottomMembers" onClick={handleClick}>
              <>{displayMembers(curGroup)}</>
            </div>
          </div>
        ) : null}
      </div>
      {!editing ? (
        <div className="groupCardBack__button">
          <NavLink
            to={groupChoresURL}
            className="groupCardBack__buttonLink"
            style={{ textDecoration: "none" }}
          >
            <PostOption
              Icon={CheckCircleOutlineIcon}
              title="Select"
              color="grey"
              onClick={() => {
                selectGroup(curGroup);
              }}
            />
          </NavLink>

          <div className="groupCardBack__edit" onClick={editGroupCard}>
            <PostOption Icon={EditOutlinedIcon} title="Edit" color="grey" />
          </div>
        </div>
      ) : (
        <div className="groupCardBack__button">
          <div className="groupCardBack__saveButton" onClick={handleSave}>
            <p>Save</p>
          </div>

          <div className="groupCardBack__cancelButton" onClick={handleCancel}>
            <p>Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupCardBack;
