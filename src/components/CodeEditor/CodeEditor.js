import React from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

function CodeEditor() {
  return <EditorWrapper></EditorWrapper>;
}

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  margin: 0 15rem;
  background-color: ${COLOR.GRAY};
`;

export { CodeEditor };
