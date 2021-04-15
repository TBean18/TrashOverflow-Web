import React from "react";
import Login from "../components/Login/Login";
import { GlobalContext } from "../context/GlobalState";
import { useLoggedInRedirect } from "../hooks/useLoggedInRedirect";

const LoginPage = () => {
  useLoggedInRedirect(GlobalContext);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
