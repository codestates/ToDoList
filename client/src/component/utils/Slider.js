import React, { useState } from "react";
import ImgSlider from "./ImgSlider";
import Slide from "./Slide";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden; // 선을 넘어간 이미지들은 보이지 않도록 처리합니다.
`;
const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 1em;
  color: coral;
  border-radius: 10px;
  margin-right: 1rem;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;

const TOTAL_SLIDES = 4;
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(1);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Container>
      {/* Img 파일 */}
      <ImgSlider />
      {/* Img 파일 */}

      <Slide id={currentSlide} />
      {currentSlide}

      <br />
      <br />
      <div>
        <Button onClick={prevSlide}>Previous Slide</Button>
        <Button onClick={nextSlide}>Next Slide</Button>
      </div>
    </Container>
  );
}
