import { Avatar } from "@material-ui/core";
import {
  AccountCircle,
  ChatBubbleOutlineOutlined,
  ExpandMoreOutlined,
  ThumbUp,
} from "@material-ui/icons";
import React from "react";
import "../../css/Post.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import NearMeIcon from "@material-ui/icons/NearMe";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import PostOption from "./PostOption";
import MemberWindow from "../MemberWindow/MemberWindow";
import MyCalendar from "../MyCalendar";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showMembers: false,
      showCalendar: false,
      showMessage: true,
    };
    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.toggleMembers = this.toggleMembers.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.toggleMessage = this.toggleMessage.bind(this);
  }
  toggleExpanded() {
    this.setState({ expanded: !this.state.expanded });
  }
  toggleMembers() {
    this.setState({ showMembers: !this.state.showMembers });
  }
  toggleCalendar() {
    this.setState({ showCalendar: !this.state.showCalendar });
  }
  toggleMessage() {
    this.setState({ showMessage: !this.state.showMessage });
  }

  render() {
    const { profilePic, image, taskTitle, timestamp, message } = this.props;
    return (
      <div
        className={`row ${this.state.expanded ? "post-expanded" : "post"}`}
        onBlur={() => this.toggleExpanded()}
        onFocus={() => this.toggleExpanded()}
        tabIndex="0"
      >
        <div className="post__top">
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
        <div
          className={`row ${
            this.state.expanded ? "post__body-expanded" : "post__body"
          }`}
        >
          <div className="post__bodyDescription">
            <h4>Description</h4>
            <div className="post__bodyDescriptionMessage" onClick={this.toggleMessage} onFocus={this.toggleMessage} onBlur={this.toggleMessage}>
              {
                this.state.showMessage ? <p>{message}</p> : <textarea>{message}</textarea>
              }
            </div>
          </div>
          <div className="post__bodyRight">
            <div
              className="post__bodyRightMembers"
              onClick={this.toggleMembers}
            >
              <PostOption
                Icon={AccountCircleOutlinedIcon}
                title="Members"
                color="grey"
              />
            </div>
            <MemberWindow shown={this.state.showMembers ? true : false} />

            <div className="post__bodyRightDate" onClick={this.toggleCalendar}>
              <PostOption Icon={TodayOutlinedIcon} title="Date" color="grey" />
            </div>
            {this.state.showCalendar && <MyCalendar />}

            <div className="post__bodyRightDone">
              <PostOption
                Icon={DoneAllOutlinedIcon}
                title="Done"
                color="grey"
              />
            </div>
            <div className="post__bodyRightDone">
              <PostOption
                Icon={DeleteOutlineOutlinedIcon}
                title="Delete"
                color="grey"
              />
            </div>
          </div>
        </div>

        <div className="post__image">
          <img src={image} alt="" />
        </div>
      </div>
    );
  }
}

export default Post;
