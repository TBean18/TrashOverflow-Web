import React from 'react'
import ReactCardFlip from 'react-card-flip';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { Avatar } from '@material-ui/core'
import GroupCardFront from './GroupCardFront';
import { render } from '@testing-library/react';
import GroupCardBack from './GroupCardBack';

class GroupCard extends React.Component {
    constructor() {
        super();
          this.state = {
          isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    

    handleClick(e) {
        e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        const {
            profilePic, image, groupname, timestamp, message
        } = this.props;

        return (
            <ReactCardFlip isFlipped={this.state.isFlipped}>
                <div onClick={this.handleClick}>
                    <GroupCardFront 
                        profilePic={profilePic}
                        message={message}
                        timestamp={timestamp}
                        groupname={groupname}
                        image={image}
                    />
                </div>

                <div onClick={this.handleClick}>
                    <GroupCardBack 
                        profilePic={profilePic}
                        message={message}
                        timestamp={timestamp}
                        groupname={groupname}
                        image={image}
                    />
                </div>
            </ReactCardFlip>
        );
    }
}

export default GroupCard;
