import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import '../../css/SidebarRow.css';
import { makeStyles } from "@material-ui/core/styles";
import useComponentVisible from "../../hooks/useComponentVisible";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

function SidebarRow({ src, name, admin, points }) {

  const editMemberVis = useComponentVisible(false);
  const [kickConfirmed, setKickConfirmed] = useState(false);
  const [promotionConfirmed, setPromotionConfirmed] = useState(false);
  const [kick, setKick] = useState(false);
  const [promote, setPromote] = useState(false);
  const [hidden, setHidden] = useState(false);

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

  function toggleEditMembers(e) {
    e.preventDefault();

    if (editMemberVis.isComponentVisible) return;
    editMemberVis.setIsComponentVisible(
      !editMemberVis.isComponentVisible
    );
    setKickConfirmed(false);
    setPromotionConfirmed(false);
  }

  function confirmKick() {
    setKickConfirmed(true);
    setPromotionConfirmed(false);
  }

  function confirmPromotion() {
    setPromotionConfirmed(true);
    setKickConfirmed(false);
  }

  function kickMember() {
    editMemberVis.setIsComponentVisible(false);
    setKick(true);
    setHidden(true);

    setKickConfirmed(false);
    setPromotionConfirmed(false);
    setPromote(false);
  }

  function promoteMember() {
    editMemberVis.setIsComponentVisible(false);
    setPromote(true);

    setKickConfirmed(false);
    setPromotionConfirmed(false);
    setKick(false);
  }

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
    <div ref={editMemberVis.ref} className={`row ${
      hidden
        ? "sidebarRow-hidden"
        : "sidebarRow"
    }`} onClick={toggleEditMembers}>
      <Avatar className={classes.CustomColors}>{abrev}</Avatar>
      
      <h4>{name} ({points})</h4>
      
      {
        admin === true ?
        (
          <VerifiedUserIcon />
        )
        : null
      }
      {editMemberVis.isComponentVisible ? (
        <div className="sidebarRowEdit">
          
          {
            kickConfirmed ?
            (
              <div 
                className="sidebarRow__confirmKick"
                onClick={kickMember}
              >
                <p>Are You Sure?</p>
              </div>
            )
            : (
              <div
                className="sidebarRow__kick"
                onClick={confirmKick}
              >
                <p>Kick</p>
              </div>
            )
          }
          {
            promotionConfirmed ?
            (
              <div 
                className="sidebarRow__confirmPromote"
                onClick={promoteMember}
              >
                <p>Are You Sure?</p>
              </div>
            )
            : (
              <div
                className="sidebarRow__promote"
                onClick={confirmPromotion}
              >
                <p>Promote</p>
              </div>
            )
          }
          
        </div>
        ) : null}
      
    </div>
  );
}

export default SidebarRow;
