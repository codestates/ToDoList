import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";

function ForgotPage() {
  const [Id, setId] = useState("");
  const [Question, setQuestion] = useState("");
  let history = useHistory();

  const IdHandler = (e) => {
    setId(e.target.value);
  };
  const QuestionHandler = (e) => {
    setQuestion(e.target.value);
  };
  useEffect(() => {
    // console.log(AccessToken);
  });
  const submitHandler = (e) => {
    e.preventDefault();
    if(Id === ''){
      alert('아이디를 입력해주세요')
    }else if(Question === ''){
      alert('질문의 답변을 해주세요')
    }
    let body = {
      username: Id,
      question: Question,
    };
    axios
      .post("https://localhost:5000/forgotpage", body, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data.data);
        const password = res.data.data.password.password;
        // const question = res.data.data.password.question;
        // const username = res.data.data.password.username;
        // if(Question !== question || Id !== username){
        //   alert('가입된 정보가 없습니다!')
        // }else{
        alert(password)
        history.push("/login");
        // }
      });
  };
  const moveRegister = () => {
    history.push("/login");
  };
  return (
    <div>
      <Link to="/register">
        <h1>SBS</h1>
      </Link>
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={submitHandler}>
            <h1>비밀번호 찾기</h1>

            <div className="social-container"></div>
            <span></span>
            <input
              type="text"
              value={Id}
              onChange={IdHandler}
              placeholder="아이디"
            />
            <input
              type="question"
              value={Question}
              onChange={QuestionHandler}
              placeholder="질문답변"
            />
            
            <button type="submit">비밀번호 찾기</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <h1>안녕하세요! 반가워요!</h1>
              <p>로그인 하시려면 아래 버튼을 눌러주세요!</p>
              <button className="ghost" id="signUp" onClick={moveRegister}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPage;
