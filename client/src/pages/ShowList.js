import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Title = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
  opacity: 0.9;
  margin: 0;
  color: var(--main-color);
`;

const Container = styled.div`
  text-align: center;
  height: 40rem;
  margin: 20px auto;
`;

const BoxFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Box = styled.div`
  --main-color-card: #9980fa;
  background-color: #d980fa;
  border-radius: 10px;
  padding: 20px;
  margin: auto;
  width: 15rem;
  margin: 1rem;
  flex-grow: 1 auto;
`;

const ThemeListTimeContanier = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ThemeContanier = styled.div`
  display: flex;
  height: 4em;
  align-items: center;
`;

const ListTimeContanier = styled.div`
  display: flex;
  flex-direction: column;
  height: 4em;
  justify-content: center;
  flex-grow: 1;
`;

const List = styled.div`
  font-size: 16px;
  flex: 1 1 auto;
  text-align: center;
`;

const Time = styled.div`
  font-size: 16px;
  flex: 1 1 auto;
  text-align: center;
`;

const Theme = styled.div`
  font-size: 16px;
  flex: 1 1 auto;
  vertical-align: middle;
`;

export default function ShowList({
  ToDoList,
  NotToDoList,
  ToDoListHandler,
  NotToDoListHandler,
  UserId,
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
      {ToDoList || NotToDoList ? (
        <>
          {ToDoList ? (
            <>
              <Title>To Do List</Title>
              <br></br>
              <BoxFlexContainer>
                {ToDoList.map((list) => (
                  <Box key={list.id}>
                    <ThemeListTimeContanier>
                      <ThemeContanier>
                        <Theme>{list.theme}</Theme>
                      </ThemeContanier>
                      <ListTimeContanier>
                        <List>{list.list}</List>
                        <Time>{list.planned_time}</Time>
                      </ListTimeContanier>
                    </ThemeListTimeContanier>
                  </Box>
                ))}
              </BoxFlexContainer>
            </>
          ) : null}
          <br></br>
          <br></br>
          {NotToDoList ? (
            <>
              <Title>Not To Do List</Title>
              <br></br>
              <BoxFlexContainer>
                {NotToDoList.map((list) => (
                  <Box key={list.id}>
                    <ThemeListTimeContanier>
                      <ThemeContanier>
                        <Theme>{list.theme}</Theme>
                      </ThemeContanier>
                      <ListTimeContanier>
                        <List>{list.list}</List>
                        <Time>{list.planned_time}</Time>
                      </ListTimeContanier>
                    </ThemeListTimeContanier>
                  </Box>
                ))}
              </BoxFlexContainer>
            </>
          ) : null}
        </>
      ) : (
        <Container>
          <h2>To do list를 작성해주세요</h2>
          <Link to="/list">To do list 작성하러 가기</Link>
        </Container>
      )}
    </>
  );
}
