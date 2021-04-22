import axios from "axios";
import { useContext } from "react";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useChoreAddMember = (GlobalContext) => {
  const errCheck = useAPIErrorChecking();
  const { storeJWT, currentGroup } = useContext(GlobalContext);

  return (chore_ID, member_ID) => {
    axios
      .post("/api/chores/assignUser", {
        group_ID: currentGroup._id,
        chore_ID,
        member_ID,
      })
      .then((res) => {
        if (res.data.error) throw res.data.error;
        console.log(res);
        if ("token" in res.data) storeJWT(res.data.token);
      })
      .catch((err) => errCheck(err));
  };
};

export default useChoreAddMember;
