import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ TokenSave }) {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [AccessToken, setAccessToken] = useState("");
  let history = useHistory();

  const IdHandler = (e) => {
    setId(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    // console.log(AccessToken);
  }, [AccessToken]);
  const submitHandler = (e) => {
    e.preventDefault();
    // login 요청 후 받은 응답을 가지고 로그인 상태 설정 후 렌더링 다시해주기
    // 로그인 상태에 따른 렌더링 -> 렌더링 페이지에서 상태에 따라 보여주기?
    // 렌더링 1 : 로그인 안된 모습(김명현,장동혁)
    // 렌더링 2 : 로그인 된 모습(김지윤,홍민혁)
    let body = {
      username: Id,
      password: Password,
    };
    axios
      .post("https://localhost:5000/login", body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data.accessToken);
        setAccessToken(res.data.data.accessToken);
        TokenSave(res.data.data.accessToken);
        history.push("/");
      });

    console.log("id", Id);
    console.log("password", Password);
  };
  const moveRegister = () => {
    history.push("/register");
  };
  return (
    <div>
      <Link to="/register">
        <h1>SBS</h1>
      </Link>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandler}>
            <h1>환영합니다!</h1>

            <div className="social-container"></div>
            <span></span>
            <input
              type="text"
              value={Id}
              onChange={IdHandler}
              placeholder="아이디"
            />
            <input
              type="password"
              value={Password}
              onChange={PasswordHandler}
              placeholder="비밀번호"
            />
            <Link to="/forgotpage">
            <a >비밀번호를 잊어버리셨나요?</a>
            </Link>
            <button type="submit">로그인</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>안녕하세요! 반가워요!</h1>
              <p>아이디가 없으시다면 아래 버튼을 눌러주세요!</p>
              <button className="ghost" id="signUp" onClick={moveRegister}>
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
