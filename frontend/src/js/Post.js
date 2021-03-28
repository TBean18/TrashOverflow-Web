import { Avatar } from '@material-ui/core'
import { AccountCircle, ChatBubbleOutlineOutlined, ExpandMoreOutlined, ThumbUp } from '@material-ui/icons'
import React from 'react'
import "../css/Post.css"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NearMeIcon from '@material-ui/icons/NearMe';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import PostOption from './PostOption';
import MemberWindow from './MemberWindow';

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
                <div className={`row ${this.state.expanded ? 'post__body-expanded' : 'post__body'}`}>
                    <div className="post__bodyDescription" onClick={this.toggleExpanded}>
                        <h4>Description</h4>
                        <p>{message}</p>
                    </div>
                    <div className="post__bodyRight">
                        <div className="post__bodyRightMembers">
                            <PostOption Icon={AccountCircleOutlinedIcon} title="Members" color="grey"/>
                        </div>
                        {/*
                        <div className="post__bodyRightEdit">
                            <PostOption Icon={EditOutlinedIcon} title="Edit" color="grey"/>
                        </div>
                        */}
                        <div className="post__bodyRightDone">
                            <PostOption Icon={DoneAllOutlinedIcon} title="Done" color="grey"/>
                        </div>
                        <div className="post__bodyRightDone">
                            <PostOption Icon={DeleteOutlineOutlinedIcon} title="Delete" color="grey"/>
                        </div>
                        {/*
                        <div className="post__bodyAssignedUsers">
                            <ul>Jo Johnson</ul>
                            <ul>Sam Eslick</ul>
                            <ul>Philip</ul>
                        </div>
                        */}
                    </div>
                </div>

                <div className="post__image" onClick={this.toggleExpanded}>
                    <img src={image} alt="" />
                </div>

                {/*<MemberWindow />*/}
            </div>
        )
    }
}

export default Post
