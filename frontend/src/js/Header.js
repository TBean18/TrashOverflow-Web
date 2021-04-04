import React from 'react';
import logo from '../public/images/logo.png';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header({ selection }) {
  return (
    <div className="header">
      <div className="header__left">
        <img src={logo} alt="tester" />

        <div className="header__input">
          <SearchIcon />
          <input placeholder="Search TrashOverflow" type="text" />
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

        <NavLink
          to="/temp1"
          className="header__option header__option"
          activeClassName="header__option header__option--active"
        >
          <SubscriptionsOutlinedIcon fontSize="large" />
        </NavLink>

        <NavLink
          to="/temp2"
          className="header__option header__option"
          activeClassName="header__option header__option--active"
        >
          <StorefrontOutlinedIcon fontSize="large" />
        </NavLink>

        <NavLink
          to="/tempj3"
          className="header__option header__option"
          activeClassName="header__option header__option--active"
        >
          <FlagIcon fontSize="large" />
        </NavLink>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar />
          <h4>jojohnson.jsj</h4>
        </div>

        <IconButton>
          <AddIcon />
        </IconButton>
        <IconButton>
          <ForumIcon />
        </IconButton>
        <IconButton>
          <NotificationsActiveIcon />
        </IconButton>
        <IconButton>
          <ExpandMoreIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Header;
