import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import './AddCard.css'
import AddCardFront from './AddCardFront'
import AddCardFrontButton from './AddCardFrontButton'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {useGroupCreation} from '../../hooks/useGroupCreation';
import {useForm} from '../../hooks/useForm';

function AddCard() {
    // Fragment from when this used to be a class based component
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //       adding: false,
    //       isFlipped: false,
    //     }
    //     this.toggleAdding = this.toggleAdding.bind(this);
    // }

    const [adding, setAdding] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const [input, setInput] = useState("");
    const [values, setValues] =
    
    function toggleAdding() {
        setAdding(!adding);
    }
    
    const handleSubmit = e => {
        e.preventDefault();

        // DB stuff

        setInput("");
    }

    console.log('test');
    return (
        
        <div className={`row ${adding ? 'addCard' : 'addCard__initial'}`} onClick={!adding ? toggleAdding : null}>
            <IconButton>
                <AddIcon />
            </IconButton>

            <div className="addCard__front">
                <form>
                    <div className="addCardFront__groupName">
                        <input type="text" placeholder="Group Name"/>  
                    </div>
                    <div className="addCardFront__groupDescription">
                        <textarea type="text" rows="5" placeholder="Description"/>  
                    </div>
                    <button className="hiddenSubmit" onClick={handleSubmit} type="submit">
                        Hidden submit
                    </button>
                </form>  
            </div>

            <div className="addCard__options">
                <div className="addCard__option" onClick={toggleAdding}>
                    <AddCardFrontButton Icon={SaveOutlinedIcon} title="Save" color="grey"/>
                </div>
                <div className="addCard__option" onClick={toggleAdding}>
                    <AddCardFrontButton Icon={CancelOutlinedIcon} title="Cancel" color="grey"/>
                </div>
            </div>
        </div>
    )
}

// Group name
// Description
export default AddCard
