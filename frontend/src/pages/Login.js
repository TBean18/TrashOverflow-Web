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
} from './LoginElements';
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';
const axios = require('axios').default;

function Login() {
  //Bring in the userState form the global context
  const { logIn, user, storeJWT } = useContext(GlobalContext);
  const history = useHistory();
  let email;
  let password_hash;

  const [message, setMessage] = useState('');

  //Check to see if we have a logged in user in our state
  if (user !== '' && message !== user.name) {
    setMessage(user.name);
  }

  //Login function called when login button is pressed
  const doLogin = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    //Make the login API call
    axios
      .post('/api/user/login', {
        email: email.value,
        password_hash: password_hash.value
      })
      //Display Message
      .then((res) => {
        console.log(res);
        //Set the user for the globalState
        logIn(res.data.user, res.data.token);
        setMessage(res.data.user.name);
        history.push('/cards');
      })
      //Display error if error is caught
      .catch((error) => {
        console.log(error);
        setMessage(error);
      });
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Trash Overflow</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Sign in to your account</FormH1>
              <FormLabel id="email">Email</FormLabel>
              <FormInput
                type="email"
                required
                placeholder="example@email.com"
                ref={(c) => (email = c)}
              />
              <FormLabel id="password_hash">Password</FormLabel>
              <FormInput
                type="password"
                required
                placeholder="Password"
                ref={(c) => (password_hash = c)}
              />
              <FormButton type="submit" onClick={doLogin}>
                Sign In
              </FormButton>
              <Text>Forgot password?</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Login;
