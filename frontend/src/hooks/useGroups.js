// Custom React Query hook used to fetch group data for the

import react, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import useLogout from "./useLogout";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export default function useGroups(GlobalContext) {
  const history = useHistory();
  const logout = useLogout();
  const errCheck = useAPIErrorChecking();
  const { currentGroup, selectGroup } = useContext(GlobalContext);

  return useQuery(
    ["user", "groups"],
    () =>
      axios
        .post("/api/groups/")
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      onSuccess: (data) => {
        if (currentGroup) {
          console.log(data);
          //Update the global state
          data.groups.forEach((group) => {
            if (group._id === currentGroup._id) selectGroup(group);
          });
        }
      },
    }
  );
}
