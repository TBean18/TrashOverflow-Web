import React, { useContext } from "react";
import "../../css/GroupCardBack.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { GlobalContext } from "../../context/GlobalState";
import "react-awesome-button/dist/themes/theme-blue.css";
import GroupCardMember from "../../components/GroupView/GroupCardMember";
import PostOption from "../Post/PostOption";
import { NavLink } from "react-router-dom";

function GroupCardBack({ curGroup }) {
  const { selectGroup } = useContext(GlobalContext);
  const groupChoresURL = `/groupchores/${curGroup._id}`;
  function displayMembers(group) {
    let members = group.group_members;
    if (!Array.isArray(members)) return;
    return members.map((member) => (
      <GroupCardMember name={member.user_name} points={member.point_balance} />
    ));
  }

  return (
    <div className="groupCardBack">
      <div className="groupCardBack__body">
        <h4>Description</h4>
        <p>{curGroup.group_description}</p>
      </div>
      <div className="groupCardBack__bottom">
        <h4>Members</h4>
        <div className="groupCardBack__bottomMembers">
          <>{displayMembers(curGroup)}</>
          <GroupCardMember name="Jason Terry" points={31} />
          <GroupCardMember name="Jason Terry" points={31} />
        </div>
      </div>
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
        <PostOption Icon={EditOutlinedIcon} title="Edit" color="grey" />
      </div>
    </div>
  );
}

export default GroupCardBack;
