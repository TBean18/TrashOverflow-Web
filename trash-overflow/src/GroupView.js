import React from 'react'
import './GroupView.css'
import Header from './Header'
import GroupList from './GroupList'
import Sidebar from './Sidebar'

function GroupView() {
    return (
        <div className="groupView">
            <Header />
        
            <div className="groupView__body">
                <Sidebar />
                <GroupList />                
            </div>
        </div>
    )
}

export default GroupView
