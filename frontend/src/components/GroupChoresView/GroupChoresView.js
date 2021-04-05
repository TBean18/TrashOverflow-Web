import React from 'react'
import './GroupChoresView.css';
import GroupChoresList from './GroupChores/GroupChoresList'
import Header from '../../js/Header';

function GroupChoresView() {
    return (
        <div className="groupChoresView">
            <Header selection={1}/>
      
      <div className="groupChoresView__body">
        <GroupChoresList />
      </div>
        </div>
    )
}

export default GroupChoresView