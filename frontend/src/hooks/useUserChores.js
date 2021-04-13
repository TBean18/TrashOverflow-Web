// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useUserChores() {
  return useQuery(
    ["user", "chores"],
    () => axios.get("/api/chores/user_chores").then((res) => res.data),
    {
      // onSuccess: store the token
    }
  );
}
