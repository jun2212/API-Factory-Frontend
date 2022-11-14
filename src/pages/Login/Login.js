import React from "react";
import styled from "styled-components";

import { LoginForm } from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <>
      <ContentsWrapper>
        <LoginForm />
      </ContentsWrapper>
    </>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

export { Login };
