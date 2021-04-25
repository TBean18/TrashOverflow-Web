import React, { useContext } from 'react';
import JoIcon from '../../public/images/JoIcon.png';
import '../../css/Sidebar.css';
import SidebarRow from './SidebarRow';
import { GlobalContext } from "../../context/GlobalState";

function Sidebar() {
  const { currentGroup } = useContext(GlobalContext);

  function displayMembers() {
    if (!Array.isArray(currentGroup.group_members)) return;
    return currentGroup.group_members.map((member) => (
      <SidebarRow 
        name={member.user_name}
        admin={member.admin}
        points={member.point_balance}
      />
    ));
  }

  return (
    <div className="sidebar">
      {displayMembers()}
    </div>
  );
}

export default Sidebar;
