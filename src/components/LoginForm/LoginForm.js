import React from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

function LoginForm() {
  return (
    <LoginWrapper>
      <Title>LOGIN</Title>
      <StyledInput placeholder=" 아이디"></StyledInput>
      <StyledInput placeholder=" 비밀번호"></StyledInput>
      <Message>ID or password does not match</Message>
      <Button>LOGIN</Button>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 0 15rem;
  background-color: ${COLOR.GRAY};
`;

const Title = styled.span`
  color: ${COLOR.BLACK};
  font-size: 2rem;
  font-weight: bolder;
  margin: 3rem;
`;

const StyledInput = styled.input`
  background-color: ${COLOR.WHITE};
  width: 30vw;
  height: 2rem;
  border: none;
  margin: 2rem;
`;

const Message = styled.span`
  color: ${COLOR.RED};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  margin-left: 30vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  border: none;
  border-radius: 30px;
  background: ${COLOR.BLUE};
  color: ${COLOR.WHITE};
  font-size: 1.3rem;
  font-weight: bolder;

  &:hover {
    background-color: ${COLOR.WHITE};
    color: ${COLOR.BLUE};
    transition: all 200ms;
  }
`;

export { LoginForm };
