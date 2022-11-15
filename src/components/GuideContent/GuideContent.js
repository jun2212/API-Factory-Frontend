import React, { useRef } from "react";
import styled from "styled-components";

import { COLOR } from "../../config/constants";

function GuideContent() {
  return (
    <ContentWrapper>
      <Content>
        <h3>사용 가능한 언어</h3>
        <br />
        현재 지원되는 언어는 <b>javascript</b>이며 앞으로 더 많은 언어를 지원 할
        예정입니다.
      </Content>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  background-color: ${COLOR.WHITE};
  border-left: solid 2px ${COLOR.GRAY};
  margin-left: 20vw;
`;

const Content = styled.p`
  text-align: center;
  margin: 3rem;
`;

export { GuideContent };
