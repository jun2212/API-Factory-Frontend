import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { COLOR } from "../../config/constants";

function NavBar() {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <ButtonWrapper>
        {pathname === "/login" ? (
          <Button>REGISTER</Button>
        ) : pathname === "/register" ? (
          <Button>LOGIN</Button>
        ) : pathname === "/" ? (
          <>
            <Button>GUIDE</Button>
            <Button>LOGOUT</Button>
          </>
        ) : pathname === "/guide" ? (
          <>
            <Button>MAIN</Button>
            <Button>LOGOUT</Button>
          </>
        ) : (
          <Button>MAIN</Button>
        )}
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 4rem;
  border: none;
  background: ${COLOR.BLACK};
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 3rem;
`;

const Button = styled.button`
  margin-left: 2rem;
  padding: 0.3rem;
  border: none;
  border-radius: 0.5rem;
  width: 6rem;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid black;
    color: ${COLOR.BLUE};
  }
`;

export { NavBar };
