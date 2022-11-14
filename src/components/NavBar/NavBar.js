import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function NavBar() {
  return (
    <Wrapper>
      <ButtonWrapper>
        <Button>로그인</Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  height: 4rem;
  border: none;
  background: black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 5rem;
`;

const Button = styled.button`
  margin-left: 5rem;
  padding: 0.3rem;
  border: none;
  border-radius: 0.5rem;
  background: white;
  color: black;
  font-size: 1.2rem;
  font-weight: bolder;
  cursor: pointer;

  &:hover {
    border-bottom: 2px solid black;
    color: black;
  }
`;

export { NavBar };
