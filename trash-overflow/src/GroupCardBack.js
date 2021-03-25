import React from 'react'
import './GroupCardBack.css'

function GroupCardBack({ profilePic, groupname, timestamp, message }) {
    return (
        <div className="groupCard">
        <div className="groupCard__body">
            <div className="groupCard__bodyInfo" >
                <h3>{groupname}</h3>
            </div>
        </div>
        <div className="groupCard__bottom">
        </div>
    </div>
    )
}

export default GroupCardBack
