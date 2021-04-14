// Custom React Query hook used to fetch group data for the

import react from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useLogin() {
  return (email, password) => {
    axios
      .post("/api/user/login", {
        email,
        password_hash: password,
      })
      //Display Message
      .then((res) => {
        console.log(res);
        //Set the user for the globalState
        logIn(res.data.user, res.data.token);
        setMessage(res.data.user.name);
        history.push("/chores");
      })
      //Display error if error is caught
      .catch((error) => {
        //Check if the API sent an error
        if (error.response) {
          const err = error.response.data.error;
          console.log(err);
          setMessage(err);
        }
      });
  };
}
