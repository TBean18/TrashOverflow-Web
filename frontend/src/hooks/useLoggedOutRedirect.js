import { useEffect, useContext } from "react";
import useLogout from "./useLogout";

export const useLoggedOutRedirect = (GlobalContext) => {
  const { user } = useContext(GlobalContext);
  const logout = useLogout();
  //Check for logged in users
  useEffect(
    () => {
      //Look into the local storage and find if the user is logged in
      //If not, run logout script
      if (!user) logout();
    },
    [
      /* Only run once*/
    ]
  );
};
