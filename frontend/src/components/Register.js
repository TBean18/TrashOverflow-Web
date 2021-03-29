import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useForm } from '../hooks/useForm';
import { useHistory } from 'react-router-dom';
import {
  FormButton,
  Text,
  Container,
  Form,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon
} from './RegisterElements';

const axios = require('axios').default;

function Register() {
  //Bring in the userState form the global context
  const { logIn, user, storeJWT } = useContext(GlobalContext);
  //Store all form input in a JSON where key == component name(prop)
  const [values, setValues] = useForm({
    name: '',
    password_hash: '',
    phone_number: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  let name;
  let password_hash;
  let phone_number;
  let email;

  // Register function called when register button is pressed
  const doRegister = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    //Make the register API call
    axios
      .post('/api/user/register', {
        name: values.name,
        password_hash: values.password_hash,
        phone_number: values.phone_number,
        email: values.email
      })
      //Display Message
      .then((res) => {
        if (res.data.error != '') throw res.data.error;
        console.log(res);
        //Set the user for the globalState
        logIn(res.data.user, res.data.token);
        history.push('/cards');
      })
      //Display error if error is caught
      .catch((error) => {
        console.log(error);
        setMessage(JSON.stringify(error));
      });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Trash Overflow</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Register for Your Account</FormH1>
              <FormLabel id="name">Name</FormLabel>
              <FormInput
                type="name"
                required
                placeholder="Name"
                onChange={(e) => setValues(e)}
              />
              <FormLabel id="phone_number">Phone Number</FormLabel>
              <FormInput
                type="text"
                required
                placeholder="123-456-7890"
                onChange={(e) => setValues(e)}
              />
              <FormLabel id="email">Email</FormLabel>
              <FormInput
                type="email"
                required
                placeholder="email@example.com"
                onChange={(e) => setValues(e)}
              />
              <FormLabel id="password_hash">Password</FormLabel>
              <FormInput
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setValues(e)}
              />
              <FormButton type="submit" onClick={doRegister}>
                Register
              </FormButton>
              <Text to="/signin">Already have an account?</Text>
            </Form>
          </FormContent>
        </FormWrap>
        <span id="registerResult">{message}</span>
      </Container>
    </>
  );

  return (
    <div className="RegisterArea" id="registerDiv">
      <form onSubmit={doRegister}>
        <span id="inner-title">Please Sign Up</span>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setValues(e)}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          onChange={(e) => setValues(e)}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => setValues(e)}
        />
        <input
          type="password"
          name="password_hash"
          placeholder="Password"
          onChange={(e) => setValues(e)}
        />
        <br></br>
        <input
          type="submit"
          id="loginButton"
          class="buttons"
          value="Sign Up"
          onClick={doRegister}
        />
      </form>
      <span id="registerResult">{message}</span>
    </div>
  );
}

export default Register;
