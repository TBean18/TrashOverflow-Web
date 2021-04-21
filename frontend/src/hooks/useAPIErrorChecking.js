import { useState, useContext } from "react";
import useLogout from "./useLogout";

export const useAPIErrorChecking = () => {
  const logout = useLogout();
  return (err) => {
    //Response was received
    if (err.response) {
      //Authentication Error
      if (err.response.status === 400 || err.response.status === 401) {
        //Log the User Out
        return logout();
      }
    }
    if (err.response.body) {
      return err.response.body.error;
    }
  };
};
