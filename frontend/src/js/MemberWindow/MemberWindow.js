import React from "react";
import "../../css/MemberWindow.css";
import MemberWindowMember from "./MemberWindowMember";
import JoIcon from "../../public/images/JoIcon.png";
import onClickOutside from "react-onclickoutside";
import { GlobalContext, GlobalProvider } from "../../context/GlobalState";

class MemberWindow extends React.Component {
  static contextType = GlobalContext;

  handleClickOutside = () => {
    this.props.hideMembers();
  };

  componentDidMount() {
    const { currentGroup } = this.context;
    console.log(currentGroup);
  }

  render() {
    const { members } = this.props;

    //Display the members passed as props
    function displayAssignedMembers(members) {
      if (!Array.isArray(members)) return;
      return members.map((member) => (
        <MemberWindowMember name={member.user_name} assigned={true} />
      ));
    }

    //Display the remaining members without a checkmark
    function displayRemainingMembers() {
      if (
        !Array.isArray(members) ||
        !Array.isArray(this.currentGroup.group_members)
      )
        return;

      //Find the relative complement of the group_members and assigned_user_pool
      return members.map((member) => (
        <MemberWindowMember name={member.user_name} assigned={false} />
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
              {displayAssignedMembers(members)}
              {/* {displayRemainingMembers()} */}
              <MemberWindowMember src={JoIcon} name="Jo Johnson" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(MemberWindow);
