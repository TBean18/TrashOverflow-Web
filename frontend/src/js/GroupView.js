import React from 'react';
import '../css/GroupView.css';
import Header from './Header';
import GroupList from './GroupList';
import Sidebar from './Sidebar/Sidebar';

function GroupView() {
  return (
    <div className="groupView">
      <Header selection={2} />

      <div className="groupView__body">
        <Sidebar />
        <GroupList />
      </div>
    </div>
  );
}

export default GroupView;
