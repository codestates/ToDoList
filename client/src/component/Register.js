import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function Register() {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [CheckPassword, setCHeckPassword] = useState("");
  const [Question, setQuestion] = useState("");
  const IdHandler = (e) => {
    setId(e.target.value);
  };
  let history = useHistory();

  const QuestionHandler = (e) => {
    setQuestion(e.target.value);
  };
  const PasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const CheckPasswordHandler = (e) => {
    setCHeckPassword(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // register 요청 후 받은 응답을 가지고 redirect
    if (Password !== CheckPassword) {
      alert("비밀번호가 서로 다릅니다");
    } else {
      let body = {
        username: Id,
        password: Password,
        question: Question,
      };
      axios
        .post("https://localhost:5000/register", body, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((res) => {
          // console.log(res.data);
          alert("회원가입이 완료되었습니다.");
          history.push("/login");
        });
      // console.log("id", Id);
      // console.log("password", Password);
    }
  };
  const moveLogin = () => {
    history.push("/login");
  };

  return (
    <div>
      <Link to="/">
        <h1>SBS</h1>
      </Link>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandler}>
            <h1>가입을 시작합니다!</h1>
            <div className="social-container">{/* Google, kakao auth */}</div>
            <span>아래 내용을 빠짐없이 입력해주세요.</span>
            <input
              required
              type="text"
              value={Id}
              onChange={IdHandler}
              placeholder="아이디"
            />
            <input
              required
              type="password"
              value={Password}
              onChange={PasswordHandler}
              placeholder="비밀번호"
            />
            <input
              required
              type="password"
              value={CheckPassword}
              onChange={CheckPasswordHandler}
              placeholder="비밀번호 확인"
            />
            <input
              required
              type="text"
              value={Question}
              onChange={QuestionHandler}
              placeholder="졸업한 초등학교는?"
            />
            <span className="ptext">
              위 질문은 비밀번호를 잊어버렸을 경우 사용 됩니다.
            </span>
            <button type="submit">회원가입</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>안녕하세요! 반가워요!</h1>
              <p>사용 중인 아이디가 있다면,아래 버튼을 눌러주세요.</p>
              <button className="ghost" id="signUp" onClick={moveLogin}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;