import axios from "axios";
import { useState } from "react";
import { useMutation, queryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreCreation = (group_ID) => {
  const errCheck = useAPIErrorChecking();

  //This function calls the add endpoint
  // Parameters:
  //      group_ID: MANDATORY
  //      chore_name: MANDATORY
  //      chore_assigned_user: Can be left empty
  //      chore_user_pool: Mandatory but can be [] *empty array*
  const postNewChore = (newChore) => {
    return axios
      .post("/api/chores/add", newChore)
      .then((res) => res.data)
      .catch((err) => errCheck(err));
  };

  const mutation = useMutation(postNewChore, {
    onSuccess: (newChore) => {
      queryClient.setQueryData([group_ID, "chores"], (current) => {
        current.chores.push(newChore);
      });
    },
  });

  //This function calls the add endpoint
  // Parameters:
  //      group_ID: MANDATORY
  //      chore_name: MANDATORY
  //      chore_assigned_user: Can be left empty
  //      chore_user_pool: Mandatory but can be [] *empty array*
  return (newChore) => {
    mutation.mutate(newChore);
  };
};
