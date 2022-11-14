import React from "react";
import styled from "styled-components";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";

function CreateFunction() {
  return (
    <ContentsWrapper>
      <CodeEditor />
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

export { CreateFunction };
