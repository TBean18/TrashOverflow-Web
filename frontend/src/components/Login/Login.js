import {
  FormButton,
  ForgotButton,
  NewButton,
  Text,
  TextL,
  Container,
  Form,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
} from "./LoginElements";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useMediaQuery } from "@material-ui/core";
const axios = require("axios").default;

function Login() {
  //Bring in the userState form the global context
  const { logIn, user } = useContext(GlobalContext);
  const [values, setValues] = useForm({
    email: "",
    password_hash: "",
  });

  const isPageWide = useMediaQuery("(min-width: 768px)");

  const history = useHistory();

  const [message, setMessage] = useState("");

  //Check to see if we have a logged in user in our state
  if (user !== "" && message !== user.name) {
    setMessage(user.name);
  }

  //Login function called when login button is pressed
  const doLogin = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    //Make the login API call
    axios
      .post("/api/user/login", {
        email: values.email,
        password_hash: values.password_hash,
      })
      //Display Message
      .then((res) => {
        console.log(res);
        //Set the user for the globalState
        logIn(res.data.user, res.data.token);
        setMessage(res.data.user.name);
        history.push("/chores");
      })
      //Display error if error is caught
      .catch((error) => {
        //Check if the API sent an error
        if (error.response) {
          const err = error.response.data.error;
          console.log(err);
          setMessage(err);
        }
      });
  };

  const doReg = () => {
    history.push("/register");
  };

  const doForgot = () => {
    history.push("/forgot");
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form>
              <FormH1>Sign In</FormH1>
              <FormLabel>Email</FormLabel>
              <FormInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setValues(e)}
              />
              <FormLabel>Password</FormLabel>
              <FormInput
                type="password"
                name="password_hash"
                placeholder="Password"
                onChange={(e) => setValues(e)}
              />
              <FormButton type="submit" onClick={doLogin}>
                Sign In
              </FormButton>
              {!isPageWide && (
                <NewButton type="submit" onClick={doReg}>
                  Need a New Account?
                </NewButton>
              )}
              {isPageWide && <TextL to="/register">Need a New Account?</TextL>}
              {!isPageWide && (
                <ForgotButton type="submit" onClick={doForgot}>
                  Forgot Password?
                </ForgotButton>
              )}
              {isPageWide && <TextL to="/forgot">Forgot Password?</TextL>}
              <Text id="registerResult">{message}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Login;
