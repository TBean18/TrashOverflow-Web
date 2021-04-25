import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";
const axios = require("axios").default;

export const useGroupCreation = (GlobalContext) => {
  const { storeJWT } = useContext(GlobalContext);
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  const makeGroup = (newGroup) =>
    axios
      .post("/api/groups/new", newGroup)
      .then((res) => res.data)
      .catch((err) => errCheck(err));

  const mutation = useMutation(makeGroup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["user", "groups"]);
    },
  });

  return (groupName, groupDescription) =>
    mutation.mutate({
      group_name: groupName,
      group_description: groupDescription,
    });
};
