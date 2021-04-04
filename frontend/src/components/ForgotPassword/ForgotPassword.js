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
  Icon,
} from "./ForgotPasswordElements";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
const axios = require("axios").default;

function Forget() {
  //Bring in the userState form the global context
  const { logIn, user, storeJWT } = useContext(GlobalContext);
  const [values, setValues] = useForm({
    email: "",
  });

  const history = useHistory();

  const [message, setMessage] = useState("");

  //Login function called when login button is pressed
  const doForgot = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    //Make the login API call
    axios
      .post("/api/user/forgot_password", {
        email: values.email,
      })
      //Display Message
      .then((res) => {
        console.log(res);
        setMessage("Check Email");
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

  return (
    <>
      <Container>
        <FormWrap onSubmit={doForgot}>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form onSubmit={doForgot}>
              <FormH1>Forgot Password</FormH1>
              <FormLabel>Email</FormLabel>
              <FormInput
                required
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setValues(e)}
              />
              <FormButton type="submit" onClick={doForgot}>
                Send Recovery Email
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

export default Forget;
