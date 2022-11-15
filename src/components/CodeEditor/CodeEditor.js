import React, { useRef } from "react";
import styled from "styled-components";
import Editor from "@monaco-editor/react";

import { COLOR } from "../../config/constants";

function CodeEditor() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <EditorWrapper>
      <Editor
        width="50vw"
        height="60vh"
        defaultLanguage="javascript"
        defaultValue="function APIFunction() {
          //your code..
        }"
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{
          fontSize: 15,
          padding: { top: 20 },
          minimap: { enabled: false },
          scrollbar: {
            vertical: "auto",
            horizontal: "auto",
          },
        }}
      />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  display: flex;
  width: 50vw;
  margin: 0 15rem;
  background-color: ${COLOR.GRAY};
`;

export { CodeEditor };
