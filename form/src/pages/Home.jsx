import React,{useEffect} from 'react'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styled from 'styled-components';
export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
  
    if(localStorage.getItem("chat-app-user"))
    {
      localStorage.removeItem("chat-app-user");
  
    }
  }, []);
  const btnClicked =()=>{
    console.log("button CLicked!!");
  }
  return (
    <>
    <div className='main-container'>
    <div className='container'>
    <h3 className='heading'>Welcome To The Chat Application</h3>
    <div className='info'>
    <p className='para'>You have to register first.</p>
    <p className='click'>Please click on the button down below</p>
    </div>
    <div className='btn-div'>
    <ButtonContainer>
      <button type="button" className='chat-btn' onClick={()=>{navigate("/register")}}>Get Started</button>
    </ButtonContainer>
    </div>
    </div>
    </div>
    </>
  )
}

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
`;