// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useGroups() {
  return useQuery(
    "groups",
    () => axios.post("/api/groups/").then((res) => res.data),
    {
      // onSuccess: store the token
    }
  );
}
