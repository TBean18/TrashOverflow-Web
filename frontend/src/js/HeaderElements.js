import styled from "styled-components";

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 380px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: grey;
  }
`;
