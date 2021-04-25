import React, { useState, useContext } from "react";
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
import { GlobalContext } from "../../context/GlobalState";
import useLogout from "../../hooks/useLogout";
import useGroupLeave from "../../hooks/useGroupLeave";

const Sidebar = ({ isOpen, toggle, removeBlur, linkCopied, copyLink }) => {
  const logout = useLogout();
  const leaveGroup = useGroupLeave(GlobalContext);
  const { user, currentGroup } = useContext(GlobalContext);

  //Function used to leave the currently slected group
  function doLeaveGroup() {
    let leaving = window.confirm("You are Leaving a Group");
    if (!leaving) return;
    leaveGroup(currentGroup._id);
  }

  function handleOnClick() {
    toggle();
    removeBlur();
  }

  return (
    <SidebarContainer isOpen={isOpen} onClick={handleOnClick}>
      <Icon onClick={handleOnClick}>
        <CloseIcon  />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          {
            linkCopied ?
            (
              <SideButtonWrap>
                <div className="mobileSidebarText" onClick={copyLink}>
                  Link Copied!
                </div>
              </SideButtonWrap>
            )
            :
            (
              <SideButtonWrap>
                <div className="mobileSidebarText" onClick={copyLink}>
                  Get Invite Link
                </div>
              </SideButtonWrap>
            )
          }
          
          <SidebarRoute className="mobileSidebarText" to="/mobilemembers">View Members</SidebarRoute>          
          <SideButtonWrap>
            <div className="mobileSidebarText" onClick={doLeaveGroup}>
              Leave Group
            </div>
          </SideButtonWrap>
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
