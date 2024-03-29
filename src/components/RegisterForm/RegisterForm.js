import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { COLOR } from "../../config/constants";
import { useInput, useValidationUserData } from "../../customHooks/customHooks";
import { backEndFetchDataUtil } from "../../utils/utils";

function RegisterForm() {
  const navigate = useNavigate();

  const userId = useInput("");
  const password = useInput("");
  const passwordConfirm = useInput("");

  const [
    idMessage,
    passwordMessage,
    setIdMessage,
    setPasswordMessage,
    validation,
  ] = useValidationUserData();

  const comparePassword = () => {
    if (password.value !== passwordConfirm.value) {
      setPasswordMessage("The two passwords do not match.");

      return true;
    }

    return false;
  };

  const submitUserData = async () => {
    setIdMessage("");
    setPasswordMessage("");

    if (validation(userId.value, password.value) || comparePassword()) {
      return;
    }

    const { status, message } = await backEndFetchDataUtil(
      "/register",
      "POST",
      {
        userId: userId.value,
        password: password.value,
      },
    );

    if (status === 400) {
      setIdMessage(message);
      return;
    }
    if (status === 500) {
      setIdMessage(`${status} : ${message}`);
      return;
    }

    navigate("/login");
  };

  return (
    <RegisterWrapper>
      <Title>REGISTER</Title>
      <StyledInput {...userId} placeholder=" ID" type="text"></StyledInput>
      <Message>{idMessage}</Message>
      <StyledInput
        {...password}
        placeholder=" Password"
        type="password"
      ></StyledInput>
      <StyledInput
        {...passwordConfirm}
        placeholder=" Confirm Password"
        type="password"
      ></StyledInput>
      <Message>{passwordMessage}</Message>
      <Button onClick={submitUserData}>REGISTER</Button>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
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
  margin: 1rem;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
`;

const Message = styled.span`
  color: ${COLOR.RED};
`;

const Button = styled.button`
  padding: 0.7rem;
  margin-left: 30vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  border: none;
  border-radius: 30px;
  width: 9rem;
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

export { RegisterForm };
