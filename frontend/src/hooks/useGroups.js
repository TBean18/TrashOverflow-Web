// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import useLogout from "./useLogout";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export default function useGroups() {
  const history = useHistory();
  const logout = useLogout();
  const errCheck = useAPIErrorChecking();

  return useQuery(
    ["user", "groups"],
    () =>
      axios
        .post("/api/groups/")
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      // onSuccess: store the token
    }
  );
}
