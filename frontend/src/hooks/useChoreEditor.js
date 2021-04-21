import axios from "axios";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreEditor = () => {
  const errCheck = useAPIErrorChecking();

  //This function calls the edit endpoint
  // Parameters:
  //      group_ID: MANDATORY
  //      chore_ID: MANDATORY
  //      chore_name: Can be left empty
  //      chore_description: Mandatory but can be [] *empty array*
  //      chore_point_value
  return (newChore) =>
    axios
      .post("/api/chores/edit", newChore)
      .then((res) => res.data)
      .catch((err) => errCheck(err));
};
