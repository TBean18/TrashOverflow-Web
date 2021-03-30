import React from 'react'
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import './AddCard.css'

function AddCard() {
    return (
        <div className="addCard__initial">
            <IconButton>
                <AddIcon />
            </IconButton>
        </div>
    )
}

export default AddCard
