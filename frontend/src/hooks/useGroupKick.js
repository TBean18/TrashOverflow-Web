import axios from "axios";
import { useContext } from "react";
import { useAPIErrorChecking } from "./useAPIErrorChecking";
import { useGroupRefresh } from "./useGroupRefresh";

const useGroupKick = (GlobalContext) => {
  const errCheck = useAPIErrorChecking();
  const { storeJWT } = useContext(GlobalContext);
  const groupRefresh = useGroupRefresh(GlobalContext);

  return (group_ID, member_ID) => {
    axios
      .post("/api/groups/removeUser", {
        group_ID,
        member_ID,
      })
      .then((res) => {
        if (res.data.error !== "") throw res.data.error;
        if ("token" in res.data) storeJWT(res.data.token);
        groupRefresh();
      })
      .catch((err) => errCheck(err));
  };
};

export default useGroupKick;
