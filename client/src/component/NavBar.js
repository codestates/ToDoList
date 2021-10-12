import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";
import axios from "axios";

function NavBar({ AccessToken }) {
  const [isLogin, setisLogin] = useState(false);
  const [Token, setToken] = useState(AccessToken);
  const [Login, setLogin] = useState("login");
  let history = useHistory();

  const tokenHandler = () => {
    if (Token !== "") {
      setisLogin(!isLogin);
      setLogin("logout");
    } else {
      setisLogin(isLogin);
    }
  };

  const mypageHandler = () => {
    if (Token !== "") {
      history.push("/navbar");
    } else {
      history.push("/mypage");
    }
  };

  const LogOutHandler = (e) => {
    e.preventDefault();
    if (Login === "login") {
      history.push("/login");
    } else if (Login === "logout") {
      axios
        .post(
          "https://localhost:5000/logout",
          {
            headers: {
              Cookie: "",
            },
          },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data);
        });
      // history.push("/");
      window.location.replace("/");
    }

    console.log(Token);
  };

  return (
    <nav className="navigation" onLoad={tokenHandler}>
      <ul className="menu">
        <img src="/a.png" width="50px" />
        <li className="li">
          <Link to="/showlist">
            <svg className="home" width="30px" height="30px"></svg>
            <span title="home">Show List</span>
          </Link>
        </li>
        <li>
          <Link to="/list">
            <svg className="home" width="30px" height="30px"></svg>
            <span title="home">List</span>
          </Link>
        </li>
        <li onClick={mypageHandler}>
          <Link to="/mypage">
            <svg className="login" width="30px" height="30px"></svg>
            <span title="login">my page</span>
          </Link>
        </li>
        <li onClick={LogOutHandler}>
          <Link to="/">
            <svg className="login" width="30px" height="30px"></svg>
            <span title="login">{Login}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
