// This is a react scroll link
import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";

export const Button = styled(LinkS)`
  border-radius: 50px;
  // Buttons are either orange or black.
  background: ${({ primary }) => (primary ? "#feb054" : "black")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    // background of buttons changes from white to orange or vise versa
    background: ${({ primary }) => (primary ? "#fff" : "#feb054")};
  }
`;

export const ButtonWithRoute = styled(LinkR)`
  border-radius: 50px;
  text-decoration: none;
  // Buttons are either orange or dark purple.
  background: ${({ primary }) => (primary ? "#feb054" : "black")};
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;

  &:hover {
    transition: all 0.2s ease-in-out;
    // background of buttons changes from white to orange or vise versa
    background: ${({ primary }) => (primary ? "#fff" : "#feb054")};
  }
`;
