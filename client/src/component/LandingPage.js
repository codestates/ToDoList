import React, { useState, useEffect } from "react";
import axios from "axios";


function LandingPage({ AccessToken }) {
  const [Token, setToken] = useState("");
  const [UserName, setUserName] = useState("");

  useEffect(() => {
    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
    setToken(AccessToken);
    let body = {
      AccessToken,
    };
    axios.post("https://localhost:5000/user", body).then((res) => {
      // console.log(res.data);
      setUserName(res.data.userInfo.username);
    });
  }, [AccessToken, UserName]);

  return <div>{UserName && <div>환영합니다. {UserName}</div>}</div>;
}

export default LandingPage;
