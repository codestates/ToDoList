import axios from "axios";
import React, { useState, useEffect } from "react";
import "./InsertModal.css";

function ToDoCreateModal({ date, userId }) {
  const [ToDoList, setToDoList] = useState("");
  const [ToDoStartTime, setToDoStartTime] = useState("00:00");
  const [ToDoEndTime, setToDoEndTime] = useState("00:00");
  const [ToDoTheme, setToDoTheme] = useState();

  const ToDoListHandler = (e) => {
    setToDoList(e.target.value);
  };

  const ToDoStartTimeHandler = (e) => {
    setToDoStartTime(e.target.value);
  };

  const ToDoEndTimeHandler = (e) => {
    setToDoEndTime(e.target.value);
  };

  const ToDoThemeHandler = (e) => {
    setToDoTheme(e.target.value);
  };

  const addToDoListHandler = (e) => {
    // create 요청 핸들러
    e.preventDefault();
    let data = {
      userId: userId,
      list: ToDoList,
      startTime: ToDoStartTime,
      endTime: ToDoEndTime,
      theme: ToDoTheme,
      date: date,
    };
    axios
      .post("https://localhost:5000/todo", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="insert-backgrund">
        <form>
          <label>LIST: </label>
          <input type="text" onChange={ToDoListHandler} placeholder="LIST" />
          <label>START TIME: </label>
          <input
            type="time"
            onChange={ToDoStartTimeHandler}
            placeholder="START TIME"
          />
          <label>END TIME: </label>
          <input
            type="time"
            onChange={ToDoEndTimeHandler}
            placeholder="END TIME"
          />

          <label>THEME: </label>
          <input type="text" onChange={ToDoThemeHandler} placeholder="THEME" />

          <button type="submit" onClick={addToDoListHandler}>
            SUBMIT
          </button>
        </form>
      </div>
    </>
  );
}

export default ToDoCreateModal;
