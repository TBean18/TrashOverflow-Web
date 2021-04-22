import React, { useState } from "react";
import "../../css/MemberWindowMember.css";
import { Avatar } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeConsumer } from "styled-components";
import useChoreAddMember from "../../hooks/useChoreAddMember";
import { GlobalContext } from "../../context/GlobalState";
import useChoreRemoveMember from "../../hooks/useChoreRemoveMember";

const useStyles = makeStyles((theme) => ({
  CustomColors: (props) => ({
    backgroundColor: `hsl(${props.backgroundColor}, 50%, 50%)`,
    // color: theme.palette.getContrastText(props.backgroundColor),
  }),
}));

const colorGenerator = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash % 360;
};

// --------------FUNCTIONAL COMPONENT----------------------------------------

function MemberWindowMember({ src, name, assigned, chore_ID, member_ID }) {
  const [isAssigned, setIsAssigned] = useState(assigned);
  const assignMember = useChoreAddMember(GlobalContext);
  const removeMember = useChoreRemoveMember(GlobalContext);

  const color = colorGenerator(name);
  const props = {
    backgroundColor: color,
  };
  const classes = useStyles(props);

  let abrev = "";
  name.split(" ").map((word) => {
    abrev += word.charAt(0).toUpperCase();
  });

  function removeMemberFromChore() {
    console.log("REMOVED");
    removeMember(chore_ID, member_ID);
  }

  function addMemberToChore() {
    console.log("ADDED");
    assignMember(chore_ID, member_ID);
  }

  function handleClick() {
    setIsAssigned(!isAssigned);
    if (isAssigned) removeMemberFromChore();
    else addMemberToChore();
  }
  return (
    <div className="memberWindowMember" onClick={() => handleClick()}>
      <Avatar className={classes.CustomColors}>{abrev}</Avatar>

      <h4>{name}</h4>
      {isAssigned && <DoneOutlinedIcon />}
    </div>
  );
}

export default MemberWindowMember;
