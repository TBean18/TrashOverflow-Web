import { useState, useEffect, useContext } from "react";
import useRefreshToken from "./useRefreshToken";
import { useHistory } from "react-router-dom";
import useLogout from "./useLogout";

export const useLoggedInRedirect = (GlobalContext) => {
  const refreshToken = useRefreshToken();
  const { user } = useContext(GlobalContext);
  const history = useHistory();
  const logout = useLogout();
  //Check for logged in users
  useEffect(
    () => {
      //Look into the local storage and find if the user is logged in
      //If not, keep on the landing page
      if (!user) return;

      // Attempt the login API
      let res = refreshToken((err, res) => {
        // If failed
        // Token has expired
        if (err) logout();

        // The response is the new token
        if (res) {
          console.log("User is logged in... REDIRECTING...");
          history.push({
            pathname: "/chores",
          });
        }
      });
    },
    [
      /* Only run once*/
    ]
  );
};
