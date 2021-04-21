import {
  FormButton,
  RegisterButton,
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
} from "./ResetPasswordElements";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { useForm } from "../../hooks/useForm";
const axios = require("axios").default;

function Reset() {
  const [values, setValues] = useForm({
    password_hash: "",
    password_hash2: "",
  });

  //Get the JSON Web token from the URL params
  const { token } = useParams();
  console.log(`token = ${token}`);

  const [message, setMessage] = useState("");
  const isPageWide = useMediaQuery("(min-width: 768px)");
  const history = useHistory();

  //Login function called when login button is pressed
  const doReset = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    // Passwords dont match case
    if (values.password_hash !== values.password_hash2) {
      setMessage("Passwords do not match.");
      return;
    }

    //Make the reset API call
    axios
      .post(`/api/user/forgot_password/${token}`, {
        password: values.password_hash,
      })
      //Display Message
      .then((res) => {
        console.log(res);
        setMessage("Password Successfully Reset");

        setTimeout(() => {
          history.push("/signin");
        }, 5000);
      })
      //Display error if error is caught
      .catch((error) => {
        console.log(error);
        setMessage(error.response);
      });
  };

  const goReg = () => {
    history.push("/register");
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">TrashOverflow</Icon>
          <FormContent>
            <Form>
              <FormH1>Reset Password</FormH1>
              <FormLabel>New Password</FormLabel>
              <FormInput
                required
                type="password"
                name="password_hash"
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
              {!isPageWide && (
                <RegisterButton type="submit" onClick={goReg}>
                  Need a New Account?
                </RegisterButton>
              )}
              {isPageWide && <TextL to="/signin">Need a New Account?</TextL>}
              <Text id="registerResult">{message}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Reset;
