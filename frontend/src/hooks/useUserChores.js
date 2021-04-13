// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export default function useUserChores() {
  const errCheck = useAPIErrorChecking();
  return useQuery(
    ["user", "chores"],
    () =>
      axios
        .get("/api/chores/user_chores")
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      // onSuccess: store the token
    }
  );
}
