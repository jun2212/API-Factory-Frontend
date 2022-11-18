import React, { useRef, useState } from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";
import { fetchUserData } from "../../utils/utils";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import { Modal } from "../../components/Modal/Modal";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const editorRef = useRef(null);
  const validateRef = useRef(null);

  const submitCode = async () => {
    const userCode = editorRef.current.getValue();
    const isValidated = validationCode(userCode);

    if (isValidated) {
      const { status, message } = await fetchUserData("/save", {
        userCode: userCode,
      });
      if (status === 400 || status === 500) {
        setModalMessage({
          title: `status : ${status}`,
          content: message,
        });
      }
      setModalMessage({
        title: "저장 완료",
        content: `Key : ${message}`,
      });
    }
    setIsModalOpen(true);
  };
  const validationCode = (userCode) => {
    setModalMessage("");
    const indexOfFunctionName = userCode.indexOf("APIFunction");

    if (validateRef.current !== null && validateRef.current.length !== 0) {
      setModalMessage({
        title: "입력 오류",
        content: "함수의 형태가 잘못되었습니다.",
      });
      return false;
    }
    if (
      indexOfFunctionName === -1 ||
      (userCode[indexOfFunctionName + 11] !== " " &&
        userCode[indexOfFunctionName + 11] !== "(")
    ) {
      setModalMessage({
        title: "입력 오류",
        content: "함수 이름은 APIFunction 이어야 합니다.",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          closeModal={() => setIsModalOpen(false)}
          title={modalMessage.title}
          content={modalMessage.content}
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
