import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CustomButton } from "presentation/components/atomic-reusable/custom-button";
import { FileDropArea } from "./file-drop-area";
import { FilePreview } from "../file-preview";
import { globalApplication } from "contexts/application-context";
import { usePathParameter } from "contexts/path-parameter-context";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: ${({ theme }) => theme.snugBackGround};
`;

const ModalContent = styled.div`
  position: relative;
  height: auto;
  background-color: ${({ theme }) => theme.snug};
  margin: 10% auto;
  padding: 20px;
  border: 1px solid black;
  border-radius: 1rem;
  width: 30%;
  box-sizing: border-box;
`;

const ModalHeader = styled.header`
  padding: 1rem;
  font-size: 200%;
  font-weight: bold;
  color: ${({ theme }) => theme.snugMainFont};
  box-sizing: border-box;
`;

const ModalBody = styled.div`
  padding: 1rem;
  box-sizing: border-box;
`;

const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  box-sizing: border-box;
`;

const CloseButton = styled.span`
  color: ${({ theme }) => theme.subButtonColor};
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.subButtonColorHover};
    text-decoration: none;
    cursor: pointer;
  }
`;

const CustomInput = styled.section`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.snugBorderColor};
  background-color: ${({ theme }) => theme.snug};
  border-radius: 0.5rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const StyledInput = styled.textarea.attrs({
  id: "file-upload-message",
  placeholder: "메세지를 입력하세요."
})`
  --webkit-appearance: none;
  background-color: ${({ theme }) => theme.snug};
  font-size: 14px;
  color: ${({ theme }) => theme.snugMainFont};
  width: 100%;
  border: none;
  box-sizing: border-box;
  &:active,
  :focus {
    outline: none;
  }
`;

const HiddenInput = styled.input.attrs({
  type: "file"
})`
  display: none;
`;

interface PropTypes {
  closeModal: () => void;
}

export const FileUploadModal: React.FC<PropTypes> = props => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(new File([], ""));
  const pathPrameter = usePathParameter();

  const application = useContext(globalApplication);
  const { closeModal } = props;

  const onMessageChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  const onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    setFile(event.target.files![0]);
  };

  // file upload 되었을 때, input highlight
  useEffect(() => {
    document.getElementById("file-upload-message")!.focus();
  }, [file]);

  const onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    const result = await application.services.postService.createMessageWithFile(
      message,
      pathPrameter.channelId!,
      file
    );

    if (result === true) closeModal();
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          파일 업로드
        </ModalHeader>

        <ModalBody>
          <CustomInput>
            <StyledInput onChange={onMessageChange} />
          </CustomInput>

          <label htmlFor="fileInput">
            <FileDropArea setFile={setFile} />
          </label>
          <HiddenInput id="fileInput" onChange={onFileChange} />
          {file && file.size > 0 ? <FilePreview file={file} /> : undefined}
        </ModalBody>

        <ModalFooter>
          <CustomButton
            color={"#148567"}
            fontColor={"#ffffff"}
            name={"업로드"}
            size={"big"}
            fontWeight={"bold"}
            fontSize={"1rem"}
            height={"2.5rem"}
            onClick={onClick}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
