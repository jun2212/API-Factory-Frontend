import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { Portal } from "../Portal";
import { COLOR } from "../../config/constants";

function TesterModal({
  selectedType,
  closeModal,
  title,
  url,
  method,
  parameter,
  result,
}) {
  const navigate = useNavigate();
  const handleButton =
    selectedType === "삭제" ? () => navigate("/list") : closeModal;
  return (
    <Portal>
      <Background
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;

          handleButton();
        }}
      >
        <Content>
          <Title>{title}</Title>
          <MessageWrapper>
            <Message>url : {url}</Message>
            <Message>method : {method}</Message>
            <Message>parameter : {parameter.join()}</Message>
            <Message>result : </Message>
            <ResultMessage>{result}</ResultMessage>
          </MessageWrapper>
          <CloseButton onClick={handleButton}>확인</CloseButton>
        </Content>
      </Background>
    </Portal>
  );
}

const Background = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 55vw;
  height: 45vw;
  border: none;
  border-radius: 20px;
  background-color: ${COLOR.WHITE};
  font-size: 2rem;
  animation: smoothOpen 0.3s;

  @keyframes smoothOpen {
    from {
      opacity: 0;
      transform: translateY(-10%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const Title = styled.span`
  color: ${COLOR.BLACK};
  font-size: 2rem;
  font-weight: bolder;
  margin: 3vw;
`;

const MessageWrapper = styled.div`
  display: flex;
  width: 40vw;
  height: 25vw;
  flex-direction: column;
`;

const Message = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1.3rem;
  margin: 0.8vw;
`;

const ResultMessage = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1rem;
  margin: 0.8vw;
  word-wrap: break-word;
  overflow-y: scroll;
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 3rem;
  margin-top: 5rem;
  background-color: ${COLOR.RED};
  border: none;
  border-radius: 50px;
  color: ${COLOR.WHITE};
  font-size: 1.5rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: pointer;

  &:hover {
    background-color: ${COLOR.WHITE};
    color: ${COLOR.RED};
    transition: all 200ms;
  }
`;

TesterModal.propTypes = {
  selectedType: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  method: PropTypes.string,
  parameter: PropTypes.array,
  result: PropTypes.object,
};

export { TesterModal };
