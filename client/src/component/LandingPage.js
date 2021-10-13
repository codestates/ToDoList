import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import Slider from "./utils/Slider";
import Slide from "./utils/Slide";
import "./sass.scss"
import ImageSlide from "./utils/ImgSlider";
import images from "./images"

function LandingPage({ AccessToken }) {
  const [Token, setToken] = useState("");
  const [UserName, setUserName] = useState("");
  const [AllUser, setAllUser] = useState(0);
  const [Images, setImages] = useState(images[0].src)

  const a =()=>{
    setImages(images[0].src)
  }
  const b =()=>{
  setImages(images[1].src)
 }
 const c =()=>{
  setImages(images[2].src)
 }


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
    <>
    <div className='projects-section' >
    <div className='projects-section-header'>
      <Link to='/'><p>SBS</p></Link>
<Link to='/mypage'><p className='time'>{UserName}님 반갑습니다!</p ></Link>
</div>

        
<div></div>
<ImageSlide />
<Slider />
<div>
  
<ul className='nodot'>
  <div className='clickchange'>아래 버튼을 눌러 기능을 확인해 보세요!</div>
<li className='buttonfor' onClick={a}><span>TODO</span></li>
<li className='buttonfor' onClick={b}><span>NOT TO DO</span></li>
<li className='buttonfor' onClick={c}><span>LIST</span></li>
</ul>
<img className='for' src={Images} />
</div>
</div> 

 </> );
}

export default LandingPage;
