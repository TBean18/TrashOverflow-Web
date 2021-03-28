import React from 'react'
import '../css/MemberWindowMember.css'
import { Avatar } from '@material-ui/core'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';

function MemberWindowMember({ src, name }) {
    return (
        <div className='memberWindowMember'> 
            {src && <Avatar src={src} />}
            <h4>{name}</h4>
            <DoneOutlinedIcon />
        </div>
    )
}

export default MemberWindowMember
