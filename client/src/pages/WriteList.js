import React, { useState, useEffect } from "react";
import "./WriteList.css";
import axios from "axios";
import CalendarModal from "../component/CalendarModal";
import ToDoCreateModal from "../component/ToDoCreateModal";
import NotToDoCreateModal from "../component/NotToDoCreateModal";
import ToDoUpdateModal from "../component/ToDoUpdateModal";
import NotToDoUpdateModal from "../component/NotToDoUpdateModal";
import ToDoDeleteModal from "../component/ToDoDeleteModal";
import NotToDoDeleteModal from "../component/NotToDoDeleteModal";

export default function WriteList({
  ToDoList,
  NotToDoList,
  ToDoListHandler,
  NotToDoListHandler,
  date,
  setDate,
  UserId,
}) {
  useEffect(() => {
    console.log(UserId);
    ToDoListHandler(UserId);
    NotToDoListHandler(UserId);
  }, [date]); // 괄호에 date 넣어줄까

  console.log("todo:", ToDoList);
  console.log("nottodo", NotToDoList);

  //+ 메뉴 모달로 띄우기
  //모달안에 드롭다운으로 투두 낫투두
  //표에 추가하기 o

  const [openToDoInsert, setOpenToDoInsert] = useState(false); // create용 모달창 open/close 데이터
  const [openNotToDoInsert, setOpenNotToDoInsert] = useState(false); // create용 모달창 open/close 데이터

  const OpenToDoInsertModal = () => {
    //ToDoList를 추가하기 위해 모달창을 열고 닫는 핸들러
    setOpenToDoInsert(!openToDoInsert);
  };

  const OpenNotToDoInsertModal = () => {
    //NotToDoList를 추가하기 위해 모달창을 열고 닫는 핸들러
    setOpenNotToDoInsert(!openNotToDoInsert);
  };

  function simpleTime(time) {
    //시-분-초 형태로 된 시간 데이터를 시-분으로 간단히 변경하기 위한 함수
    if (!time) return time;
    return time[0] + time[1] + time[2] + time[3] + time[4];
  }

  return (
    <>
      <br></br>
      <h1>
        {date[0] +
          date[1] +
          date[2] +
          date[3] +
          "년  " +
          date[5] +
          date[6] +
          "월  " +
          date[8] +
          date[9] +
          "일"}
      </h1>
      <CalendarModal setDate={setDate} />
      <br></br>
      <div className="list-form">
        <h2>TO DO LIST</h2>
        <div className="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>LIST</th>
                <th>PLANNED TIME</th>
                <th>FEEDBACK</th>
                <th>THEME</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {ToDoList
                ? ToDoList.map((todo) => {
                    return (
                      <tr key={todo.id}>
                        <td>{todo.list}</td>
                        <td>
                          {simpleTime(todo.startTime)}~
                          {simpleTime(todo.endTime)}
                        </td>
                        <td>
                          {simpleTime(todo.startTime_feedback)}~
                          {simpleTime(todo.endTime_feedback)}
                        </td>
                        <td>{todo.theme}</td>
                        <td>
                          <ToDoUpdateModal id={todo.id} />
                        </td>
                        <td>
                          <ToDoDeleteModal id={todo.id} />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div className="add-circle">
          <div className="add-todo-button" onClick={OpenToDoInsertModal}>
            + click here to add
          </div>
          {openToDoInsert && <ToDoCreateModal userId={UserId} date={date} />}
        </div>
      </div>
      <div className="list-form">
        <h2>NOT TO DO LIST</h2>
        <div className="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>LIST</th>
                <th>PLANNED TIME</th>
                <th>FEEDBACK</th>
                <th>THEME</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              {NotToDoList
                ? NotToDoList.map((nottodo) => {
                    return (
                      <tr key={nottodo.id}>
                        <td>{nottodo.list}</td>
                        <td>
                          {simpleTime(nottodo.startTime)}~
                          {simpleTime(nottodo.endTime)}
                        </td>
                        <td>
                          {simpleTime(nottodo.startTime_feedback)}~
                          {simpleTime(nottodo.endTime_feedback)}
                        </td>
                        <td>{nottodo.theme}</td>
                        <td>
                          <NotToDoUpdateModal id={nottodo.id} />
                        </td>
                        <td>
                          <NotToDoDeleteModal id={nottodo.id} />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
        <div className="add-circle">
          <div className="add-todo-button" onClick={OpenNotToDoInsertModal}>
            + click here to add
          </div>
          {openNotToDoInsert && (
            <NotToDoCreateModal userId={UserId} date={date} />
          )}
        </div>
      </div>
    </>
  );
}
