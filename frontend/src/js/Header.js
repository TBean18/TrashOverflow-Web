import React, { useContext, useState } from "react";
import logo from "../public/images/Trash_Overflow_Icon_Test.svg";
import "../css/Header.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PostOption from "./Post/PostOption";
import { GlobalContext } from "../context/GlobalState";
import useLogout from "../hooks/useLogout";
import useGroupLeave from "../hooks/useGroupLeave";
function Header(props) {
  //Prop destructuring defs
  const { isGroupView } = props;

  const { user, currentGroup } = useContext(GlobalContext);
  const logout = useLogout();
  const leaveGroup = useGroupLeave(GlobalContext);
  const [linkCopied, setLinkCopied] = useState(false);

  function copyLink() {
    setLinkCopied(true);
    // let link = "http://trashoverflow.tech/join/";
    let link = "localhost:3000/join/";
    if (currentGroup) {
      link += currentGroup._id;
    }
    navigator.clipboard.writeText(link);
    setTimeout(
      function () {
        setLinkCopied(false);
      }.bind(this),
      2000
    );
  }

  //Function used to leave the currently slected group
  function doLeaveGroup() {
    let leaving = window.confirm("You are Leaving a Group");
    if (!leaving) return;
    leaveGroup(currentGroup._id);
  }

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__info">
          <Avatar src={logo} />
          <h4>{user.name}</h4>
        </div>
      </div>

      <div className="header__center">
        <NavLink
          to="/chores"
          className="header__option header__option"
          activeClassName="header__option header__option--active"
        >
          <HomeIcon fontSize="large" />
        </NavLink>

        <NavLink
          to="/groups"
          className="header__option header__option"
          activeClassName="header__option header__option--active"
        >
          <SupervisedUserCircleOutlinedIcon fontSize="large" />
        </NavLink>
      </div>
      <div className="header__right">
        {/* Group Invite Link Button */}
        {isGroupView &&
          (linkCopied ? (
            <div className="header__rightCopiedLink">
              <p>Invite Link Copied</p>
            </div>
          ) : (
            <div className="header__rightGetLink" onClick={copyLink}>
              <p>Get Invite Link</p>
            </div>
          ))}
        {/* leave Group Button */}
        {isGroupView && (
          <div className="header__rightGetLink" onClick={doLeaveGroup}>
            <p>Leave Group</p>
          </div>
        )}

        {/* Logout Button */}
        <PostOption
          className="header__logout"
          Icon={ExitToAppIcon}
          title="Logout"
          color="grey"
          onClick={logout}
        />
      </div>
    </div>
  );
}

export default Header;
