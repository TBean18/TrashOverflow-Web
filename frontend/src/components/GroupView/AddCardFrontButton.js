import React from 'react'
import './AddCardFrontButton.css'

function AddCardFrontButton({Icon, title, color}) {
    return (
        <div className="addCardFrontButton" style={{color: color}}>
            {Icon && <Icon />}
            <p>{title}</p>
        </div>
    )
}

export default AddCardFrontButton