import styled from "styled-components";
import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.aside`
  position: fixed;
  // This keeps it above everything else, no matter where you are
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3)
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  // if it's open, we want 100% opacity
  
  // backdrop-filter: ${({ isOpen }) => (isOpen ? "blur(4px)" : "blur(0)")};
  top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;

export const SidebarMenu = styled.ul`
  box-sizing: border-box;
  margin: 0;
  margin-top: 120px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // controls how far from the left the items are
  grid-template-columns: 1fr;
  // spacing between titles in navbar menu. 6 rows by 80 pixels, each.
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    // icons get closer together when on mobile.
    grid-template-rows: repeat(6, 60px);
  }
`;

export const SidebarLink = styled(LinkS)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  // hover action
  &:hover {
    // trim color
    color: #feb054;
    transition: 0.2s ease-in-out;
  }
`;

export const SideButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  .logOut {
    border-radius: 50px;
    // trim color
    background: #feb054;
    white-space: nowrap;
    // padding is 16 pixels by 64 pixels
    padding: 16px 64px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-top: 50px;
    &:hover {
      transition: all 0.2s ease-in-out;
      background: #fff;
      color: #010606;
    }
  }

  .mobileSidebarText {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: black;
    cursor: pointer;

    // hover action
    &:hover {
      // trim color
      color: #feb054;
      transition: 0.2s ease-in-out;
    }
  }
`;

export const SidebarRoute = styled(LinkR)`
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  font-weight: bold;
  color: black;
  cursor: pointer;

  // hover action
  &:hover {
    // trim color
    color: #feb054;
    transition: 0.2s ease-in-out;
  }
`;
