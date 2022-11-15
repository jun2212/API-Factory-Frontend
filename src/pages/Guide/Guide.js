import React from "react";
import styled from "styled-components";

import { TableOfContent } from "../../components/TableOfContent/TableOfContent";
import { GuideContent } from "../../components/GuideContent/GuideContent";

function Guide() {
  return (
    <ContentsWrapper>
      <TableOfContent />
      <GuideContent />
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  min-height: 90vh;
`;

export { Guide };
