import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { useForm } from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';
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
        if (res.data.error !== '') return handleRegisterError(res.data.error);
        console.log(res);

        //Since the user just registered, they need to verifiy the email
        setMessage('Please Check Your Email For Verification');
      })
      //Display error if error is caught
      .catch((error) => {
        console.log(error);
        setMessage(JSON.stringify(error));
      });
  };

  const handleRegisterError = (err) => {
    setMessage(err);
  };

  return (
    <>
      <Container>
        <FormWrap onSubmit={doRegister}>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form onSubmit={doRegister}>
              <FormH1>Register for Your Account</FormH1>
              <FormLabel>Name</FormLabel>
              <FormInput
                required
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setValues(e)}
              />
              <FormLabel>Phone Number</FormLabel>
              <FormInput
                required
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                onChange={(e) => setValues(e)}
              />
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
              <FormButton type="submit" onClick={doRegister}>
                Register
              </FormButton>
              <TextL to="/signin">Already have an account?</TextL>
              <Text id="registerResult">{message}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Register;
