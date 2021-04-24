import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SideButtonWrap,
  SidebarRoute,
} from "./MobileSidebarElements";

import useLogout from "../../hooks/useLogout";

const Sidebar = ({ isOpen, toggle }) => {
  const logout = useLogout();
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="about" onClick={toggle}>
            About
          </SidebarLink>
          <SidebarLink to="discover" onClick={toggle}>
            Our App
          </SidebarLink>
          <SidebarLink to="services" onClick={toggle}>
            Features
          </SidebarLink>
          <SidebarLink to="mobile" onClick={toggle}>
            <SidebarRoute to="/mobilemembers">View Members</SidebarRoute>
          </SidebarLink>
        </SidebarMenu>
        <SideButtonWrap>
          <div className="logOut" onClick={logout}>
            Log Out
          </div>
        </SideButtonWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;
