import React, { useState } from "react";
import "../../css/Post.css";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
// import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
// import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import PostOption from "./PostOption";
// import MemberWindow from "../MemberWindow/MemberWindow";
import MyCalendar from "../MyCalendar";
import onClickOutside from "react-onclickoutside";
// import SaveAltIcon from "@material-ui/icons/SaveAlt";
import MemberWindowFunc from "../MemberWindow/MemberWindowFunc";
import useComponentVisible from "../../hooks/useComponentVisible";
import { useChoreDeletion } from "../../hooks/useChoreDeletion";
import { useChoreEditor } from "../../hooks/useChoreEditor";
import { useParams } from "react-router-dom";

function Chore(props) {
  //Prop Destructuring Definitions
  const {
    profilePic,
    image,
    taskTitle,
    timestamp,
    message,
    points,
    members,
    chore_ID,
  } = props;

  //Get Group_ID from the URL Param
  const { group_ID } = useParams();

  //Visibility State
  const [hidden, setHidden] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [showPoints, setShowPoints] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [hidMembersBlur, setHidMembersBlur] = useState(false);

  // Custom hook used to collapse on offClick
  // useComponentVisible returns => {ref, isComponentVisible, setIsComponentVisible}
  const memberWindowVis = useComponentVisible(false);
  const expandedVis = useComponentVisible(false);

  //Input State
  const [newName, setNewName] = useState();
  const [newPointVal, setNewPointVal] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  // For the assigned members we must start with the intial members array
  // We will handle adding and deleting from this array in the groupMember window Component
  const [assignedMembers, setAssignedMembers] = useState(members);
  const [newDate, setNewDate] = useState();

  // Chore API Hooks
  const removeChore = useChoreDeletion();
  const editChore = useChoreEditor();

  function expand() {
    expandedVis.setIsComponentVisible(true);
  }
  function toggleMembers() {
    memberWindowVis.setIsComponentVisible(!memberWindowVis.isComponentVisible);
  }
  function hideMembers() {
    setShowMembers(false);
  }
  function toggleCalendar() {
    setShowCalendar(!showCalendar);
  }
  function hideMessage() {
    setShowDelete(false);
    setShowMessage(false);
  }
  function revealMessage() {
    setShowMessage(true);
  }
  function hidePoints() {
    setShowDelete(false);
    setShowPoints(false);
  }
  function revealPoints() {
    setShowPoints(true);
  }
  function hideTitle() {
    setShowDelete(false);
    setShowTitle(false);
  }
  function revealTitle() {
    setShowTitle(true);
  }

  function toggleDropdown(e) {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  }

  function toggleDelete() {
    setShowDelete(!showDelete);
    setShowMessage(true);
    setShowPoints(true);
    setShowTitle(true);
    setShowDropdown(false);
  }
  const handleClickOutside = () => {
    memberWindowVis.setIsComponentVisible(false);
    setShowMessage(true);
    setShowPoints(true);
    setShowTitle(true);
    setShowDelete(false);
  };
  const handleDone = (e) => {
    setHidden(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setShowMessage(true);
    setShowPoints(true);
    setShowTitle(true);
  };
  const handleDelete = (e) => {
    setHidden(true);
    removeChore({
      group_ID,
      chore_ID,
    });
  };
  // This is the function that will handle the saving of an edited chore
  const handleSave = (e) => {
    //We need to send an API req to save the chore server side

    //Setting the state for hidden and unhidden components
    expandedVis.setIsComponentVisible(false);
    setShowMessage(true);
    setShowPoints(true);
    setShowTitle(true);
    setShowDelete(false);
  };

  // This is the function that will handle the cancel button while editing chores
  const handleCancel = (e) => {
    //Setting the state for hidden and unhidden components

    expandedVis.setIsComponentVisible(false);
    setShowMessage(true);
    setShowPoints(true);
    setShowTitle(true);
    setShowDelete(false);
  };

  return (
    <div
      ref={expandedVis.ref}
      className={`row ${
        hidden
          ? "post-hidden"
          : expandedVis.isComponentVisible
          ? "post-expanded"
          : "post"
      }`}
    >
      <div className="post__top" onClick={expand}>
        <div className="post__topTitle">
          {showTitle ? (
            <h3 onClick={expandedVis.isComponentVisible ? hideTitle : null}>
              {taskTitle === undefined ? "No Title" : taskTitle}
            </h3>
          ) : (
            <form>
              <input
                type="text"
                placeholder={taskTitle}
                onBlur={() => revealTitle()}
                onFocus={() => hideTitle()}
                tabIndex="0"
              />
              <button onClick={handleSubmit} type="submit">
                Hidden submit
              </button>
            </form>
          )}
          <div className="post__points">
            <p>Points:</p>
            {showPoints ? (
              <p onClick={expandedVis.isComponentVisible ? hidePoints : null}>
                {points === undefined ? "None" : points}
              </p>
            ) : (
              <form>
                <input
                  type="text"
                  placeholder={points}
                  onBlur={() => revealPoints()}
                  onFocus={() => hidePoints()}
                  tabIndex="0"
                />
                <button onClick={handleSubmit} type="submit">
                  Hidden submit
                </button>
              </form>
            )}
          </div>
        </div>
        <div className="post__topRight">
          <div className="post__topRightDate">
            <p>Due: 04/23/2021</p>
          </div>

          {expandedVis.isComponentVisible ? (
            <div className="post__dropdown">
              <p>Repeats:</p>
              <div className="post__dropdownButton" onClick={toggleDropdown}>
                <PostOption
                  Icon={ArrowDropDownOutlinedIcon}
                  title="Weekly"
                  color="grey"
                />
              </div>
              {showDropdown && expandedVis.isComponentVisible ? (
                <div className="post__dropdownMenu">
                  <button>Daily</button>
                  <button>Weekly</button>
                  <button>Monthly</button>
                  <button>Annually</button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="post__topRightPoints">
              <p>Repeats: Weekly</p>
            </div>
          )}
        </div>
      </div>
      <div
        className={`row ${
          expandedVis.isComponentVisible ? "post__body-expanded" : "post__body"
        }`}
        onClick={expand}
      >
        <div className="post__bodyDescription">
          <h4>Description</h4>
          <div className="post__bodyDescriptionMessage">
            {showMessage ? (
              <p onClick={hideMessage}>{message}</p>
            ) : (
              <div className="post__bodyDescriptionMessageInput">
                <form>
                  <textarea
                    onBlur={() => revealMessage()}
                    onFocus={() => hideMessage()}
                    tabIndex="0"
                  >
                    {message}
                  </textarea>
                </form>
              </div>
            )}
          </div>
        </div>
        <div className="post__bodyRight">
          <div className="post__bodyRightMembers" onClick={toggleMembers}>
            <PostOption
              Icon={AccountCircleOutlinedIcon}
              title="Members"
              color="grey"
            />
          </div>
          {memberWindowVis.isComponentVisible && (
            <MemberWindowFunc
              refForward={memberWindowVis.ref}
              hideMembers={hideMembers}
              eventTypes={["mouseup"]}
              members={props.members}
            />
          )}

          <div className="post__bodyRightDate" onClick={toggleCalendar}>
            <PostOption Icon={TodayOutlinedIcon} title="Date" color="grey" />
          </div>
          {showCalendar && <MyCalendar />}

          <div className="post__bodyRightDone" onClick={handleDone}>
            <PostOption Icon={DoneAllOutlinedIcon} title="Done" color="grey" />
          </div>
          <div className="post__bodyRightDone">
            {showDelete ? (
              <div>
                <div
                  className="post__bodyRightDeleteConfirm"
                  onClick={handleDelete}
                >
                  <p>Delete?</p>
                </div>
                <div
                  className="post__bodyRightDeleteCancel"
                  onClick={toggleDelete}
                >
                  <p>Cancel</p>
                </div>
              </div>
            ) : (
              <div className="post__bodyRightDelete" onClick={toggleDelete}>
                <PostOption
                  Icon={DeleteOutlineOutlinedIcon}
                  title="Delete"
                  color="grey"
                />
              </div>
            )}
          </div>
          <div className="post__bodyRightSave">
            {!showMessage || !showPoints || !showTitle ? (
              <div>
                <div className="post__bodyRightSaveButton" onClick={handleSave}>
                  <p>Save</p>
                </div>
                <div
                  className="post__bodyRightDeleteCancel"
                  onClick={handleCancel}
                >
                  <p>Cancel</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="post__image">
        <img src={image} alt="" />
      </div>
    </div>
  );
}

export default Chore;
