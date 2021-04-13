import { useState, useContext } from "react";
import useLogout from "./useLogout";

export const useAPIErrorChecking = () => {
  const logout = useLogout();
  return (err) => {
    if (err.response) {
      //Response was received
      if (err.response.status === 400) {
        //Authentication Error
        //Log the User Out
        logout();
      }
    }
  };
};
