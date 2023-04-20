import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR } from "../../config/constants";

function CodeTester({
  selectedMemory,
  setSelectedMemory,
  parameterValues,
  setParameterValues,
  startTest,
}) {
  const memory = ["512", "1024", "2048"];
  const [countParameter, setCountParameter] = useState(0);

  const handleSelectMemory = (event) => {
    setSelectedMemory(event.target.value);
  };
  const addParameterInput = () => {
    if (countParameter >= 5) {
      return;
    }
    setCountParameter(countParameter + 1);
  };
  const onChangeParameterValue = (e, index) => {
    const values = [...parameterValues];
    values[index] = e.target.value;
    setParameterValues(values);
  };

  const RemoveParameterInput = (index) => {
    const values = [...parameterValues];
    values.splice(index, 1);

    setCountParameter(countParameter - 1);
    setParameterValues(values);
  };

  return (
    <TesterWrapper>
      <MemoryWrapper>
        <MemorySpan>메모리 제한</MemorySpan>
        <Select onChange={handleSelectMemory} value={selectedMemory}>
          {memory.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
        <SelectSpan>m</SelectSpan>
      </MemoryWrapper>
      <AddParameterWrapper>
        <ParameterSpan>파라미터</ParameterSpan>
        <AddParameterButton onClick={addParameterInput}>
          추가
        </AddParameterButton>
      </AddParameterWrapper>
      <ParameterItems>
        {new Array(countParameter).fill(0).map((_, index) => {
          return (
            <ParameterItem key={index}>
              <ParameterInput
                value={parameterValues[index] || ""}
                onChange={(e) => onChangeParameterValue(e, index)}
              ></ParameterInput>
              <RemoveParameterButton
                onClick={() => RemoveParameterInput(index)}
              >
                삭제
              </RemoveParameterButton>
            </ParameterItem>
          );
        })}
      </ParameterItems>
      <TestButton onClick={startTest}>테스트</TestButton>
    </TesterWrapper>
  );
}

const Select = styled.select`
  width: 5rem;
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

const SelectSpan = styled.span`
  font-size: 1.1rem;
`;

const TesterWrapper = styled.div`
  display: flex;
  width: 20vw;
  border: 4px solid black;
  flex-direction: column;
  align-items: center;
  margin: 2.2rem 0 0 1rem;
`;

const MemoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 13vw;
  margin: 2rem;
`;

const AddParameterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 13vw;
  margin-top: 1vh;
`;

const ParameterItems = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  height: 33vh;
`;
const ParameterItem = styled.div`
  display: flex;
  align-items: center;
`;

const MemorySpan = styled.span`
  font-size: 1.2rem;
  font-weight: bolder;
`;
const ParameterSpan = styled.span`
  font-size: 1.2rem;
  font-weight: bolder;
`;

const ParameterInput = styled.input`
  font-size: 1.2rem;
  width: 10vw;
  margin: 0.7rem;
`;

const AddParameterButton = styled.button`
  display: flex;
  align-items: center;
  height: 2rem;
  border: 1px solid ${COLOR.BLACK};
  border-radius: 10px;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.3rem;
  font-weight: bolder;
  cursor: pointer;
`;

const RemoveParameterButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.3rem;
  font-weight: bolder;
  cursor: pointer;
`;

const TestButton = styled.button`
  display: flex;
  align-items: center;
  height: 2rem;
  border: 1px solid ${COLOR.BLACK};
  border-radius: 10px;
  background: ${COLOR.WHITE};
  color: ${COLOR.BLACK};
  font-size: 1.3rem;
  font-weight: bolder;
  cursor: pointer;
`;

CodeTester.propTypes = {
  selectedMemory: PropTypes.string,
  parameterValues: PropTypes.array,
  functionKey: PropTypes.string,
  method: PropTypes.string,
  setSelectedMemory: PropTypes.func,
  setParameterValues: PropTypes.func,
  startTest: PropTypes.func,
};

export { CodeTester };
