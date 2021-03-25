import React from 'react'
import './GroupCardFront.css'

function GroupCardFront({ image, groupname }) {
    return (
        <div className="groupCardFront">
            <div className="groupCardFront__top" style={{backgroundImage: `url(${image})` }}>
                <h3>{groupname}</h3>
            </div>
            <div className="groupCardFront__body">
                <div className="groupCardFront__bodyInfoTop">   
                    <p>Admins:</p>
                </div>
                <div className="groupCardFront__bodyInfoBottom">
                    <div className="groupCardFront__admins">                
                        <ul>Taylor Bean</ul>
                        <ul>Rachel Dean</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupCardFront
