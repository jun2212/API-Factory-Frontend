import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { COLOR } from "../../config/constants";

function NavBar() {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      <Logo>API FACTORY</Logo>
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
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  border: none;
  background: ${COLOR.BLACK};
`;

const Logo = styled.span`
  color: ${COLOR.WHITE};
  font-size: 1.2rem;
  font-weight: 550;
  margin-left: 6rem;

  &:hover {
    color: ${COLOR.BLUE};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 3rem;
`;

const Button = styled.button`
  padding: 0.3rem;
  margin: 1rem;
  border: none;
  border-radius: 0.5rem;
  width: 7rem;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  font-weight: 550;

  &:hover {
    border-bottom: 2px solid black;
    color: ${COLOR.BLUE};
  }
`;

export { NavBar };
