import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useGroupEdit = () => {
  const errCheck = useAPIErrorChecking();
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (editedGroup) =>
      axios
        .post("/api/groups/editGroup", editedGroup)
        .then((res) => res.data)
        .catch((err) => errCheck(err)),
    {
      onSuccess: (newGroup) => {
        newGroup = newGroup.g;
        console.log(newGroup);
        queryClient.setQueryData(["user", "groups"], (current) => {
          current.groups = current.groups.map((group) => {
            if (group._id === newGroup._id) {
              console.log("name / desc updated");
              group.group_name = newGroup.group_name;
              group.group_description = newGroup.group_description;
            }
            return group;
          });
          return current;
        });
      },
    }
  );

  return (group_ID, group_name, group_description) =>
    mutation.mutate({ group_ID, group_name, group_description });
};

export default useGroupEdit;
