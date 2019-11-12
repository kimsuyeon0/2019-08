import * as React from "react";
import styled from "styled-components";

const CustomImgBox = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  margin: 5px;
  &:hover {
    background-color: #39515a;
  }
`;

const CustomImg = styled.img`
  width: 70%;
`;
interface PropsType {
  imageSrc: string;
}

export const IconBox: React.FC<PropsType> = props => {
  return (
    <CustomImgBox>
      <CustomImg src={props.imageSrc}></CustomImg>
    </CustomImgBox>
  );
};
