import React from 'react';
import JoIcon from '../../public/images/JoIcon.png';
import '../../css/Sidebar.css';
import SidebarRow from './SidebarRow';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarRow src={JoIcon} name="Bo Johnson" />
      <SidebarRow name="Page Leonard" />
      <SidebarRow name="Franz Eber" />
      <SidebarRow name="Moses Malone" />
      <SidebarRow name="Karl Maphoney" />
      <SidebarRow name="Victoria Justice" />
      <SidebarRow name="Draymond Green" />
    </div>
  );
}

export default Sidebar;
