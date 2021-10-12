import axios from "axios";
import React, { useState, useEffect } from "react";
import "./InsertModal.css";

function NotToDoCreateModal({ date, userId }) {
  const [NotToDoList, setNotToDoList] = useState();
  const [NotToDoStartTime, setNotToDoStartTime] = useState();
  const [NotToDoEndTime, setNotToDoEndTime] = useState();
  const [NotToDoTheme, setNotToDoTheme] = useState();

  const NotToDoListHandler = (e) => {
    setNotToDoList(e.target.value);
  };

  const NotToDoStartTimeHandler = (e) => {
    setNotToDoStartTime(e.target.value);
  };

  const NotToDoEndTimeHandler = (e) => {
    setNotToDoEndTime(e.target.value);
  };

  const NotToDoThemeHandler = (e) => {
    setNotToDoTheme(e.target.value);
  };

  const NotaddToDoListHandler = (e) => {
    e.preventDefault();
    let data = {
      userId: userId,
      list: NotToDoList,
      startTime: NotToDoStartTime,
      endTime: NotToDoEndTime,
      theme: NotToDoTheme,
      date: date,
    };
    axios
      .post("https://localhost:5000/nottodo", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
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
          <input type="text" onChange={NotToDoListHandler} placeholder="LIST" />
          <label>START TIME: </label>
          <input
            type="time"
            onChange={NotToDoStartTimeHandler}
            placeholder="START TIME"
          />
          <label>END TIME: </label>
          <input
            type="time"
            onChange={NotToDoEndTimeHandler}
            placeholder="END TIME"
          />
          <label>THEME: </label>
          <input
            type="text"
            onChange={NotToDoThemeHandler}
            placeholder="THEME"
          />
          <button type="submit" onClick={NotaddToDoListHandler}>
            O submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NotToDoCreateModal;
