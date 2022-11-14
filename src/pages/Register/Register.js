import React from "react";
import styled from "styled-components";

import { RegisterForm } from "../../components/RegisterForm/RegisterForm";

function Register() {
  return (
    <>
      <ContentsWrapper>
        <RegisterForm />
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

export { Register };
