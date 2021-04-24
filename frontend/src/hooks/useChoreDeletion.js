import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreDeletion = (group_ID) => {
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  //This function calls the add endpoint
  // Parameters
  //      chore_ID:     String - ID of the chore to be deleted
  //      group_ID:     String - ID of the group
  //      user_ID:      String - ID of the user trying to delete the chores
  //      token:        String - Token to verify the user
  const deleteChore = (chore) => {
    return axios
      .post("/api/chores/delete", chore)
      .then((res) => res.data)
      .catch((err) => errCheck(err));
  };

  const mutation = useMutation(deleteChore, {
    onSuccess: () => {
      queryClient.invalidateQueries([group_ID, "chores"]);
    },
  });

  //This function calls the add endpoint
  // Parameters:
  //      group_ID: MANDATORY
  //      chore_name: MANDATORY
  //      chore_assigned_user: Can be left empty
  //      chore_user_pool: Mandatory but can be [] *empty array*
  return (chore) => {
    mutation.mutate(chore);
  };
};
