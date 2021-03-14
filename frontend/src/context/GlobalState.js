import React, { createContext, useReducer, useState} from 'react';
import AppReducer from './AppReducer'
//Initial State
const initialState = {};

//Create a new Context
export const GlobalContext = createContext(initialState);

//Create a global Provider
export const GlobalProvider = function (props) {


    const [state, dispatch] = useReducer(AppReducer, initialState);

    //Actions
    
    const [user, setUser] = useState();


    //Login function used to store userData in global state
    function LogIn(userObject){
        dispatch({
            type: 'LOGIN',
            payload: userObject
        });
    }

    //Logout function used to remove user data from global state
    function LogOut(id){
        dispatch({
            type: 'LOGOUT',
            payload: id
        });
    }


    //What the GlobalProvider componet 'renders'
    return(
        <GlobalContext.Provider value = {{
            userState: [user, setUser]
        }}>
            {props.children}
        </GlobalContext.Provider>
    );

}