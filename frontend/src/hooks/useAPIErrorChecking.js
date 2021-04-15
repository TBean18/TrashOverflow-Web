import { useState, useContext } from "react";
import useLogout from "./useLogout";

export const useAPIErrorChecking = () => {
  const logout = useLogout();
  return (err) => {
    //Response was received
    if (err.response) {
      //Authentication Error
      if (err.response.status === 400) {
        //Log the User Out
        return logout();
      }
      return err.response.body.error;
    }
  };
};
