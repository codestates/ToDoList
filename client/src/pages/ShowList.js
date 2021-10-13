import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import "./ShowList.css"



const Container = styled.div`
  text-align: center;
  height: 40rem;
  margin: 20px auto;
`;

export default function ShowList({
  ToDoList,
  NotToDoList,
  ToDoListHandler,
  NotToDoListHandler,
  UserId,
  date,
  AccessToken,
}) {
  useEffect(() => {
    console.log(UserId);
    axios
      .post(
        "https://localhost:5000/user",
        {
          headers: {
            Cookie: `token=${AccessToken}`,
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        // console.log(res.data.userInfo);
        ToDoListHandler(res.data.userInfo.id);
        NotToDoListHandler(res.data.userInfo.id);
        // id 저장하고, 그 id로 다시 todo list post 요청
      });
  }, []);

  return (
    <>
    <div className="projects-section"> <div class="projects-section-header"><p>Projects</p><p class="time">{date}</p> </div> 
      {ToDoList || NotToDoList ? (
        <>
          {ToDoList ? (
            <div className="app-container">
            <div className = "app-content">
              <div className = "projects-seaction">
                <div className = "pojects-section-header">
                  <p>Projects</p>
                  <p className="time">Decemder, 12</p>
                </div>
                <div className = "projects-boxes jsGridView">
                  <div className="project-box-wrapper">
                    <div className="project-box" style={{ backgroundColor: "#fee4cd" }}>
                      <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                          <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" /></svg>
                          </button>
                        </div>
                      </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">Web Designing</p>
                          <p className="box-content-subheader">Prototyping</p>
                        </div>
                        <div className="project-box-footer">
                          <div className="days-left" style={{ color: "#ff942e" }}>
                            2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          ) : null}
          <br></br>
          <br></br>
          {NotToDoList ? (
            <div className="app-container">
            <div className = "app-content">
              <div className = "projects-seaction">
                <div className = "pojects-section-header">
                  <p>Projects</p>
                  <p className="time">Decemder, 12</p>
                </div>
                <div className = "projects-boxes jsGridView">
                  <div className="project-box-wrapper">
                    <div className="project-box" style={{ backgroundColor: "#fee4cd" }}>
                      <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                          <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" /></svg>
                          </button>
                        </div>
                      </div>
                        <div className="project-box-content-header">
                          <p className="box-content-header">Web Designing</p>
                          <p className="box-content-subheader">Prototyping</p>
                        </div>
                        <div className="project-box-footer">
                          <div className="days-left" style={{ color: "#ff942e" }}>
                            2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          ) : null}
        </>
      ) : (
        <Container>
          <h2><p className='h1'>To do list를 작성해주세요</p></h2>
          <Link to="/list"><button className='pinky'><Link to="/list"><div className='white'>To do list 작성하러 가기</div></Link></button></Link>
        </Container>
      )}
      </div>
    </>
  );
}
