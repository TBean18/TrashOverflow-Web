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
      <SidebarRow name="Amazon's bananas" />
      <SidebarRow name="So Tired" />
      <SidebarRow name="Leinecker's History" />
      <SidebarRow name="Jason Terry'sBack" />
      <SidebarRow name="Many Users" />
      <SidebarRow name="React's Cool" />
      <SidebarRow name="But Difficult" />
      <SidebarRow name="Hate Webdev" />
      <SidebarRow name="Never Again" />
      <SidebarRow name="Except SeniorDesign" />
      <SidebarRow name="Just Maybe" />
      <SidebarRow name="That's Enough" />
    </div>
  );
}

export default Sidebar;
