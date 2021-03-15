import React, { createContext, useReducer, useState} from 'react';
import AppReducer from './AppReducer'
//Initial State
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || '',
    group: JSON.parse(localStorage.getItem('group')) || '',
    jwt: JSON.parse(localStorage.getItem('JWT')) || ''
};

//Create a new Context
export const GlobalContext = createContext(initialState);

//Create a global Provider
export const GlobalProvider = function (props) {


    // const [state, dispatch] = useReducer(AppReducer, initialState);

    //Create the user State
    const [user, setUser] = useState(initialState.user);
    //Create the JWT state
    const [jwt, setJWT] = useState(initialState.jwt);

    //ACTIONS
    //Login function used to store userData in global state
    function logIn(userObject){
        setUser(userObject);
        localStorage.setItem('user', JSON.stringify(userObject)); 
        // dispatch({
        //     type: 'LOGIN',
        //     payload: userObject
        // });
    }

    //Logout function used to remove user data from global state
    function logOut(id){
        localStorage.setItem('user', '');
        setUser('');
        // dispatch({
        //     type: 'LOGOUT',
        //     payload: id
        // });
    }

    //Function used to store the JWT token from the API responce
    function storeJWT(webToken){
        localStorage.setItem('JWT', JSON.stringify(webToken));
        setJWT(jwt);
    } 


    //What the GlobalProvider componet 'renders'
    return(
        <GlobalContext.Provider value = {{
            user: user,
            jwt: jwt,
            logIn,
            logOut,
            storeJWT
        }}>
            {props.children}
        </GlobalContext.Provider>
    );

}