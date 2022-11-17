import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLOR } from "../../config/constants";

function Error() {
  const location = useLocation();

  const errorStatus = location.state?.status || "errorStatus";
  const errorMessage = location.state?.message || "errorMessage";

  return (
    <ContentsWrapper>
      <ErrorWrapper>
        <Title>status : {errorStatus}</Title>
        <Message>{errorMessage}</Message>
      </ErrorWrapper>
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  background-color: ${COLOR.GRAY};
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  height: 50vh;
  margin: 0 15rem;
  background-color: ${COLOR.WHITE};
`;

const Title = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 3rem;
`;

const Message = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
`;

export { Error };
