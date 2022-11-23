import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { COLOR, GUIDE_CONTENT } from "../../config/constants";

function TableOfContents({ setContent }) {
  useEffect(() => {
    setContent({
      __html: GUIDE_CONTENT[0]["CONTENT"],
    });
  }, []);

  const handleContentValue = (index) => {
    setContent({
      __html: GUIDE_CONTENT[index]["CONTENT"],
    });
  };

  return (
    <TOCWrapper>
      <Title>목차</Title>
      <Table>
        {GUIDE_CONTENT.map((item, index) => (
          <Item
            key={item["TITLE"] + index}
            onClick={() => handleContentValue(index)}
          >
            {item["TITLE"]}
          </Item>
        ))}
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

const Item = styled.div`
  color: ${COLOR.BLACK};
  font-size: 1.2rem;
  font-weight: bolder;
  margin: 0.8rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    color: ${COLOR.BLUE};
  }
`;

TableOfContents.propTypes = {
  setContent: PropTypes.func,
};

export { TableOfContents };
