import React, { useContext } from "react";
import "../../css/MemberWindow.css";
import MemberWindowMember from "./MemberWindowMember";
import { GlobalContext } from "../../context/GlobalState";

function MemberWindowFunc(props) {
  const { currentGroup } = useContext(GlobalContext);
  const { members } = props;

  MemberWindowFunc.handleClickOutside = () => {
    this.props.hideMembers();
  };

  // componentDidMount() {
  //   this.initGroup();
  // }

  // function initGroup() {
  //   const context = this.context;
  //   const group = context.currentGroup;
  //   this.setState({ group });
  // }

  // Display the members passed as props
  // These are the groupMembers who will at somepoint perform the chore
  // Thus, all of these members should be displayed with a checkmark nex to their name (assigned = {true})
  function displayAssignedMembers() {
    if (!Array.isArray(members)) return;
    return members.map((member) => (
      <MemberWindowMember name={member.user_name} assigned={true} />
    ));
  }

  //Display the remaining members are are not assigned to the task
  // These members are displayed without a checkmark
  function displayRemainingMembers() {
    const allMembers = currentGroup.group_members;

    if (!Array.isArray(members) || !Array.isArray(allMembers)) return;

    //Find the relative complement of the group_members and assigned_user_pool
    const remainingMembers = allMembers.filter((member) =>
      members.every((assignedMember) => !member._id == assignedMember._id)
    );
    return remainingMembers.map((member) => (
      <MemberWindowMember name={member.user_name} assigned={false} />
    ));
  }

  return (
    <div ref={props.refForward}>
      <div className="memberWindow">
        <div className="memberWindow__top">
          <h4>Members</h4>
        </div>
        <div className="memberWindow__body">
          <div className="memberWindow__bodyInput">
            <input placeholder="Search Members" type="text" />
          </div>
          <div className="memberWindow__member">
            {displayAssignedMembers()}
            {displayRemainingMembers()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberWindowFunc;
