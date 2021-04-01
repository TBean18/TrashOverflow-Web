import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  min-height: 692px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
  overflow: hidden;
  // gradient background
  background: linear-gradient(
    108deg,
    rgba(86, 70, 109, 1) 0%,
    rgba(254, 176, 84, 1) 100%
  );
`;

export const FormWrap = styled.div`
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    height: 80%;
  }
`;

export const Icon = styled(Link)`
  font-family: lemon-jelly;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 50px;
  text-decoration: none;
  // Trash overflow text color at top of sign in page.
  color: #fff;
  font-weight: 300;
  font-size: 100px;

  @media screen and (max-width: 480px) {
    font-size: 60px;
    margin-left: 16px;
    margin-top: 50px;
  }
`;

export const FormContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;

export const Form = styled.form`
  // background color of login box. This color is black.
  box-sizing: border-box;
  background: #fff;
  max-width: 400px;
  height: auto;
  width: 100%;
  z-index: 1;
  display: grid;
  margin: 0 auto;
  margin-bottom: 200px;
  padding: 80px 32px;
  border-radius: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

  @media screen and (max-width: 480px) {
    padding: 32px 32px;
    margin-bottom: 0px;
  }
  @media screen and (max-width: 350px) {
    padding: 16px 32px;
    margin-bottom: 50px;
  }
`;

export const FormH1 = styled.h1`
  margin-bottom: 40px;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  // change color of sign into your account
  color: #000;
`;

export const FormLabel = styled.label`
  margin-bottom: 8px;
  margin-left: 12px;
  font-size: 14px;
  // change email and password color above input boxes
  color: #000;
`;

export const FormInput = styled.input`
  // this is the input spot background color
  background: var(--header-input-color);
  // This is the font color when typing an email or password
  color: #000;
  padding: 16px 16px;
  margin-bottom: 32px;
  border: none;
  border-radius: 15px;
  outline: none;
`;

export const FormButton = styled.button`
  background: #ea8b6c;
  padding: 16px 0;
  border: none;
  border-radius: 15px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  outline: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    // background color of icon when you hover over it
    background: #d17c60;
    // text color of sign in button when you hover over it.
    color: #fff;
  }
`;

export const Text = styled.span`
  text-align: center;
  margin-top: 24px;
  color: #000;
  font-size: 14px;
`;

export const TextL = styled(Link)`
  text-align: center;
  margin-top: 24px;
  color: #000;
  font-size: 14px;
`;
