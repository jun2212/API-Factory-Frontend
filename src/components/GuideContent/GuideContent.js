import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR } from "../../config/constants";

function GuideContent({ content }) {
  return (
    <ContentWrapper>
      <Content>
        <div dangerouslySetInnerHTML={content} />
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

const Content = styled.div`
  margin: 3rem;
  width: 50vw;
`;

GuideContent.propTypes = {
  content: PropTypes.object,
};

export { GuideContent };
