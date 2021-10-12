import React from "react";
import ChangePassword from "./utils/ChangePassword";
import Theme from "./utils/Theme";

function MyPage({ AccessToken }) {
  return (
    <div>
      {/* 비밀번호 변경 */}
      <ChangePassword AccessToken={AccessToken} />
      {/* 테마 변경 */}
      <br />
      <br />
      <Theme AccessToken={AccessToken} />
    </div>
  );
}

export default MyPage;
