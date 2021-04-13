import react, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

//Function used to lof the user out of the application
export default function useLogout() {
  return () => {
    localStorage.clear();
    console.log("LOGOUT");
    window.location.href = "/signin";
  };
}
