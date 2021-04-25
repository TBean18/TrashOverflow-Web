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

const Sidebar = ({ isOpen, toggle }) => {
  const logout = useLogout();
  const leaveGroup = useGroupLeave(GlobalContext);
  const [linkCopied, setLinkCopied] = useState(false);
  const { user, currentGroup } = useContext(GlobalContext);

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
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SideButtonWrap>
            <div className="mobileSidebarText" onClick={copyLink}>
              Get Invite Link
            </div>
          </SideButtonWrap>
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
