import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Portal } from "../Portal";
import { COLOR } from "../../config/constants";

function ConfirmModal({
  confirmedType,
  setSelectedType,
  closeModal,
  title,
  content,
}) {
  return (
    <Portal>
      <Background
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;

          closeModal();
        }}
      >
        <Content>
          <Title>{title}</Title>
          <Message>{content}</Message>
          <ButtonWrapper>
            <Button
              onClick={() => (closeModal(), setSelectedType(confirmedType))}
            >
              확인
            </Button>
            <Button onClick={closeModal}>취소</Button>
          </ButtonWrapper>
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
  width: 25rem;
  height: 15rem;
  border: none;
  border-radius: 20px;
  background-color: ${COLOR.GRAY};
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
  font-size: 1.2rem;
  font-weight: bolder;
  margin: 2rem;
`;

const Message = styled.span`
  color: ${COLOR.BLACK};
  font-size: 1rem;
  margin: 1.2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  margin: 1.5rem;
  background-color: ${COLOR.BLACK};
  border: none;
  border-radius: 10px;
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

ConfirmModal.propTypes = {
  confirmedType: PropTypes.string,
  setSelectedType: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
};

export { ConfirmModal };
