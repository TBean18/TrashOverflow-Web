import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreEditor = (group_ID) => {
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  //This function calls the edit endpoint
  // Parameters:
  //      group_ID: MANDATORY
  //      chore_ID: MANDATORY
  //      chore_name: Can be left empty
  //      chore_description: Mandatory but can be [] *empty array*
  //      chore_point_value

  const mutation = useMutation(
    (newChore) =>
      axios
        .post("/api/chores/edit", newChore)
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      onSuccess: (newChore) => {
        // set the chore data
        queryClient.setQueryData([group_ID, "chores"], (current) => {
          current.chores = current.chores.map((chore) => {
            // Find the edited chore
            if (chore._id === newChore._id) {
              // console.log("chore updated in useChoreEditor");

              // And Swap it
              return newChore;
            } else return chore;
          });
          return current;
        });
      },
    }
  );

  return (newChore) => mutation.mutate(newChore);
};
