import { useContext } from "react";
//Function used to lof the user out of the application
export default function useRefreshToken(GlobalContext) {
  const { storeJWT } = useContext(GlobalContext);

  //Return a function that will store the JWT into the global Provider
  return (JWT) => {
    storeJWT(JWT);
  };
}
