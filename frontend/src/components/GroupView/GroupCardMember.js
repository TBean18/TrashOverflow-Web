import React from 'react'
import './GroupCardMember.css'

function GroupCardMember({name, points}) {
    return (
        <div className="groupCardMember">
            <ul>{name}: {points}</ul>
        </div>
    )
}

export default GroupCardMember