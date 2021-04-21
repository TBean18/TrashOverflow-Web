import {
  FormButton,
  Text,
  Container,
  Form,
  FormContent,
  FormH1,
  FormLabel,
  FormWrap,
  Icon,
} from "./JoinGroupElements";
import React, { useEffect, useState } from "react";
import useGroupJoin from "../../hooks/useGroupJoin";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import useGroupInfo from "../../hooks/useGroupInfo";

function JoinGroup() {
  const [groupName, setGroupName] = useState("");
  const joinGroup = useGroupJoin(GlobalContext);
  const getGroupInfo = useGroupInfo();
  const { group_ID } = useParams();

  // On Render the first time
  useEffect(() => {
    //Get the name of the group
    getGroupInfo(group_ID, setGroupName);
  }, []);

  //Login function called when login button is pressed
  const doJoin = (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    joinGroup(group_ID);
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon>TrashOverflow</Icon>
          <FormContent>
            <Form>
              <FormH1>Join {groupName}</FormH1>
              <FormLabel>
                Please confirm you would like to join this new group by clicking
                the button below.
              </FormLabel>
              <FormButton type="submit" onClick={doJoin}>
                Join New Group
              </FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default JoinGroup;
