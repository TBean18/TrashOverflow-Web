// Custom React Query hook used return a queryClient object

import react from "react";
import { useQuery, QueryClient } from "react-query";

export default function useGroups() {
  return new QueryClient({
    defaultOptions: {},
  });
}
