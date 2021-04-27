import axios from "axios";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useChoreRemoveMember = (GlobalContext) => {
  const errCheck = useAPIErrorChecking();
  const { storeJWT, currentGroup } = useContext(GlobalContext);
  const queryClient = useQueryClient();

  return (chore_ID, member_ID) => {
    axios
      .post("/api/chores/removeUser", {
        group_ID: currentGroup._id,
        chore_ID,
        member_ID,
      })
      .then((res) => {
        if (res.data.error) throw res.data.error;
        console.log(res);
        if ("token" in res.data) storeJWT(res.data.token);
        queryClient.invalidateQueries([currentGroup._id, "chores"]);
      })
      .catch((err) => errCheck(err));
  };
};

export default useChoreRemoveMember;
