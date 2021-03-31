import {
  FormButton,
  Text,
  TextL,
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
import { useForm } from '../hooks/useForm';
const axios = require('axios').default;

function Login() {
  //Bring in the userState form the global context
  const { logIn, user, storeJWT } = useContext(GlobalContext);
  const [values, setValues] = useForm({
    email: '',
    password_hash: ''
  });

  const history = useHistory();

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
        email: values.email,
        password_hash: values.password_hash
      })
      //Display Message
      .then((res) => {
        console.log(res);
        //Set the user for the globalState
        logIn(res.data.user, res.data.token);
        setMessage(res.data.user.name);
        history.push('/chores');
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
        <FormWrap onSubmit={doLogin}>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form onSubmit={doLogin}>
              <FormH1>Sign In</FormH1>
              <FormLabel>Email</FormLabel>
              <FormInput
                required
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setValues(e)}
              />
              <FormLabel>Password</FormLabel>
              <FormInput
                required
                type="password"
                name="password_hash"
                placeholder="Password"
                onChange={(e) => setValues(e)}
              />
              <FormButton type="submit" onClick={doLogin}>
                Sign In
              </FormButton>
              <Text>Forgot password?</Text>
              <TextL to="/register">Need a new account?</TextL>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Login;
