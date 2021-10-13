import axios from "axios";
import React, { useState, useEffect } from "react";

import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  height: 1rem;
  text-align: center;
  margin: 12px auto;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 15px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: "dialog",
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 300px;
  height: 100px;
  > div.close_btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

function ToDoDeleteModal({ id, changeListHandler }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const CloseModalHandler = () => {
    setIsOpen(!isOpen);
  };

  const CloseAndDeleteHandler = () => {
    setIsOpen(!isOpen);
    submitDeleteHandler();
    changeListHandler();
  };

  const submitDeleteHandler = () => {
    // delete 요청 핸들러

    axios
      .delete(
        "https://localhost:5000/todo",
        { params: { id } },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ModalContainer>
        <ModalBtn onClick={openModalHandler}>
          {isOpen === false ? "삭제하기" : "삭제중"}
        </ModalBtn>
        {isOpen === true ? (
          <ModalBackdrop>
            <ModalBtn onClick={CloseModalHandler}>취소</ModalBtn>
            <ModalBtn onClick={CloseAndDeleteHandler}>삭제 완료</ModalBtn>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
}

export default ToDoDeleteModal;
