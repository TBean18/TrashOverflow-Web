import React, { useState, useContext } from 'react';
import "./Login.css";
import { GlobalContext } from '../context/GlobalState'
const axios = require('axios').default;

function Login()
{
    //Bring in the userState form the global context
    const {logIn, user, storeJWT} = useContext(GlobalContext);

    let email;
    let password_hash;

    const [message,setMessage] = useState('');

    //Check to see if we have a logged in user in our state
    if(user !== '' && message !== user.name){
      setMessage(user.name);
    }

    //Login function called when login button is pressed
    const doLogin = async event => 
    {
        // I do not know what this line does, Phil?!?
        // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
        event.preventDefault();

        //Make the login API call
        axios.post('/api/user/login', {
          email: email.value,
          password_hash: password_hash.value
        })
        //Display Message
        .then(res => {
          console.log(res);
          //Set the user for the globalState
          logIn(res.data.user, res.data.token);
          setMessage(res.data.user.name);
        })
        //Display error if error is caught
        .catch(error => {
          console.log(error);
          setMessage(error);
        })
    };


    return(
      <div className="LoginArea" id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="email" placeholder="Email" 
          ref={(c) => email = c} />
        <input type="password" id="password_hash" placeholder="Password" 
          ref={(c) => password_hash = c} />
        <input type="submit" id="loginButton" class="buttons" value = "Log In"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;