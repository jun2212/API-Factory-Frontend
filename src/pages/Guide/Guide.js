import React, { useState } from "react";
import styled from "styled-components";

import { TableOfContents } from "../../components/TableOfContents/TableOfContents";
import { GuideContent } from "../../components/GuideContent/GuideContent";

function Guide() {
  const [content, setContent] = useState({
    __html: "",
  });

  return (
    <ContentsWrapper>
      <TableOfContents setContent={setContent} />
      <GuideContent content={content} />
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  min-height: 90vh;
`;

export { Guide };
