import React from 'react'
import './GroupCardMember.css'

function GroupCardMember({name, points}) {
    return (
        <div className="groupCardMember">
            <p>{name}: {points}</p>
        </div>
    )
}

export default GroupCardMember