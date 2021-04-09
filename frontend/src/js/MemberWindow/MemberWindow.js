import React from "react";
import "../../css/MemberWindow.css";
import MemberWindowMember from "./MemberWindowMember";
import JoIcon from "../../public/images/JoIcon.png";
import onClickOutside from "react-onclickoutside";

class MemberWindow extends React.Component {
  handleClickOutside = () => {
    this.props.hideMembers();
  };

  render() {
    const { members } = this.props;

    function displayMembers(members) {
      if (!Array.isArray(members)) return;
      return members.map((member) => (
        <MemberWindowMember name={member.user_name} />
      ));
    }

    return (
      <div>
        <div className="memberWindow">
          <div className="memberWindow__top">
            <h4>Members</h4>
          </div>
          <div className="memberWindow__body">
            <div className="memberWindow__bodyInput">
              <input placeholder="Search Members" type="text" />
            </div>
            <div className="memberWindow__member">
              {displayMembers(members)}
              <MemberWindowMember src={JoIcon} name="Jo Johnson" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(MemberWindow);
