import React, { useState } from 'react';
import "./Login.css";
const axios = require('axios').default;

function Login()
{
    let email;
    let password_hash;

    const [message,setMessage] = useState('');


    const doLogin = async event => 
    {
        event.preventDefault();
        axios.post('/api/user/login', {
          email: email.value,
          password_hash: password_hash.value
        }).then(res => {
          console.log(res)
          setMessage(res.data.user.name);
        })
          .catch(error => console.log(error))
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