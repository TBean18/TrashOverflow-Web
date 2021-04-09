import React, { useContext } from 'react';
import '../../css/GroupCardBack.css';

import { GlobalContext } from '../../context/GlobalState';
import 'react-awesome-button/dist/themes/theme-blue.css';
import GroupCardMember from '../../components/GroupView/GroupCardMember';

function GroupCardBack({ curGroup }) {
  const { groups } = useContext(GlobalContext);

  function displayMembers(group) {
    let members = group.group_members;
    if (!Array.isArray(members)) return;
    return members.map((member) => (
      <GroupCardMember name={member.user_name} points={member.point_balance} />
    ));
  }

  return (
    <div className="groupCardBack">
      <div className="groupCardBack__top">
        <div className="groupCardBack__topInfo">
          <h3>{curGroup.group_name}</h3>
        </div>
      </div>
      <div className="groupCardBack__body">
        <h4>Description</h4>
        <p>There is no tracking information for the current branch.
           Please specify which branch you want to merge with.
           See git-pull(1) for details.
        </p>
      </div>
      <div className="groupCardBack__bottom">
        <h4>Members:</h4>
        <>{displayMembers(groups)}</>
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
        <GroupCardMember name="Jason Terry" points={31} />
      </div>
    </div>
  );
}

export default GroupCardBack;
