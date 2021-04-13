// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

export default function useGroups() {
  const history = useHistory();
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
              //Redirect to Landing Page
              history.push("/signin");
            }
          }
        }),
    {
      // onSuccess: store the token
    }
  );
}
