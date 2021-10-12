import React, { useState, useEffect } from "react";

import axios from "axios";
import { Modal } from "./Modal";
import Slider from "./utils/Slider";

function LandingPage({ AccessToken }) {
  const [Token, setToken] = useState("");
  const [UserName, setUserName] = useState("");
  const [AllUser, setAllUser] = useState(0);

  useEffect(() => {
    setToken(AccessToken);
    // console.log(AccessToken);
    // post 요청해서 로그인한 id,pw 보여주기 -> NavBar에 ~님 환영합니다
    axios
      .post(
        "https://localhost:5000/user",
        {
          headers: {
            Cookie: `token=${Token}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res);
        setUserName(res.data.userInfo.username);
      });

    axios.get("https://localhost:5000/alluser").then((res) => {
      // console.log(res.data);
      setAllUser(res.data.allUser);
    });
  }, [UserName]);

  return (
    <div>
      {/* NavBar */}
      <Slider />

      {UserName && <div>환영합니다. {UserName}</div>}
      {AllUser && (
        <div>
          SBS팀의 To Do List는 총 {AllUser}명의 사용자와 함께 하고 있습니다.
        </div>
      )}

      {/* Modal */}
      <Modal />
      {/* Slider */}
      <Slider />
    </div>
  );
}

export default LandingPage;
