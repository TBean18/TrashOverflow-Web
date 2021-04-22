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
} from "./ForgotPasswordElements";
import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
const axios = require("axios").default;

function Forget() {
  const [values, setValues] = useForm({
    email: "",
  });

  const isPageWide = useMediaQuery("(min-width: 768px)");
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
        setMessage("Please Check Your Email");
      })
      //Display error if error is caught
      .catch((error) => {
        //Check if the API sent an error
        if (error.response) {
          try {
            const err = error.response.data.error;
            console.log(err);
            setMessage(err);
          } catch (err) {
            console.log(err);
          }
        }
      });
  };

  const goReg = () => {
    history.push("/register");
  };

  return (
    <>
      <Container>
        <FormWrap>
          {isPageWide && <Icon to="/">TrashOverflow</Icon>}
          {!isPageWide && <Icon>TrashOverflow</Icon>}
          <FormContent>
            <Form>
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

export default Forget;
