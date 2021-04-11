import React from 'react';
import logo from '../public/images/logo.png';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostOption from './Post/PostOption';

function Header({ selection }) {
  return (
    <div className="header">
      <div className="header__left">
      <div className="header__info">
          <Avatar />
          <h4>jojohnson.jsj</h4>
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
