import axios from "axios";
import { useMutation } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useGroupEdit = () => {
  const errCheck = useAPIErrorChecking();
  const mutation = useMutation(
    (editedGroup) =>
      axios
        .post("/api/groups/edit", editedGroup)
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      onSuccess: (newGroup) => {
        console.log(newGroup);
      },
    }
  );

  return (group_ID, group_name, group_description) =>
    mutation.mutate({ group_ID, group_name, group_description });
};

export default useGroupEdit;
