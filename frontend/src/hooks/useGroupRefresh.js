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
        try {
          current.groups = data.groups;
        } catch (err) {
          console.log(err);
        }
        return current;
      });
      //Update the global state
      data.groups.forEach((group) => {
        if (group._id === currentGroup._id) {
          selectGroup(group);
          console.log("Group Refreshed");
        }
      });
    },
  });

  return () => {
    mutation.mutate();
  };
};
