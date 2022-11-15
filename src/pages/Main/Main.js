import React from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";

function Main() {
  return (
    <ContentsWrapper>
      <Tip>자세한 사용법은 GUIDE를 참고해 주세요.</Tip>
      <CodeEditor />
      <Button>함수 저장</Button>
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const Tip = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1rem;
  font-weight: bolder;
  margin: 0.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 1rem;
  margin-left: 43vw;
  margin-top: 2vh;
  border: none;
  border-radius: 30px;
  background: ${COLOR.RED};
  color: ${COLOR.WHITE};
  font-size: 1.3rem;
  font-weight: bolder;

  &:hover {
    background-color: ${COLOR.BLACK};
    color: ${COLOR.RED};
    transition: all 200ms;
  }
`;

export { Main };
