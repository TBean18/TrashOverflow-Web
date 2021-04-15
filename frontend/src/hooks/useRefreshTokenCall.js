// Custom React Query hook used to fetch group data for the

import react, { useContext } from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function useRefreshTokenCall() {
  //If token was supplied than store it

  //Else use the designated refresh_token endpoint to request a new token
  return (cb) => {
    axios
      .post("/api/user/refresh_token")
      //Display Message
      .then((res) => {
        console.log(`Token Refresh Successful: ${res.data.token}`);
        return cb(null, true);
      })
      //Display error if error is caught
      .catch((error) => {
        //Check if the API sent an error
        if (error.response) {
          const err = error.response.data.error;
          console.log(err);
          return cb(err, false);
        }
      });
  };
}
