import React from "react";
import "../../css/MemberWindowMember.css";
import { Avatar } from "@material-ui/core";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeConsumer } from "styled-components";

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

function MemberWindowMember({ src, name }) {
  const color = colorGenerator(name);
  const props = {
    backgroundColor: color,
  };
  const classes = useStyles(props);

  let abrev = "";
  name.split(" ").map((word) => {
    abrev += word.charAt(0).toUpperCase();
  });
  return (
    <div className="memberWindowMember">
      <Avatar className={classes.CustomColors}>{abrev}</Avatar>

      <h4>{name}</h4>
      <DoneOutlinedIcon />
    </div>
  );
}

export default MemberWindowMember;
