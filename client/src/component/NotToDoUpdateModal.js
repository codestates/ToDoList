import axios from "axios";
import React, { useState, useEffect } from "react";

import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
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

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog'
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

function NotToDoUpdateModal ( {id} ) {
    const [isOpen, setIsOpen] = useState(false);

    const [notToDoId, setNotToDoId] = useState(0)
    const [userId, setUserId] = useState(0)
    const [list, setList] = useState('');
    const [startTime, setStartTime] = useState('00:00');
    const [endTime, setEndTime] = useState('00:00');
    const [startTime_feedback, setStartTime_feedback] = useState(null);
    const [endTime_feedback, setEndTime_feedback] = useState(null);
    const [theme, setTheme] = useState();
    const [date, setDate] = useState()

    const openModalHandler = () => {
      setIsOpen(!isOpen);
      setNotToDoId(id)
      getListInfo()
    };

    const CloseModalHandler = () => {
      setIsOpen(!isOpen);
      submitUpdateHandler()
    }
  
    const ListHandler = e => {
      setList(e.target.value);
    };
  
    const StartTimeHandler = e => {
      setStartTime(e.target.value);
    };
  
    const EndTimeHandler = e => {
      setEndTime(e.target.value);
    };
  
    const StartTime_feedbackHandler = e => {
      setStartTime_feedback(e.target.value);
    };
  
    const EndTime_feedbackHandler = e => {
      setEndTime_feedback(e.target.value);
    };
  
    const ThemeHandler = e => {
      setTheme(e.target.value);
    };


    const getListInfo = () => {
      console.log('get 요청 전 id', id)
      axios
        .get(`https://localhost:5000/nottodo/${id}`, {     // userId가 아닌 id로 get 요청
          withCredentials: true,
        })
        .then(res => {
          let info = res.data.data
          setUserId(info.userId)
          setList(info.list)
          setStartTime(info.startTime)
          setEndTime(info.endTime)
          setStartTime_feedback(info.startTime_feedback)
          setEndTime_feedback(info.endTime_feedback)
          setTheme(info.theme)
          setDate(info.date)
        })
        .catch((err)=> {
          console.log(err)
        })
    }

      const submitUpdateHandler = () => {   // 업데이트 요청 핸들러

        let data = {
          id: notToDoId,
          userId: userId,
          list: list,
          startTime,
          endTime,
          startTime_feedback,
          endTime_feedback,
          theme,
          date
        };
        axios
          .patch("https://localhost:5000/nottodo", data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
          .then(res => {
            console.log(res);
          })
          .catch((err)=> {
            console.log(err)
          })
      }
    
    return (
      <>
      <ModalContainer>
          <ModalBtn onClick={openModalHandler}>
            {isOpen === false ? '피드백/업데이트' : '수정중'}
          </ModalBtn>
          {isOpen === true ? <ModalBackdrop>

          <form>
            <label>LIST: </label>
            <input type="text" onChange={ListHandler} value={list} />
            
            <label>START TIME: </label>
            <input
              type="time"
              onChange={StartTimeHandler}
              value={startTime}
            />
            
            <label>END TIME: </label>
            <input
              type="time"
              onChange={EndTimeHandler}
              value={endTime}
            />
            
            <label>START TIME(feedback) </label>
            <input
            type="time"
            onChange={StartTime_feedbackHandler}
            value={startTime_feedback}
            />
          
            <label>END TIME(feedback) </label>
            <input
            type="time"
            onChange={EndTime_feedbackHandler}
            value={endTime_feedback}
            />
  
            <label>THEME: </label>
            <input type="text" onChange={ThemeHandler} value={theme} />

          </form>
              <ModalBtn onClick={CloseModalHandler}>수정 완료</ModalBtn>
          </ModalBackdrop> : null}
      </ModalContainer>
      </>
    );
}

export default NotToDoUpdateModal;