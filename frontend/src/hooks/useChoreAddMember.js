import axios from "axios";
import { useContext } from "react";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useChoreAddMember = (GlobalContext) => {
  const errCheck = useAPIErrorChecking();
  const { storeJWT } = useContext(GlobalContext);

  return (group_ID, chore_assigned_user, chore_user_pool, chore_name) => {
    axios
      .post("/api/chores/add", {
        group_ID,
        chore_assigned_user,
        chore_user_pool,
        chore_name,
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
