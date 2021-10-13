import axios from "axios";
import React, { useState, useEffect } from "react";
import "./InsertModal.css";

function NotToDoCreateModal({ date, userId, changeListHandler }) {
  const [NotToDoList, setNotToDoList] = useState();
  const [NotToDoStartTime, setNotToDoStartTime] = useState();
  const [NotToDoEndTime, setNotToDoEndTime] = useState();
  const [NotToDoTheme, setNotTodoTheme] = useState("");
  const [NotToDoThemeName, setNotToDoThemeName] = useState([]);

  const NotToDoListHandler = (e) => {
    setNotToDoList(e.target.value);
  };

  const NotToDoStartTimeHandler = (e) => {
    setNotToDoStartTime(e.target.value);
  };

  const NotToDoEndTimeHandler = (e) => {
    setNotToDoEndTime(e.target.value);
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
        changeListHandler();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ThemeHandler = (e) => {
    e.preventDefault();
    setNotTodoTheme(e.target.value);
    // console.log(e.target.value);
  };

  // axios로 theme 불러와서 themename만 저장

  useEffect(() => {
    axios
      .get(`https://localhost:5000/allTheme/${userId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.allTheme);
        let newNotToDoThemeName = [...NotToDoThemeName];
        res.data.allTheme.forEach((theme) => {
          newNotToDoThemeName.push(theme.name);
        });
        setNotToDoThemeName(newNotToDoThemeName);
      });
  }, []);

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
          <select name="theme" id="theme-select" onChange={ThemeHandler}>
            <option value="">--Please choose an THEME--</option>
            {NotToDoThemeName &&
              NotToDoThemeName.map((a, index) => (
                <option key={index} value={a}>
                  {a}
                </option>
              ))}
          </select>
          {/* <input
            type="text"
            onChange={NotToDoThemeHandler}
            placeholder="THEME"
          /> */}
          <button type="submit" onClick={NotaddToDoListHandler}>
            O submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NotToDoCreateModal;
