import { useState, useContext } from "react";
import { useAPIErrorChecking } from "./useAPIErrorChecking";
const axios = require("axios").default;

export const useGroupCreation = (GlobalContext) => {
  const { storeJWT } = useContext(GlobalContext);
  const errCheck = useAPIErrorChecking();
  return (groupName, groupDescription) =>
    axios
      .post("/api/groups/new", {
        group_name: groupName,
        group_description: groupDescription,
      })
      .then((res) => {
        if (res.data.error !== "") throw res.data.error;
        console.log(res);

        //If the responce contains a refreshed token then save it
        if (res.data.hasOwnProperty("token")) storeJWT(res.data.token);
      })
      .catch((err) => errCheck(err));
};
