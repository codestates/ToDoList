import React, { useState, useEffect } from "react";
import axios from "axios";

function Theme({ AccessToken }) {
  const [ThemeColor, setThemeColor] = useState([]);
  const [ThemeName, setThemeName] = useState([]);
  const [Name, setName] = useState("");
  const [Color, setColor] = useState("");
  const [Token, setToken] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    let newThemeColor = [...ThemeColor];
    newThemeColor.push(Color);
    setThemeColor(newThemeColor);

    let newThemeName = [...ThemeName];
    newThemeName.push(Name);
    setThemeName(newThemeName);

    // let body ={
    //   userId: ,
    //   name: ,
    //   image: ,
    //   color: ,
    //   toDo_id: ,
    //   notToDo_Id:
    // }
  };
  const ColorHandler = (e) => {
    // console.log(e.target.value);
    setColor(e.target.value);
  };

  const NameHandler = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };
  return (
    <div>
      <h3>테마 변경 : 본인이 원하는 색상을 선택하여 테마를 만들어 보세요</h3>
      <div style={{ display: "flex" }}>
        <form onSubmit={submitHandler}>
          <input
            style={{
              width: "3rem",
              height: "2rem",
              padding: "0.2rem",
              backgroundColor: "grey",
              marginRight: "1rem",
            }}
            type="color"
            onChange={ColorHandler}
            value={Color}
          />
          <input
            type="text"
            value={Name}
            onChange={NameHandler}
            placeholder="테마 이름을 적어주세요."
          />
          <button type="submit">만들기</button>
        </form>
      </div>

      <div style={{ display: "flex" }}>
        {ThemeColor.map((color, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: color,
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                margin: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              {ThemeName[index]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Theme;
