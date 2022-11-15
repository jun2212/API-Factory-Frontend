import React, { useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

import { COLOR } from "../../config/constants";

function CodeEditor({ editorRef, validateRef }) {
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }
  function handleEditorValidation(markers) {
    validateRef.current = markers;
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
        onValidate={handleEditorValidation}
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

CodeEditor.propTypes = {
  editorRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  validateRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

export { CodeEditor };
