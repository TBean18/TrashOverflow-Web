import React from 'react'
import './GroupCardAdmin.css'

function GroupCardAdmin({ name }) {
    return (
        <div className="GroupCardAdmin">
            <ul>{name}</ul>
        </div>
    )
}

export default GroupCardAdmin
