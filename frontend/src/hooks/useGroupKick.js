import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useGroupKick = (GlobalContext) => {
  const errCheck = useAPIErrorChecking();
  const { storeJWT } = useContext(GlobalContext);
  const history = useHistory();

  return (group_ID, member_ID) => {
    axios
      .post("/api/groups/removeUser", {
        group_ID,
        member_ID,
      })
      .then((res) => {
        if (res.data.error !== "") throw res.data.error;
        if ("token" in res.data) storeJWT(res.data.token);
      })
      .catch((err) => errCheck(err));
  };
};

export default useGroupKick;
