import { Avatar } from '@material-ui/core'
import { AccountCircle, ChatBubbleOutlineOutlined, ExpandMoreOutlined, ThumbUp } from '@material-ui/icons'
import React from 'react'
import "../css/Post.css"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          expanded: false,
        }
        this.toggleExpanded = this.toggleExpanded.bind(this);
      }
      toggleExpanded() {
        this.setState({ expanded: !this.state.expanded, });
      }

    render() {
        const {
            profilePic, image, taskTitle, timestamp, message
        } = this.props;

        return (
            <div 
                className={`row ${this.state.expanded ? 'post-expanded' : 'post'}`}
                >
                <div className="post__top" onClick={this.toggleExpanded}>
                    <div className="post__topTitle">                    
                        <h3>{taskTitle}</h3> 
                        <p>Points: 47</p>                              
                    </div>
                    <div className="post__topRight">
                        <div className="post__topRightDate">
                            <p>Due: 04/23/2021</p>
                        </div>
                        <div className="post__topRightPoints">
                            <p>Repeats: Weekly</p>
                        </div>
                    </div>
                </div>
                <div className="post__body" onClick={this.toggleExpanded}>
                    <div className="post__bodyDescription">
                        <p>{message}</p>
                    </div>
                    <div className="post__bodyAssignedUsers">
                        <ul>Jo Johnson</ul>
                        <ul>Sam Eslick</ul>
                        <ul>Philip</ul>
                    </div>
                </div>

                <div className="post__image" onClick={this.toggleExpanded}>
                    <img src={image} alt="" />
                </div>

                <div className="post__options">
                    <div className="post__option">
                        <ThumbUpIcon />
                        <p>Like</p>
                    </div>
                    <div className="post__option">
                        <ChatBubbleOutlineOutlinedIcon />
                        <p>Comment</p>
                    </div>
                    <div className="post__option">
                        <NearMeIcon />
                        <p>Share</p>
                    </div>
                    <div className="post__option">
                        <AccountCircleIcon />
                        <ExpandMoreOutlinedIcon />
                    </div>
                </div>
            </div>
        )
    }
}

export default Post
