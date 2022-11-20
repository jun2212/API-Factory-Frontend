import React, { useRef, useState } from "react";
import styled from "styled-components";

import { COLOR, defaultCode } from "../../config/constants";
import { fetchUserData } from "../../utils/utils";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import { Modal } from "../../components/Modal/Modal";

function Main() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const [SelectedMethod, setSelectedMethod] = useState("GET");

  const editorRef = useRef(null);
  const validateRef = useRef(null);
  const functionNameRef = useRef(null);

  const method = ["GET", "POST", "PUT", "DELETE"];

  const submitCode = async () => {
    const code = editorRef.current.getValue();
    const name = functionNameRef.current.value;
    const isValidated = validation(code, name);

    if (isValidated) {
      const { status, message } = await fetchUserData("/functionData", {
        method: SelectedMethod,
        name: name,
        code: code,
      });
      if (status === 400 || status === 500) {
        setModalMessage({
          title: `status : ${status}`,
          content: message,
        });
      } else {
        setModalMessage({
          title: "저장 완료",
          content: `Key : ${message}`,
        });
      }
    }
    setIsModalOpen(true);
  };

  const validation = (code, name) => {
    setModalMessage({});

    const indexOfFunctionName = code.indexOf("APIFunction");

    if (
      indexOfFunctionName === -1 ||
      (code[indexOfFunctionName + 11] !== " " &&
        code[indexOfFunctionName + 11] !== "(")
    ) {
      setModalMessage({
        title: "입력 오류",
        content: "함수 이름은 APIFunction 이어야 합니다.",
      });
      return false;
    }

    if (name === "") {
      setModalMessage({
        title: "생성  될 api의 이름을 입력해 주세요",
        content: "enter your function name",
      });

      return false;
    }

    if (validateRef.current !== null && validateRef.current.length !== 0) {
      const result = validateRef.current.filter(
        (markers) => markers.code !== "80001" && markers.code !== "6133",
      );

      if (result.length !== 0) {
        setModalMessage({
          title: `Start Line : ${result[0].startLineNumber}, Start Column : ${result[0].startColumn} `,
          content: result[0].message,
        });

        return false;
      }
    }

    return true;
  };

  const handleSelect = (event) => {
    setSelectedMethod(event.target.value);
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
        <TopWrapper>
          <Select onChange={handleSelect} value={SelectedMethod}>
            {method.map((item) => (
              <Option value={item} key={item}>
                {item}
              </Option>
            ))}
          </Select>
          <Tip>자세한 사용법은 GUIDE를 참고해 주세요.</Tip>
        </TopWrapper>
        <CodeEditor
          editorRef={editorRef}
          validateRef={validateRef}
          defaultCode={defaultCode}
        />
        <BottomWrapper>
          <EnterFunctionName>
            <BottomSpan>함수 이름</BottomSpan>
            <BottomInput ref={functionNameRef}></BottomInput>
          </EnterFunctionName>
          <Button onClick={submitCode}>함수 저장</Button>
        </BottomWrapper>
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

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50vw;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 50vw;
`;

const BottomInput = styled.input`
  font-size: 1.3rem;
  width: 20vw;
  margin-left: 2rem;
`;

const BottomSpan = styled.span`
  font-size: 1.3rem;
  font-weight: bolder;
`;

const EnterFunctionName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 3rem;
  margin-top: 2vh;
`;

const Select = styled.select`
  width: 6rem;
  height: 2rem;
  background: white;
  color: ${COLOR.BLACK};
  padding-left: 0.5rem;
  font-size: 1.1rem;
  border-radius: 0.2rem;
`;

const Option = styled.option`
  color: ${COLOR.BLACK};
  background: white;
  display: flex;
  white-space: pre;
  min-height: 5rem;
  padding: 0rem 0.2rem 0.1rem;
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
