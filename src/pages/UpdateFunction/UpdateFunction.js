import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { COLOR } from "../../config/constants";
import {
  backEndFetchDataUtil,
  serverlessFetchDataUtil,
} from "../../utils/utils";
import { useValidationCode } from "../../customHooks/customHooks";

import { CodeEditor } from "../../components/CodeEditor/CodeEditor";
import { CodeTester } from "../../components/CodeTester/CodeTester";
import { Modal } from "../../components/Modal/Modal";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";
import { TesterModal } from "../../components/TesterModal/TesterModal";

function UpdateFunction() {
  const navigate = useNavigate();

  const [userFunction, setUserFunction] = useState({});
  const { functionKey } = useParams();

  useEffect(() => {
    (async () => {
      const { message: response } = await backEndFetchDataUtil(
        `/functionData/${functionKey}`,
        "GET",
      );

      if (!response["Item"]) {
        navigate("/notFound");
      }

      setUserFunction(response["Item"]);
      setSelectedMethod(response["Item"]["method"]);
    })();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isTesterModalOpen, setIsTesterModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("GET");
  const [selectedMemory, setSelectedMemory] = useState("512");
  const [confirmedType, setConfirmedType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [parameterValues, setParameterValues] = useState([]);

  const editorRef = useRef(null);
  const validateRef = useRef(null);
  const functionNameRef = useRef(null);

  const [modalMessage, setModalMessage, validation] = useValidationCode();

  const method = ["GET", "POST", "PUT", "DELETE"];
  const fetchUrl = `https://jh90y6zqei.execute-api.ap-northeast-2.amazonaws.com/apiRunner${selectedMemory}m?functionKey=${functionKey}`;

  useEffect(() => {
    if (selectedType === "수정") {
      updateFunction();
    }
    if (selectedType === "삭제") {
      deleteFunction();
    }
  }, [selectedType]);

  const updateFunction = async () => {
    const code = editorRef.current.getValue();
    const name = functionNameRef.current.value;
    const isValidated = validation(code, name, validateRef.current);

    if (isValidated) {
      const { status, message } = await backEndFetchDataUtil(
        "/functionData",
        "PUT",
        {
          functionKey: userFunction["function_key"],
          method: selectedMethod,
          name: name,
          code: code,
        },
      );

      if (status === 400 || status === 500) {
        setModalMessage({
          title: `status : ${status}`,
          content: message,
        });
      } else {
        setModalMessage({
          title: "수정 완료",
          content: message,
        });
      }
    }

    setSelectedType("");
    setIsModalOpen(true);
  };

  const deleteFunction = async () => {
    const { status, message } = await backEndFetchDataUtil(
      `/functionData/${userFunction["function_key"]}`,
      "DELETE",
    );

    if (status === 400 || status === 500) {
      setModalMessage({
        title: `status : ${status}`,
        content: message,
      });
    } else {
      setModalMessage({
        title: "삭제 완료",
        content: message,
      });
    }

    setIsModalOpen(true);
  };

  const handleConfirm = (type) => {
    setModalMessage({
      title: `정말 ${type} 하시겠습니까?`,
      content: "수정/삭제를 하면 이전으로 되돌릴 수 없습니다.",
    });
    setConfirmedType(type);
    setIsConfirmModalOpen(true);
  };

  const handleSelectMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const transTypeParameters = () => {
    const parameters = [...parameterValues];
    const newParameters = [];

    parameters.forEach((parameter) => {
      const value = new Function("return " + parameter)();

      newParameters.push(value);
    });

    return newParameters;
  };

  const startTest = async () => {
    const newParameters = transTypeParameters();
    const testerTitle = `${userFunction["name"]} 함수 실행 결과`;
    const response = await serverlessFetchDataUtil(fetchUrl, selectedMethod, {
      parameters: newParameters,
    });

    setModalMessage({
      title: testerTitle,
      content: response["result"],
    });

    setSelectedType("");
    setIsTesterModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          selectedType={selectedType}
          closeModal={() => setIsModalOpen(false)}
          title={modalMessage.title}
          content={modalMessage.content}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          confirmedType={confirmedType}
          setSelectedType={setSelectedType}
          closeModal={() => setIsConfirmModalOpen(false)}
          title={modalMessage.title}
          content={modalMessage.content}
        />
      )}
      {isTesterModalOpen && (
        <TesterModal
          selectedType={selectedType}
          closeModal={() => setIsTesterModalOpen(false)}
          title={modalMessage.title}
          url={fetchUrl}
          method={selectedMethod}
          parameter={parameterValues}
          result={modalMessage.content}
        />
      )}
      <Container>
        <ContentsWrapper>
          <EditorWrapper>
            <EditorTopWrapper>
              {userFunction["method"] && (
                <Select
                  onChange={handleSelectMethod}
                  defaultValue={userFunction["method"]}
                >
                  {method.map((item, index) => (
                    <Option value={item} key={item + index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              )}
              <Tip>key : {userFunction["function_key"]}</Tip>
            </EditorTopWrapper>
            {userFunction["code"] && (
              <CodeEditor
                editorRef={editorRef}
                validateRef={validateRef}
                defaultCode={userFunction["code"]}
              />
            )}
          </EditorWrapper>
          <CodeTester
            selectedMemory={selectedMemory}
            setSelectedMemory={setSelectedMemory}
            parameterValues={parameterValues}
            setParameterValues={setParameterValues}
            startTest={startTest}
          />
        </ContentsWrapper>
        <BottomWrapper>
          <EnterFunctionName>
            <BottomSpan>API 이름</BottomSpan>
            <BottomInput
              ref={functionNameRef}
              defaultValue={userFunction["name"]}
            ></BottomInput>
          </EnterFunctionName>
          <Button onClick={() => handleConfirm("삭제")}>함수 삭제</Button>
          <Button onClick={() => handleConfirm("수정")}>함수 수정</Button>
        </BottomWrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const ContentsWrapper = styled.div`
  display: flex;
`;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EditorTopWrapper = styled.div`
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

export { UpdateFunction };
