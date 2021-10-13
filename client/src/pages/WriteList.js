import React, { useState, useEffect } from "react";
import axios from "axios";
import CalendarModal from "../component/CalendarModal";
import ToDoCreateModal from "../component/ToDoCreateModal";
import NotToDoCreateModal from "../component/NotToDoCreateModal";
import ToDoUpdateModal from "../component/ToDoUpdateModal";
import NotToDoUpdateModal from "../component/NotToDoUpdateModal";
import ToDoDeleteModal from "../component/ToDoDeleteModal";
import NotToDoDeleteModal from "../component/NotToDoDeleteModal";
import "./WriteList.css";


export default function WriteList({
  ToDoList,
  NotToDoList,
  ToDoListHandler,
  NotToDoListHandler,
  date,
  setDate,
  UserId,
  AccessToken,
}) {
  console.log("todo:", ToDoList);
  console.log("nottodo", NotToDoList);

  //+ 메뉴 모달로 띄우기
  //모달안에 드롭다운으로 투두 낫투두
  //표에 추가하기 o
  const [changeList, setChangeList] = useState(false);
  const [openToDoInsert, setOpenToDoInsert] = useState(false); // create용 모달창 open/close 데이터
  const [openNotToDoInsert, setOpenNotToDoInsert] = useState(false); // create용 모달창 open/close 데이터

  const changeListHandler = () => {
    // useEffect를 통해 list가 CRUD로 변경될 시 화면에 업데이트 시켜주기 위함
    console.log("상태 변경");
    setChangeList(!changeList);
  };

  useEffect(() => {
    // 날짜가 바뀔 때마다 ToDoList 및 NotToDoList 데이터 최신화
    axios
      .post(
        "https://localhost:5000/user",
        {
          headers: {
            Cookie: `token=${AccessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        // id 저장하고, 그 id로 다시 todo list post 요청
        // console.log(res.data.userInfo);
        ToDoListHandler(res.data.userInfo.id);
        NotToDoListHandler(res.data.userInfo.id);
      });
  }, [date, changeList]);

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
                          <ToDoUpdateModal
                            id={todo.id}
                            changeListHandler={changeListHandler}
                          />
                        </td>
                        <td>
                          <ToDoDeleteModal
                            id={todo.id}
                            changeListHandler={changeListHandler}
                          />
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
          {openToDoInsert && (
            <ToDoCreateModal
              userId={UserId}
              date={date}
              changeListHandler={changeListHandler}
            />
          )}
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
                          <NotToDoUpdateModal
                            id={nottodo.id}
                            changeListHandler={changeListHandler}
                          />
                        </td>
                        <td>
                          <NotToDoDeleteModal
                            id={nottodo.id}
                            changeListHandler={changeListHandler}
                          />
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
            <NotToDoCreateModal
              userId={UserId}
              date={date}
              changeListHandler={changeListHandler}
            />
          )}
        </div>
      </div>
    </>
  );
}
