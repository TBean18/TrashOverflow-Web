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
function Header() {
  const { user } = useContext(GlobalContext);
  const logout = useLogout();
  const [linkCopied, setLinkCopied] = useState(false);

  function copyLink() {
    setLinkCopied(true);

    setTimeout(function(){
      setLinkCopied(false);
    }.bind(this),2000);
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
        {
          linkCopied ?
          (
            <div
              className="header__rightCopiedLink"
              
            >
              <p>Invite Link Copied</p>
            </div>
          )
          :
          (
            <div
              className="header__rightGetLink"
              onClick={copyLink}
            >
              <p>Get Invite Link</p>
            </div>
          )

        }

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
