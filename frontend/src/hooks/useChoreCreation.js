import axios from "axios";
import { useState } from "react";
import { useMutation, queryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreCreation = (group_ID) => {
  const errCheck = useAPIErrorChecking();

  const postNewChore = (chore_name, chore_assigned_user, chore_user_pool) => {
    return axios
      .post("/api/chores/add", {
        group_ID,
        chore_name,
        chore_assigned_user,
        chore_user_pool,
      })
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

  return (chore_name, chore_assigned_user, chore_user_pool) => {
    mutation.mutate(chore_name, chore_assigned_user, chore_user_pool);
  };
};
