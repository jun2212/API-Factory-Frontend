import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import { COLOR } from "../../config/constants";
import { backEndFetchDataUtil } from "../../utils/utils";

function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const moveLoginPage = () => {
    navigate("/login");
  };

  const moveRegisterPage = () => {
    navigate("/register");
  };

  const moveGuidePage = () => {
    navigate("/guide");
  };

  const moveListPage = () => {
    navigate("/list");
  };

  const moveMainPage = () => {
    if (pathname === "/login" || pathname === "/register") {
      return;
    }

    navigate("/");
  };

  const handleLogOut = async () => {
    const { status, message } = await backEndFetchDataUtil("/logout", "POST");

    if (status === 200) {
      navigate("/login");
    } else {
      navigate("/error", {
        state: { status: status, message: message },
      });
    }
  };

  return (
    <Wrapper>
      <Logo onClick={moveMainPage}>API FACTORY</Logo>
      <ButtonWrapper>
        {pathname === "/login" ? (
          <>
            <Button onClick={moveGuidePage}>GUIDE</Button>
            <Button onClick={moveRegisterPage}>REGISTER</Button>
          </>
        ) : pathname === "/register" ? (
          <>
            <Button onClick={moveGuidePage}>GUIDE</Button>
            <Button onClick={moveLoginPage}>LOGIN</Button>
          </>
        ) : (
          <>
            <Button onClick={moveListPage}>API LIST</Button>
            <Button onClick={moveGuidePage}>GUIDE</Button>
            <Button onClick={handleLogOut}>LOGOUT</Button>
          </>
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
  cursor: pointer;

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
  margin: 0.6rem;
  border: none;
  border-radius: 0.5rem;
  width: 7rem;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  font-weight: 550;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    color: ${COLOR.BLUE};
  }
`;

export { NavBar };
