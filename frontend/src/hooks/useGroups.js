// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import useLogout from "./useLogout";

export default function useGroups() {
  const history = useHistory();
  const logout = useLogout();
  return useQuery(
    ["user", "groups"],
    () =>
      axios
        .post("/api/groups/")
        .then((res) => res.data)
        .catch((err) => {
          if (err.response) {
            //Response was received
            if (err.response.status === 400) {
              //Authentication Error
              //Log the User Out
              logout();
            }
          }
        }),
    {
      // onSuccess: store the token
    }
  );
}
