import React from 'react'

import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import './AddCard.css'
import AddCardFront from './AddCardFront'
import AddCardFrontButton from './AddCardFrontButton'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

class AddCard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          adding: false,
          isFlipped: false,
        }
        this.toggleAdding = this.toggleAdding.bind(this);
    }

    toggleAdding() {
        this.setState({ adding: !this.state.adding, });
    }

    render() {

        return (
            
            <div className={`row ${this.state.adding ? 'addCard' : 'addCard__initial'}`} onClick={!this.state.adding ? this.toggleAdding : ''}>
                <IconButton onClick={this.toggleAdding}>
                    <AddIcon />
                </IconButton>
                <div className="addCard__front">
                    <AddCardFront />                        
                </div>
                <div className="addCard__options">
                    <div className="addCard__option" onClick={this.toggleAdding}>
                        <AddCardFrontButton Icon={SaveOutlinedIcon} title="Save" color="grey"/>
                    </div>
                    <div className="addCard__option" onClick={this.toggleAdding}>
                        <AddCardFrontButton Icon={CancelOutlinedIcon} title="Cancel" color="grey"/>
                    </div>
                </div>
            </div>
        )
    }
}

// Group name
// Description
export default AddCard
