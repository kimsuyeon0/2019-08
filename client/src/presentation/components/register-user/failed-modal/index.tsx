import React from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";

const Wrapper = styled.section`
  position: absolute;
  z-index: 1;
  background-color: grey;
  opacity: 0.9;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 20%;
  height: 15%;
  top: 50%;
  border-radius: 10px;
  transform: translateY(-50%);
`;

const content = styled.main`
  margin-bottom: 10px;
`;

interface PropTypes {
  onClick?(parameter: any | void): any | void;
}

export const RegisterUserFailedModal: React.FC<PropTypes> = ({ onClick }) => {
  return (
    <Wrapper>
      <div>회원 가입이 실패했습니다.</div>
      <CustomButton
        type={"button"}
        color={"#fda600"}
        size={"20%"}
        name={"확인"}
        fontSize={"0.7rem"}
        fontColor={"#ffffff"}
        fontWeight={"bold"}
        height={"30px"}
        onClick={onClick}
      ></CustomButton>
    </Wrapper>
  );
};