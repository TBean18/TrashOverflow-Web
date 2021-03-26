import React from 'react'
import ReactCardFlip from 'react-card-flip';

import GroupCardFront from './GroupCardFront';
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
