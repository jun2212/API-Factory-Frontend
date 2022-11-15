import React from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

function TableOfContent() {
  return (
    <TOCWrapper>
      <Title>목차</Title>
      <Table>
        <Link href="#">사용 가능한 언어</Link>
        <Link href="#">함수 형식</Link>
        <Link href="#">사용 가능한 라이브러리</Link>
        <Link href="#">고유 라이브러리</Link>
        <Link href="#">API 사용법</Link>
        <Link href="#">요청 제한</Link>
        <Link href="#">문의 방법</Link>
      </Table>
    </TOCWrapper>
  );
}

const TOCWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
  height: 92vh;
  background-color: ${COLOR.WHITE};
`;

const Title = styled.span`
  color: ${COLOR.BLACK};
  font-size: 2rem;
  font-weight: bolder;
  margin: 4vh;
  border-bottom: solid 3px ${COLOR.BLACK};
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Link = styled.a`
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  margin: 0.8rem;
  text-decoration: none;

  &:hover {
    border-bottom: 2px solid black;
    color: ${COLOR.BLUE};
  }
`;

export { TableOfContent };
