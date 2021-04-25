import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import {
  FormButton,
  LoginButton,
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
} from "./RegisterElements";

const axios = require("axios").default;

function Register() {
  //Store all form input in a JSON where key == component name(prop)
  const [values, setValues] = useForm({
    name: "",
    password_hash: "",
    phone_number: "",
    email: "",
  });

  const isPageWide = useMediaQuery("(min-width: 768px)");
  const history = useHistory();
  const [message, setMessage] = useState("");

  // Register function called when register button is pressed
  const doRegister = async (event) => {
    // I do not know what this line does, Phil?!?
    // https://www.robinwieruch.de/react-preventdefault <- Me neither, but this helps
    event.preventDefault();

    //Make the register API call
    axios
      .post("/api/user/register", {
        name: values.name,
        password_hash: values.password_hash,
        phone_number: values.phone_number,
        email: values.email,
      })
      //Display Message
      .then((res) => {
        if (res.data.error !== "") return handleRegisterError(res.data.error);
        console.log(res);

        //Since the user just registered, they need to verifiy the email
        setMessage("Please Check Your Email For Verification");
      })
      //Display error if error is caught
      .catch((error) => {
        console.log(error);
        setMessage(JSON.stringify(error));
      });
  };

  const goLog = () => {
    history.push("/signin");
  };

  const handleRegisterError = (err) => {
    setMessage(err);
  };

  return (
    <>
      <Container>
        <FormWrap>
          {isPageWide && <Icon to="/">TrashOverflow</Icon>}
          {!isPageWide && <Icon>TrashOverflow</Icon>}
          <FormContent>
            <Form>
              <FormH1>Register</FormH1>
              <FormLabel>Name</FormLabel>
              <FormInput
                type="text"
                name="name"
                placeholder="Name"
                onChange={(e) => setValues(e)}
              />
              <FormLabel>Phone Number</FormLabel>
              <FormInput
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                onChange={(e) => setValues(e)}
              />
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
              <FormButton type="submit" onClick={doRegister}>
                Register
              </FormButton>
              {!isPageWide && (
                <LoginButton type="submit" onClick={goLog}>
                  Already Have an Account?
                </LoginButton>
              )}
              {isPageWide && (
                <TextL to="/signin">Already Have an Account?</TextL>
              )}
              <Text id="registerResult">{message}</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}

export default Register;
