import React, { useState } from 'react';
import "./Login.css";
const axios = require('axios').default;

function Login()
{
    let email;
    let password_hash;

    const [message,setMessage] = useState('');

    //Login function called when login button is pressed
    const doLogin = async event => 
    {
        //I do not know what this line does, Phil?!?
        event.preventDefault();

        //Make the login API call
        axios.post('/api/user/login', {
          email: email.value,
          password_hash: password_hash.value
        })
        //Display Message
        .then(res => {
          console.log(res);
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