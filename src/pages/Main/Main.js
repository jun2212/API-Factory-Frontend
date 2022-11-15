import React, { useRef, useState } from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import { Modal } from "../../components/Modal/Modal";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const editorRef = useRef(null);
  const validateRef = useRef(null);

  const submitCode = () => {
    setMessage(validationCode());
    setIsModalOpen(true);
  };
  const validationCode = () => {
    if (validateRef.current !== null && validateRef.current.length !== 0) {
      return "함수의 형태가 잘못되었습니다.";
    }
    return "전송완료";
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          title={"titleMessage"}
          message={message}
        />
      )}
      <ContentsWrapper>
        <Tip>자세한 사용법은 GUIDE를 참고해 주세요.</Tip>
        <CodeEditor editorRef={editorRef} validateRef={validateRef} />
        <Button onClick={submitCode}>함수 저장</Button>
      </ContentsWrapper>
    </>
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
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.WHITE};
    color: ${COLOR.RED};
    transition: all 200ms;
  }
`;

export { Main };
