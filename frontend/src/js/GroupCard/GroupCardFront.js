import React from "react";
import "../../css/GroupCardFront.css";
import GroupCardAdmin from "../../../src/components/GroupView/GroupCardAdmin";

function GroupCardFront({ image, curGroup }) {
  function displayAdmins() {
    if (!Array.isArray(curGroup.group_members)) return;
    let members = curGroup.group_members;
    // Filter out the admin users
    let admins = members.filter((member) => member.admin);
    return admins.map((admin) => <GroupCardAdmin name={admin.user_name} />);
  }

  const colorGenerator = (name) => {
    if (!name) return "1";

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  };

  const curColor = colorGenerator(curGroup.group_name);

  return (
    <div className="groupCardFront">
      <div
        className="groupCardFront__top"
        style={
          image
            ? { backgroundImage: `url(${image})` }
            : { backgroundColor: `hsl(${curColor}, 50%, 50%)` }
        }
      >
        {image ? (
          <h3>{curGroup.group_name}</h3>
        ) : (
          <h3 style={{ color: "white" }}>{curGroup.group_name}</h3>
        )}
      </div>
      <div className="groupCardFront__body">
        <div className="groupCardFront__bodyInfoTop">
          <p>Admins:</p>
        </div>
        <div className="groupCardFront__bodyInfoBottom">
          <div className="groupCardFront__admins">
            {displayAdmins()}
            {/* <GroupCardAdmin name="Taylor Bean"/>
                        <GroupCardAdmin name="Not Taylor"/>
                        <GroupCardAdmin name="Raylor Steam"/>
                        <GroupCardAdmin name="Naylor Beam"/>
                        <GroupCardAdmin name="Saylor Ream"/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupCardFront;
