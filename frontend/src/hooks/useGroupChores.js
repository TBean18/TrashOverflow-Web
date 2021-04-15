// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export default function useGroupChores(group_ID) {
  const errCheck = useAPIErrorChecking();
  return useQuery(
    [group_ID, "chores"],
    () =>
      axios
        .get(`/api/chores/${group_ID}`)
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      // onSuccess: store the token
    }
  );
}
