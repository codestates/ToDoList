import React, { useState, useEffect } from "react";
import "../Register.css";
import welcome from "../../images/WELCOME.jpg"
import enjoy from'../../images/ENJOY-3.jpg'
import todo from '../../images/TO DO-2.jpg'

export default function ImageSlide() {
 

 const [Images,setImages]=useState(welcome) 
const click = ()=>{
if(Images === welcome){
  setImages(enjoy)
}else if(Images === enjoy){
  setImages(todo)
}else{
  setImages(welcome)
}
} 

  return (
    <img className='background'src={Images} onClick={click}></img>
  );
}