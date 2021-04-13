import React, { createContext, useReducer, useState } from "react";
import AppReducer from "./AppReducer";
const axios = require("axios").default;

//Initial State
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || "",
  groups: JSON.parse(localStorage.getItem("groups")) || "",
  jwt: JSON.parse(localStorage.getItem("JWT")) || "",
};

// Use the Initial State decs to set the default 'x-auth-token' header
axios.defaults.headers.common["x-auth-token"] = initialState.jwt;

//Create a new Context
export const GlobalContext = createContext(initialState);

//Create a global Provider
export const GlobalProvider = function (props) {
  // const [state, dispatch] = useReducer(AppReducer, initialState);

  //Create the user State
  const [user, setUser] = useState(initialState.user);
  //Create the JWT state
  const [jwt, setJWT] = useState(initialState.jwt);
  //Create the Groups State
  const [groups, setGroups] = useState(initialState.groups);

  //ACTIONS

  //Function used to store the JWT token from the API responce
  function storeJWT(webToken) {
    if (webToken == undefined) return;
    localStorage.setItem("JWT", JSON.stringify(webToken));
    axios.defaults.headers.common["x-auth-token"] = webToken;
    setJWT(webToken);
  }

  //Login function used to store userData in global state
  function logIn(userObject, webToken) {
    if (userObject == undefined) return;
    setUser(userObject);
    localStorage.setItem("user", JSON.stringify(userObject));
    storeJWT(webToken);

    //Gather the group info from
    let curGroups = [];
    userObject.groups.map((g) => {
      curGroups.push(g.group_ID);
    });
    storeGroups(curGroups);
  }

  //Logout function used to remove user data from global state
  function logOut() {
    localStorage.setItem("user", "");
    setUser("");
    storeJWT("");
    storeGroups("");
  }

  function storeGroups(curGroups) {
    localStorage.setItem("groups", JSON.stringify(curGroups));
    setGroups(curGroups);
  }

  //What the GlobalProvider componet 'renders'
  return (
    <GlobalContext.Provider
      value={{
        user: user,
        jwt: jwt,
        groups,
        logIn,
        logOut,
        storeJWT,
        storeGroups,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
