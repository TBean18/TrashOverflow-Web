import React, { useContext } from "react";
import logo from "../public/images/Trash_Overflow_Icon_Test.svg";
import "../css/Header.css";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import { Avatar } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PostOption from "./Post/PostOption";
import { GlobalContext } from "../context/GlobalState";
function Header() {
  const { user } = useContext(GlobalContext);

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
        <PostOption
          className="header__logout"
          Icon={ExitToAppIcon}
          title="Logout"
          color="grey"
        />
      </div>
    </div>
  );
}

export default Header;
