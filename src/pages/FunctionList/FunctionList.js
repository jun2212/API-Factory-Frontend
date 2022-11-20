import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { COLOR } from "../../config/constants";
import { fetchUserData, getFunctions } from "../../utils/utils";

function FunctionList() {
  const navigate = useNavigate();

  const [userFunctions, setUserFunctions] = useState([]);

  useEffect(() => {
    (async () => {
      const { Items } = await getFunctions();
      if (Items) {
        setUserFunctions(Items);
      }
    })();
  }, []);
  return (
    <ContentsWrapper>
      <ListWrapper>
        {userFunctions.map((item) => (
          <FunctionTitleList
            value={item["name"]}
            key={item["function_key"]}
            onClick={() =>
              navigate(`/update/${item["function_key"]}`, {
                state: { userFunction: item },
              })
            }
          >
            {item["name"]} : {item["function_key"]}
          </FunctionTitleList>
        ))}
      </ListWrapper>
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const ListWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  height: 75vh;
  width: 50vw;
  margin: 0 15vw 0 15vw;
  padding: 1rem;
  border: none;
  background: ${COLOR.BLACK};
  box-shadow: 0rem 0.3rem 0.3rem rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 1rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.5);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.5);
  }
`;

const FunctionTitleList = styled.p`
  margin: 2rem;
  color: ${COLOR.WHITE};
  font-size: 1.3rem;
  font-weight: bolder;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: ${COLOR.YELLOW};
    transition: all 200ms;
    transform: scale(1.01);
  }
`;

export { FunctionList };
