import { useState, useEffect, useContext } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useHistory } from "react-router-dom";

export const useLoggedInRedirect = (GlobalContext) => {
  const refreshToken = useRefreshToken();
  const { user } = useContext(GlobalContext);
  const history = useHistory();
  //Check for logged in users
  useEffect(
    () => {
      //Look into the local storage and find if the user is logged in
      //If not, keep on the landing page
      if (!user) return;

      // Attempt the login API
      let res = refreshToken((err, res) => {
        console.log("GAOSDSAODOSADNO");
        if (res) {
          console.log("User is logged in... REDIRECTING...");
          history.push({
            pathname: "/chores",
          });
        }
      });

      // If failed
      // Token has expired
    },
    [
      /* Only run once*/
    ]
  );
};
