import React, { useState, useContext } from 'react';
import "./Register.css";
import { GlobalContext } from '../context/GlobalState'
const axios = require('axios').default;

function Register()
{
    //Bring in the userState form the global context
    const {logIn, user, storeJWT} = useContext(GlobalContext);

    let name;
    let password_hash;
    let phone_number;
    let email;

    const [message,setMessage] = useState('');

    //Check to see if we have a logged in user in our state
    if(user !== '' && message !== user.name){
      setMessage(user.name);
    }

    // Register function called when register button is pressed
    const doRegister = async event => 
    {
        // I do not know what this line does, Phil?!?
        // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
        event.preventDefault();

        //Make the register API call
        axios.post('/api/user/register', {
            
            name: name.value,
            password_hash: password_hash.value,
            phone_number: phone_number.value,
            email: email.value
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
      <div className="RegisterArea" id="registerDiv">
        <form onSubmit={doRegister}>
        <span id="inner-title">Please Sign Up</span><br />
        <input type="text" id="name" placeholder="Name" 
          ref={(c) => name = c} />
        <input type="text" id="phone_number" placeholder="Phone Number" 
          ref={(c) => phone_number = c} />
        <input type="text" id="email" placeholder="Email" 
          ref={(c) => email = c} />
        <input type="password" id="password_hash" placeholder="Password" 
          ref={(c) => password_hash = c} />
          <br></br>
        <input type="submit" id="loginButton" class="buttons" value = "Sign Up"
          onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>
     </div>
    );
};

export default Register;