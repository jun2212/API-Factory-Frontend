import React from "react";
import styled from "styled-components";
import { COLOR } from "../../config/constants";

function NotFound() {
  return (
    <ContentsWrapper>
      <ErrorWrapper>
        <Title>404 NotFound</Title>
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

export { NotFound };
