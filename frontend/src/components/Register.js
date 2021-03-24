import React, { useState, useContext } from 'react';
import "./Register.css";
import { GlobalContext } from '../context/GlobalState'
import { useForm } from '../hooks/useForm';
const axios = require('axios').default;

function Register()
{
    //Bring in the userState form the global context
    const {logIn, user, storeJWT} = useContext(GlobalContext);
    //Store all form input in a JSON where key == component name(prop)
    const [values, setValues] = useForm({name: '', password_hash: '', phone_number: '', email: ''});
    const [message, setMessage] = useState('');

    let name;
    let password_hash;
    let phone_number;
    let email;

    // Register function called when register button is pressed
    const doRegister = async event => 
    {
        // I do not know what this line does, Phil?!?
        // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
        event.preventDefault();

        //Make the register API call
        axios.post('/api/user/register', {
            name: values.name,
            password_hash: values.password_hash,
            phone_number: values.phone_number,
            email: values.email
        })
        //Display Message
        .then(res => {
          console.log(res);
          //Set the user for the globalState
          logIn(res.data.user, res.data.token);
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
        <input type="text" name="name" placeholder="Name" onChange={e => setValues(e)}/>
        <input type="text" name="phone_number" placeholder="Phone Number" onChange={e => setValues(e)}/>
        <input type="text" name="email" placeholder="Email" onChange={e => setValues(e)}/>
        <input type="password" name="password_hash" placeholder="Password" onChange={e => setValues(e)}/>
          <br></br>
        <input type="submit" id="loginButton" class="buttons" value = "Sign Up"
          onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>
     </div>
    );
};

export default Register;