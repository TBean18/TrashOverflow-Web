import axios from "axios";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

export const useChoreEditor = () => {
  const errCheck = useAPIErrorChecking();
  return (chore_ID, chore_name, chore_description, chore_point_value) =>
    axios
      .post("/api/chores/edit", {
        chore_ID,
        chore_name,
        chore_description,
        chore_point_value,
      })
      .then((res) => res.data)
      .catch((err) => errCheck(err));
};
