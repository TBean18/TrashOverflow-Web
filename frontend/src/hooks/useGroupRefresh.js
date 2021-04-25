import { useContext } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";
const axios = require("axios").default;

export const useGroupRefresh = (GlobalContext) => {
  const { selectGroup, currentGroup } = useContext(GlobalContext);
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  const refreshGroups = () =>
    axios
      .post("/api/groups/", {})
      .then((res) => res.data)
      .catch((err) => errCheck(err));

  const mutation = useMutation(refreshGroups, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "groups"], (current) => {
        current.groups = data.groups;
        return current;
      });
      //Update the global state
      data.groups.forEach((group) => {
        if (group._id === currentGroup._id) selectGroup(group);
      });
    },
  });

  return () => {
    mutation.mutate();
  };
};
