import axios from "axios";
import { useAPIErrorChecking } from "./useAPIErrorChecking";

const useGroupInfo = () => {
  const errCheck = useAPIErrorChecking();
  return (group_ID, setGroupName) => {
    axios
      .get(`/api/groups/info/${group_ID}`)
      .then((res) => {
        // console.log(res.data.group.group_name);
        return setGroupName(res.data.group.group_name);
      })
      .catch((err) => errCheck(err));
  };
};

export default useGroupInfo;
