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
} from './ResetPasswordElements';
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Label } from '@material-ui/icons';
const axios = require('axios').default;

function Reset() {
  //Bring in the userState form the global context
  const { logIn, user, storeJWT } = useContext(GlobalContext);
  const [values, setValues] = useForm({
    password_hash: '',
    password_hash2: ''
  });

  const [message, setMessage] = useState('');
  const history = useHistory();

  let password_hash;
  let password_hash2;

  //Check to see if we have a logged in user in our state
  if (user !== '' && message !== user.name) {
    setMessage(user.name);
  }

  //Login function called when login button is pressed
  const doReset = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    if (password_hash !== password_hash2) {
      setMessage('Passwords do not match.');
      return;
    }

    //Make the login API call
    axios
      .post('/api/user/login', {
        email: values.email,
        password_hash: values.password_hash
      })
      //Display Message
      .then((res) => {
        console.log(res);

        setMessage(res.data.user.name);
        history.push('/signin');
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
        <FormWrap onSubmit={doReset}>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form onSubmit={doReset}>
              <FormH1>Reset Password</FormH1>
              <FormLabel>New Password</FormLabel>
              <FormInput
                required
                type="password"
                name="password_hash1"
                placeholder="password"
                onChange={(e) => setValues(e)}
              />
              <FormLabel>Confirm Password</FormLabel>
              <FormInput
                required
                type="password"
                name="password_hash2"
                placeholder="password"
                onChange={(e) => setValues(e)}
              />
              <FormButton type="submit" onClick={doReset}>
                Reset Password
              </FormButton>
              <TextL to="/register">Need a new account?</TextL>
              <Text id="registerResult">{message}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Reset;
