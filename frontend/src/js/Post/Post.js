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
import onClickOutside from 'react-onclickoutside';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showMembers: false,
      showCalendar: false,
      showMessage: true,
      hidMembersBlur: false,
    };
    this.expand = this.expand.bind(this);
    this.toggleMembers = this.toggleMembers.bind(this);
    this.hideMembers = this.hideMembers.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.hideMessage = this.hideMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
  }
  expand() {
    this.setState({ expanded: true });
  }

  toggleMembers() {
    this.setState({ showMembers: !this.state.showMembers });
  }
  hideMembers() {
    this.setState({ showMembers: false });
  }
  toggleCalendar() {
    this.setState({ showCalendar: !this.state.showCalendar });
  }
  hideMessage() {
    this.setState({ showMessage: false });
  }
  showMessage() {
    this.setState({ showMessage: true });
  }
  handleClickOutside = () => {
    this.setState({ expanded: false, showMessage: true });
  }

  render() {
    const { profilePic, image, taskTitle, timestamp, message } = this.props;
    return (
      <div
        className={`row ${this.state.expanded ? "post-expanded" : "post"}`}
      >
        <div className="post__top" onClick={this.expand}>
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
          }`} onClick={this.expand}
        >
          <div className="post__bodyDescription">
            <h4>Description</h4>
            <div className="post__bodyDescriptionMessage">
              {
                this.state.showMessage ? <p onClick={this.hideMessage}>{message}</p> : 
                <textarea
                  onBlur={() => this.showMessage()}
                  onFocus={() => this.hideMessage()}        
                  tabIndex="0"
                >
                  {message}
                </textarea>
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
            {this.state.showMembers && <MemberWindow hideMembers={this.hideMembers} eventTypes={['mouseup']}/>}

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

export default onClickOutside(Post);
